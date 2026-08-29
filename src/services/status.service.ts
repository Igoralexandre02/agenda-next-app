import { Status } from '../types/status';
import { apiFetch } from './api';

export async function getStatus() {
  const response = await apiFetch(`/api/statuses`);

  if (!response.ok) {
    throw new Error('Erro ao buscar status');
  }

  return response.json();
}

export async function getStatusById(documentId: string) {
  const response = await apiFetch(`/api/statuses/${documentId}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar status');
  }

  return response.json();
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
