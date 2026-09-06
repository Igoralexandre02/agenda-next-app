import { Status } from '../types/status';
import { StrapiCollectionResponse, StrapiItemResponse } from '../types/strapi';
import { apiFetch, apiGet } from './api';

export async function getStatus(): Promise<Status[]> {
  const json = await apiGet<StrapiCollectionResponse<Status>>('/api/statuses');

  return json.data;
}

export async function getStatusById(documentId: string): Promise<Status> {
  const json = await apiGet<StrapiItemResponse<Status>>(
    `/api/statuses/${documentId}`,
  );

  return json.data;
}

export async function editarStatus(data: { status: Status }) {
  const response = await apiFetch(`/api/statuses/${data.status.documentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao editar status');
  }

  return response.json();
}

export async function criarStatus(data: { status: Status }) {
  const response = await apiFetch(`/api/statuses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar status');
  }

  return response.json();
}

export async function deletarStatus(documentId: string) {
  const response = await apiFetch(`/api/statuses/${documentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar status');
  }

  return response.json();
}
