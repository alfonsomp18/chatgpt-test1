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
    homeTeamId: 'team-corporates-hr',
    awayTeamId: 'team-legal',
    date: '2023-01-29T19:00:00.000Z',
    status: 'completed',
    score: { home: 3, away: 2 },
    events: [
      { playerId: 'player-1', teamId: 'team-corporates-hr', minute: 12 },
      { playerId: 'player-5', teamId: 'team-legal', minute: 30 },
      { playerId: 'player-2', teamId: 'team-corporates-hr', minute: 55 },
      { playerId: 'player-6', teamId: 'team-legal', minute: 64 },
      { playerId: 'player-3', teamId: 'team-corporates-hr', minute: 78 },
    ],
  },
  {
    id: 'match-2',
    jornada: 1,
    homeTeamId: 'team-taap',
    awayTeamId: 'team-operations-product',
    date: '2023-01-29T21:00:00.000Z',
    status: 'completed',
    score: { home: 1, away: 1 },
    events: [
      { playerId: 'player-9', teamId: 'team-taap', minute: 18 },
      { playerId: 'player-13', teamId: 'team-operations-product', minute: 69 },
    ],
  },
  {
    id: 'match-3',
    jornada: 2,
    homeTeamId: 'team-technology',
    awayTeamId: 'team-corporates-hr',
    date: '2026-03-05T19:00:00.000Z',
    status: 'completed',
    score: { home: 0, away: 2 },
    events: [
      { playerId: 'player-1', teamId: 'team-corporates-hr', minute: 33 },
      { playerId: 'player-4', teamId: 'team-corporates-hr', minute: 74 },
    ],
  },
  {
    id: 'match-4',
    jornada: 2,
    homeTeamId: 'team-legal',
    awayTeamId: 'team-taap',
    date: '2026-03-05T21:00:00.000Z',
    status: 'completed',
    score: { home: 1, away: 0 },
    events: [
      { playerId: 'player-7', teamId: 'team-legal', minute: 57 },
    ],
  },
  {
    id: 'match-5',
    jornada: 3,
    homeTeamId: 'team-operations-product',
    awayTeamId: 'team-technology',
    date: '2026-04-23T19:00:00.000Z',
    status: 'scheduled',
    score: { home: 0, away: 0 },
    events: [],
  },
  {
    id: 'match-6',
    jornada: 3,
    homeTeamId: 'team-taap',
    awayTeamId: 'team-corporates-hr',
    date: '2026-04-23T21:00:00.000Z',
    status: 'scheduled',
    score: { home: 0, away: 0 },
    events: [],
  },
];
