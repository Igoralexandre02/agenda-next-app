'use client';

import { useState } from 'react';

import { BottomSheet } from '@/src/components/BottomSheet';
import { EmptyState } from '@/src/components/EmptyState';
import { ErrorState } from '@/src/components/ErrorState';
import { BellIcon } from '@/src/components/icons';
import { Loading } from '@/src/components/Loading';
import { useNotificacoes } from '@/src/hooks/useNotificacoes';
import { NotificacaoItem } from './NotificacaoItem';
import { Badge, Lista, SinoButton, SinoWrapper } from './styles';

/**
 * Sino de notificações para o Header.
 *
 * - O badge mostra a quantidade de notificações NÃO LIDAS do dia.
 * - Clicar no sino só abre o painel — não marca nada como lido.
 * - O painel mostra o HISTÓRICO DO DIA (lidas e não lidas).
 * - Abrir um item marca aquele item específico como lido no Strapi.
 */
export function NotificacoesBell() {
  const [aberto, setAberto] = useState(false);
  const {
    notificacoes,
    quantidadeNaoLidas,
    loading,
    error,
    recarregar,
    marcarComoLida,
  } = useNotificacoes();

  return (
    <SinoWrapper>
      <SinoButton
        type="button"
        onClick={() => setAberto(true)}
        aria-label={
          quantidadeNaoLidas > 0
            ? `Notificações: ${quantidadeNaoLidas} não lida(s)`
            : 'Notificações'
        }
      >
        <BellIcon />
        {quantidadeNaoLidas > 0 && (
          <Badge aria-hidden>
            {quantidadeNaoLidas > 9 ? '9+' : quantidadeNaoLidas}
          </Badge>
        )}
      </SinoButton>

      <BottomSheet
        open={aberto}
        onClose={() => setAberto(false)}
        title="Notificações"
      >
        {loading && <Loading label="Carregando notificações…" />}

        {!loading && error && (
          <ErrorState
            title="Não foi possível carregar as notificações"
            description={error}
            onRetry={recarregar}
          />
        )}

        {!loading && !error && notificacoes.length === 0 && (
          <EmptyState
            icon="🔔"
            title="Nenhuma notificação hoje"
            description="Você não possui novas notificações."
          />
        )}

        {!loading && !error && notificacoes.length > 0 && (
          <Lista>
            {notificacoes.map((notificacao) => (
              <NotificacaoItem
                key={notificacao.documentId}
                notificacao={notificacao}
                onAbrir={marcarComoLida}
              />
            ))}
          </Lista>
        )}
      </BottomSheet>
    </SinoWrapper>
  );
}
