'use client';

import { useMemo, useState } from 'react';

import { PageBody } from '@/src/components/AppShell';
import { Button } from '@/src/components/Button';
import { ClienteModal } from '@/src/components/clientes/ClienteModal';
import { ConfirmDialog } from '@/src/components/ConfirmDialog';
import { EmptyState } from '@/src/components/EmptyState';
import { ErrorState } from '@/src/components/ErrorState';
import { Header } from '@/src/components/Header';
import {
  PencilIcon,
  PhoneIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  WhatsAppIcon,
} from '@/src/components/icons';
import { Skeleton } from '@/src/components/Skeleton';
import { useClientes } from '@/src/hooks/useClientes';
import { useToast } from '@/src/hooks/useToast';
import { deletarCliente } from '@/src/services/clientes.service';
import type { Cliente } from '@/src/types/cliente';
import { linkTelefone, mascararTelefone } from '@/src/utils/phone';

import {
  ActionButton,
  Acoes,
  ClienteCard,
  Info,
  Lista,
  Nome,
  ResumoContador,
  SearchInput,
  SearchWrap,
  TelefoneLink,
  TelefoneText,
  Toolbar,
} from './clientes.styles';

export default function ClientesPage() {
  const toast = useToast();
  const { clientes, loading, error, recarregar } = useClientes();
  const [busca, setBusca] = useState('');

  // Estado do modal de cadastro/edição
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteParaEdicao, setClienteParaEdicao] = useState<Cliente | null>(null);

  // Estado do diálogo de confirmação de exclusão
  const [clienteParaExcluir, setClienteParaExcluir] = useState<Cliente | null>(null);

  // Filtragem de clientes por nome ou telefone
  const clientesFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return clientes;

    const termoDigitos = termo.replace(/\D/g, '');

    return clientes.filter((c) => {
      const nomeMatch = c.nome?.toLowerCase().includes(termo);
      const tel = c.telefone ?? '';
      const telefoneMatch =
        tel.toLowerCase().includes(termo) ||
        (termoDigitos.length > 0 && tel.replace(/\D/g, '').includes(termoDigitos));
      return Boolean(nomeMatch || telefoneMatch);
    });
  }, [clientes, busca]);

  function abrirNovoCliente() {
    setClienteParaEdicao(null);
    setModalAberto(true);
  }

  function abrirEditarCliente(cliente: Cliente) {
    setClienteParaEdicao(cliente);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setClienteParaEdicao(null);
  }

  async function handleConfirmarExclusao() {
    if (!clienteParaExcluir?.documentId) {
      toast.erro('Não foi possível identificar o cliente para exclusão');
      return;
    }

    try {
      await deletarCliente(clienteParaExcluir.documentId);
      toast.sucesso('Cliente excluído com sucesso');
      setClienteParaExcluir(null);
      recarregar();
    } catch (err) {
      toast.erro(
        err instanceof Error ? err.message : 'Erro ao excluir cliente',
      );
    }
  }

  const semResultados = !loading && !error && clientesFiltrados.length === 0;
  const buscaVazia = busca.trim() === '';

  return (
    <>
      <Header
        title="Clientes"
        action={
          <Button
            size="md"
            variant="ghost"
            leftIcon={<PlusIcon width={20} height={20} />}
            aria-label="Novo cliente"
            onClick={abrirNovoCliente}
          />
        }
      />

      <PageBody>
        <Toolbar>
          <SearchWrap>
            <SearchIcon />
            <SearchInput
              type="search"
              placeholder="Buscar por nome ou telefone"
              aria-label="Buscar clientes"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </SearchWrap>
          <Button
            leftIcon={<PlusIcon width={18} height={18} />}
            onClick={abrirNovoCliente}
          >
            Novo cliente
          </Button>
        </Toolbar>

        {!loading && !error && (
          <ResumoContador>
            {clientesFiltrados.length}{' '}
            {clientesFiltrados.length === 1 ? 'cliente' : 'clientes'}
            {busca.trim() && ` encontrado(s)`}
          </ResumoContador>
        )}

        {loading && (
          <Lista>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} $height="72px" $radius="16px" />
            ))}
          </Lista>
        )}

        {!loading && error && (
          <ErrorState description={error} onRetry={recarregar} />
        )}

        {semResultados && buscaVazia && (
          <EmptyState
            icon="👥"
            title="Nenhum cliente cadastrado"
            description="Você ainda não possui clientes cadastrados na sua base."
            action={
              <Button
                leftIcon={<PlusIcon width={18} height={18} />}
                onClick={abrirNovoCliente}
              >
                Novo cliente
              </Button>
            }
          />
        )}

        {semResultados && !buscaVazia && (
          <EmptyState
            icon="🔍"
            title="Nada encontrado"
            description="Nenhum cliente corresponde ao termo buscado."
            action={
              <Button variant="secondary" onClick={() => setBusca('')}>
                Limpar busca
              </Button>
            }
          />
        )}

        {!loading && !error && clientesFiltrados.length > 0 && (
          <Lista>
            {clientesFiltrados.map((cliente) => {
              const whatsAppHref = linkTelefone(cliente.telefone);
              const telFormatado = mascararTelefone(cliente.telefone ?? '');

              return (
                <ClienteCard key={cliente.documentId || cliente.id}>
                  <Info>
                    <Nome>{cliente.nome}</Nome>
                    {whatsAppHref ? (
                      <TelefoneLink
                        href={whatsAppHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Abrir WhatsApp"
                      >
                        <WhatsAppIcon />
                        {telFormatado}
                      </TelefoneLink>
                    ) : (
                      <TelefoneText>
                        <PhoneIcon />
                        {telFormatado || 'Sem telefone'}
                      </TelefoneText>
                    )}
                  </Info>

                  <Acoes>
                    <ActionButton
                      type="button"
                      aria-label={`Editar cliente ${cliente.nome}`}
                      title="Editar cliente"
                      onClick={() => abrirEditarCliente(cliente)}
                    >
                      <PencilIcon />
                    </ActionButton>

                    <ActionButton
                      type="button"
                      $danger
                      aria-label={`Excluir cliente ${cliente.nome}`}
                      title="Excluir cliente"
                      onClick={() => setClienteParaExcluir(cliente)}
                    >
                      <TrashIcon />
                    </ActionButton>
                  </Acoes>
                </ClienteCard>
              );
            })}
          </Lista>
        )}
      </PageBody>

      <ClienteModal
        open={modalAberto}
        onClose={fecharModal}
        cliente={clienteParaEdicao}
        onSuccess={recarregar}
      />

      <ConfirmDialog
        open={Boolean(clienteParaExcluir)}
        title="Excluir cliente?"
        description={`Esta ação remove permanentemente o cliente ${clienteParaExcluir?.nome ?? ''}.`}
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        destructive
        onConfirm={handleConfirmarExclusao}
        onCancel={() => setClienteParaExcluir(null)}
      />
    </>
  );
}

