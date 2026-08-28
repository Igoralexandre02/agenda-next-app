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
import { agendamentosService } from '@/src/services/agendamentos.service';
import type { AgendamentoInput } from '@/src/types/agendamento';

export default function EditarAgendamentoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const toast = useToast();
  const { agendamento, loading, error, recarregar } = useAgendamento(id);

  async function salvar(input: AgendamentoInput) {
    await agendamentosService.atualizar(id, input);
    toast.sucesso('Agendamento atualizado');
    router.replace(`/agendamentos/${id}`);
  }

  return (
    <>
      <Header
        title="Editar agendamento"
        showBack
        backHref={`/agendamentos/${id}`}
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
              telefone: agendamento.telefone,
              data: agendamento.data,
              horario: agendamento.horario,
              status: agendamento.status,
            }}
            submitLabel="Salvar alterações"
            onSubmit={salvar}
            onCancel={() => router.push(`/agendamentos/${id}`)}
          />
        )}
      </PageBody>
    </>
  );
}
