/**
 * Camada de dados MOCK — totalmente isolada.
 *
 * Mantém os agendamentos em memória e persiste em `localStorage` para que a
 * experiência sobreviva a recarregamentos durante o desenvolvimento das telas.
 *
 * Para trocar pela API real, ajuste `src/services/agendamentos.service.ts`
 * (defina `NEXT_PUBLIC_USE_MOCK=false`). Nenhum componente importa este arquivo
 * diretamente.
 */

import type {
  Agendamento,
  AgendamentoInput,
  StatusAgendamento,
} from '@/src/types/agendamento';
import { addDias, hojeISO } from '@/src/utils/date';

const STORAGE_KEY = 'barbearia:mock:agendamentos';
const LATENCIA_MS = 320;

function delay<T>(valor: T): Promise<T> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(valor), LATENCIA_MS),
  );
}

function novoId(): string {
  return `agd_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function agora(): string {
  return new Date().toISOString();
}

function seed(): Agendamento[] {
  const hoje = hojeISO();
  const ontem = addDias(hoje, -1);
  const anteontem = addDias(hoje, -2);
  const amanha = addDias(hoje, 1);
  const semanaQueVem = addDias(hoje, 4);

  const base = (
    nome: string,
    telefone: string,
    data: string,
    horario: string,
    status: StatusAgendamento,
  ): Agendamento => ({
    id: novoId(),
    nome,
    telefone,
    data,
    horario,
    status,
    criadoEm: agora(),
    atualizadoEm: agora(),
  });

  return [
    base('João da Silva', '(69) 99999-9999', hoje, '09:00', 'agendado'),
    base('Carlos Mendes', '(69) 98888-8888', hoje, '10:00', 'agendado'),
    base('Marcos Antônio', '(69) 97777-7777', hoje, '11:30', 'finalizado'),
    base('Rafael Souza', '(69) 96666-6666', hoje, '14:00', 'agendado'),
    base('Bruno Lima', '(69) 95555-5555', hoje, '16:30', 'cancelado'),
    base('Pedro Henrique', '(69) 94444-4444', amanha, '09:00', 'agendado'),
    base('Lucas Oliveira', '(69) 93333-3333', amanha, '14:00', 'agendado'),
    base(
      'Diego Ferreira',
      '(69) 92222-2222',
      semanaQueVem,
      '10:30',
      'agendado',
    ),
    base('André Rocha', '(69) 91111-1111', ontem, '15:00', 'finalizado'),
    base('Thiago Barros', '(69) 90000-0000', ontem, '17:00', 'finalizado'),
    base('Gustavo Nunes', '(69) 98123-4567', anteontem, '13:30', 'cancelado'),
  ];
}

let cache: Agendamento[] | null = null;

function carregar(): Agendamento[] {
  if (cache) return cache;

  if (typeof window !== 'undefined') {
    try {
      const bruto = window.localStorage.getItem(STORAGE_KEY);
      if (bruto) {
        cache = JSON.parse(bruto) as Agendamento[];
        return cache;
      }
    } catch {
      // ignora storage corrompido / indisponível
    }
  }

  cache = seed();
  persistir();
  return cache;
}

function persistir(): void {
  if (typeof window === 'undefined' || !cache) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // storage indisponível — segue apenas em memória
  }
}

export const agendamentosMock = {
  listar(): Promise<Agendamento[]> {
    return delay([...carregar()]);
  },

  obter(id: string): Promise<Agendamento> {
    const item = carregar().find((a) => a.id === id);
    if (!item) return Promise.reject(new Error('Agendamento não encontrado'));
    return delay({ ...item });
  },

  criar(input: AgendamentoInput): Promise<Agendamento> {
    const lista = carregar();
    const novo: Agendamento = {
      ...input,
      id: novoId(),
      criadoEm: agora(),
      atualizadoEm: agora(),
    };
    lista.push(novo);
    persistir();
    return delay({ ...novo });
  },

  atualizar(
    id: string,
    input: Partial<AgendamentoInput>,
  ): Promise<Agendamento> {
    const lista = carregar();
    const indice = lista.findIndex((a) => a.id === id);
    if (indice === -1) {
      return Promise.reject(new Error('Agendamento não encontrado'));
    }
    const atualizado: Agendamento = {
      ...lista[indice],
      ...input,
      atualizadoEm: agora(),
    };
    lista[indice] = atualizado;
    persistir();
    return delay({ ...atualizado });
  },

  remover(id: string): Promise<void> {
    const lista = carregar();
    const indice = lista.findIndex((a) => a.id === id);
    if (indice === -1) {
      return Promise.reject(new Error('Agendamento não encontrado'));
    }
    lista.splice(indice, 1);
    persistir();
    return delay(undefined);
  },

  /** Restaura os dados de exemplo (útil em Configurações / testes manuais). */
  resetar(): Promise<void> {
    cache = seed();
    persistir();
    return delay(undefined);
  },
};
