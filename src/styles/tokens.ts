/**
 * Design tokens compartilhados entre todos os temas.
 * Valores que NÃO mudam entre claro/escuro (espaçamento, tipografia, raio, etc.).
 * Cores ficam em `themes/*` porque variam por tema.
 */

export const spacing = {
  none: '0',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
  '4xl': '64px',
} as const;

export const radius = {
  sm: '6px',
  md: '10px',
  lg: '16px',
  xl: '24px',
  pill: '999px',
  full: '50%',
} as const;

export const typography = {
  fontFamily:
    "var(--font-geist-sans), system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  fontFamilyMono:
    'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace',
  size: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '22px',
    '2xl': '28px',
    '3xl': '34px',
    '4xl': '40px',
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.65,
  },
} as const;

export const breakpoints = {
  tablet: '768px',
  desktop: '1024px',
} as const;

export const media = {
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
} as const;

export const zIndex = {
  base: 1,
  header: 100,
  bottomNav: 100,
  overlay: 900,
  modal: 1000,
  toast: 1100,
} as const;

export const layout = {
  /** Largura máxima do conteúdo principal em telas grandes. */
  contentMaxWidth: '640px',
  /** Largura máxima em desktop para telas com mais respiro. */
  wideMaxWidth: '960px',
  /** Altura da bottom navigation (usada como padding-bottom do conteúdo). */
  bottomNavHeight: '64px',
  /** Altura do header fixo. */
  headerHeight: '56px',
} as const;

export const transition = {
  fast: '120ms ease',
  base: '200ms ease',
  slow: '320ms ease',
} as const;
