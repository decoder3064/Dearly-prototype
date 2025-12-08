// Avatar color mapping to ensure consistent colors
export const avatarColorMap: Record<string, string> = {
  'bg-sage-300': '#a8c4b3',
  'bg-sage-400': '#7fa28f',
  'bg-ink-300': '#9db4c8',
  'bg-ink-400': '#6b8aa5',
  'bg-rose-300': '#d4b3bd',
  'bg-rose-400': '#b98d9a',
  'bg-aubergine-300': '#b8a8b8',
  'bg-aubergine-400': '#927d92',
  'bg-forest-400': '#6d9479',
  'bg-taupe-400': '#a8a095',
};

export function getAvatarColor(colorClass: string): string {
  return avatarColorMap[colorClass] || '#a8c4b3'; // fallback to sage-300
}
