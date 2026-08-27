'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingContainer, Spinner, LoadingText } from '@/src/components/auth/LoginForm.styles';

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.replace('/login');
      return;
    }

    setVerificando(false);
  }, [router]);

  if (verificando) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>Verificando credenciais...</LoadingText>
      </LoadingContainer>
    );
  }

  return <>{children}</>;
}