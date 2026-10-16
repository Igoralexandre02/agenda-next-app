'use client';

import { useCallback, useEffect, useState } from 'react';

import { getClientes } from '@/src/services/clientes.service';
import { Cliente } from '../types/cliente';

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function carregarClientes() {
      try {
        setLoading(true);
        setError('');

        const response = await getClientes();

        if (ativo) {
          setClientes(response);
        }
      } catch (err) {
        if (ativo) {
          setError(
            err instanceof Error
              ? err.message
              : 'Não foi possível carregar os clientes',
          );
        }
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    carregarClientes();

    return () => {
      ativo = false;
    };
  }, [versao]);

  const recarregar = useCallback(() => setVersao((v) => v + 1), []);

  return {
    clientes,
    loading,
    error,
    recarregar,
  };
}

