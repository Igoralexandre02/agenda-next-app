import styled from 'styled-components';

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: ${({ theme }) => theme.layout.headerHeight};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  padding-top: calc(
    ${({ theme }) => theme.spacing.sm} + env(safe-area-inset-top, 0px)
  );
  background: ${({ theme }) =>
    theme.name === 'dark'
      ? 'rgba(25, 28, 31, 0.88)'
      : 'rgba(255, 255, 255, 0.88)'};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Slot = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-shrink: 0;
  min-width: 40px;

  &:last-child {
    justify-content: flex-end;
  }
`;

export const TitleBox = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const IconBtn = styled.button`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};
  color: ${({ theme }) => theme.colors.text};
  touch-action: manipulation;
  transition:
    background-color 120ms ease,
    transform 100ms ${({ theme }) => theme.easing.out};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }

  &:active {
    transform: scale(0.92);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`;
