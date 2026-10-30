'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { AppointmentCard } from '@/src/components/AppointmentCard';
import { Button } from '@/src/components/Button';
import { ConfirmDialog } from '@/src/components/ConfirmDialog';
import { EmptyState } from '@/src/components/EmptyState';
import { ErrorState } from '@/src/components/ErrorState';
import { Header } from '@/src/components/Header';
import { PlusIcon } from '@/src/components/Icons';
import { AppointmentListSkeleton } from '@/src/components/Skeleton';
import { useAgendamentos } from '@/src/hooks/useAgendamentos';
import { useToast } from '@/src/hooks/useToast';
import { deletarAgendamento } from '@/src/services/agendamentos.service';
import type { Agendamento } from '@/src/types/agendamento';
import {
  ordenarPorDataHora,
  proximoAtendimento,
  resumoDoDia,
} from '@/src/utils/agendamentos';
import { formatarDataCurta, hojeISO, nomeDiaSemana } from '@/src/utils/date';

import {
  Body,
  DataHoje,
  DiaSemana,
  Hero,
  ItemProximo,
  Lista,
  ProximoLabel,
  Resumo,
  ResumoCard,
  ResumoLabel,
  ResumoValor,
  Saudacao,
  SectionHead,
  SectionTitle,
  VerTodos,
} from './dashboard.styles';
import { getMe } from '@/src/services/auth.service';

export default function DashboardPage() {
  const router = useRouter();
  const toast = useToast();
  const { todos, loading, error, recarregar } = useAgendamentos();

  const [agendamentoParaExcluir, setAgendamentoParaExcluir] =
    useState<Agendamento | null>(null);

  const hoje = hojeISO();

  const doDia = useMemo(
    () => ordenarPorDataHora(todos.filter((a) => a.data === hoje)),
    [todos, hoje],
  );
  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const user = await getMe();
        setNomeUsuario(user.username);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    }

    carregarUsuario();
  }, []);
  const resumo = useMemo(() => resumoDoDia(todos), [todos]);
  const proximo = useMemo(() => proximoAtendimento(todos), [todos]);

  function abrir(agendamento: Agendamento) {
    router.push(`/agendamentos/${agendamento.documentId}`);
  }

  async function handleConfirmarExclusao() {
    if (!agendamentoParaExcluir?.documentId) {
      toast.erro('Não foi possível identificar o agendamento para exclusão');
      return;
    }

    try {
      await deletarAgendamento(agendamentoParaExcluir.documentId);
      toast.sucesso('Agendamento excluído com sucesso');
      setAgendamentoParaExcluir(null);
      recarregar();
    } catch (err) {
      toast.erro(
        err instanceof Error ? err.message : 'Erro ao excluir agendamento',
      );
    }
  }

  return (
    <>
      <Header title="Início" />
      <Body>
        <Hero>
          <Saudacao>Olá, {nomeUsuario || 'Barbeiro'} </Saudacao>
          <DataHoje>{formatarDataCurta(hoje)}</DataHoje>
          <DiaSemana>{nomeDiaSemana(hoje)}</DiaSemana>
        </Hero>

        <Button
          size="lg"
          fullWidth
          leftIcon={<PlusIcon width={20} height={20} />}
          onClick={() => router.push('/agendamentos/novo')}
        >
          Novo agendamento
        </Button>

        <Resumo>
          <ResumoCard>
            <ResumoValor>{resumo.total}</ResumoValor>
            <ResumoLabel>Total hoje</ResumoLabel>
          </ResumoCard>
          <ResumoCard $accent={resumo.agendados > 0}>
            <ResumoValor $accent={resumo.agendados > 0}>
              {resumo.agendados}
            </ResumoValor>
            <ResumoLabel>Agendados</ResumoLabel>
          </ResumoCard>
          <ResumoCard>
            <ResumoValor>{resumo.finalizados}</ResumoValor>
            <ResumoLabel>Finalizados</ResumoLabel>
          </ResumoCard>
        </Resumo>

        <section aria-labelledby="proximos-titulo">
          <SectionHead>
            <SectionTitle id="proximos-titulo">
              Próximos atendimentos
            </SectionTitle>
            <VerTodos href="/agendamentos">Ver todos</VerTodos>
          </SectionHead>

          {loading && <AppointmentListSkeleton rows={3} />}

          {!loading && error && (
            <ErrorState description={error} onRetry={recarregar} />
          )}

          {!loading && !error && doDia.length === 0 && (
            <EmptyState
              title="Nenhum atendimento hoje"
              description="Você ainda não possui agendamentos para hoje."
              action={
                <Button
                  leftIcon={<PlusIcon width={18} height={18} />}
                  onClick={() => router.push('/agendamentos/novo')}
                >
                  Novo agendamento
                </Button>
              }
            />
          )}

          {!loading && !error && doDia.length > 0 && (
            <Lista>
              {doDia.map((item) => (
                <ItemProximo key={item.id}>
                  {proximo?.id === item.id && (
                    <ProximoLabel>Próximo</ProximoLabel>
                  )}
                  <AppointmentCard
                    agendamento={item}
                    onClick={abrir}
                    onDelete={setAgendamentoParaExcluir}
                  />
                </ItemProximo>
              ))}
            </Lista>
          )}
        </section>
      </Body>

      <ConfirmDialog
        open={Boolean(agendamentoParaExcluir)}
        title="Excluir agendamento?"
        description={`Esta ação remove permanentemente o agendamento de ${agendamentoParaExcluir?.cliente_id?.nome ?? 'este cliente'}. Para manter o histórico, use "Cancelar" em vez de excluir.`}
        confirmLabel="Excluir"
        cancelLabel="Voltar"
        destructive
        onConfirm={handleConfirmarExclusao}
        onCancel={() => setAgendamentoParaExcluir(null)}
      />
    </>
  );
}
