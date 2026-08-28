import styled, { css, keyframes } from 'styled-components';
import type { ToastTipo } from './ToastProvider';

const entrar = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
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
        bg: theme.colors.successBg,
        fg: theme.colors.successText,
      },
      error: {
        bg: theme.colors.dangerBg,
        fg: theme.colors.dangerText,
      },
      info: {
        bg: theme.colors.infoBg,
        fg: theme.colors.infoText,
      },
    } as const;
    return css`
      background: ${mapa[tipo].bg};
      color: ${mapa[tipo].fg};
    `;
  }}
`;

export const ToastItem = styled.div<{ $tipo: ToastTipo }>`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  cursor: pointer;
  animation: ${entrar} ${({ theme }) => theme.transition.base};
  ${({ $tipo }) => cores($tipo)}
`;

export const ToastIcon = styled.span<{ $tipo: ToastTipo }>`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  background: currentColor;

  /* o glifo herda a cor de fundo do item para contraste */
  color: ${({ theme, $tipo }) =>
    $tipo === 'success'
      ? theme.colors.successBg
      : $tipo === 'error'
        ? theme.colors.dangerBg
        : theme.colors.infoBg};
`;

export const ToastMessage = styled.p`
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;
