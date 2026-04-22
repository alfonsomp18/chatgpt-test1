export interface PlayerRecord {
  id: string;
  name: string;
  teamId: string;
  position: string;
  area: string;
}

export const players: PlayerRecord[] = [
  { id: 'player-1', name: 'Abraham Gallardo', teamId: 'team-corporates-hr', position: 'Delantero', area: 'Corporates' },
  { id: 'player-2', name: 'Armando Navarro', teamId: 'team-corporates-hr', position: 'Me acoplo', area: 'Corporates (Legal)' },
  { id: 'player-3', name: 'Rene Correa', teamId: 'team-corporates-hr', position: 'Defensa', area: 'Corporates (Legal)' },
  { id: 'player-4', name: 'Adrian Sanchez', teamId: 'team-corporates-hr', position: 'Delantero', area: 'HR' },
  { id: 'player-28', name: 'Jose Colin', teamId: 'team-corporates-hr', position: 'Delantero', area: 'Corporates' },
  { id: 'player-29', name: 'Farid Zavalza', teamId: 'team-corporates-hr', position: 'Medio', area: 'HR' },
  { id: 'player-30', name: 'Osvaldo Garcia', teamId: 'team-corporates-hr', position: 'Defensa/Delantero', area: 'HR' },
  { id: 'player-31', name: 'Sebastian Garcia', teamId: 'team-corporates-hr', position: 'Lateral/Extremo', area: 'Corporates' },
  { id: 'player-32', name: 'Irvin de la Rosa', teamId: 'team-corporates-hr', position: 'Portero', area: 'Corporates' },

  { id: 'player-24', name: 'Enrique Lira', teamId: 'team-technology', position: 'Portero', area: 'TR Technology' },
  { id: 'player-25', name: 'Erick Colin Cruz', teamId: 'team-technology', position: 'Defensa', area: 'TR Technology' },
  { id: 'player-26', name: 'Miguel Castilla', teamId: 'team-technology', position: 'Defensa', area: 'TR Technology' },
  { id: 'player-27', name: 'Daniel Montes', teamId: 'team-technology', position: 'Defensa', area: 'TR Technology' },
  { id: 'player-33', name: 'Sergio Huicochea', teamId: 'team-technology', position: 'Defensa', area: 'TR Technology' },
  { id: 'player-34', name: 'Alejandro Hernández', teamId: 'team-technology', position: 'Defensa', area: 'TR Technology' },
  { id: 'player-35', name: 'Carlos Olivares', teamId: 'team-technology', position: 'Medio', area: 'TR Technology' },
  { id: 'player-36', name: 'Demian Godinez', teamId: 'team-technology', position: 'Medio', area: 'TR Technology' },
  { id: 'player-46', name: 'Andres Doncel', teamId: 'team-technology', position: 'Delantero', area: 'TR Technology' },

  { id: 'player-9', name: 'Daniel Lago', teamId: 'team-taap', position: 'Defensa', area: 'TAAP' },
  { id: 'player-10', name: 'Ariel Castillo', teamId: 'team-taap', position: 'Portero', area: 'TAAP' },
  { id: 'player-11', name: 'Francisco Martinez', teamId: 'team-taap', position: 'Medio', area: 'TAAP' },
  { id: 'player-12', name: 'Alexis Lacierva', teamId: 'team-taap', position: 'Delantero', area: 'TAAP' },
  { id: 'player-37', name: 'Jose Joven', teamId: 'team-taap', position: 'Delantero', area: 'Corporates' },
  { id: 'player-38', name: 'Ordisi Pomar', teamId: 'team-taap', position: 'Defensa', area: 'TR Technology' },
  { id: 'player-39', name: 'Rodrigo BARRAGAN', teamId: 'team-taap', position: 'Defensa/lateral', area: 'Corporates' },
  { id: 'player-40', name: 'Josue PArtida', teamId: 'team-taap', position: 'Medio', area: 'TAAP' },

  { id: 'player-5', name: 'Omar Lopez', teamId: 'team-legal', position: 'Defensa', area: 'Legal SLF' },
  { id: 'player-6', name: 'Abraham Estrada', teamId: 'team-legal', position: '', area: 'Legal SLF' },
  { id: 'player-7', name: 'Tony Michel', teamId: 'team-legal', position: 'Portero', area: 'Legal SLF' },
  { id: 'player-8', name: 'Asdrubal Figueroa', teamId: 'team-legal', position: 'Defensa lateral/ saguero', area: 'Legal SLF' },
  { id: 'player-41', name: 'Edwin Avellaneda', teamId: 'team-legal', position: 'Defensa', area: 'Legal' },
  { id: 'player-42', name: 'Jared Perez', teamId: 'team-legal', position: 'Medio/Delantero', area: 'Legal SLF' },
  { id: 'player-43', name: 'Jack Tellez', teamId: 'team-legal', position: 'Defensa', area: 'Legal' },
  { id: 'player-44', name: 'Apolo Rivera', teamId: 'team-legal', position: 'Defensa', area: 'Legal SLF' },
  { id: 'player-45', name: 'Antonio Montero', teamId: 'team-legal', position: 'Medio/Delantero', area: 'Legal SLF' },

  { id: 'player-13', name: 'Raul Cornejo', teamId: 'team-operations-product', position: 'Delantero', area: 'Delantero' },
  { id: 'player-14', name: 'Marco Antonio Cruz', teamId: 'team-operations-product', position: 'Mediocampista', area: 'Mediocampista' },
  { id: 'player-15', name: 'Luis Alfonso Martinez', teamId: 'team-operations-product', position: 'Defensa', area: 'Defensa' },
  { id: 'player-16', name: 'Emiliano Dominguez', teamId: 'team-operations-product', position: 'Portero', area: 'Portero' },
  { id: 'player-17', name: 'Fernando Juarez', teamId: 'team-operations-product', position: 'Mediocampista', area: 'Mediocampista' },
  { id: 'player-18', name: 'Ulises Tranquilino', teamId: 'team-operations-product', position: 'Defensa', area: 'Defensa' },
  { id: 'player-19', name: 'Stive Trujano', teamId: 'team-operations-product', position: 'Delantero', area: 'Delantero' },
  { id: 'player-20', name: 'Carlos Montero', teamId: 'team-operations-product', position: 'Mediocampista', area: 'Mediocampista' },
  { id: 'player-21', name: 'Pepe Portas', teamId: 'team-operations-product', position: 'Defensa', area: 'Defensa' },
  { id: 'player-22', name: 'Cristian Radilla', teamId: 'team-operations-product', position: 'Delantero', area: 'Delantero' },
  { id: 'player-23', name: 'Erik Avila', teamId: 'team-operations-product', position: 'Portero', area: 'Portero' },
];
