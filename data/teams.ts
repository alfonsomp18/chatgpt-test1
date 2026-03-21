export type MatchResult = 'W' | 'D' | 'L';

export interface Team {
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  last5: MatchResult[];
}

export const teams: Team[] = [
  {
    name: 'Equipo Azul',
    played: 5,
    wins: 4,
    draws: 1,
    losses: 0,
    goalsFor: 12,
    goalsAgainst: 4,
    points: 13,
    last5: ['W', 'W', 'D', 'W', 'W'],
  },
  {
    name: 'Equipo Blanco',
    played: 5,
    wins: 3,
    draws: 1,
    losses: 1,
    goalsFor: 10,
    goalsAgainst: 6,
    points: 10,
    last5: ['W', 'L', 'W', 'D', 'W'],
  },
  {
    name: 'Equipo Negro',
    played: 5,
    wins: 2,
    draws: 1,
    losses: 2,
    goalsFor: 8,
    goalsAgainst: 8,
    points: 7,
    last5: ['L', 'W', 'D', 'L', 'W'],
  },
  {
    name: 'Equipo Verde',
    played: 5,
    wins: 0,
    draws: 1,
    losses: 4,
    goalsFor: 3,
    goalsAgainst: 15,
    points: 1,
    last5: ['L', 'L', 'D', 'L', 'L'],
  },
];

export const sortedTeams = [...teams].sort((a, b) => {
  const pointsDifference = b.points - a.points;

  if (pointsDifference !== 0) {
    return pointsDifference;
  }

  const goalDifference = b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst);

  if (goalDifference !== 0) {
    return goalDifference;
  }

  return b.goalsFor - a.goalsFor;
});
