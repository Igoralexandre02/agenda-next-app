'use client';

import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.span<{ $size?: number }>`
  display: inline-block;
  width: ${({ $size = 24 }) => $size}px;
  height: ${({ $size = 24 }) => $size}px;
  border: ${({ $size = 24 }) => Math.max(2, Math.round($size / 10))}px solid
    ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing['3xl']}
    ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

export interface LoadingProps {
  label?: string;
}

/** Estado de carregamento centralizado para telas inteiras. */
export function Loading({ label = 'Carregando…' }: LoadingProps) {
  return (
    <Wrapper role="status" aria-live="polite">
      <Spinner $size={32} aria-hidden />
      <span>{label}</span>
    </Wrapper>
  );
}
