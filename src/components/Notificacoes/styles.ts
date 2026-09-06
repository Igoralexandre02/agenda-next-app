'use client';

import styled from 'styled-components';

import { ChevronDownIcon } from '@/src/components/icons';

export const SinoWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

export const SinoButton = styled.button`
  position: relative;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;

  display: grid;
  place-items: center;

  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.dangerSolid};
  color: #fff;

  font-size: 11px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  line-height: 1;
`;

export const Lista = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Item = styled.li<{ $naoLida: boolean }>`
  display: flex;
  flex-direction: column;

  border: 1px solid
    ${({ theme, $naoLida }) =>
      $naoLida ? theme.colors.accent : theme.colors.border};

  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme, $naoLida }) =>
    $naoLida ? theme.colors.accentSoft : theme.colors.surface};

  overflow: hidden;

  transition:
    background ${({ theme }) => theme.transition.fast},
    border-color ${({ theme }) => theme.transition.fast};
`;

export const ItemBotao = styled.button`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};

  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: -2px;
  }
`;

export const ItemTopo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TipoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`;

export const Tipo = styled.span`
  font-size: ${({ theme }) => theme.typography.size.xs};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

export const PontoNaoLida = styled.span`
  width: 8px;
  height: 8px;

  flex-shrink: 0;

  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.accent};
`;

export const ChevronIcon = styled(ChevronDownIcon)<{
  $aberto: boolean;
}>`
  flex-shrink: 0;

  color: ${({ theme }) => theme.colors.textMuted};

  transition: transform 220ms ease;

  transform: rotate(${({ $aberto }) => ($aberto ? '180deg' : '0deg')});
`;

export const Nome = styled.strong`
  font-size: ${({ theme }) => theme.typography.size.md};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

export const LinhaInfo = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ConteudoCollapse = styled.div<{
  $aberto: boolean;
}>`
  display: grid;

  grid-template-rows: ${({ $aberto }) => ($aberto ? '1fr' : '0fr')};

  transition: grid-template-rows 220ms ease;

  > div {
    min-height: 0;
    overflow: hidden;
  }
`;

export const ConteudoInterno = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  padding: 0 ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.lg};
`;

export const Detalhes = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};

  padding-top: ${({ theme }) => theme.spacing.sm};

  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Detalhe = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.colors.textSubtle};
`;

export const Valor = styled.span`
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const MensagemRemovido = styled.p`
  margin: 0;

  padding-top: ${({ theme }) => theme.spacing.sm};

  border-top: 1px solid ${({ theme }) => theme.colors.border};

  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;
