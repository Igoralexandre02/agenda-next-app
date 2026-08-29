'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';

import { AgendamentoForm } from '@/src/components/agendamentos/AgendamentoForm';
import { PageBody } from '@/src/components/AppShell';
import { ErrorState } from '@/src/components/ErrorState';
import { Header } from '@/src/components/Header';
import { Loading } from '@/src/components/Loading';
import { useAgendamento } from '@/src/hooks/useAgendamento';
import { useToast } from '@/src/hooks/useToast';
import { editarAgendamento } from '@/src/services/agendamentos.service';
import type { Agendamento } from '@/src/types/agendamento';

export default function EditarAgendamentoPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = use(params);
  const router = useRouter();
  const toast = useToast();
  const { agendamento, loading, error, recarregar } = useAgendamento(documentId);

  async function salvar(data: Agendamento) {
    await editarAgendamento(data);
    toast.sucesso('Agendamento atualizado');
    router.replace(`/agendamentos/${documentId}`);
  }

  return (
    <>
      <Header
        title="Editar agendamento"
        showBack
        backHref={`/agendamentos/${documentId}`}
      />
      <PageBody>
        {loading && <Loading label="Carregando agendamento…" />}

        {!loading && (error || !agendamento) && (
          <ErrorState
            title="Agendamento não encontrado"
            description={error ?? undefined}
            onRetry={recarregar}
          />
        )}

        {!loading && agendamento && (
          <AgendamentoForm
            initialValue={{
              nome: agendamento.nome,
              numero: agendamento.numero,
              data: agendamento.data,
              horario: agendamento.horario,
              status: agendamento.status,
            }}
            submitLabel="Salvar alterações"
            onSubmit={salvar}
            onCancel={() => router.push(`/agendamentos/${documentId}`)}
          />
        )}
      </PageBody>
    </>
  );
}
