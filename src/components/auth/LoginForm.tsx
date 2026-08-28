'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/src/components/Button';
import { Input } from '@/src/components/Input';
import { entrar } from '@/src/services/auth.service';
import { USE_MOCK } from '@/src/services/config';
import { salvarToken } from '@/src/lib/auth';

import {
  Card,
  Container,
  ErrorMessage,
  Form,
  Header,
  Subtitle,
  Title,
} from './LoginForm.styles';

export default function LoginForm() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const resposta = await entrar({ identifier, password });
      salvarToken(resposta.jwt);
      router.replace('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao realizar login');
      setLoading(false);
    }
  }

  return (
    <Container>
      <Card>
        <Header>
          <Title>Entrar</Title>
          <Subtitle>Acesse o painel de agendamentos da barbearia</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Input
            id="identifier"
            label="CPF"
            placeholder={
              USE_MOCK ? 'Qualquer valor (modo demonstração)' : 'Digite seu CPF'
            }
            inputMode="numeric"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            autoComplete="username"
            required
          />

          <Input
            id="password"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error && <ErrorMessage role="alert">{error}</ErrorMessage>}

          <Button type="submit" size="lg" fullWidth loading={loading}>
            Entrar
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
