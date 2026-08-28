/**
 * Alterna entre a camada mock (padrão) e a API real (Strapi).
 *
 * Defina `NEXT_PUBLIC_USE_MOCK=false` no `.env.local` para usar o backend.
 */
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:1337';
