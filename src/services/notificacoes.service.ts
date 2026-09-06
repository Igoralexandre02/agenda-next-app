import type { Notificacao } from '../types/notificacao';
import { StrapiCollectionResponse, StrapiItemResponse } from '../types/strapi';
import { apiFetch } from './api';

/** Traz um lote generoso de uma vez — o volume diário é pequeno. */
const PAGE_SIZE = 100;

function mapNotificacao(dto: Notificacao): Notificacao {
  return {
    id: dto.id,
    documentId: dto.documentId,
    tipo: dto.tipo,
    lida: dto.lida,
    criadaEm: dto.criadaEm,
    agendamento: dto.agendamento
      ? {
          documentId: dto.agendamento.documentId,
          nome: dto.agendamento.nome,
          numero: dto.agendamento.numero,
          data: dto.agendamento.data,
          horario: dto.agendamento.horario,
          status_id: dto.agendamento.status_id ?? null,
        }
      : null,
  };
}

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

  const json: StrapiCollectionResponse<Notificacao> = await response.json();

  return json.data.map(mapNotificacao);
}

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

  const json: StrapiItemResponse<Notificacao> = await response.json();

  return mapNotificacao(json.data);
}
