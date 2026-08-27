import { LoginData, LoginResponse, User } from '@/src/types/user';

const API_URL = process.env.NEXT_LOCAL_API_URL;

export async function login(
  data: LoginData
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/api/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('E-mail ou senha inválidos');
  }

  return response.json();
}

export async function getMe(token: string): Promise<User> {
  const response = await fetch(`${API_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Sessão inválida');
  }

  return response.json();
}