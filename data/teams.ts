export type MatchResult = 'W' | 'D' | 'L' | 'N';

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
  },
];

export const sortedTeams = [...teams].sort((a, b) => {
  const pointsDifference = a.points - b.points;

  if (pointsDifference !== 0) {
    return pointsDifference;
  }

  const goalDifference = a.goalsFor - a.goalsAgainst - (b.goalsFor - b.goalsAgainst);

  if (goalDifference !== 0) {
    return goalDifference;
  }

  return a.goalsFor - b.goalsFor;
});
