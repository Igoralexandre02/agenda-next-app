import styled, { css } from 'styled-components';

export const FieldRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const FieldLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const FieldHint = styled.p`
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.colors.textSubtle};
`;

export const FieldError = styled.p`
  font-size: ${({ theme }) => theme.typography.size.xs};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.dangerText};
`;

/** Estilo base compartilhado por Input, Select, DateField e TimeField. */
export const controlCss = css<{ $invalid?: boolean }>`
  width: 100%;
  min-height: 48px;
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid
    ${({ theme, $invalid }) =>
      $invalid ? theme.colors.dangerSolid : theme.colors.borderStrong};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px; /* >=16px evita zoom automático no iOS */
  line-height: 1.2;
  transition:
    border-color ${({ theme }) => theme.transition.fast},
    box-shadow ${({ theme }) => theme.transition.fast};
  appearance: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, $invalid }) =>
      $invalid ? theme.colors.dangerSolid : theme.colors.text};
    box-shadow: 0 0 0 3px
      ${({ theme, $invalid }) =>
        $invalid ? theme.colors.dangerBg : theme.colors.focusRing + '33'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
