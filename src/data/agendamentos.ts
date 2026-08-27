import { CriarAgendamento, EditarAgendamento } from '../types/agendamentos';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAgendamentos() {
  const response = await fetch(`${API_URL}/api/agendamentos`);

  if (!response.ok) {
    throw new Error('Erro ao buscar agendamentos');
  }

  return response.json();
}

export async function getAgendamentoById(id: string) {
  const response = await fetch(`${API_URL}/api/agendamentos/${id}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar agendamento');
  }

  return response.json();
}

export async function editarAgendamento(
  id: string,
  data: {
    EditarAgendamento: EditarAgendamento;
  },
) {
  const response = await fetch(`${API_URL}/api/agendamentos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao editar agendamento');
  }

  return response.json();
}

export async function criarAgendamento(data: {
  CriarAgendamento: CriarAgendamento;
}) {
  const response = await fetch(`${API_URL}/api/agendamentos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar agendamento');
  }

  return response.json();
}

export async function deletarAgendamento(id: string) {
  const response = await fetch(`${API_URL}/api/agendamentos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar agendamento');
  }

  return response.json();
}
