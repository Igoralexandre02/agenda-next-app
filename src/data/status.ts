import { CriarStatus, EditarStatus } from '../types/status';

const API_URL = process.env.NEXT_LOCAL_API_URL;

export async function getStatus() {
  const response = await fetch(`${API_URL}/api/statuses`);

  if (!response.ok) {
    throw new Error('Erro ao buscar status');
  }

  return response.json();
}

export async function getStatusById(id: string) {
  const response = await fetch(`${API_URL}/api/statuses/${id}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar status');
  }

  return response.json();
}

export async function editarStatus(
  id: string,
  data: { EditarStatus: EditarStatus },
) {
  const response = await fetch(`${API_URL}/api/statuses/${id}`, {
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

export async function criarStatus(data: { CriarStatus: CriarStatus }) {
  const response = await fetch(`${API_URL}/api/statuses`, {
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

export async function deletarStatus(id: string) {
  const response = await fetch(`${API_URL}/api/statuses/${id}`, {
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
