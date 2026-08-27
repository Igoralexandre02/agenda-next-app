export interface Agendamento {
  id: number;
  Nome: string;
  Data: string;
  Horario: string;
  Numero: string;
  createdAt: string;
  updatedAt: string;
}

export interface CriarAgendamento {
  Nome: string;
  Data: string;
  Horario: string;
  Numero: string;
}

export interface EditarAgendamento {
  Nome?: string;
  Data?: string;
  Horario?: string;
  Numero?: string;
}
