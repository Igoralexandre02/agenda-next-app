'use client';

import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.45; }
  100% { opacity: 1; }
`;

export const Skeleton = styled.div<{
  $width?: string;
  $height?: string;
  $radius?: string;
}>`
  width: ${({ $width = '100%' }) => $width};
  height: ${({ $height = '16px' }) => $height};
  border-radius: ${({ $radius, theme }) => $radius ?? theme.radius.sm};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  animation: ${pulse} 1.4s ease-in-out infinite;
`;

const CardShell = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`;

/** Placeholder com o formato de um AppointmentCard. */
export function AppointmentCardSkeleton() {
  return (
    <CardShell aria-hidden>
      <Skeleton $width="52px" $height="44px" />
      <CardBody>
        <Skeleton $width="60%" $height="18px" />
        <Skeleton $width="40%" $height="14px" />
        <Skeleton $width="30%" $height="20px" $radius="999px" />
      </CardBody>
    </CardShell>
  );
}

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export function AppointmentListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <ListWrapper>
      {Array.from({ length: rows }).map((_, i) => (
        <AppointmentCardSkeleton key={i} />
      ))}
    </ListWrapper>
  );
}
