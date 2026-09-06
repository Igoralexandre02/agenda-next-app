import { Agendamento } from './agendamento';

/** Tipos de notificação suportados pelo backend (enum do Content-Type). */
export const TIPO_NOTIFICACAO = {
  CORTE_PROXIMO: 'CORTE_PROXIMO',
} as const;

export type TipoNotificacao =
  (typeof TIPO_NOTIFICACAO)[keyof typeof TIPO_NOTIFICACAO];

/** Rótulo exibido para cada tipo de notificação. */
export const TIPO_NOTIFICACAO_LABEL: Record<TipoNotificacao, string> = {
  CORTE_PROXIMO: 'Próximo corte',
};

/** Modelo de domínio para exibição. */
export interface AgendamentoNotificacao {
  documentId: string;
  nome: string;
  numero: string;
  data: string;
  horario: string;
}

export interface Notificacao {
  id: number;
  documentId: string;
  tipo: TipoNotificacao;
  lida: boolean;
  criadaEm: string;
  agendamento: Agendamento | null;
}
