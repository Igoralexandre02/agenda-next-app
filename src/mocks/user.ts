import type { User } from '@/src/types/user';

/** Usuário fictício usado quando a aplicação roda em modo mock. */
export const usuarioMock: User = {
  id: 1,
  username: 'Barbeiro',
  email: 'barbeiro@barbearia.dev',
  cpf: '00000000000',
};

export const TOKEN_MOCK = 'mock-token';
