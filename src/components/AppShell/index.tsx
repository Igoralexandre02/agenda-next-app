'use client';

import styled from 'styled-components';

import { BottomNavigation } from '@/src/components/BottomNavigation';

const Viewport = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.desktop} {
    max-width: ${({ theme }) => theme.layout.wideMaxWidth};
  }
`;

/**
 * Casca das telas do painel: área de conteúdo centralizada + navegação inferior
 * fixa. Cada tela renderiza seu próprio `<Header>` (sticky) e envolve o corpo
 * em `<PageBody>`.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Viewport>
      <Content>{children}</Content>
      <BottomNavigation />
    </Viewport>
  );
}

/** Corpo rolável de uma tela, com respiro para a bottom navigation. */
export const PageBody = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  padding-bottom: calc(
    ${({ theme }) => theme.layout.bottomNavHeight} +
      ${({ theme }) => theme.spacing.xl} + env(safe-area-inset-bottom, 0px)
  );

  ${({ theme }) => theme.media.desktop} {
    padding-top: ${({ theme }) => theme.spacing.xl};
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;
