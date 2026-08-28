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
    accentSoft: '#332a1c',
    accentText: '#16191d',

    focusRing: '#6aa2ff',
    overlay: 'rgba(0, 0, 0, 0.62)',

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
    sm: '0 1px 2px rgba(0, 0, 0, 0.4)',
    md: '0 4px 16px rgba(0, 0, 0, 0.46)',
    lg: '0 18px 44px rgba(0, 0, 0, 0.6)',
  },
};
