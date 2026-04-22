export interface TeamRecord {
  id: string;
  name: string;
  color: string;
  players: string[];
}

export const teams: TeamRecord[] = [
  {
    id: 'team-corporates-hr',
    name: 'Corporates HR',
    color: 'rojo',
    players: ['player-1', 'player-2', 'player-3', 'player-4', 'player-28', 'player-29', 'player-30', 'player-31', 'player-32'],
  },
  {
    id: 'team-legal',
    name: 'Legal',
    color: 'azul',
    players: ['player-5', 'player-6', 'player-7', 'player-8', 'player-41', 'player-42', 'player-43', 'player-44', 'player-45'],
  },
  {
    id: 'team-taap',
    name: 'TAAP/Comercial',
    color: 'verde',
    players: ['player-9', 'player-10', 'player-11', 'player-12', 'player-37', 'player-38', 'player-39', 'player-40'],
  },
  {
    id: 'team-operations-product',
    name: 'Operations/Product',
    color: 'amarillo',
    players: [
      'player-13',
      'player-14',
      'player-15',
      'player-16',
      'player-17',
      'player-18',
      'player-19',
      'player-20',
      'player-21',
      'player-22',
      'player-23',
    ],
  },
  {
    id: 'team-technology',
    name: 'Technology',
    color: 'blanco',
    players: ['player-24', 'player-25', 'player-26', 'player-27', 'player-33', 'player-34', 'player-35', 'player-36', 'player-46'],
  },
];
