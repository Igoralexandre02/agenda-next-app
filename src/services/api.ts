import { obterToken } from '../lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function refreshAccessToken() {
  try {
    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Não foi possível renovar a sessão');
    }

    const data = await response.json();

    if (!data.jwt) {
      throw new Error('Token não retornado pelo servidor');
    }

    localStorage.setItem('token', data.jwt);

    return data.jwt;
  } catch (error) {
    encerrarSessao();
    throw error;
  }
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const makeRequest = (accessToken: string | null) => {
    const headers = new Headers(options.headers);

    headers.set('Content-Type', 'application/json');

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    } else {
      headers.delete('Authorization');
    }

    return fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers,
    });
  };

  let response = await makeRequest(obterToken());

  if (response.status !== 401) {
    return response;
  }

  // O token expirou: tenta renovar a sessão.
  let novoToken: string;

  try {
    novoToken = await refreshAccessToken();
  } catch (error) {
    // refreshAccessToken já encerra a sessão e redireciona.
    throw error;
  }

  // Repete a requisição original com o novo token.
  response = await makeRequest(novoToken);

  // Se o token renovado também for rejeitado, encerra a sessão.
  if (response.status === 401) {
    encerrarSessao();
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  return response;
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await apiFetch(endpoint);

  if (!response.ok) {
    throw new Error('Erro ao buscar dados');
  }

  return response.json();
}

export function encerrarSessao() {
  localStorage.removeItem('token');

  if (window.location.pathname !== '/login') {
    window.location.replace('/login');
  }
}

export async function obterMensagemErro(
  response: Response,
  mensagemPadrao: string,
): Promise<string> {
  const texto = await response.text();

  if (!texto) {
    return mensagemPadrao;
  }

  try {
    const json = JSON.parse(texto);
    return json?.error?.message ?? mensagemPadrao;
  } catch {
    return texto || mensagemPadrao;
  }
}
