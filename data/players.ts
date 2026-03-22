export interface PlayerRecord {
  id: string;
  name: string;
  teamId: string;
  area: string;
}

export const players: PlayerRecord[] = [
  { id: 'player-1', name: 'Alonso Ruiz', teamId: 'team-azul', area: 'Finance' },
  { id: 'player-2', name: 'Bruno Diaz', teamId: 'team-azul', area: 'Operations' },
  { id: 'player-3', name: 'Carlos Mena', teamId: 'team-azul', area: 'Sales' },
  { id: 'player-4', name: 'Diego Soto', teamId: 'team-azul', area: 'People' },
  { id: 'player-5', name: 'Erick Mora', teamId: 'team-blanco', area: 'Technology' },
  { id: 'player-6', name: 'Fabian Leon', teamId: 'team-blanco', area: 'Product' },
  { id: 'player-7', name: 'Gael Ramos', teamId: 'team-blanco', area: 'IT Support' },
  { id: 'player-8', name: 'Hector Cruz', teamId: 'team-blanco', area: 'Legal Ops' },
  { id: 'player-9', name: 'Ivan Perez', teamId: 'team-negro', area: 'Legal' },
  { id: 'player-10', name: 'Julio Vega', teamId: 'team-negro', area: 'Compliance' },
  { id: 'player-11', name: 'Kevin Lara', teamId: 'team-negro', area: 'Audit' },
  { id: 'player-12', name: 'Luis Neri', teamId: 'team-negro', area: 'Security' },
  { id: 'player-13', name: 'Marco Silva', teamId: 'team-verde', area: 'Marketing' },
  { id: 'player-14', name: 'Nestor Gil', teamId: 'team-verde', area: 'Design' },
  { id: 'player-15', name: 'Oscar Luna', teamId: 'team-verde', area: 'Growth' },
  { id: 'player-16', name: 'Pablo Rios', teamId: 'team-verde', area: 'Communications' },
];
