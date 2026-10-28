'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';

import { AppShell } from '@/src/components/AppShell';
import { Loading } from '@/src/components/Loading';
import { obterToken, subscribeAuth } from '@/src/lib/auth';

function getServerSnapshot(): string | null {
  return null;
}

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useSyncExternalStore(
    subscribeAuth,
    obterToken,
    getServerSnapshot,
  );

  useEffect(() => {
    if (!token && !obterToken()) {
      router.replace('/login');
    }
  }, [router, token]);

  if (!token) {
    return <Loading label="Verificando credenciais…" />;
  }

  return <AppShell>{children}</AppShell>;
}
