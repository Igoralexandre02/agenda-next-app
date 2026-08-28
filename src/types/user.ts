export interface User {
  id: number;
  username: string;
  email: string;
  cpf: string;
}

export interface LoginResponse {
  jwt: string;
  user: User;
}

export interface LoginData {
  identifier: string;
  password: string;
}
