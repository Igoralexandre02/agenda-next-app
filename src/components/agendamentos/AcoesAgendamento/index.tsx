'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { Button } from '@/src/components/Button';
import { ConfirmDialog } from '@/src/components/ConfirmDialog';
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
} from '@/src/components/icons';
import { useToast } from '@/src/hooks/useToast';
import {
  alterarStatusAgendamento,
  deletarAgendamento,
} from '@/src/services/agendamentos.service';
import type { Agendamento } from '@/src/types/agendamento';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FullRow = styled.div`
  grid-column: 1 / -1;
`;

type Confirmacao = 'finalizar' | 'cancelar' | 'excluir' | null;

export interface AcoesAgendamentoProps {
  agendamento: Agendamento;
  /** Chamado após finalizar/cancelar (mantém o usuário na tela). */
  onChanged: () => void;
  /** Chamado após excluir. */
  onDeleted: () => void;
}

export function AcoesAgendamento({
  agendamento,
  onChanged,
  onDeleted,
}: AcoesAgendamentoProps) {
  const router = useRouter();
  const toast = useToast();
  const [confirmacao, setConfirmacao] = useState<Confirmacao>(null);

  const encerrado = agendamento.status_id?.nome !== 'agendado';

  async function finalizar() {
    await alterarStatusAgendamento(String(agendamento.documentId), 4);
    toast.sucesso('Atendimento finalizado');
    setConfirmacao(null);
    onChanged();
  }

  async function cancelar() {
    await alterarStatusAgendamento(String(agendamento.documentId), 6);
    toast.info('Agendamento cancelado');
    setConfirmacao(null);
    onChanged();
  }

  async function excluir() {
    await deletarAgendamento(String(agendamento.documentId));
    toast.sucesso('Agendamento excluído');
    setConfirmacao(null);
    onDeleted();
  }

  return (
    <>
      <Grid>
        <Button
          variant="secondary"
          leftIcon={<PencilIcon width={18} height={18} />}
          onClick={() =>
            router.push(`/agendamentos/${agendamento.documentId}/editar`)
          }
        >
          Editar
        </Button>

        <Button
          variant="secondary"
          leftIcon={<CheckIcon width={18} height={18} />}
          disabled={encerrado}
          onClick={() => setConfirmacao('finalizar')}
        >
          Finalizar
        </Button>

        <FullRow>
          <Button
            variant="secondary"
            fullWidth
            leftIcon={<XIcon width={18} height={18} />}
            disabled={agendamento.status_id?.nome === 'Cancelado'}
            onClick={() => setConfirmacao('cancelar')}
          >
            Cancelar agendamento
          </Button>
        </FullRow>

        <FullRow>
          <Button
            variant="ghost"
            fullWidth
            leftIcon={<TrashIcon width={18} height={18} />}
            onClick={() => setConfirmacao('excluir')}
          >
            Excluir
          </Button>
        </FullRow>
      </Grid>

      <ConfirmDialog
        open={confirmacao === 'finalizar'}
        title="Finalizar atendimento?"
        description={`O atendimento de ${agendamento.nome} será marcado como finalizado.`}
        confirmLabel="Finalizar"
        onConfirm={finalizar}
        onCancel={() => setConfirmacao(null)}
      />

      <ConfirmDialog
        open={confirmacao === 'cancelar'}
        title="Cancelar agendamento?"
        description={`O agendamento de ${agendamento.nome} ficará com status "Cancelado" e permanece no histórico.`}
        confirmLabel="Cancelar agendamento"
        cancelLabel="Voltar"
        onConfirm={cancelar}
        onCancel={() => setConfirmacao(null)}
      />

      <ConfirmDialog
        open={confirmacao === 'excluir'}
        title="Excluir agendamento?"
        description={`Esta ação remove permanentemente o agendamento de ${agendamento.nome}. Para manter o histórico, use "Cancelar" em vez de excluir.`}
        confirmLabel="Excluir"
        cancelLabel="Voltar"
        destructive
        onConfirm={excluir}
        onCancel={() => setConfirmacao(null)}
      />
    </>
  );
}
