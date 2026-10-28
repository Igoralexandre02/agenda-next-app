import styled from 'styled-components';

export const Grupo = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const GrupoHeader = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.layout.headerHeight};
  z-index: ${({ theme }) => theme.zIndex.base};
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  background: ${({ theme }) =>
    theme.name === 'dark'
      ? 'rgba(15, 17, 19, 0.88)'
      : 'rgba(245, 246, 248, 0.88)'};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

export const GrupoTitulo = styled.h2`
  font-size: ${({ theme }) => theme.typography.size.md};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

export const GrupoInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.colors.textSubtle};
`;

export const Lista = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;
