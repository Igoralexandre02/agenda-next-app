/**
 * Modelo de domínio usado pela interface.
 *
 * É intencionalmente independente do formato do backend (Strapi). A tradução
 * entre este modelo e a API fica isolada na camada de serviço
 * (`src/services/agendamentos.service.ts`).
 */

import { Status } from './status';

export interface Agendamento {
  id?: number;
  documentId?: string;
  nome: string;
  numero: string;
  data: string;
  horario: string;
  status: Status | null;
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

export type StatusFiltro = 'todos' | string;

export interface FiltrosAgendamento {
  status: StatusFiltro;
  periodo: PeriodoFiltro;
  dataInicio?: string;
  dataFim?: string;
  busca: string;
}

export const FILTROS_PADRAO: FiltrosAgendamento = {
  periodo: 'hoje',
  status: 'todos',
  busca: '',
};
