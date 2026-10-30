'use client';

import { useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/src/components/Button';
import { ConfirmDialog } from '@/src/components/ConfirmDialog';
import { CheckIcon, XIcon } from '@/src/components/Icons';
import { useStatus } from '@/src/hooks/useStatus';
import { useToast } from '@/src/hooks/useToast';
import { alterarStatusAgendamento } from '@/src/services/agendamentos.service';
import type { Agendamento } from '@/src/types/agendamento';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

type Confirmacao = 'finalizar' | 'cancelar' | null;

export interface AcoesAgendamentoProps {
  agendamento: Agendamento;
  /** Chamado após finalizar/cancelar (mantém o usuário na tela). */
  onChanged: () => void;
  /** Mantido para compatibilidade. */
  onDeleted?: () => void;
}

export function AcoesAgendamento({
  agendamento,
  onChanged,
}: AcoesAgendamentoProps) {
  const toast = useToast();
  const { status } = useStatus();
  const [confirmacao, setConfirmacao] = useState<Confirmacao>(null);

  const statusFinalizado = status.find(
    (s) => s.nome?.toLowerCase() === 'finalizado',
  );
  const statusCancelado = status.find(
    (s) => s.nome?.toLowerCase() === 'cancelado',
  );

  const encerrado = agendamento.status_id?.nome?.toLowerCase() !== 'agendado';

  async function finalizar() {
    try {
      await alterarStatusAgendamento(
        String(agendamento.documentId),
        statusFinalizado?.id,
      );
      toast.sucesso('Atendimento finalizado');
      setConfirmacao(null);
      onChanged();
    } catch (err) {
      toast.erro(
        err instanceof Error ? err.message : 'Erro ao finalizar atendimento',
      );
    }
  }

  async function cancelar() {
    try {
      await alterarStatusAgendamento(
        String(agendamento.documentId),
        statusCancelado?.id,
      );
      toast.info('Agendamento cancelado');
      setConfirmacao(null);
      onChanged();
    } catch (err) {
      toast.erro(
        err instanceof Error ? err.message : 'Erro ao cancelar agendamento',
      );
    }
  }

  return (
    <>
      <Container>
        <Button
          variant={encerrado ? 'secondary' : 'accent'}
          fullWidth
          leftIcon={<CheckIcon width={18} height={18} />}
          disabled={encerrado}
          onClick={() => setConfirmacao('finalizar')}
        >
          Finalizar
        </Button>

        <Button
          variant="secondary"
          fullWidth
          leftIcon={<XIcon width={18} height={18} />}
          disabled={agendamento.status_id?.nome?.toLowerCase() === 'cancelado'}
          onClick={() => setConfirmacao('cancelar')}
        >
          Cancelar agendamento
        </Button>
      </Container>

      <ConfirmDialog
        open={confirmacao === 'finalizar'}
        title="Finalizar atendimento?"
        description={`O atendimento de ${agendamento.cliente_id?.nome ?? 'este cliente'} será marcado como finalizado.`}
        confirmLabel="Finalizar"
        onConfirm={finalizar}
        onCancel={() => setConfirmacao(null)}
      />

      <ConfirmDialog
        open={confirmacao === 'cancelar'}
        title="Cancelar agendamento?"
        description={`O agendamento de ${agendamento.cliente_id?.nome ?? 'este cliente'} ficará com status "Cancelado" e permanece no histórico.`}
        confirmLabel="Cancelar agendamento"
        cancelLabel="Voltar"
        onConfirm={cancelar}
        onCancel={() => setConfirmacao(null)}
      />
    </>
  );
}
