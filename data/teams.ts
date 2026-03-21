export interface TeamRecord {
  id: string;
  name: string;
  players: string[];
}

export const teams: TeamRecord[] = [
  {
    id: 'team-azul',
    name: 'Equipo Azul',
    players: ['player-1', 'player-2', 'player-3', 'player-4'],
  },
  {
    id: 'team-blanco',
    name: 'Equipo Blanco',
    players: ['player-5', 'player-6', 'player-7', 'player-8'],
  },
  {
    id: 'team-negro',
    name: 'Equipo Negro',
    players: ['player-9', 'player-10', 'player-11', 'player-12'],
  },
  {
    id: 'team-verde',
    name: 'Equipo Verde',
    players: ['player-13', 'player-14', 'player-15', 'player-16'],
  },
];
