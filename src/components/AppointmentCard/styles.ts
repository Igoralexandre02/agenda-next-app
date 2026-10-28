import styled, { css } from 'styled-components';

import type { Status } from '@/src/types/status';

const acentoStatus = {
  agendado: css`
    color: ${({ theme }) => theme.colors.accent};
  `,
  finalizado: css`
    color: ${({ theme }) => theme.colors.textSubtle};
  `,
  cancelado: css`
    color: ${({ theme }) => theme.colors.textSubtle};
    text-decoration: line-through;
  `,
} as const;

type StatusNome = keyof typeof acentoStatus;

function normalizarStatus(status: Status | null): StatusNome | null {
  const nome = status?.nome?.toLowerCase();

  if (nome === 'agendado') return 'agendado';
  if (nome === 'finalizado') return 'finalizado';
  if (nome === 'cancelado') return 'cancelado';

  return null;
}

export const Card = styled.button<{ $status: Status | null }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  touch-action: manipulation;
  user-select: none;
  cursor: pointer;
  transition:
    border-color 140ms ease,
    background-color 140ms ease,
    transform 100ms ${({ theme }) => theme.easing.out},
    box-shadow 140ms ease;

  opacity: ${({ $status }) =>
    $status?.nome?.toLowerCase() === 'cancelado' ? 0.68 : 1};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
    background: ${({ theme }) => theme.colors.surfaceHover};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active {
    transform: scale(0.985);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`;

export const TimeColumn = styled.div<{ $status: Status | null }>`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 62px;
  padding-right: ${({ theme }) => theme.spacing.md};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Time = styled.span<{ $status: Status | null }>`
  font-size: ${({ theme }) => theme.typography.size.xl};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  line-height: 1;
  letter-spacing: -0.02em;

  ${({ $status }) => {
    const status = normalizarStatus($status);

    return status ? acentoStatus[status] : undefined;
  }}
`;

export const Body = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Name = styled.span`
  font-size: ${({ theme }) => theme.typography.size.md};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Phone = styled.span`
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

export const BadgeRow = styled.div`
  margin-top: 2px;
`;

export const ArrowSlot = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSubtle};
  transition:
    transform 120ms ease,
    color 120ms ease;

  svg {
    width: 18px;
    height: 18px;
  }

  ${Card}:hover & {
    color: ${({ theme }) => theme.colors.text};
    transform: translateX(2px);
  }
`;
