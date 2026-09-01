'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  getNotificacoesDoDia,
  marcarNotificacaoComoLida,
} from '@/src/services/notificacoes.service';
import type { Notificacao } from '@/src/types/notificacao';
import { hojeISO } from '@/src/utils/date';

/** Intervalo do polling. O cron do Strapi roda a cada minuto. */
const INTERVALO_POLLING_MS = 60_000;

interface UseNotificacoesResult {
  /** Histórico do dia (lidas e não lidas), ordenado da mais recente para a mais antiga. */
  notificacoes: Notificacao[];
  /** Subconjunto com `lida: false` — base do indicador do sino. */
  naoLidas: Notificacao[];
  /** Quantidade de não lidas (contador do sino). */
  quantidadeNaoLidas: number;
  loading: boolean;
  error: string | null;
  /** Recarrega manualmente (ex: botão "tentar novamente"). */
  recarregar: () => void;
  /** Marca UMA notificação como lida no Strapi e reflete o retorno real. */
  marcarComoLida: (documentId: string) => Promise<void>;
}

/**
 * Fonte de verdade única das notificações na interface.
 *
 * - Carrega o histórico do dia atual do Strapi.
 * - Faz polling periódico (um único timer) para perceber notificações criadas
 *   pelo cron, pausando quando a aba não está visível.
 * - `marcarComoLida` persiste no backend e atualiza a lista com a resposta real.
 */
export function useNotificacoes(): UseNotificacoesResult {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function carregar({ silencioso }: { silencioso: boolean }) {
      try {
        if (!silencioso && ativo) {
          setLoading(true);
          setError(null);
        }

        const dados = await getNotificacoesDoDia(hojeISO());

        console.log('NOTIFICAÇÕES', dados);

        if (ativo) {
          setNotificacoes(dados);
          setError(null);
        }
      } catch (err: unknown) {
        if (ativo) {
          setError(
            err instanceof Error
              ? err.message
              : 'Não foi possível carregar as notificações',
          );
        }
      } finally {
        if (!silencioso && ativo) {
          setLoading(false);
        }
      }
    }

    carregar({ silencioso: false });

    const intervalo = setInterval(() => {
      if (document.visibilityState === 'visible') {
        carregar({ silencioso: true });
      }
    }, INTERVALO_POLLING_MS);

    return () => {
      ativo = false;
      clearInterval(intervalo);
    };
  }, [versao]);

  const recarregar = useCallback(() => setVersao((v) => v + 1), []);

  const marcarComoLida = useCallback(async (documentId: string) => {
    const atualizada = await marcarNotificacaoComoLida(documentId);

    setNotificacoes((atual) =>
      atual.map((item) => (item.documentId === documentId ? atualizada : item)),
    );
  }, []);

  const naoLidas = useMemo(
    () => notificacoes.filter((item) => !item.lida),
    [notificacoes],
  );

  return {
    notificacoes,
    naoLidas,
    quantidadeNaoLidas: naoLidas.length,
    loading,
    error,
    recarregar,
    marcarComoLida,
  };
}
