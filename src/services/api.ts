import { obterToken } from "../lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function refreshAccessToken() {
  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    localStorage.removeItem("token");
    throw new Error("Sessão expirada");
  }

  const data = await response.json();

  localStorage.setItem("token", data.jwt);

  return data.jwt;
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
) {
  let token = obterToken();

  const makeRequest = (accessToken: string | null) => {
    const headers = new Headers(options.headers);

    headers.set("Content-Type", "application/json");

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    } else {
      headers.delete("Authorization");
    }

    return fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers,
    });
  };

  let response = await makeRequest(token);

  if (response.status !== 401) {
    return response;
  }

  // Access token expirou
  token = await refreshAccessToken();

  // Tenta novamente
  response = await makeRequest(token);

  return response;
}