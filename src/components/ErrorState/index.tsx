'use client';

import styled from 'styled-components';

import { Button } from '@/src/components/Button';

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
  width: 64px;
  height: 64px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.dangerBg};
  color: ${({ theme }) => theme.colors.dangerText};
  font-size: 28px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
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
`;

const Action = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = 'Algo deu errado',
  description = 'Não foi possível concluir a operação. Tente novamente.',
  onRetry,
  retryLabel = 'Tentar novamente',
}: ErrorStateProps) {
  return (
    <Wrapper role="alert">
      <IconCircle aria-hidden>!</IconCircle>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {onRetry && (
        <Action>
          <Button variant="secondary" onClick={onRetry}>
            {retryLabel}
          </Button>
        </Action>
      )}
    </Wrapper>
  );
}
