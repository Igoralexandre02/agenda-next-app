
'use client';

import { AppShell } from '@/src/components/AppShell';
import { Loading } from '@/src/components/Loading';
import { obterToken } from '@/src/lib/auth';

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = obterToken();

  if (!token) {
    if (typeof window !== 'undefined') {
      window.location.replace('/login');
    }

    return <Loading label="Verificando credenciais…" />;
  }

  return <AppShell>{children}</AppShell>;
}
