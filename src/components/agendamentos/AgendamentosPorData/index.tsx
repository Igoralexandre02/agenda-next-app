'use client';

import { AppointmentCard } from '@/src/components/AppointmentCard';
import type { Agendamento } from '@/src/types/agendamento';
import { agruparPorData } from '@/src/utils/agendamentos';
import {
  formatarDataCurta,
  nomeDiaSemana,
  rotuloRelativo,
} from '@/src/utils/date';
import { Grupo, GrupoHeader, GrupoInfo, GrupoTitulo, Lista, Wrapper } from './styles';

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
