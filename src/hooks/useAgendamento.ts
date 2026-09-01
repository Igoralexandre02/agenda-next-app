'use client';

import { useCallback, useEffect, useState } from 'react';

import { getAgendamentoById } from '@/src/services/agendamentos.service';
import type { Agendamento } from '@/src/types/agendamento';

interface UseAgendamentoResult {
  agendamento: Agendamento | null;
  loading: boolean;
  error: string | null;
  recarregar: () => void;
}

export function useAgendamento(documentId: string): UseAgendamentoResult {
  const [agendamento, setAgendamento] = useState<Agendamento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    let ativo = true;

    getAgendamentoById(documentId)
      .then((item) => {
        if (!ativo) return;

        setAgendamento(item);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!ativo) return;

        setError(
          err instanceof Error
            ? err.message
            : 'Não foi possível carregar o agendamento',
        );
      })
      .finally(() => {
        if (!ativo) return;

        setLoading(false);
      });

    return () => {
      ativo = false;
    };
  }, [documentId, versao]);

  const recarregar = useCallback(() => {
    setLoading(true);
    setError(null);
    setVersao((v) => v + 1);
  }, []);

  return { agendamento, loading, error, recarregar };
}
