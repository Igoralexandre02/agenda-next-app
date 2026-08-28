'use client';

import { useRouter } from 'next/navigation';

import { AgendamentoForm } from '@/src/components/agendamentos/AgendamentoForm';
import { PageBody } from '@/src/components/AppShell';
import { Header } from '@/src/components/Header';
import { useToast } from '@/src/hooks/useToast';
import { criarAgendamento } from '@/src/services/agendamentos.service';
import type { AgendamentoInput } from '@/src/types/agendamento';

export default function NovoAgendamentoPage() {
  const router = useRouter();
  const toast = useToast();

  async function criar(data: AgendamentoInput) {
    const criado = await criarAgendamento({ CriarAgendamento: data });
    toast.sucesso('Agendamento criado');
    router.replace(`/agendamentos/${criado.id}`);
  }

  return (
    <>
      <Header title="Novo agendamento" showBack backHref="/agendamentos" />
      <PageBody>
        <AgendamentoForm
          submitLabel="Salvar agendamento"
          onSubmit={criar}
          onCancel={() => router.back()}
        />
      </PageBody>
    </>
  );
}
