'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { AgendamentosPorData } from '@/src/components/agendamentos/AgendamentosPorData';
import { FiltrosSheet } from '@/src/components/agendamentos/FiltrosSheet';
import { PageBody } from '@/src/components/AppShell';
import { Button } from '@/src/components/Button';
import { EmptyState } from '@/src/components/EmptyState';
import { ErrorState } from '@/src/components/ErrorState';
import { Header } from '@/src/components/Header';
import { FilterIcon, PlusIcon, SearchIcon } from '@/src/components/icons';
import { AppointmentListSkeleton } from '@/src/components/Skeleton';
import { useAgendamentos } from '@/src/hooks/useAgendamentos';
import {
  FILTROS_PADRAO,
  PERIODO_LABEL,
  type Agendamento,
  type FiltrosAgendamento,
} from '@/src/types/agendamento';
import { aplicarFiltros } from '@/src/utils/agendamentos';

import {
  FilterButton,
  FilterCount,
  ResumoFiltro,
  SearchInput,
  SearchWrap,
  Toolbar,
} from './agendamentos.styles';

const FILTROS_INICIAIS: FiltrosAgendamento = {
  ...FILTROS_PADRAO,
  periodo: 'todos',
};

export default function AgendamentosPage() {
  const router = useRouter();
  const [filtros, setFiltros] = useState<FiltrosAgendamento>(FILTROS_INICIAIS);
  const [sheetAberto, setSheetAberto] = useState(false);

  const { todos, loading, error, recarregar } = useAgendamentos();

  const lista = useMemo(() => aplicarFiltros(todos, filtros), [todos, filtros]);

  // Nesta tela o padrão é "todos" — conta como ativo o que difere disso.
  const qtdBadge =
    (filtros.periodo !== 'todos' ? 1 : 0) +
    (filtros.status !== 'todos' ? 1 : 0);
  const filtrosAtivos = qtdBadge + (filtros.busca.trim() ? 1 : 0);

  function abrir(agendamento: Agendamento) {
    router.push(`/agendamentos/${agendamento.documentId}`);
  }

  const semResultados = !loading && !error && lista.length === 0;
  const buscaVazia = filtros.busca.trim() === '' && filtrosAtivos === 0;

  return (
    <>
      <Header
        title="Agendamentos"
        action={
          <Button
            size="md"
            variant="ghost"
            leftIcon={<PlusIcon width={20} height={20} />}
            aria-label="Novo agendamento"
            onClick={() => router.push('/agendamentos/novo')}
          />
        }
      />
      <PageBody>
        <Toolbar>
          <SearchWrap>
            <SearchIcon />
            <SearchInput
              type="search"
              placeholder="Buscar por nome ou telefone"
              aria-label="Buscar agendamentos"
              value={filtros.busca}
              onChange={(e) =>
                setFiltros((f) => ({ ...f, busca: e.target.value }))
              }
            />
          </SearchWrap>
          <FilterButton
            type="button"
            onClick={() => setSheetAberto(true)}
            aria-label="Abrir filtros"
          >
            <FilterIcon />
            Filtros
            {qtdBadge > 0 && <FilterCount>{qtdBadge}</FilterCount>}
          </FilterButton>
        </Toolbar>

        {!loading && !error && (
          <ResumoFiltro>
            {PERIODO_LABEL[filtros.periodo]}
            {filtros.status !== 'todos' && ` · ${filtros.status}`} ·{' '}
            {lista.length} {lista.length === 1 ? 'agendamento' : 'agendamentos'}
          </ResumoFiltro>
        )}

        {loading && <AppointmentListSkeleton rows={5} />}

        {!loading && error && (
          <ErrorState description={error} onRetry={recarregar} />
        )}

        {semResultados && buscaVazia && (
          <EmptyState
            title="Nenhum agendamento"
            description="Você ainda não possui agendamentos cadastrados."
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

        {semResultados && !buscaVazia && (
          <EmptyState
            icon="🔍"
            title="Nada encontrado"
            description="Nenhum agendamento corresponde aos filtros selecionados."
            action={
              <Button
                variant="secondary"
                onClick={() => setFiltros(FILTROS_INICIAIS)}
              >
                Limpar filtros
              </Button>
            }
          />
        )}

        {!loading && !error && lista.length > 0 && (
          <AgendamentosPorData agendamentos={lista} onSelect={abrir} />
        )}
      </PageBody>

      <FiltrosSheet
        open={sheetAberto}
        onClose={() => setSheetAberto(false)}
        filtros={filtros}
        onApply={setFiltros}
      />
    </>
  );
}
