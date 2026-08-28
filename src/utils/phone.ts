/** Aplica máscara de telefone brasileiro: "(69) 99999-9999" ou "(69) 9999-9999". */
export function mascararTelefone(valor: string): string {
  const digitos = valor.replace(/\D/g, '').slice(0, 11);

  if (digitos.length === 0) return '';
  if (digitos.length <= 2) return `(${digitos}`;
  if (digitos.length <= 6)
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

/** Mantém apenas os dígitos do telefone. */
export function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, '');
}

/** Valida se o telefone tem 10 ou 11 dígitos (fixo ou celular com DDD). */
export function telefoneValido(valor: string): boolean {
  const n = apenasDigitos(valor).length;
  return n === 10 || n === 11;
}

/** Link "tel:" a partir de um telefone mascarado. */
export function linkTelefone(valor: string): string {
  return `tel:+55${apenasDigitos(valor)}`;
}
