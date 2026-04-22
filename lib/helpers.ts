export function getTeamColorEmoji(color: string): string {
  const normalizedColor = color.trim().toLowerCase();

  switch (normalizedColor) {
    case 'blue':
    case 'azul':
      return '🔵';
    case 'black':
    case 'negro':
      return '⚫';
    case 'red':
    case 'rojo':
      return '🔴';
    case 'green':
    case 'verde':
      return '🟢';
    case 'yellow':
    case 'amarillo':
      return '🟡';
    case 'white':
    case 'blanco':
      return '⚪';
    default:
      return '⚽';
  }
}

export function formatReadableDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}
