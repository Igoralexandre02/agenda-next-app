'use client';

import styled from 'styled-components';

export const Grupo = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const GrupoTitulo = styled.h2`
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

export const OpcaoTema = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Radios = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const RadioLinha = styled.label<{ $ativo: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid
    ${({ theme, $ativo }) =>
      $ativo ? theme.colors.accent : theme.colors.border};
  background: ${({ theme, $ativo }) =>
    $ativo ? theme.colors.accentSoft : 'transparent'};
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  transition:
    border-color 140ms ease,
    background-color 140ms ease,
    transform 100ms ${({ theme }) => theme.easing.out};

  &:hover {
    border-color: ${({ theme, $ativo }) =>
      $ativo ? theme.colors.accent : theme.colors.borderStrong};
  }

  &:active {
    transform: scale(0.985);
  }

  input {
    accent-color: ${({ theme }) => theme.colors.accent};
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

export const RadioIcon = styled.div<{ $ativo: boolean }>`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme, $ativo }) =>
    $ativo ? theme.colors.accentSoft : theme.colors.surfaceMuted};
  color: ${({ theme, $ativo }) =>
    $ativo ? theme.colors.accent : theme.colors.textMuted};

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const RadioTexto = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RadioTitulo = styled.span`
  font-size: ${({ theme }) => theme.typography.size.md};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const RadioDescricao = styled.span`
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Info = styled.p`
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

export const Rodape = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.colors.textSubtle};
`;

export const ContaConteudo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ContaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
`;

export const ContaDescricao = styled.span`
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ContaAcao = styled.div`
  flex-shrink: 0;

  @media (max-width: 640px) {
    width: 100%;

    button {
      width: 100%;
    }
  }
`;
