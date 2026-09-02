/**
 * Modelo de domínio + DTOs da API para o módulo de notificações.
 *
 * Assim como em `agendamento.ts`, o modelo usado pela interface (`Notificacao`)
 * é independente do formato do Strapi. A tradução DTO → domínio fica isolada na
 * camada de serviço (`src/services/notificacoes.service.ts`).
 */

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

/* -------------------------------------------------------------------------- */
/*  DTOs do Strapi (formato "flat" da v5: sem wrapper `attributes`)            */
/* -------------------------------------------------------------------------- */

/** Agendamento como retornado ao popular a relação `agendamento`. */
export interface AgendamentoRelacionadoDTO {
  id: number;
  documentId: string;
  nome: string;
  numero: string;
  /** "YYYY-MM-DD" */
  data: string;
  /** "HH:mm:ss.SSS" */
  horario: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface NotificacaoDTO {
  id: number;
  documentId: string;
  tipo: TipoNotificacao;
  lida: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  /** `null` se a relação não foi populada ou o agendamento foi removido. */
  agendamento: AgendamentoRelacionadoDTO | null;
}

/** Envelope de coleção do Strapi v5. */
export interface StrapiColecaoResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** Envelope de item único do Strapi v5. */
export interface StrapiItemResponse<T> {
  data: T;
  meta: Record<string, never>;
}

/* -------------------------------------------------------------------------- */
/*  Modelo de domínio (consumido pela interface)                              */
/* -------------------------------------------------------------------------- */

export interface AgendamentoNotificacao {
  documentId: string;
  nome: string;
  numero: string;
  /** "YYYY-MM-DD" */
  data: string;
  /** "HH:mm:ss.SSS" */
  horario: string;
}

export interface Notificacao {
  id: number;
  documentId: string;
  tipo: TipoNotificacao;
  lida: boolean;
  /** ISO da criação (usado para ordenar o histórico). */
  criadaEm: string;
  /** `null` quando o agendamento relacionado não existe mais. */
  agendamento: AgendamentoNotificacao | null;
}
