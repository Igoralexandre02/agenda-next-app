import {
  layout,
  media,
  radius,
  spacing,
  transition,
  typography,
  zIndex,
} from './tokens';

/**
 * Contrato de cores que todo tema precisa fornecer.
 * Componentes só consomem `theme.colors.*` — nunca cores literais.
 */
export interface ThemeColors {
  /** Fundo da aplicação (atrás dos cards). */
  background: string;
  /** Superfície de cards / inputs / barras. */
  surface: string;
  /** Superfície levemente destacada (ex: hover, seções internas). */
  surfaceMuted: string;
  /** Superfície elevada (menus, sheets, modais). */
  surfaceRaised: string;

  border: string;
  borderStrong: string;

  text: string;
  textMuted: string;
  textSubtle: string;
  /** Texto sobre fundos de cor forte (primary/accent). */
  textInverse: string;

  primary: string;
  primaryHover: string;
  primaryText: string;

  /** Cor de acento (brass) — destaque de horário, item ativo da navegação. */
  accent: string;
  accentSoft: string;
  accentText: string;

  focusRing: string;
  overlay: string;

  /** Cores por status de agendamento. */
  statusAgendadoBg: string;
  statusAgendadoText: string;
  statusFinalizadoBg: string;
  statusFinalizadoText: string;
  statusCanceladoBg: string;
  statusCanceladoText: string;

  /** Cores semânticas de feedback. */
  successBg: string;
  successText: string;
  successSolid: string;
  dangerBg: string;
  dangerText: string;
  dangerSolid: string;
  dangerSolidHover: string;
  warningBg: string;
  warningText: string;
  infoBg: string;
  infoText: string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
}

export interface AppTheme {
  /** Identificador do tema resolvido: 'light' | 'dark'. */
  name: 'light' | 'dark';
  colors: ThemeColors;
  shadows: ThemeShadows;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  media: typeof media;
  zIndex: typeof zIndex;
  layout: typeof layout;
  transition: typeof transition;
}

/** Base compartilhada — cada tema só precisa declarar `name`, `colors` e `shadows`. */
export const themeBase = {
  spacing,
  radius,
  typography,
  media,
  zIndex,
  layout,
  transition,
} as const;
