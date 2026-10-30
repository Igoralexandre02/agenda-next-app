/** Mantém apenas os dígitos numéricos. */
export function apenasDigitos(valor: string | null | undefined): string {
  return (valor ?? '').replace(/\D/g, '');
}

/** Aplica a máscara padrão de CPF: 000.000.000-00 */
export function mascararCPF(valor: string): string {
  const digitos = apenasDigitos(valor).slice(0, 11);

  if (digitos.length <= 3) return digitos;
  if (digitos.length <= 6) {
    return `${digitos.slice(0, 3)}.${digitos.slice(3)}`;
  }
  if (digitos.length <= 9) {
    return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6)}`;
  }
  return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-${digitos.slice(9)}`;
}

/** Valida se possui os 11 dígitos de um CPF. */
export function cpfValido(valor: string | null | undefined): boolean {
  return apenasDigitos(valor).length === 11;
}

