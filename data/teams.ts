export type MatchResult = 'W' | 'D' | 'L' | 'N';
export type MatchResult = 'W' | 'D' | 'L';

export type Team = {
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  last5: MatchResult[];
};

export const teams: Team[] = [
  {
    name: '[Verde] Taap',
    played: 4,
    wins: 0,
    draws: 0,
    losses: 4,
    goalsFor: 10,
    goalsAgainst: 19,
    points: 0,
    last5: ['L', 'L', 'L', 'L', 'N'],
  },
  {
    name: '[Negro] Legal',
    played: 4,
    wins: 2,
    draws: 0,
    losses: 2,
    goalsFor: 14,
    goalsAgainst: 21,
    points: 6,
    last5: ['W', 'L', 'W', 'L', 'N'],
  },
  {
    name: '[Blanco] TR Technology',
    played: 5,
    wins: 2,
    draws: 0,
    losses: 3,
    goalsFor: 24,
    goalsAgainst: 17,
    points: 6,
    last5: ['W', 'L', 'L', 'W', 'L'],
  },
  {
    name: '[Amarillo] TR operations, Product',
    played: 4,
    wins: 3,
    draws: 0,
    losses: 1,
    goalsFor: 19,
    goalsAgainst: 20,
    points: 9,
    last5: ['W', 'W', 'L', 'W', 'N'],
  },
  {
    name: '[Azul] Corporates HR',
    played: 5,
    wins: 4,
    draws: 0,
    losses: 1,
    goalsFor: 27,
    goalsAgainst: 18,
    points: 12,
    last5: ['W', 'W', 'L', 'W', 'W'],
    name: 'Tigres TR',
    played: 10,
    wins: 7,
    draws: 2,
    losses: 1,
    goalsFor: 21,
    goalsAgainst: 9,
    points: 23,
    last5: ['W', 'W', 'D', 'W', 'W'],
  },
  {
    name: 'Atlético Redes',
    played: 10,
    wins: 6,
    draws: 3,
    losses: 1,
    goalsFor: 19,
    goalsAgainst: 10,
    points: 21,
    last5: ['W', 'D', 'W', 'W', 'D'],
  },
  {
    name: 'Deportivo Soporte',
    played: 10,
    wins: 6,
    draws: 1,
    losses: 3,
    goalsFor: 17,
    goalsAgainst: 11,
    points: 19,
    last5: ['L', 'W', 'W', 'W', 'D'],
  },
  {
    name: 'Marketing FC',
    played: 10,
    wins: 5,
    draws: 2,
    losses: 3,
    goalsFor: 16,
    goalsAgainst: 14,
    points: 17,
    last5: ['W', 'L', 'D', 'W', 'L'],
  },
  {
    name: 'Finanzas United',
    played: 10,
    wins: 4,
    draws: 3,
    losses: 3,
    goalsFor: 14,
    goalsAgainst: 13,
    points: 15,
    last5: ['D', 'W', 'L', 'D', 'W'],
  },
  {
    name: 'Operaciones Club',
    played: 10,
    wins: 2,
    draws: 2,
    losses: 6,
    goalsFor: 9,
    goalsAgainst: 18,
    points: 8,
    last5: ['L', 'L', 'W', 'D', 'L'],
  },
  {
    name: 'Legal Team',
    played: 10,
    wins: 1,
    draws: 3,
    losses: 6,
    goalsFor: 8,
    goalsAgainst: 20,
    points: 6,
    last5: ['D', 'L', 'L', 'D', 'L'],
  },
  {
    name: 'RRHH Stars',
    played: 10,
    wins: 1,
    draws: 2,
    losses: 7,
    goalsFor: 7,
    goalsAgainst: 16,
    points: 5,
    last5: ['L', 'D', 'L', 'L', 'W'],
  },
];

export const sortedTeams = [...teams].sort((a, b) => {
  const pointsDifference = a.points - b.points;
  const pointsDifference = b.points - a.points;

  if (pointsDifference !== 0) {
    return pointsDifference;
  }

  const goalDifference = a.goalsFor - a.goalsAgainst - (b.goalsFor - b.goalsAgainst);
  const goalDifference = b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst);

  if (goalDifference !== 0) {
    return goalDifference;
  }

  return a.goalsFor - b.goalsFor;
  return b.goalsFor - a.goalsFor;
});
