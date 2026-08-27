'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { login } from '@/src/data/auth';
import { salvarToken } from '@/src/lib/auth';

import {
  Container,
  Card,
  Title,
  Subtitle,
  Form,
  Field,
  Label,
  Input,
  ErrorMessage,
  Button,
  Header,
} from './LoginForm.styles';

export default function LoginForm() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setErro] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro('');
    setLoading(true);

    try {
      const resposta = await login({
        identifier,
        password,
      });

      salvarToken(resposta.jwt);

      router.replace('/');
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao realizar login',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Card>
        <Header>
          <Title>Entrar</Title>
          <Subtitle>
            Acesse o sistema de gerenciamento da barbearia
          </Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="email">E-mail</Label>

            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              required
            />
          </Field>

          <Field>
            <Label htmlFor="password">Senha</Label>

            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Field>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}