'use client';

import { useEffect, useState } from 'react';

import { getStatus } from '@/src/services/status.service';
import type { Status } from '@/src/types/status';

export function useStatus() {
  const [status, setStatus] = useState<Status[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function carregarStatus() {
      try {
        setLoading(true);

        const response = await getStatus();

        setStatus(response);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Não foi possível carregar os status',
        );
      } finally {
        setLoading(false);
      }
    }

    carregarStatus();
  }, []);

  return {
    status,
    loading,
    error,
  };
}
