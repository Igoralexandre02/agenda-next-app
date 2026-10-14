import { Cliente } from '../types/cliente';
import { StrapiCollectionResponse, StrapiItemResponse } from '../types/strapi';
import { apiFetch, apiGet } from './api';

export async function getClientes(): Promise<Cliente[]> {
  const json = await apiGet<StrapiCollectionResponse<Cliente>>('/api/clientes');

  return json.data;
}

export async function getClienteById(documentId: string): Promise<Cliente> {
  const json = await apiGet<StrapiItemResponse<Cliente>>(
    `/api/clientes/${documentId}`,
  );

  return json.data;
}

export async function editarCliente(cliente: Cliente) {
  if (!cliente.documentId) {
    throw new Error('ID do cliente não informado');
  }

  const payload = {
    data: {
      nome: cliente.nome,
      telefone: cliente.telefone,
    },
  };

  const response = await apiFetch(`/api/clientes/${cliente.documentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Erro ao editar cliente');
  }

  return response.json();
}

export async function criarCliente(
  cliente: Omit<Cliente, 'id' | 'documentId'> | Cliente,
) {
  const payload = {
    data: {
      nome: cliente.nome,
      telefone: cliente.telefone,
    },
  };

  const response = await apiFetch('/api/clientes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar cliente');
  }

  return response.json();
}

export async function deletarCliente(documentId: string) {
  if (!documentId) {
    throw new Error('ID do cliente não informado');
  }

  const response = await apiFetch(`/api/clientes/${documentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar cliente');
  }

  return response.json();
}
