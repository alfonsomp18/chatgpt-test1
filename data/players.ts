export interface PlayerRecord {
  id: string;
  name: string;
  teamId: string;
  area: string;
}

export const players: PlayerRecord[] = [
  { id: 'player-1', name: 'Alonso Ruiz', teamId: 'team-corporates-hr', area: 'Finance' },
  { id: 'player-2', name: 'Bruno Diaz', teamId: 'team-corporates-hr', area: 'Operations' },
  { id: 'player-3', name: 'Carlos Mena', teamId: 'team-corporates-hr', area: 'Sales' },
  { id: 'player-4', name: 'Diego Soto', teamId: 'team-corporates-hr', area: 'People' },
  { id: 'player-5', name: 'Erick Mora', teamId: 'team-legal', area: 'Legal' },
  { id: 'player-6', name: 'Fabian Leon', teamId: 'team-legal', area: 'Compliance' },
  { id: 'player-7', name: 'Gael Ramos', teamId: 'team-legal', area: 'Risk' },
  { id: 'player-8', name: 'Hector Cruz', teamId: 'team-legal', area: 'Contracts' },
  { id: 'player-9', name: 'Ivan Perez', teamId: 'team-taap', area: 'TAAP Ops' },
  { id: 'player-10', name: 'Julio Vega', teamId: 'team-taap', area: 'TAAP Growth' },
  { id: 'player-11', name: 'Kevin Lara', teamId: 'team-taap', area: 'TAAP Delivery' },
  { id: 'player-12', name: 'Luis Neri', teamId: 'team-taap', area: 'TAAP Strategy' },
  { id: 'player-13', name: 'Marco Silva', teamId: 'team-operations-product', area: 'Operations' },
  { id: 'player-14', name: 'Nestor Gil', teamId: 'team-operations-product', area: 'Product' },
  { id: 'player-15', name: 'Oscar Luna', teamId: 'team-operations-product', area: 'Program Management' },
  { id: 'player-16', name: 'Pablo Rios', teamId: 'team-operations-product', area: 'Delivery' },
  { id: 'player-17', name: 'Quetzal Mora', teamId: 'team-technology', area: 'Engineering' },
  { id: 'player-18', name: 'Ramon Gil', teamId: 'team-technology', area: 'Infrastructure' },
  { id: 'player-19', name: 'Sergio Peña', teamId: 'team-technology', area: 'Data' },
  { id: 'player-20', name: 'Tomas Ibarra', teamId: 'team-technology', area: 'Security' },
];
