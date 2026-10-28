import type { AppTheme } from '../theme';
import { themeBase } from '../theme';

export const darkTheme: AppTheme = {
  ...themeBase,
  name: 'dark',
  colors: {
    background: '#0f1113',
    surface: '#191c1f',
    surfaceMuted: '#22262a',
    surfaceRaised: '#1f2327',
    surfaceHover: '#23272c',

    border: '#2c3136',
    borderStrong: '#3d434a',

    text: '#f1f3f6',
    textMuted: '#a8b0bc',
    textSubtle: '#79828f',
    textInverse: '#16191d',

    primary: '#f4f5f7',
    primaryHover: '#e0e2e6',
    primaryText: '#16191d',

    accent: '#d8a24a',
    accentHover: '#edb558',
    accentSoft: '#2d2417',
    accentText: '#16191d',

    focusRing: '#6aa2ff',
    focusRingAlpha: 'rgba(106, 162, 255, 0.28)',
    overlay: 'rgba(0, 0, 0, 0.65)',

    statusAgendadoBg: '#1b2b41',
    statusAgendadoText: '#9dc3f7',
    statusFinalizadoBg: '#16301f',
    statusFinalizadoText: '#8fe0a6',
    statusCanceladoBg: '#3a1f1c',
    statusCanceladoText: '#f4a79d',

    successBg: '#16301f',
    successText: '#8fe0a6',
    successSolid: '#2fa25a',
    dangerBg: '#3a1f1c',
    dangerText: '#f4a79d',
    dangerSolid: '#e0503f',
    dangerSolidHover: '#c8412f',
    warningBg: '#352a17',
    warningText: '#eec478',
    infoBg: '#1b2b41',
    infoText: '#9dc3f7',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.35)',
    md: '0 4px 16px -2px rgba(0, 0, 0, 0.45), 0 2px 6px -1px rgba(0, 0, 0, 0.25)',
    lg: '0 16px 40px -4px rgba(0, 0, 0, 0.65), 0 4px 16px -2px rgba(0, 0, 0, 0.35)',
  },
};
