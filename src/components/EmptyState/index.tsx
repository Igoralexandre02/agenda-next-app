'use client';

import styled from 'styled-components';
import { CalendarIcon } from '@/src/components/Icons';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing['3xl']}
    ${({ theme }) => theme.spacing.lg};
`;

const IconCircle = styled.div`
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};

  svg {
    width: 26px;
    height: 26px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  max-width: 320px;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const Action = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <Wrapper>
      <IconCircle aria-hidden>{icon ?? <CalendarIcon />}</IconCircle>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {action && <Action>{action}</Action>}
    </Wrapper>
  );
}
