import { Cliente } from './cliente';
import { Status } from './status';

export interface Agendamento {
  id?: number;
  documentId?: string;
  data: string;
  horario: string;
  status_id: Status | null;
  cliente_id: Cliente | null;
}

export type PeriodoFiltro =
  'hoje' | 'amanha' | 'semana' | 'mes' | 'todos' | 'personalizado' | string;

export const PERIODO_LABEL: Record<PeriodoFiltro, string> = {
  hoje: 'Hoje',
  amanha: 'Amanhã',
  semana: 'Esta semana',
  mes: 'Este mês',
  todos: 'Todos',
  personalizado: 'Personalizado',
};

export type StatusFiltro =
  'todos' | 'agendado' | 'finalizado' | 'cancelado' | string;

export interface FiltrosAgendamento {
  status: StatusFiltro;
  periodo: PeriodoFiltro;
  dataInicio?: string;
  dataFim?: string;
  busca: string;
}

export const FILTROS_PADRAO: FiltrosAgendamento = {
  periodo: 'todos',
  status: 'todos',
  busca: '',
};

export function mapAgendamento(data: Agendamento): Agendamento {
  return {
    id: data.id,
    documentId: data.documentId,
    data: data.data,
    horario: data.horario,
    status_id: data.status_id ?? null,
    cliente_id: data.cliente_id ?? null,
  };
}
