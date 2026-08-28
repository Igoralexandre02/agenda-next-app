/**
 * Modelo de domínio usado pela interface.
 *
 * É intencionalmente independente do formato do backend (Strapi). A tradução
 * entre este modelo e a API fica isolada na camada de serviço
 * (`src/services/agendamentos.service.ts`).
 */

import { Status } from "./status";

export interface Agendamento {
  id: string;
  nome: string;
  telefone: string;
  data: string;
  horario: string;
  statusId: number;
  created_at: string;
  updated_at: string;
}

/** Dados aceitos ao criar ou editar um agendamento. */
export interface AgendamentoInput {
  nome: string;
  telefone: string;
  data: string;
  horario: string;
  statusId: number;
}

export type PeriodoFiltro =
  'hoje' | 'amanha' | 'semana' | 'mes' | 'todos' | 'personalizado';

export const PERIODO_LABEL: Record<PeriodoFiltro, string> = {
  hoje: 'Hoje',
  amanha: 'Amanhã',
  semana: 'Esta semana',
  mes: 'Este mês',
  todos: 'Todos',
  personalizado: 'Personalizado',
};

export type StatusFiltro = Status | 'todos';

export interface FiltrosAgendamento {
  periodo: PeriodoFiltro;
  /** Usado quando `periodo === 'personalizado'`. Formato "YYYY-MM-DD". */
  dataInicio?: string;
  dataFim?: string;
  status: StatusFiltro;
  /** Busca por nome do cliente ou telefone. */
  busca: string;
}

export const FILTROS_PADRAO: FiltrosAgendamento = {
  periodo: 'hoje',
  status: 'todos',
  busca: '',
};
