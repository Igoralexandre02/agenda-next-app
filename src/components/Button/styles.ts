import styled, { css, keyframes } from 'styled-components';

export type ButtonVariant =
  'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryText};
    border-color: ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
      border-color: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.borderStrong};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceMuted};
      border-color: ${({ theme }) => theme.colors.textSubtle};
    }
  `,
  accent: css`
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentText};
    border-color: ${({ theme }) => theme.colors.accent};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.accentHover};
      border-color: ${({ theme }) => theme.colors.accentHover};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textMuted};
    border-color: transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceMuted};
      color: ${({ theme }) => theme.colors.text};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.dangerSolid};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.dangerSolid};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.dangerSolidHover};
      border-color: ${({ theme }) => theme.colors.dangerSolidHover};
    }
  `,
} as const;

const sizes = {
  sm: css`
    min-height: 36px;
    padding: 0 ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.size.xs};
    border-radius: ${({ theme }) => theme.radius.sm};
  `,
  md: css`
    min-height: 44px;
    padding: 0 ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.size.sm};
    border-radius: ${({ theme }) => theme.radius.md};
  `,
  lg: css`
    min-height: 50px;
    padding: 0 ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.typography.size.md};
    border-radius: ${({ theme }) => theme.radius.md};
  `,
} as const;

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: 1px solid transparent;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  transition:
    transform 100ms ${({ theme }) => theme.easing.out},
    background 120ms ease,
    border-color 120ms ease,
    box-shadow 120ms ease,
    opacity 120ms ease;

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  ${({ $size }) => sizes[$size]}
  ${({ $variant }) => variants[$variant]}
`;

export const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;
