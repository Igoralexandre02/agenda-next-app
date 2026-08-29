import type { Agendamento, FiltrosAgendamento } from '@/src/types/agendamento';
import { addDias, hojeISO, intervaloMes, intervaloSemana } from './date';
import { apenasDigitos } from './phone';

/** Ordena por data e depois por horário (ascendente). */
export function ordenarPorDataHora(lista: Agendamento[]): Agendamento[] {
  return [...lista].sort((a, b) => {
    if (a.data !== b.data) return a.data < b.data ? -1 : 1;
    return a.horario < b.horario ? -1 : a.horario > b.horario ? 1 : 0;
  });
}

export interface GrupoAgendamentos {
  data: string;
  itens: Agendamento[];
}

/** Agrupa por data, mantendo a ordem cronológica. */
export function agruparPorData(lista: Agendamento[]): GrupoAgendamentos[] {
  const ordenada = ordenarPorDataHora(lista);
  const grupos: GrupoAgendamentos[] = [];

  for (const item of ordenada) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.data === item.data) {
      ultimo.itens.push(item);
    } else {
      grupos.push({ data: item.data, itens: [item] });
    }
  }

  return grupos;
}

/** Converte o período do filtro em um intervalo de datas ISO (inclusivo). */
export function intervaloDoPeriodo(
  filtros: FiltrosAgendamento,
): { inicio: string; fim: string } | null {
  const hoje = hojeISO();

  switch (filtros.periodo) {
    case 'hoje':
      return { inicio: hoje, fim: hoje };
    case 'amanha': {
      const amanha = addDias(hoje, 1);
      return { inicio: amanha, fim: amanha };
    }
    case 'semana':
      return intervaloSemana(hoje);
    case 'mes':
      return intervaloMes(hoje);
    case 'personalizado':
      if (filtros.dataInicio && filtros.dataFim) {
        const [inicio, fim] =
          filtros.dataInicio <= filtros.dataFim
            ? [filtros.dataInicio, filtros.dataFim]
            : [filtros.dataFim, filtros.dataInicio];
        return { inicio, fim };
      }
      return null;
    case 'todos':
    default:
      return null;
  }
}

/** Aplica período, status e busca sobre a lista. */
export function aplicarFiltros(
  lista: Agendamento[],
  filtros: FiltrosAgendamento,
): Agendamento[] {
  let resultado = lista;

  const intervalo = intervaloDoPeriodo(filtros);
  if (intervalo) {
    resultado = resultado.filter(
      (a) => a.data >= intervalo.inicio && a.data <= intervalo.fim,
    );
  }

  if (filtros.status !== 'todos') {
    resultado = resultado.filter((a) => a.status?.nome === filtros.status);
  }

  const termo = filtros.busca.trim().toLowerCase();
  if (termo) {
    const termoDigitos = apenasDigitos(termo);
    resultado = resultado.filter((a) => {
      const nomeMatch = a.nome.toLowerCase().includes(termo);
      const telMatch =
        termoDigitos.length > 0 &&
        apenasDigitos(a.numero).includes(termoDigitos);
      return nomeMatch || telMatch;
    });
  }

  return ordenarPorDataHora(resultado);
}

/** Quantidade de filtros ativos além do padrão (para badge no botão de filtros). */
export function contarFiltrosAtivos(filtros: FiltrosAgendamento): number {
  let total = 0;
  if (filtros.periodo !== 'hoje') total += 1;
  if (filtros.status !== 'todos') total += 1;
  if (filtros.busca.trim()) total += 1;
  return total;
}

/** Próximo atendimento do dia que ainda está "agendado". */
export function proximoAtendimento(
  lista: Agendamento[],
): Agendamento | undefined {
  const hoje = hojeISO();
  return ordenarPorDataHora(
    lista.filter((a) => a.data === hoje && a.status?.nome === 'agendado'),
  )[0];
}

export interface ResumoDia {
  total: number;
  agendados: number;
  finalizados: number;
  cancelados: number;
}

export function resumoDoDia(lista: Agendamento[]): ResumoDia {
  const hoje = hojeISO();
  const doDia = lista.filter((a) => a.data === hoje);
  return {
    total: doDia.length,
    agendados: doDia.filter((a) => a.status?.nome === 'agendado').length,
    finalizados: doDia.filter((a) => a.status?.nome === 'finalizado').length,
    cancelados: doDia.filter((a) => a.status?.nome === 'cancelado').length,
  };
}
