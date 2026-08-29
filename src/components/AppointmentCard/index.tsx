'use client';

import { PhoneIcon } from '@/src/components/icons';
import { StatusBadge } from '@/src/components/StatusBadge';
import type { Agendamento } from '@/src/types/agendamento';
import { formatarHorario } from '@/src/utils/date';

import { BadgeRow, Body, Card, Name, Phone, Time, TimeColumn } from './styles';

export interface AppointmentCardProps {
  agendamento: Agendamento;
  onClick?: (agendamento: Agendamento) => void;
}

export function AppointmentCard({
  agendamento,
  onClick,
}: AppointmentCardProps) {
  return (
    <Card
      type="button"
      $status={agendamento.status}
      onClick={() => onClick?.(agendamento)}
      aria-label={`Agendamento de ${agendamento.nome} às ${formatarHorario(
        agendamento.horario,
      )}, ${agendamento.status}`}
    >
      <TimeColumn $status={agendamento.status}>
        <Time $status={agendamento.status}>
          {formatarHorario(agendamento.horario)}
        </Time>
      </TimeColumn>

      <Body>
        <Name>{agendamento.nome}</Name>
        <Phone>
          <PhoneIcon />
          {agendamento.numero}
        </Phone>
        <BadgeRow>
          <StatusBadge status={agendamento.status?.nome} size="sm" />
        </BadgeRow>
      </Body>
    </Card>
  );
}
