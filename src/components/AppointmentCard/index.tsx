'use client';

import { useRouter } from 'next/navigation';

import { DropdownMenu } from '@/src/components/DropdownMenu';
import {
  EyeIcon,
  PencilIcon,
  PhoneIcon,
  TrashIcon,
} from '@/src/components/Icons';
import { StatusBadge } from '@/src/components/StatusBadge';
import type { Agendamento } from '@/src/types/agendamento';
import { formatarHorario } from '@/src/utils/date';
import { mascararTelefone } from '@/src/utils/phone';

import {
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
  onEdit?: (agendamento: Agendamento) => void;
  onDelete?: (agendamento: Agendamento) => void;
}

export function AppointmentCard({
  agendamento,
  onClick,
  onEdit,
  onDelete,
}: AppointmentCardProps) {
  const router = useRouter();

  const nomeCliente = agendamento.cliente_id?.nome ?? 'Cliente não informado';
  const telefoneCliente = mascararTelefone(
    agendamento.cliente_id?.telefone ?? '',
  );

  function handleVisualizar() {
    if (onClick) {
      onClick(agendamento);
    } else {
      router.push(`/agendamentos/${agendamento.documentId}`);
    }
  }

  function handleEditar() {
    if (onEdit) {
      onEdit(agendamento);
    } else {
      router.push(`/agendamentos/${agendamento.documentId}/editar`);
    }
  }

  function handleExcluir() {
    onDelete?.(agendamento);
  }

  function handleCardClick() {
    handleVisualizar();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  }

  return (
    <Card
      role="button"
      tabIndex={0}
      $status={agendamento.status_id}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
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

      <DropdownMenu
        items={[
          {
            label: 'Visualizar',
            icon: <EyeIcon width={16} height={16} />,
            onClick: handleVisualizar,
          },
          {
            label: 'Editar',
            icon: <PencilIcon width={16} height={16} />,
            onClick: handleEditar,
          },
          {
            label: 'Excluir',
            icon: <TrashIcon width={16} height={16} />,
            onClick: handleExcluir,
            destructive: true,
          },
        ]}
        triggerLabel={`Ações para agendamento de ${nomeCliente}`}
      />
    </Card>
  );
}
