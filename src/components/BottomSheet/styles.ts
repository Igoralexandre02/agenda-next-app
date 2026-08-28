import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: ${({ theme }) => theme.colors.overlay};
  animation: ${fade} ${({ theme }) => theme.transition.fast};

  ${({ theme }) => theme.media.tablet} {
    align-items: center;
  }
`;

export const Sheet = styled.div`
  width: 100%;
  max-width: 520px;
  max-height: 88dvh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border-top-left-radius: ${({ theme }) => theme.radius.xl};
  border-top-right-radius: ${({ theme }) => theme.radius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${slideUp} ${({ theme }) => theme.transition.base};
  padding-bottom: env(safe-area-inset-bottom, 0px);

  ${({ theme }) => theme.media.tablet} {
    border-radius: ${({ theme }) => theme.radius.lg};
    margin: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Grabber = styled.div`
  flex-shrink: 0;
  align-self: center;
  width: 40px;
  height: 4px;
  margin: ${({ theme }) => theme.spacing.sm} 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.borderStrong};

  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

export const Head = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const HeadTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

export const CloseButton = styled.button`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.full};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 20px;
  line-height: 1;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const Footer = styled.footer`
  flex-shrink: 0;
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  & > * {
    flex: 1;
  }
`;
