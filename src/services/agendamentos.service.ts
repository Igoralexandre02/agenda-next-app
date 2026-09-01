import { Agendamento } from '../types/agendamento';
import { apiFetch } from './api';

function formatarHorario(horario: string) {
  if (horario.length === 5) {
    return `${horario}:00.000`;
  }

  return horario;
}

function mapAgendamento(data: Agendamento): Agendamento {
  return {
    id: data.id,
    documentId: data.documentId,
    nome: data.nome,
    numero: data.numero,
    data: data.data,
    horario: data.horario,
    status_id: data.status_id ?? null,
  };
}

export async function getAgendamentos(): Promise<Agendamento[]> {
  const response = await apiFetch('/api/agendamentos?populate=*');

  if (!response.ok) {
    throw new Error('Erro ao buscar agendamentos');
  }

  const json = await response.json();

  return json.data.map(mapAgendamento);
}

export async function getAgendamentoById(
  documentId: string,
): Promise<Agendamento> {
  if (!documentId) {
    throw new Error('ID do agendamento não informado');
  }

  const response = await apiFetch(`/api/agendamentos/${documentId}?populate=*`);

  if (!response.ok) {
    throw new Error('Erro ao buscar agendamento');
  }

  const json = await response.json();

  return mapAgendamento(json.data);
}

export async function editarAgendamento(agendamento: Agendamento) {
  if (!agendamento.documentId) {
    throw new Error('ID do agendamento não informado');
  }
  const payload = {
    data: {
      nome: agendamento.nome,
      numero: agendamento.numero,
      data: agendamento.data,
      horario: formatarHorario(agendamento.horario),
      status_id: agendamento.status_id?.id,
    },
  };
  const response = await apiFetch(
    `/api/agendamentos/${agendamento?.documentId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error('Erro ao editar agendamento');
  }

  return response.json();
}

export async function criarAgendamento(agendamento: Agendamento) {
  const payload = {
    data: {
      nome: agendamento.nome,
      numero: agendamento.numero,
      data: agendamento.data,
      horario: `${agendamento.horario}:00.000`,
      status_id: agendamento.status_id?.id,
    },
  };
  const response = await apiFetch('/api/agendamentos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json?.error?.message || 'Erro ao criar agendamento');
  }

  return mapAgendamento(json.data);
}

export async function alterarStatusAgendamento(
  documentId: string,
  statusId: number,
) {
  const response = await apiFetch(`/api/agendamentos/${documentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        statusId,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao alterar status do agendamento');
  }

  return response.json();
}

export async function deletarAgendamento(documentId: string) {
  if (!documentId) {
    throw new Error('ID do agendamento não informado');
  }
  const response = await apiFetch(`/api/agendamentos/${documentId}`, {
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
