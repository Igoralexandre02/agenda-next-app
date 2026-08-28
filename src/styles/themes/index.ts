import type { AppTheme } from '../theme';
import { darkTheme } from './dark';
import { lightTheme } from './light';

/**
 * Registro de temas disponíveis.
 * Para adicionar um tema novo no futuro, basta criar `themes/<nome>.ts`
 * e registrá-lo aqui.
 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
} satisfies Record<string, AppTheme>;

/** Temas concretos aplicáveis. */
export type ThemeName = keyof typeof themes;

/** Preferência escolhida pelo usuário (inclui "seguir o sistema"). */
export type ThemePreference = ThemeName | 'system';

export { lightTheme, darkTheme };
