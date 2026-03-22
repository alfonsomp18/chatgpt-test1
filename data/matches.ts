export type MatchStatus = 'scheduled' | 'completed';

export interface MatchEvent {
  playerId: string;
  teamId: string;
  minute?: number;
}

export interface MatchRecord {
  id: string;
  jornada: number;
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  status: MatchStatus;
  score: {
    home: number;
    away: number;
  };
  events: MatchEvent[];
}

export const matches: MatchRecord[] = [
  {
    id: 'match-1',
    jornada: 1,
    homeTeamId: 'team-azul',
    awayTeamId: 'team-blanco',
    date: '2026-03-01T19:00:00.000Z',
    status: 'completed',
    score: { home: 3, away: 1 },
    events: [
      { playerId: 'player-1', teamId: 'team-azul', minute: 11 },
      { playerId: 'player-5', teamId: 'team-blanco', minute: 24 },
      { playerId: 'player-2', teamId: 'team-azul', minute: 48 },
      { playerId: 'player-1', teamId: 'team-azul', minute: 67 },
    ],
  },
  {
    id: 'match-2',
    jornada: 1,
    homeTeamId: 'team-negro',
    awayTeamId: 'team-verde',
    date: '2026-03-02T19:00:00.000Z',
    status: 'completed',
    score: { home: 2, away: 2 },
    events: [
      { playerId: 'player-9', teamId: 'team-negro', minute: 8 },
      { playerId: 'player-13', teamId: 'team-verde', minute: 19 },
      { playerId: 'player-10', teamId: 'team-negro', minute: 55 },
      { playerId: 'player-14', teamId: 'team-verde', minute: 71 },
    ],
  },
  {
    id: 'match-3',
    jornada: 2,
    homeTeamId: 'team-azul',
    awayTeamId: 'team-negro',
    date: '2026-03-08T19:00:00.000Z',
    status: 'completed',
    score: { home: 2, away: 0 },
    events: [
      { playerId: 'player-3', teamId: 'team-azul', minute: 36 },
      { playerId: 'player-2', teamId: 'team-azul', minute: 62 },
    ],
  },
  {
    id: 'match-4',
    jornada: 2,
    homeTeamId: 'team-blanco',
    awayTeamId: 'team-verde',
    date: '2026-03-09T19:00:00.000Z',
    status: 'completed',
    score: { home: 4, away: 1 },
    events: [
      { playerId: 'player-5', teamId: 'team-blanco', minute: 15 },
      { playerId: 'player-6', teamId: 'team-blanco', minute: 22 },
      { playerId: 'player-13', teamId: 'team-verde', minute: 41 },
      { playerId: 'player-7', teamId: 'team-blanco', minute: 59 },
      { playerId: 'player-6', teamId: 'team-blanco', minute: 77 },
    ],
  },
  {
    id: 'match-5',
    jornada: 3,
    homeTeamId: 'team-azul',
    awayTeamId: 'team-verde',
    date: '2026-03-15T19:00:00.000Z',
    status: 'completed',
    score: { home: 1, away: 1 },
    events: [
      { playerId: 'player-4', teamId: 'team-azul', minute: 44 },
      { playerId: 'player-14', teamId: 'team-verde', minute: 69 },
    ],
  },
  {
    id: 'match-6',
    jornada: 3,
    homeTeamId: 'team-blanco',
    awayTeamId: 'team-negro',
    date: '2026-03-16T19:00:00.000Z',
    status: 'completed',
    score: { home: 2, away: 3 },
    events: [
      { playerId: 'player-10', teamId: 'team-negro', minute: 9 },
      { playerId: 'player-5', teamId: 'team-blanco', minute: 26 },
      { playerId: 'player-9', teamId: 'team-negro', minute: 51 },
      { playerId: 'player-7', teamId: 'team-blanco', minute: 73 },
      { playerId: 'player-11', teamId: 'team-negro', minute: 82 },
    ],
  },
  {
    id: 'match-7',
    jornada: 4,
    homeTeamId: 'team-negro',
    awayTeamId: 'team-azul',
    date: '2026-03-23T19:00:00.000Z',
    status: 'scheduled',
    score: { home: 0, away: 0 },
    events: [],
  },
  {
    id: 'match-8',
    jornada: 4,
    homeTeamId: 'team-verde',
    awayTeamId: 'team-blanco',
    date: '2026-03-24T19:00:00.000Z',
    status: 'scheduled',
    score: { home: 0, away: 0 },
    events: [],
  },
];
