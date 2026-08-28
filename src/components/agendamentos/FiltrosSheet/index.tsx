'use client';

import { useEffect, useState } from 'react';

import { BottomSheet } from '@/src/components/BottomSheet';
import { Button } from '@/src/components/Button';
import { DateField } from '@/src/components/DateField';
import { Input } from '@/src/components/Input';
import { SegmentedControl } from '@/src/components/SegmentedControl';
import {
  FILTROS_PADRAO,
  PERIODO_LABEL,
  STATUS_LABEL,
  type FiltrosAgendamento,
  type PeriodoFiltro,
  type StatusFiltro,
} from '@/src/types/agendamento';

import { Grupo, GrupoLabel, RangeRow } from './styles';

const PERIODOS: PeriodoFiltro[] = [
  'hoje',
  'amanha',
  'semana',
  'mes',
  'todos',
  'personalizado',
];

const STATUS: StatusFiltro[] = ['todos', 'agendado', 'finalizado', 'cancelado'];

export interface FiltrosSheetProps {
  open: boolean;
  onClose: () => void;
  filtros: FiltrosAgendamento;
  onApply: (filtros: FiltrosAgendamento) => void;
}

export function FiltrosSheet({
  open,
  onClose,
  filtros,
  onApply,
}: FiltrosSheetProps) {
  const [rascunho, setRascunho] = useState<FiltrosAgendamento>(filtros);

  // Sincroniza o rascunho sempre que o sheet abre.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setRascunho(filtros);
  }, [open, filtros]);

  function aplicar() {
    onApply(rascunho);
    onClose();
  }

  function limpar() {
    setRascunho({ ...FILTROS_PADRAO, busca: rascunho.busca });
  }

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Filtros"
      footer={
        <>
          <Button variant="secondary" onClick={limpar}>
            Limpar
          </Button>
          <Button onClick={aplicar}>Aplicar</Button>
        </>
      }
    >
      <Grupo>
        <GrupoLabel>Período</GrupoLabel>
        <SegmentedControl<PeriodoFiltro>
          ariaLabel="Período"
          wrap
          options={PERIODOS.map((p) => ({ value: p, label: PERIODO_LABEL[p] }))}
          value={rascunho.periodo}
          onChange={(periodo) => setRascunho((r) => ({ ...r, periodo }))}
        />

        {rascunho.periodo === 'personalizado' && (
          <RangeRow>
            <DateField
              label="De"
              value={rascunho.dataInicio ?? ''}
              onChange={(e) =>
                setRascunho((r) => ({ ...r, dataInicio: e.target.value }))
              }
            />
            <DateField
              label="Até"
              value={rascunho.dataFim ?? ''}
              onChange={(e) =>
                setRascunho((r) => ({ ...r, dataFim: e.target.value }))
              }
            />
          </RangeRow>
        )}
      </Grupo>

      <Grupo>
        <GrupoLabel>Status</GrupoLabel>
        <SegmentedControl<StatusFiltro>
          ariaLabel="Status"
          wrap
          options={STATUS.map((s) => ({
            value: s,
            label: s === 'todos' ? 'Todos' : STATUS_LABEL[s],
          }))}
          value={rascunho.status}
          onChange={(status) => setRascunho((r) => ({ ...r, status }))}
        />
      </Grupo>

      <Input
        label="Buscar"
        placeholder="Nome do cliente ou telefone"
        value={rascunho.busca}
        onChange={(e) => setRascunho((r) => ({ ...r, busca: e.target.value }))}
        inputMode="search"
      />
    </BottomSheet>
  );
}
