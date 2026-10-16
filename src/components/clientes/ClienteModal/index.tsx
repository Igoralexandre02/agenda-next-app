'use client';

import { useState } from 'react';

import { Button } from '@/src/components/Button';
import { Input } from '@/src/components/Input';
import { Modal } from '@/src/components/Modal';
import { useToast } from '@/src/hooks/useToast';
import { criarCliente, editarCliente } from '@/src/services/clientes.service';
import type { Cliente } from '@/src/types/cliente';
import { mascararTelefone, telefoneValido } from '@/src/utils/phone';

import { Actions, Form, FormError } from './styles';

interface FormValores {
  nome: string;
  telefone: string;
}

interface FormErros {
  nome?: string;
  telefone?: string;
}

export interface ClienteModalProps {
  open: boolean;
  onClose: () => void;
  cliente?: Cliente | null;
  onSuccess: () => void;
}

interface FormContentProps {
  cliente?: Cliente | null;
  onClose: () => void;
  onSuccess: () => void;
}

function FormContent({ cliente, onClose, onSuccess }: FormContentProps) {
  const toast = useToast();
  const isEdicao = Boolean(cliente);

  const [valores, setValores] = useState<FormValores>(() => ({
    nome: cliente?.nome ?? '',
    telefone: cliente?.telefone ? mascararTelefone(cliente.telefone) : '',
  }));
  const [erros, setErros] = useState<FormErros>({});
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  function validar(dados: FormValores): FormErros {
    const novosErros: FormErros = {};

    if (!dados.nome.trim()) {
      novosErros.nome = 'O nome é obrigatório';
    }

    if (!dados.telefone.trim()) {
      novosErros.telefone = 'O telefone é obrigatório';
    } else if (!telefoneValido(dados.telefone)) {
      novosErros.telefone =
        'Informe um telefone válido com DDD (10 ou 11 dígitos)';
    }

    return novosErros;
  }

  function handleNomeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const novoNome = e.target.value;
    const novosValores = { ...valores, nome: novoNome };
    setValores(novosValores);
    if (tentouEnviar) {
      setErros(validar(novosValores));
    }
  }

  function handleTelefoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const novoTelefone = mascararTelefone(e.target.value);
    const novosValores = { ...valores, telefone: novoTelefone };
    setValores(novosValores);
    if (tentouEnviar) {
      setErros(validar(novosValores));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTentouEnviar(true);
    setErroGeral('');

    const errosValidacao = validar(valores);
    setErros(errosValidacao);

    if (Object.keys(errosValidacao).length > 0) {
      return;
    }

    try {
      setSalvando(true);

      if (isEdicao && cliente) {
        await editarCliente({
          ...cliente,
          nome: valores.nome.trim(),
          telefone: valores.telefone,
        });
        toast.sucesso('Cliente atualizado com sucesso!');
      } else {
        await criarCliente({
          nome: valores.nome.trim(),
          telefone: valores.telefone,
        });
        toast.sucesso('Cliente cadastrado com sucesso!');
      }

      onSuccess();
      onClose();
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : isEdicao
            ? 'Erro ao atualizar cliente'
            : 'Erro ao cadastrar cliente';
      setErroGeral(msg);
      toast.erro(msg);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {erroGeral && <FormError role="alert">{erroGeral}</FormError>}

      <Input
        label="Nome"
        placeholder="Nome completo"
        value={valores.nome}
        onChange={handleNomeChange}
        error={erros.nome}
        disabled={salvando}
        autoComplete="name"
        autoFocus
      />

      <Input
        label="Telefone"
        placeholder="(11) 99999-9999"
        value={valores.telefone}
        onChange={handleTelefoneChange}
        error={erros.telefone}
        disabled={salvando}
        inputMode="tel"
        autoComplete="tel"
      />

      <Actions>
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={salvando}
        >
          Cancelar
        </Button>

        <Button type="submit" loading={salvando} disabled={salvando}>
          {isEdicao ? 'Salvar alterações' : 'Salvar cliente'}
        </Button>
      </Actions>
    </Form>
  );
}

export function ClienteModal({
  open,
  onClose,
  cliente,
  onSuccess,
}: ClienteModalProps) {
  const isEdicao = Boolean(cliente);

  // Key única baseada no cliente ou em 'novo' garante que o estado do formulário
  // sempre reseta do zero ao abrir novo ou trocar de cliente.
  const formKey = cliente?.documentId || String(cliente?.id || 'novo');

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdicao ? 'Editar cliente' : 'Novo cliente'}
    >
      {open && (
        <FormContent
          key={formKey}
          cliente={cliente}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      )}
    </Modal>
  );
}
