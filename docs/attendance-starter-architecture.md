# Office Attendance Tracker — Starter Architecture (Next.js + Prisma + PostgreSQL)

## 1) Prisma Schema

> Goal: support role-based access, daily attendance sessions, leave requests, policy-driven late status, and auditable admin edits.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  EMPLOYEE
  MANAGER
  ADMIN
}

enum AttendanceSource {
  WEB
  MOBILE
  MANUAL
}

enum LeaveStatus {
  PENDING
  APPROVED
  REJECTED
  CANCELLED
}

enum LeaveType {
  SICK
  CASUAL
  VACATION
  UNPAID
  OTHER
}

model Team {
  id        String   @id @default(cuid())
  name      String   @unique
  managerId String?
  manager   User?    @relation("TeamManager", fields: [managerId], references: [id], onDelete: SetNull)
  members   User[]   @relation("TeamMembers")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model User {
  id                 String             @id @default(cuid())
  email              String             @unique
  name               String
  passwordHash       String?
  role               UserRole           @default(EMPLOYEE)
  timezone           String             @default("UTC")
  teamId             String?
  team               Team?              @relation("TeamMembers", fields: [teamId], references: [id], onDelete: SetNull)
  managesTeam        Team?              @relation("TeamManager")
  attendanceRecords  AttendanceRecord[]
  leaveRequests      LeaveRequest[]     @relation("LeaveRequester")
  leaveApprovals     LeaveRequest[]     @relation("LeaveApprover")
  auditActions       AuditLog[]         @relation("AuditActor")
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt
}

model AttendancePolicy {
  id                 Int      @id @default(1)
  officeStartMinutes Int      @default(570) // 09:30 => 9*60 + 30
  graceMinutes       Int      @default(10)
  targetWorkMinutes  Int      @default(480)
  timezone           String   @default("UTC")
  allowMultiSessions Boolean  @default(false)
  updatedById        String?
  updatedBy          User?    @relation(fields: [updatedById], references: [id], onDelete: SetNull)
  updatedAt          DateTime @updatedAt
}

model AttendanceRecord {
  id              String           @id @default(cuid())
  userId          String
  user            User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  attendanceDate  DateTime         // date bucket in policy timezone at 00:00:00
  checkInAt       DateTime
  checkOutAt      DateTime?
  workedMinutes   Int?
  isLate          Boolean          @default(false)
  source          AttendanceSource @default(WEB)
  note            String?
  createdById     String?
  createdBy       User?            @relation("AttendanceCreatedBy", fields: [createdById], references: [id], onDelete: SetNull)
  updatedById     String?
  updatedBy       User?            @relation("AttendanceUpdatedBy", fields: [updatedById], references: [id], onDelete: SetNull)
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  @@index([userId, attendanceDate])
  @@unique([userId, attendanceDate])
}

model LeaveRequest {
  id           String      @id @default(cuid())
  userId       String
  user         User        @relation("LeaveRequester", fields: [userId], references: [id], onDelete: Cascade)
  leaveType    LeaveType
  status       LeaveStatus @default(PENDING)
  startDate    DateTime
  endDate      DateTime
  reason       String?
  approverId   String?
  approver     User?       @relation("LeaveApprover", fields: [approverId], references: [id], onDelete: SetNull)
  decisionNote String?
  decidedAt    DateTime?
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt

  @@index([userId, status])
  @@index([startDate, endDate])
}

model AuditLog {
  id         String   @id @default(cuid())
  actorId    String?
  actor      User?    @relation("AuditActor", fields: [actorId], references: [id], onDelete: SetNull)
  action     String
  entityType String
  entityId   String
  beforeJson Json?
  afterJson  Json?
  reason     String?
  createdAt  DateTime @default(now())

  @@index([entityType, entityId])
  @@index([createdAt])
}
```

### Key schema notes
- `@@unique([userId, attendanceDate])` enforces one attendance entry per user per day for MVP.
- `attendanceDate` should be generated from policy timezone date boundaries (not raw UTC date).
- `AuditLog` stores before/after snapshots for any manual correction.

---

## 2) API Endpoint Specs

All endpoints are under `app/api/**` (Next.js App Router). Responses are JSON. Use session/JWT middleware to identify `userId` and `role`.

### Auth & Profile

- `GET /api/me`
  - Access: authenticated users
  - Returns current user profile, role, team, and policy timezone.

### Attendance (Employee)

- `POST /api/attendance/check-in`
  - Access: EMPLOYEE/MANAGER/ADMIN
  - Body:
    ```json
    { "timestamp": "2026-03-01T09:31:00Z", "source": "WEB", "note": "optional" }
    ```
  - Behavior:
    - Resolve policy timezone date bucket.
    - Reject if record already exists for date (MVP single session).
    - Compute `isLate` based on policy start + grace.
  - Returns created `attendanceRecord`.

- `POST /api/attendance/check-out`
  - Access: EMPLOYEE/MANAGER/ADMIN
  - Body:
    ```json
    { "timestamp": "2026-03-01T18:10:00Z", "note": "optional" }
    ```
  - Behavior:
    - Find today’s open record (`checkOutAt IS NULL`).
    - Set `checkOutAt`, compute `workedMinutes`.
  - Returns updated `attendanceRecord`.

- `GET /api/attendance/me?from=YYYY-MM-DD&to=YYYY-MM-DD`
  - Access: authenticated users
  - Returns list of own attendance rows + summary stats (`presentDays`, `lateDays`, `totalWorkedMinutes`).

### Attendance (Manager/Admin)

- `GET /api/attendance/team?teamId=...&date=YYYY-MM-DD`
  - Access: MANAGER/ADMIN
  - Returns team members with daily status (present, late, absent, on leave).

- `PATCH /api/attendance/:id`
  - Access: ADMIN (or MANAGER with scope rules)
  - Body:
    ```json
    {
      "checkInAt": "2026-03-01T09:45:00Z",
      "checkOutAt": "2026-03-01T18:00:00Z",
      "reason": "Correcting biometric outage"
    }
    ```
  - Behavior:
    - Recompute `workedMinutes` and `isLate`.
    - Persist `AuditLog` entry with before/after payload.

### Leave Management

- `POST /api/leaves`
  - Access: authenticated users
  - Body: `{ "leaveType": "SICK", "startDate": "...", "endDate": "...", "reason": "..." }`

- `GET /api/leaves/me`
  - Access: authenticated users
  - Returns requester’s leave history.

- `GET /api/leaves/pending?teamId=...`
  - Access: MANAGER/ADMIN
  - Returns pending requests in manager scope.

- `POST /api/leaves/:id/approve`
- `POST /api/leaves/:id/reject`
  - Access: MANAGER/ADMIN
  - Body: `{ "decisionNote": "..." }`

### Policy & Reports

- `GET /api/policy`
  - Access: authenticated users
  - Returns active attendance policy.

- `PATCH /api/policy`
  - Access: ADMIN
  - Updates office start time, grace, targets, timezone.

- `GET /api/reports/attendance.csv?from=...&to=...&teamId=...`
  - Access: MANAGER/ADMIN
  - Returns CSV stream with daily breakdown.

### Validation & Security
- Validate input with `zod` at API boundary.
- Enforce RBAC in middleware/helpers (`requireRole`).
- Add rate limits for mutating endpoints.
- Record manual changes in `AuditLog`.

---

## 3) Suggested Next.js Folder Structure

```txt
.
├── app
│   ├── (auth)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)
│   │   ├── dashboard/page.tsx
│   │   ├── attendance/page.tsx
│   │   ├── leaves/page.tsx
│   │   ├── team/page.tsx
│   │   ├── reports/page.tsx
│   │   └── settings/page.tsx
│   ├── api
│   │   ├── me/route.ts
│   │   ├── attendance
│   │   │   ├── check-in/route.ts
│   │   │   ├── check-out/route.ts
│   │   │   ├── me/route.ts
│   │   │   ├── team/route.ts
│   │   │   └── [id]/route.ts
│   │   ├── leaves
│   │   │   ├── route.ts
│   │   │   ├── me/route.ts
│   │   │   ├── pending/route.ts
│   │   │   └── [id]
│   │   │       ├── approve/route.ts
│   │   │       └── reject/route.ts
│   │   ├── policy/route.ts
│   │   └── reports/attendance.csv/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components
│   ├── attendance
│   │   ├── check-in-card.tsx
│   │   ├── today-status-card.tsx
│   │   ├── attendance-table.tsx
│   │   └── monthly-heatmap.tsx
│   ├── leaves
│   │   ├── leave-request-form.tsx
│   │   └── leave-approval-table.tsx
│   ├── team
│   │   └── team-daily-status.tsx
│   ├── reports
│   │   └── report-filters.tsx
│   └── ui/* (shadcn/ui)
├── lib
│   ├── auth.ts
│   ├── prisma.ts
│   ├── rbac.ts
│   ├── date-time.ts
│   ├── attendance-service.ts
│   ├── leave-service.ts
│   ├── report-service.ts
│   └── validators
│       ├── attendance.ts
│       ├── leave.ts
│       └── policy.ts
├── prisma
│   ├── schema.prisma
│   └── seed.ts
├── middleware.ts
├── package.json
└── README.md
```

---

## 4) UI Wireframe + Component List

### A) Employee Dashboard (`/dashboard`)

**Wireframe (text):**
- Header: date, profile, quick links
- Row 1:
  - `TodayStatusCard` (Present/Late/Absent/Leave)
  - `CheckInCard` (button, current session clock, check-out CTA)
  - `WeeklySummaryCard` (days present, late count, total hours)
- Row 2:
  - `MonthlyHeatmap` (calendar color intensity by worked minutes)
  - `RecentAttendanceTable` (last 10 days)

**Components:**
- `today-status-card.tsx`
- `check-in-card.tsx`
- `weekly-summary-card.tsx`
- `monthly-heatmap.tsx`
- `attendance-table.tsx`

### B) Attendance Page (`/attendance`)

- Filters: date range, status chips
- Main table: date, check-in, check-out, worked hours, late badge
- CTA: request correction

**Components:**
- `attendance-filters.tsx`
- `attendance-table.tsx`
- `correction-request-dialog.tsx`

### C) Team Page (`/team`) for manager/admin

- Top metrics: present, late, absent, on leave (selected date)
- Team status table with search + role/team filters
- Quick actions: mark correction, open profile timeline

**Components:**
- `team-daily-status.tsx`
- `team-summary-cards.tsx`
- `attendance-adjustment-dialog.tsx`

### D) Leave Page (`/leaves`)

- Employee: submit leave + history timeline
- Manager: pending approvals queue

**Components:**
- `leave-request-form.tsx`
- `leave-history-list.tsx`
- `leave-approval-table.tsx`

### E) Reports Page (`/reports`)

- Filter bar: team, user, date range
- Preview grid with pagination
- Export buttons: CSV

**Components:**
- `report-filters.tsx`
- `attendance-report-table.tsx`
- `export-actions.tsx`

---

## 5) Step-by-Step Implementation Checklist

### Phase 0 — Project Bootstrap
1. Initialize Next.js app (`create-next-app`) with TypeScript + App Router.
2. Install dependencies: Prisma, NextAuth (or Clerk), zod, date-fns/luxon, shadcn/ui.
3. Configure `.env` (`DATABASE_URL`, auth secrets, app URL).

### Phase 1 — Database & Auth
4. Create `prisma/schema.prisma` from the model above.
5. Run `prisma migrate dev` and generate Prisma client.
6. Seed initial data (`ADMIN`, sample teams, policy row).
7. Implement auth and session retrieval in `lib/auth.ts`.
8. Add route guards in `middleware.ts` and role helpers in `lib/rbac.ts`.

### Phase 2 — Attendance Core
9. Implement `POST /api/attendance/check-in` with late calculation.
10. Implement `POST /api/attendance/check-out` with worked minute computation.
11. Implement `GET /api/attendance/me` + summary aggregator.
12. Add `attendance-service.ts` for reusable business logic.
13. Build dashboard cards and connect check-in/out actions.

### Phase 3 — Team & Leave
14. Implement `GET /api/attendance/team` with manager scope filtering.
15. Build manager team dashboard page.
16. Implement leave create/list/approve/reject endpoints.
17. Build leave request and approval UI.

### Phase 4 — Admin Controls & Reporting
18. Implement attendance adjustment endpoint (`PATCH /api/attendance/:id`).
19. Add audit logging for each manual update.
20. Implement policy get/update endpoint.
21. Implement CSV export endpoint and reports page table.

### Phase 5 — Hardening & QA
22. Add zod validation for every endpoint payload/query.
23. Add unit tests for:
   - late calculation
   - attendance date bucketing by timezone
   - worked minute calculation
24. Add integration tests for check-in/check-out + duplicate prevention.
25. Add E2E smoke tests for login, check-in, leave request.
26. Add observability (basic request logging + error tracking).
27. Deploy (Vercel + managed Postgres), run production migration, verify seed.

### Definition of Done (MVP)
- Employee can check in/out and view own history.
- Manager can see team daily status and approve/reject leave.
- Admin can adjust records with auditable logs.
- CSV export works for configured date ranges.
- Role-based access is enforced across all protected routes.

---

## 6) Recommended Build Order (Fastest Value)

If you want a quick demo in under a week, prioritize:
1. Auth + user roles
2. Check-in/check-out APIs
3. Employee dashboard
4. Team daily status view
5. CSV export
6. Leave + policy + audit (next sprint)
