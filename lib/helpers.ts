export function getTeamColorEmoji(color: string): string {
  const normalizedColor = color.trim().toLowerCase();

  switch (normalizedColor) {
    case 'red':
    case 'rojo':
      return '🔴';
    case 'blue':
    case 'azul':
      return '🔵';
    case 'green':
    case 'verde':
      return '🟢';
    case 'yellow':
    case 'amarillo':
      return '🟡';
    case 'black':
    case 'negro':
      return '⚫';
    case 'white':
    case 'blanco':
      return '⚪';
    default:
      return '⚽';
  }
}
