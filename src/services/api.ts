import { obterToken } from "../lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function refreshAccessToken() {
  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Sessão expirada');
  }

  const data = await response.json();

  localStorage.setItem('token', data.jwt);

  return data.jwt;
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
) {
  let token = obterToken();

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 401) {
    return response;
  }

  // Access token expirou
  token = await refreshAccessToken();

  // Tenta novamente a requisição
  response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response;
}