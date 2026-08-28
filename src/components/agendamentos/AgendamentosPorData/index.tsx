'use client';

import styled from 'styled-components';

import { AppointmentCard } from '@/src/components/AppointmentCard';
import type { Agendamento } from '@/src/types/agendamento';
import { agruparPorData } from '@/src/utils/agendamentos';
import {
  formatarDataCurta,
  nomeDiaSemana,
  rotuloRelativo,
} from '@/src/utils/date';

const Grupo = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const GrupoHeader = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.layout.headerHeight};
  z-index: ${({ theme }) => theme.zIndex.base};
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} 0;
  background: ${({ theme }) => theme.colors.background};
`;

const GrupoTitulo = styled.h2`
  font-size: ${({ theme }) => theme.typography.size.md};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const GrupoInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const Lista = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export interface AgendamentosPorDataProps {
  agendamentos: Agendamento[];
  onSelect: (agendamento: Agendamento) => void;
}

export function AgendamentosPorData({
  agendamentos,
  onSelect,
}: AgendamentosPorDataProps) {
  const grupos = agruparPorData(agendamentos);

  return (
    <Wrapper>
      {grupos.map((grupo) => {
        const rotulo = rotuloRelativo(grupo.data);
        const dataCurta = formatarDataCurta(grupo.data);
        return (
          <Grupo key={grupo.data}>
            <GrupoHeader>
              <GrupoTitulo>{rotulo}</GrupoTitulo>
              <GrupoInfo>
                {rotulo === dataCurta
                  ? nomeDiaSemana(grupo.data)
                  : `${dataCurta} · ${nomeDiaSemana(grupo.data)}`}
                {' · '}
                {grupo.itens.length}{' '}
                {grupo.itens.length === 1 ? 'atendimento' : 'atendimentos'}
              </GrupoInfo>
            </GrupoHeader>
            <Lista>
              {grupo.itens.map((item) => (
                <AppointmentCard
                  key={item.id}
                  agendamento={item}
                  onClick={onSelect}
                />
              ))}
            </Lista>
          </Grupo>
        );
      })}
    </Wrapper>
  );
}
