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
  display: flex;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition:
    border-color ${({ theme }) => theme.transition.fast},
    transform ${({ theme }) => theme.transition.fast},
    box-shadow ${({ theme }) => theme.transition.fast};

  opacity: ${({ $status }) =>
    $status?.nome?.toLowerCase() === 'cancelado' ? 0.72 : 1};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:active {
    transform: scale(0.99);
  }
`;

export const TimeColumn = styled.div<{ $status: Status | null }>`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 58px;
  padding-right: ${({ theme }) => theme.spacing.lg};
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
  margin-top: ${({ theme }) => theme.spacing.xs};
`;