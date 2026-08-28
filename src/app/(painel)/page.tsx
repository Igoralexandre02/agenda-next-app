'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { AppointmentCard } from '@/src/components/AppointmentCard';
import { Button } from '@/src/components/Button';
import { EmptyState } from '@/src/components/EmptyState';
import { ErrorState } from '@/src/components/ErrorState';
import { Header } from '@/src/components/Header';
import { PlusIcon } from '@/src/components/icons';
import { AppointmentListSkeleton } from '@/src/components/Skeleton';
import { useAgendamentos } from '@/src/hooks/useAgendamentos';
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

export default function DashboardPage() {
  const router = useRouter();
  const { todos, loading, error, recarregar } = useAgendamentos();

  const hoje = hojeISO();

  const doDia = useMemo(
    () => ordenarPorDataHora(todos.filter((a) => a.data === hoje)),
    [todos, hoje],
  );
  const resumo = useMemo(() => resumoDoDia(todos), [todos]);
  const proximo = useMemo(() => proximoAtendimento(todos), [todos]);

  function abrir(agendamento: Agendamento) {
    router.push(`/agendamentos/${agendamento.id}`);
  }

  return (
    <>
      <Header title="Início" />
      <Body>
        <Hero>
          <Saudacao>Olá, Barbeiro 👋</Saudacao>
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
            <ResumoLabel>Hoje</ResumoLabel>
          </ResumoCard>
          <ResumoCard>
            <ResumoValor>{resumo.agendados}</ResumoValor>
            <ResumoLabel>Agendados</ResumoLabel>
          </ResumoCard>
          <ResumoCard>
            <ResumoValor>{resumo.finalizados}</ResumoValor>
            <ResumoLabel>Finalizados</ResumoLabel>
          </ResumoCard>
        </Resumo>

        <section>
          <SectionHead>
            <SectionTitle>Próximos atendimentos</SectionTitle>
            <VerTodos onClick={() => router.push('/agendamentos')}>
              Ver todos
            </VerTodos>
          </SectionHead>
        </section>

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
                  <ProximoLabel>● Próximo</ProximoLabel>
                )}
                <AppointmentCard agendamento={item} onClick={abrir} />
              </ItemProximo>
            ))}
          </Lista>
        )}
      </Body>
    </>
  );
}
