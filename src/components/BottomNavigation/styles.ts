import Link from 'next/link';
import styled from 'styled-components';

export const Nav = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.bottomNav};
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  height: calc(
    ${({ theme }) => theme.layout.bottomNavHeight} +
      env(safe-area-inset-bottom, 0px)
  );
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.media.tablet} {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    bottom: ${({ theme }) => theme.spacing.lg};
    width: min(520px, calc(100% - ${({ theme }) => theme.spacing.xl}));
    height: ${({ theme }) => theme.layout.bottomNavHeight};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.pill};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    padding-bottom: 0;
  }
`;

export const Item = styled(Link)<{ $active: boolean; $highlight?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  font-size: ${({ theme }) => theme.typography.size.xs};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textSubtle};
  transition: color ${({ theme }) => theme.transition.fast};

  svg {
    width: 24px;
    height: 24px;
    stroke-width: ${({ $active }) => ($active ? 2.2 : 1.8)};
    color: ${({ theme, $active }) =>
      $active ? theme.colors.accent : 'currentColor'};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const HighlightItem = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.typography.size.xs};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.textMuted};

  span.icon {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: ${({ theme }) => theme.radius.full};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryText};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  span.icon svg {
    width: 24px;
    height: 24px;
    color: currentColor;
  }
`;
