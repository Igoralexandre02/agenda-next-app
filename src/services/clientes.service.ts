
import { Cliente } from '../types/cliente';
import {
  StrapiCollectionResponse,
  StrapiItemResponse,
} from '../types/strapi';
import { apenasDigitos } from '../utils/phone';
import { apiFetch, apiGet, obterMensagemErro } from './api';

export async function getClientes(): Promise<Cliente[]> {
  const json =
    await apiGet<StrapiCollectionResponse<Cliente>>('/api/clientes');

  return json.data;
}

export async function getClienteById(
  documentId: string,
): Promise<Cliente> {
  if (!documentId) {
    throw new Error('ID do cliente não informado');
  }

  const json = await apiGet<StrapiItemResponse<Cliente>>(
    `/api/clientes/${documentId}`,
  );

  return json.data;
}

export async function editarCliente(
  cliente: Cliente,
): Promise<StrapiItemResponse<Cliente>> {
  if (!cliente.documentId) {
    throw new Error('ID do cliente não informado');
  }

  const payload = {
    data: {
      nome: cliente.nome,
      telefone: apenasDigitos(cliente.telefone),
    },
  };

  const response = await apiFetch(
    `/api/clientes/${cliente.documentId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error(
      await obterMensagemErro(response, 'Erro ao editar cliente'),
    );
  }

  return response.json();
}

export async function criarCliente(
  cliente: Cliente,
): Promise<StrapiItemResponse<Cliente>> {
  const payload = {
    data: {
      nome: cliente.nome,
      telefone: apenasDigitos(cliente.telefone),
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
    throw new Error(
      await obterMensagemErro(response, 'Erro ao criar cliente'),
    );
  }

  return response.json();
}

export async function deletarCliente(
  documentId: string,
): Promise<void> {
  if (!documentId) {
    throw new Error('ID do cliente não informado');
  }

  const response = await apiFetch(
    `/api/clientes/${documentId}`,
    {
      method: 'DELETE',
    },
  );

  if (!response.ok) {
    throw new Error(
      await obterMensagemErro(response, 'Erro ao excluir cliente'),
    );
  }
}
