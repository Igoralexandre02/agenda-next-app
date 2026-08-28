import type { AppTheme } from '../theme';
import { themeBase } from '../theme';

export const lightTheme: AppTheme = {
  ...themeBase,
  name: 'light',
  colors: {
    background: '#f5f6f8',
    surface: '#ffffff',
    surfaceMuted: '#eef0f3',
    surfaceRaised: '#ffffff',

    border: '#e3e6ea',
    borderStrong: '#cfd4da',

    text: '#16191d',
    textMuted: '#59616d',
    textSubtle: '#8a929e',
    textInverse: '#ffffff',

    primary: '#16191d',
    primaryHover: '#2c313a',
    primaryText: '#ffffff',

    accent: '#a86f1c',
    accentSoft: '#f4e9d6',
    accentText: '#ffffff',

    focusRing: '#3b82f6',
    overlay: 'rgba(15, 18, 22, 0.45)',

    statusAgendadoBg: '#e7f0fe',
    statusAgendadoText: '#1a4fb0',
    statusFinalizadoBg: '#e6f5ec',
    statusFinalizadoText: '#1a7f3c',
    statusCanceladoBg: '#fdece9',
    statusCanceladoText: '#bd352a',

    successBg: '#e6f5ec',
    successText: '#1a7f3c',
    successSolid: '#1a7f3c',
    dangerBg: '#fdece9',
    dangerText: '#bd352a',
    dangerSolid: '#c53a2e',
    dangerSolidHover: '#a82f25',
    warningBg: '#fbefdb',
    warningText: '#96660f',
    infoBg: '#e7f0fe',
    infoText: '#1a4fb0',
  },
  shadows: {
    sm: '0 1px 2px rgba(16, 24, 40, 0.06)',
    md: '0 4px 14px rgba(16, 24, 40, 0.08)',
    lg: '0 16px 40px rgba(16, 24, 40, 0.16)',
  },
};
