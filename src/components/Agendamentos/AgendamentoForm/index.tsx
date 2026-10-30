'use client';

import { useState } from 'react';
import { Button } from '@/src/components/Button';
import { DateField } from '@/src/components/DateField';
import { Select } from '@/src/components/Select';
import { TimeField } from '@/src/components/TimeField';
import type { Agendamento } from '@/src/types/agendamento';
import { mascararTelefone } from '@/src/utils/phone';
import { Input } from '@/src/components/Input';
import { hojeISO } from '@/src/utils/date';
import { useStatus } from '@/src/hooks/useStatus';
import { Actions, Form, FormError, Row } from './styles';
import { Status } from '@/src/types/status';
import { Cliente } from '@/src/types/cliente';
import { useClientes } from '@/src/hooks/useClientes';

interface CamposForm {
  documentId?: string;
  data: string;
  horario: string;
  status_id: Status | null;
  cliente_id: Cliente | null;
}

type Erros = Partial<Record<keyof CamposForm, string>>;

export interface AgendamentoFormProps {
  initialValue?: Partial<Agendamento>;
  submitLabel: string;
  onSubmit: (input: Agendamento) => Promise<void> | void;
  onCancel?: () => void;
}

function valoresIniciais(inicial?: Partial<Agendamento>): CamposForm {
  return {
    documentId: inicial?.documentId ?? '',
    data: inicial?.data ?? hojeISO(),
    horario: inicial?.horario ?? '',
    status_id: inicial?.status_id ?? null,
    cliente_id: inicial?.cliente_id ?? null,
  };
}

function validar(campos: CamposForm): Erros {
  const erros: Erros = {};

  if (!campos.cliente_id) {
    erros.cliente_id = 'Selecione um cliente';
  }

  if (!campos.data) {
    erros.data = 'Selecione a data';
  }

  if (!campos.horario) {
    erros.horario = 'Selecione o horário';
  }

  if (!campos.status_id) {
    erros.status_id = 'Selecione o status';
  }

  return erros;
}

export function AgendamentoForm({
  initialValue,
  submitLabel,
  onSubmit,
  onCancel,
}: AgendamentoFormProps) {
  const { status, loading: loadingStatus, error: erroStatus } = useStatus();
  const {
    clientes,
    loading: loadingClientes,
    error: erroClientes,
  } = useClientes();

  const [campos, setCampos] = useState<CamposForm>(() =>
    valoresIniciais(initialValue),
  );
  const [erros, setErros] = useState<Erros>({});
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  function atualizar<K extends keyof CamposForm>(
    chave: K,
    valor: CamposForm[K],
  ) {
    const proximo = {
      ...campos,
      [chave]: valor,
    };

    setCampos(proximo);

    if (tentouEnviar) {
      setErros(validar(proximo));
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setTentouEnviar(true);
    setErroGeral('');

    const encontrados = validar(campos);

    setErros(encontrados);

    if (Object.keys(encontrados).length > 0) {
      return;
    }

    try {
      setEnviando(true);

      await onSubmit({
        ...(campos.documentId && {
          documentId: campos.documentId,
        }),
        data: campos.data,
        horario: campos.horario,
        status_id: campos.status_id,
        cliente_id: campos.cliente_id,
      });
    } catch (err) {
      setErroGeral(
        err instanceof Error
          ? err.message
          : 'Não foi possível salvar o agendamento',
      );

      setEnviando(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {erroGeral && <FormError role="alert">{erroGeral}</FormError>}

      {erroStatus && <FormError role="alert">{erroStatus}</FormError>}
      {erroClientes && <FormError role="alert">{erroClientes}</FormError>}

      <Row>
        <Select
          label="Cliente"
          value={String(campos.cliente_id?.id ?? '')}
          onChange={(e) => {
            const clienteSelecionado = clientes.find(
              (item) => String(item.id) === e.target.value,
            );

            atualizar('cliente_id', clienteSelecionado ?? null);
          }}
          disabled={loadingClientes}
          error={erros.cliente_id}
          options={[
            {
              value: '',
              label: loadingClientes
                ? 'Carregando clientes...'
                : 'Selecione o cliente',
            },
            ...clientes.map((item) => ({
              value: String(item.id),
              label: item.nome ?? '',
            })),
          ]}
        />

        <Input
          label="Telefone para contato"
          placeholder="(69) 99999-9999"
          inputMode="tel"
          value={mascararTelefone(campos.cliente_id?.telefone ?? '')}
          disabled
          autoComplete="tel"
        />
      </Row>

      <Row>
        <DateField
          label="Data"
          value={campos.data}
          onChange={(e) => atualizar('data', e.target.value)}
          error={erros.data}
        />

        <TimeField
          label="Horário"
          value={campos.horario}
          onChange={(e) => atualizar('horario', e.target.value)}
          error={erros.horario}
        />
      </Row>

      <Select
        label="Status"
        value={String(campos.status_id?.id ?? '')}
        onChange={(e) => {
          const statusSelecionado = status.find(
            (item) => String(item.id) === e.target.value,
          );

          atualizar('status_id', statusSelecionado ?? null);
        }}
        disabled={loadingStatus}
        error={erros.status_id}
        options={[
          {
            value: '',
            label: loadingStatus
              ? 'Carregando status...'
              : 'Selecione o status',
          },
          ...status.map((item) => ({
            value: String(item.id),
            label: item.nome ?? '',
          })),
        ]}
      />
      <Actions>
        <Button type="submit" size="lg" loading={enviando}>
          {submitLabel}
        </Button>

        {onCancel && (
          <Button
            type="button"
            size="lg"
            variant="secondary"
            onClick={onCancel}
            disabled={enviando}
          >
            Cancelar
          </Button>
        )}
      </Actions>
    </Form>
  );
}
