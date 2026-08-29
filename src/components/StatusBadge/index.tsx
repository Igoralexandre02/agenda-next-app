'use client';

import styled, { css } from 'styled-components';

type Size = 'sm' | 'md';

const paleta = {
  agendado: css`
    background: ${({ theme }) => theme.colors.statusAgendadoBg};
    color: ${({ theme }) => theme.colors.statusAgendadoText};
  `,
  finalizado: css`
    background: ${({ theme }) => theme.colors.statusFinalizadoBg};
    color: ${({ theme }) => theme.colors.statusFinalizadoText};
  `,
  cancelado: css`
    background: ${({ theme }) => theme.colors.statusCanceladoBg};
    color: ${({ theme }) => theme.colors.statusCanceladoText};
  `,
} as const;

type ChaveStatus = keyof typeof paleta;

function normalizarStatus(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
}

const Badge = styled.span<{
  $status: ChaveStatus;
  $size: Size;
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  white-space: nowrap;

  ${({ $size, theme }) =>
    $size === 'sm'
      ? css`
          padding: 3px 8px;
          font-size: ${theme.typography.size.xs};
        `
      : css`
          padding: 5px 12px;
          font-size: ${theme.typography.size.sm};
        `}

  ${({ $status }) => paleta[$status]}

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

export interface StatusBadgeProps {
  status?: string;
  size?: Size;
}

export function StatusBadge({
  status = 'Agendado',
  size = 'md',
}: StatusBadgeProps) {
  const chaveStatus = normalizarStatus(status);

  const statusValido = (
    chaveStatus in paleta
      ? chaveStatus
      : 'agendado'
  ) as ChaveStatus;

  return (
    <Badge
      $status={statusValido}
      $size={size}
    >
      {status}
    </Badge>
  );
}