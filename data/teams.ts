export interface TeamRecord {
  id: string;
  name: string;
  color: string;
  players: string[];
}

export const teams: TeamRecord[] = [
  {
    id: 'team-corporates-hr',
    name: 'Corporates-HR',
    color: 'azul',
    players: ['player-1', 'player-2', 'player-3', 'player-4'],
  },
  {
    id: 'team-legal',
    name: 'Legal',
    color: 'negro',
    players: ['player-5', 'player-6', 'player-7', 'player-8'],
  },
  {
    id: 'team-taap',
    name: 'TAAP',
    color: 'verde',
    players: ['player-9', 'player-10', 'player-11', 'player-12'],
  },
  {
    id: 'team-operations-product',
    name: 'Operations-Product',
    color: 'amarillo',
    players: ['player-13', 'player-14', 'player-15', 'player-16'],
  },
  {
    id: 'team-technology',
    name: 'Technology',
    color: 'blanco',
    players: ['player-17', 'player-18', 'player-19', 'player-20'],
  },
];
