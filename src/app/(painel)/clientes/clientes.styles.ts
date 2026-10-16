'use client';

import styled from 'styled-components';

export const Toolbar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

export const SearchWrap = styled.div`
  position: relative;
  flex: 1;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colors.textSubtle};
    pointer-events: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  min-height: 44px;
  padding: 0 14px 0 38px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.text};
  }
`;

export const ResumoContador = styled.p`
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Lista = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ClienteCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition:
    border-color ${({ theme }) => theme.transition.fast},
    box-shadow ${({ theme }) => theme.transition.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  flex: 1;
`;

export const Nome = styled.span`
  font-size: ${({ theme }) => theme.typography.size.md};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TelefoneLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  width: fit-content;

  svg {
    width: 14px;
    height: 14px;
    color: ${({ theme }) => theme.colors.accent};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const TelefoneText = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const Acoes = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-shrink: 0;
`;

export const ActionButton = styled.button<{ $danger?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.dangerText : theme.colors.textMuted};
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.transition.fast},
    background-color ${({ theme }) => theme.transition.fast},
    border-color ${({ theme }) => theme.transition.fast};

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: ${({ theme, $danger }) =>
      $danger ? theme.colors.dangerText : theme.colors.text};
    background: ${({ theme, $danger }) =>
      $danger ? theme.colors.dangerBg : theme.colors.surfaceRaised};
    border-color: ${({ theme, $danger }) =>
      $danger ? theme.colors.dangerText : theme.colors.borderStrong};
  }
`;
