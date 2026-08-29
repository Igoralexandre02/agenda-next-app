'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/src/components/Button';
import { DateField } from '@/src/components/DateField';
import { Input } from '@/src/components/Input';
import { Select } from '@/src/components/Select';
import { TimeField } from '@/src/components/TimeField';
import type { Agendamento } from '@/src/types/agendamento';
import { hojeISO } from '@/src/utils/date';
import { mascararTelefone, telefoneValido } from '@/src/utils/phone';
import { useStatus } from '@/src/hooks/useStatus';
import { Actions, Form, FormError, Row } from './styles';
import { Status } from '@/src/types/status';

interface CamposForm {
  documentId?: string;
  nome: string;
  numero: string;
  data: string;
  horario: string;
  status: Status | null;
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
    nome: inicial?.nome ?? '',
    numero: inicial?.numero ?? '',
    data: inicial?.data ?? hojeISO(),
    horario: inicial?.horario ?? '',
    status: inicial?.status ?? null,
  };
}

function validar(campos: CamposForm): Erros {
  const erros: Erros = {};

  if (campos.nome.trim().length < 2) {
    erros.nome = 'Informe o nome do cliente';
  }

  if (!telefoneValido(campos.numero)) {
    erros.numero = 'Telefone inválido. Use DDD + número';
  }

  if (!campos.data) {
    erros.data = 'Selecione a data';
  }

  if (!campos.horario) {
    erros.horario = 'Selecione o horário';
  }

  if (!campos.status) {
    erros.status = 'Selecione o status';
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

  const [campos, setCampos] = useState<CamposForm>(() =>
    valoresIniciais(initialValue),
  );
  const [erros, setErros] = useState<Erros>({});
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  useEffect(() => {
    setCampos(valoresIniciais(initialValue));
  }, [initialValue]);

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
        nome: campos.nome.trim(),
        numero: campos.numero.trim(),
        data: campos.data,
        horario: campos.horario,
        status: campos.status,
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

      <Input
        label="Nome do cliente"
        placeholder="Ex: João da Silva"
        value={campos.nome}
        onChange={(e) => atualizar('nome', e.target.value)}
        error={erros.nome}
        autoComplete="name"
        autoCapitalize="words"
        enterKeyHint="next"
      />

      <Input
        label="Telefone para contato"
        placeholder="(69) 99999-9999"
        inputMode="tel"
        value={campos.numero}
        onChange={(e) => atualizar('numero', mascararTelefone(e.target.value))}
        error={erros.numero}
        autoComplete="tel"
      />

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
        value={String(campos.status?.id ?? '')}
        onChange={(e) => {
          const statusSelecionado = status.find(
            (item) => String(item.id) === e.target.value,
          );

          atualizar('status', statusSelecionado ?? null);
        }}
        disabled={loadingStatus}
        error={erros.status}
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
