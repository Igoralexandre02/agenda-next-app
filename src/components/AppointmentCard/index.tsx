'use client';

import { ChevronRightIcon, PhoneIcon } from '@/src/components/icons';
import { StatusBadge } from '@/src/components/StatusBadge';
import type { Agendamento } from '@/src/types/agendamento';
import { formatarHorario } from '@/src/utils/date';
import { mascararTelefone } from '@/src/utils/phone';

import {
  ArrowSlot,
  BadgeRow,
  Body,
  Card,
  Name,
  Phone,
  Time,
  TimeColumn,
} from './styles';

export interface AppointmentCardProps {
  agendamento: Agendamento;
  onClick?: (agendamento: Agendamento) => void;
}

export function AppointmentCard({
  agendamento,
  onClick,
}: AppointmentCardProps) {
  const nomeCliente = agendamento.cliente_id?.nome ?? 'Cliente não informado';
  const telefoneCliente = mascararTelefone(
    agendamento.cliente_id?.telefone ?? '',
  );

  return (
    <Card
      type="button"
      $status={agendamento.status_id}
      onClick={() => onClick?.(agendamento)}
      aria-label={`Agendamento de ${nomeCliente} às ${formatarHorario(
        agendamento.horario,
      )}, ${agendamento.status_id?.nome ?? 'Sem status'}`}
    >
      <TimeColumn $status={agendamento.status_id}>
        <Time $status={agendamento.status_id}>
          {formatarHorario(agendamento.horario)}
        </Time>
      </TimeColumn>

      <Body>
        <Name>{nomeCliente}</Name>

        {telefoneCliente && (
          <Phone>
            <PhoneIcon />
            {telefoneCliente}
          </Phone>
        )}

        <BadgeRow>
          <StatusBadge status={agendamento.status_id?.nome} size="sm" />
        </BadgeRow>
      </Body>

      <ArrowSlot aria-hidden>
        <ChevronRightIcon />
      </ArrowSlot>
    </Card>
  );
}
