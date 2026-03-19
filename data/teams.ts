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
    name: '[Azul] TR Corporates/HR',
    played: 5,
    wins: 4,
    draws: 0,
    losses: 1,
    goalsFor: 27,
    goalsAgainst: 18,
    points: 12,
    last5: ['W', 'W', 'L', 'W', 'W'],
  },
  {
    name: '[Negro] Legal',
    played: 4,
    wins: 2,
    draws: 2,
    losses: 0,
    goalsFor: 14,
    goalsAgainst: 21,
    points: 6,
    last5: ['W', 'D', 'W', 'D'],
  },
  {
    name: '[Rojo] TAAP',
    played: 4,
    wins: 0,
    draws: 0,
    losses: 4,
    goalsFor: 10,
    goalsAgainst: 19,
    points: 0,
    last5: ['L', 'L', 'L', 'L'],
  },
  {
    name: '[Amarillo] TR Operations / Product',
    played: 4,
    wins: 3,
    draws: 0,
    losses: 1,
    goalsFor: 19,
    goalsAgainst: 20,
    points: 9,
    last5: ['W', 'L', 'W', 'W'],
  },
  {
    name: '[Blanco] TR Technology',
    played: 4,
    wins: 2,
    draws: 0,
    losses: 2,
    goalsFor: 20,
    goalsAgainst: 10,
    points: 6,
    last5: ['L', 'W', 'L', 'W'],
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
