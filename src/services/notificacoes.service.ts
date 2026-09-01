import type {
  Notificacao,
  NotificacaoDTO,
  StrapiColecaoResponse,
  StrapiItemResponse,
} from '../types/notificacao';
import { apiFetch } from './api';

/**
 * Porta de entrada única para as notificações (mesmo padrão de
 * `agendamentos.service.ts` / `status.service.ts`): consome exclusivamente a
 * API real do Strapi via `apiFetch()` e traduz o DTO para o modelo de domínio.
 */

/** Traz um lote generoso de uma vez — o volume diário é pequeno. */
const PAGE_SIZE = 100;

function mapNotificacao(dto: NotificacaoDTO): Notificacao {
  return {
    id: dto.id,
    documentId: dto.documentId,
    tipo: dto.tipo,
    lida: dto.lida,
    criadaEm: dto.createdAt,
    agendamento: dto.agendamento
      ? {
          documentId: dto.agendamento.documentId,
          nome: dto.agendamento.nome,
          numero: dto.agendamento.numero,
          data: dto.agendamento.data,
          horario: dto.agendamento.horario,
        }
      : null,
  };
}

/**
 * Histórico do dia: todas as notificações cujo agendamento é do dia informado,
 * lidas ou não. É a lista base da interface — o contador de "não lidas" é
 * derivado dela no hook, evitando uma segunda requisição.
 */
export async function getNotificacoesDoDia(
  dataISO: string,
): Promise<Notificacao[]> {
  const query = [
    `filters[agendamento][data][$eq]=${dataISO}`,
    'populate=agendamento',
    'sort[0]=createdAt:desc',
    `pagination[pageSize]=${PAGE_SIZE}`,
  ].join('&');

  const response = await apiFetch(`/api/notificacoes?${query}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar notificações');
  }

  const json: StrapiColecaoResponse<NotificacaoDTO> = await response.json();

  return json.data.map(mapNotificacao);
}

/**
 * Marca uma notificação específica como lida no Strapi e devolve o estado real
 * retornado pelo backend (com o agendamento repopulado).
 */
export async function marcarNotificacaoComoLida(
  documentId: string,
): Promise<Notificacao> {
  if (!documentId) {
    throw new Error('ID da notificação não informado');
  }

  const response = await apiFetch(
    `/api/notificacoes/${documentId}?populate=agendamento`,
    {
      method: 'PUT',
      body: JSON.stringify({ data: { lida: true } }),
    },
  );

  if (!response.ok) {
    throw new Error('Erro ao marcar notificação como lida');
  }

  const json: StrapiItemResponse<NotificacaoDTO> = await response.json();

  return mapNotificacao(json.data);
}
