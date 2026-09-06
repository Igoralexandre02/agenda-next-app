'use client';

import { useEffect, useState } from 'react';

import { BottomSheet } from '@/src/components/BottomSheet';
import { Button } from '@/src/components/Button';
import { DateField } from '@/src/components/DateField';
import { Input } from '@/src/components/Input';
import { SegmentedControl } from '@/src/components/SegmentedControl';
import {
  PERIODO_LABEL,
  FILTROS_PADRAO,
  type FiltrosAgendamento,
  type PeriodoFiltro,
} from '@/src/types/agendamento';

import { Grupo, GrupoLabel, RangeRow } from './styles';
import { useStatus } from '@/src/hooks/useStatus';

const PERIODOS: PeriodoFiltro[] = [
  'hoje',
  'amanha',
  'semana',
  'mes',
  'todos',
  'personalizado',
];

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
  const { status } = useStatus();
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

        <SegmentedControl<string>
          ariaLabel="Status"
          wrap
          options={[
            {
              value: 'todos',
              label: 'Todos',
            },
            ...status.map((s) => ({
              value: s.nome ?? '',
              label: s.nome ?? '',
            })),
          ]}
          value={rascunho.status}
          onChange={(status) =>
            setRascunho((r) => ({
              ...r,
              status,
            }))
          }
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
