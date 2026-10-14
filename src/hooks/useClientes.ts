'use client';

import { useEffect, useState } from 'react';

import { getClientes } from '@/src/services/clientes.service';
import { Cliente } from '../types/cliente';

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function carregarClientes() {
      try {
        setLoading(true);

        const response = await getClientes();

        setClientes(response);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Não foi possível carregar os clientes',
        );
      } finally {
        setLoading(false);
      }
    }

    carregarClientes();
  }, []);

  return {
    clientes,
    loading,
    error,
  };
}
