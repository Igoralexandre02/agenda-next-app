/**
 * Utilitários de data/hora. Trabalham sempre com strings "YYYY-MM-DD" e "HH:mm"
 * para evitar problemas de fuso horário ao serializar `Date`.
 */

const DIAS_SEMANA = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

/** Converte uma data ISO para Date local. */
export function parseISODate(iso: string | Date): Date {
  if (iso instanceof Date) {
    return iso;
  }

  if (typeof iso !== 'string') {
    throw new TypeError(
      `Data inválida: esperado string ou Date, recebido ${typeof iso}`
    );
  }

  const [ano, mes, dia] = iso.split('T')[0].split('-').map(Number);

  return new Date(ano, (mes ?? 1) - 1, dia ?? 1);
}

/** "YYYY-MM-DD" de um `Date` (data local). */
export function toISODate(date: Date): string {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

export function hojeISO(): string {
  return toISODate(new Date());
}

export function addDias(iso: string, dias: number): string {
  const d = parseISODate(iso);
  d.setDate(d.getDate() + dias);
  return toISODate(d);
}

export function isHoje(iso: string): boolean {
  return iso === hojeISO();
}

export function isAmanha(iso: string): boolean {
  return iso === addDias(hojeISO(), 1);
}

export function isPassado(iso: string): boolean {
  return iso < hojeISO();
}

/** Ex: "27 de Agosto de 2026". */
export function formatarDataExtensa(iso: string): string {
  const d = parseISODate(iso);
  return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}

/** Ex: "27 de Agosto". */
export function formatarDataCurta(iso: string): string {
  const d = parseISODate(iso);
  return `${d.getDate()} de ${MESES[d.getMonth()]}`;
}

/** Ex: "27 AGO". */
export function formatarDataBadge(iso: string): { dia: string; mes: string } {
  const d = parseISODate(iso);
  return {
    dia: String(d.getDate()).padStart(2, '0'),
    mes: MESES[d.getMonth()].slice(0, 3).toUpperCase(),
  };
}

export function nomeDiaSemana(iso: string): string {
  return DIAS_SEMANA[parseISODate(iso).getDay()];
}

/** Rótulo relativo amigável: "Hoje", "Amanhã", "Ontem" ou a data curta. */
export function rotuloRelativo(iso: string): string {
  if (isHoje(iso)) return 'Hoje';
  if (isAmanha(iso)) return 'Amanhã';
  if (iso === addDias(hojeISO(), -1)) return 'Ontem';
  return formatarDataCurta(iso);
}

/** "DD/MM/AAAA" para exibição compacta. */
export function formatarDataBR(iso: string): string {
  const d = parseISODate(iso);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${d.getFullYear()}`;
}

/** Normaliza "HH:mm:ss.SSS" ou "HH:mm:ss" para "HH:mm". */
export function formatarHorario(horario: string): string {
  return horario.slice(0, 5);
}

/** Início (segunda) e fim (domingo) da semana da data informada. */
export function intervaloSemana(iso: string): { inicio: string; fim: string } {
  const d = parseISODate(iso);
  const diaSemana = (d.getDay() + 6) % 7; // 0 = segunda
  const inicio = addDias(iso, -diaSemana);
  const fim = addDias(inicio, 6);
  return { inicio, fim };
}

/** Primeiro e último dia do mês da data informada. */
export function intervaloMes(iso: string): { inicio: string; fim: string } {
  const d = parseISODate(iso);
  const inicio = new Date(d.getFullYear(), d.getMonth(), 1);
  const fim = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  return { inicio: toISODate(inicio), fim: toISODate(fim) };
}
