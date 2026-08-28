'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { getAgendamentos } from '@/src/services/agendamentos.service';
import type { Agendamento, FiltrosAgendamento } from '@/src/types/agendamento';
import { aplicarFiltros } from '@/src/utils/agendamentos';

interface UseAgendamentosResult {
  /** Lista completa (sem filtros), já carregada. */
  todos: Agendamento[];
  /** Lista após aplicar `filtros` (quando informado). */
  agendamentos: Agendamento[];
  loading: boolean;
  error: string | null;
  recarregar: () => void;
}

/**
 * Carrega os agendamentos uma vez e aplica os filtros em memória.
 * A filtragem local mantém a resposta instantânea no mobile.
 */
export function useAgendamentos(
  filtros?: FiltrosAgendamento,
): UseAgendamentosResult {
  const [todos, setTodos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        setLoading(true);
        setError(null);

        const lista = await getAgendamentos();

        if (ativo) {
          setTodos(lista);
        }
      } catch (err: unknown) {
        if (ativo) {
          setError(
            err instanceof Error
              ? err.message
              : 'Não foi possível carregar os agendamentos',
          );
        }
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [versao]);

  const recarregar = useCallback(() => setVersao((v) => v + 1), []);

  const agendamentos = useMemo(
    () => (filtros ? aplicarFiltros(todos, filtros) : todos),
    [todos, filtros],
  );

  return { todos, agendamentos, loading, error, recarregar };
}
