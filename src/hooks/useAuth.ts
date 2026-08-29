'use client';

import { useEffect, useState } from 'react';

import { getMe } from '@/src/services/auth.service';
import { obterToken, removerToken } from '@/src/lib/auth';
import type { User } from '@/src/types/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function verificarAutenticacao() {
      const token = obterToken();

      if (!token) {
        if (ativo) setLoading(false);
        return;
      }

      try {
        const usuario = await getMe();
        if (ativo) setUser(usuario);
      } catch {
        removerToken();
        if (ativo) setUser(null);
      } finally {
        if (ativo) setLoading(false);
      }
    }

    verificarAutenticacao();

    return () => {
      ativo = false;
    };
  }, []);

  return {
    user,
    loading,
    autenticado: !!user,
  };
}
