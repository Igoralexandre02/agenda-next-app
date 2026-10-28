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
    surfaceHover: '#f8f9fa',

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
    accentHover: '#8f5c14',
    accentSoft: '#fbf4ea',
    accentText: '#ffffff',

    focusRing: '#3b82f6',
    focusRingAlpha: 'rgba(59, 130, 246, 0.22)',
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
    sm: '0 1px 2px rgba(16, 24, 40, 0.05)',
    md: '0 4px 14px -2px rgba(16, 24, 40, 0.08), 0 2px 6px -1px rgba(16, 24, 40, 0.04)',
    lg: '0 14px 36px -4px rgba(16, 24, 40, 0.12), 0 4px 14px -2px rgba(16, 24, 40, 0.06)',
  },
};
