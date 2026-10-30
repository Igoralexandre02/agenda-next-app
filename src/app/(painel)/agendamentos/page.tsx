'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { AgendamentosPorData } from '@/src/components/Agendamentos/AgendamentosPorData';
import { FiltrosSheet } from '@/src/components/Agendamentos/FiltrosSheet';
import { PageBody } from '@/src/components/AppShell';
import { Button } from '@/src/components/Button';
import { ConfirmDialog } from '@/src/components/ConfirmDialog';
import { EmptyState } from '@/src/components/EmptyState';
import { ErrorState } from '@/src/components/ErrorState';
import { Header } from '@/src/components/Header';
import { FilterIcon, PlusIcon, SearchIcon } from '@/src/components/Icons';
import { AppointmentListSkeleton } from '@/src/components/Skeleton';
import { useAgendamentos } from '@/src/hooks/useAgendamentos';
import { useToast } from '@/src/hooks/useToast';
import { deletarAgendamento } from '@/src/services/agendamentos.service';
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
  const toast = useToast();
  const [filtros, setFiltros] = useState<FiltrosAgendamento>(FILTROS_INICIAIS);
  const [sheetAberto, setSheetAberto] = useState(false);
  const [agendamentoParaExcluir, setAgendamentoParaExcluir] =
    useState<Agendamento | null>(null);

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
            icon={<SearchIcon />}
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
          <AgendamentosPorData
            agendamentos={lista}
            onSelect={abrir}
            onDelete={setAgendamentoParaExcluir}
          />
        )}
      </PageBody>

      <FiltrosSheet
        open={sheetAberto}
        onClose={() => setSheetAberto(false)}
        filtros={filtros}
        onApply={setFiltros}
      />

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
