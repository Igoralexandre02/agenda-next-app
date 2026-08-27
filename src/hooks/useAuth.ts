'use client';

import { useEffect, useState } from 'react';
import { getMe } from '@/src/data/auth';
import {
  obterToken,
  removerToken,
} from '@/src/lib/auth';
import type { User } from '@/src/types/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verificarAutenticacao() {
      const token = obterToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const usuario = await getMe(token);

        setUser(usuario);
      } catch {
        removerToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    verificarAutenticacao();
  }, []);

  return {
    user,
    loading,
    autenticado: !!user,
  };
}