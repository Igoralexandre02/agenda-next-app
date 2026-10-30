import { LoginData, LoginResponse, User } from '@/src/types/user';
import { apiFetch } from './api';

export async function login(data: LoginData): Promise<LoginResponse> {
  const response = await apiFetch(`/api/auth/local`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('CPF ou senha inválidos');
  }

  return response.json();
}

export async function getMe(): Promise<User> {
  const response = await apiFetch('/api/users/me');

  if (!response.ok) {
    throw new Error('Sessão inválida');
  }

  return response.json();
}
