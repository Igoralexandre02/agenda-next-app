'use client';

import { useEffect, useState } from 'react';

import { AppShell } from '@/src/components/AppShell';
import { Loading } from '@/src/components/Loading';
import { obterToken } from '@/src/lib/auth';

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    if (!obterToken()) {
      window.location.replace('/login');
      return;
    }

    setVerificando(false);
  }, []);

  if (verificando) {
    return <Loading label="Verificando credenciais…" />;
  }

  return <AppShell>{children}</AppShell>;
}
