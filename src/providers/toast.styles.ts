import styled, { css, keyframes } from 'styled-components';
import type { ToastTipo } from './ToastProvider';

const entrar = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const ToastViewport = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(
    ${({ theme }) => theme.layout.bottomNavHeight} +
      ${({ theme }) => theme.spacing.lg} + env(safe-area-inset-bottom, 0px)
  );
  z-index: ${({ theme }) => theme.zIndex.toast};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  width: min(92vw, 420px);
  pointer-events: none;

  ${({ theme }) => theme.media.tablet} {
    bottom: calc(
      ${({ theme }) => theme.spacing.xl} + env(safe-area-inset-bottom, 0px)
    );
  }
`;

const cores = (tipo: ToastTipo) => css`
  ${({ theme }) => {
    const mapa = {
      success: {
        bg: theme.colors.surfaceRaised,
        fg: theme.colors.text,
        border: theme.colors.successSolid,
        icon: theme.colors.successSolid,
      },
      error: {
        bg: theme.colors.surfaceRaised,
        fg: theme.colors.text,
        border: theme.colors.dangerSolid,
        icon: theme.colors.dangerSolid,
      },
      info: {
        bg: theme.colors.surfaceRaised,
        fg: theme.colors.text,
        border: theme.colors.accent,
        icon: theme.colors.accent,
      },
    } as const;
    return css`
      background: ${mapa[tipo].bg};
      color: ${mapa[tipo].fg};
      border-left: 4px solid ${mapa[tipo].border};
      --toast-icon-color: ${mapa[tipo].icon};
    `;
  }}
`;

export const ToastItem = styled.div<{ $tipo: ToastTipo }>`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  animation: ${entrar} 200ms ${({ theme }) => theme.easing.out};
  transition:
    transform 100ms ${({ theme }) => theme.easing.out},
    opacity 150ms ease;

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }

  ${({ $tipo }) => cores($tipo)}
`;

export const ToastIcon = styled.span<{ $tipo: ToastTipo }>`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  color: var(--toast-icon-color);

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ToastMessage = styled.p`
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;
