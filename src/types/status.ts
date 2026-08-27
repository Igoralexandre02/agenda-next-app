export interface Status {
  id: number;
  Nome: string;
  createdAt: string;
  updatedAt: string;
}

export interface CriarStatus {
  Nome: string;
}

export interface EditarStatus {
  Nome?: string;
}
