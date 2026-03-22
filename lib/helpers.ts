export const jornadaDates: Record<number, string> = {
  1: '2023-01-29',
  2: '2026-03-05',
  3: '2026-04-23',
};

export function getTeamColorEmoji(color: string): string {
  const normalizedColor = color.trim().toLowerCase();

  switch (normalizedColor) {
    case 'blue':
    case 'azul':
      return '🔵';
    case 'black':
    case 'negro':
      return '⚫';
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
