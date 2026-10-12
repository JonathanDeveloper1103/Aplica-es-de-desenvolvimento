/**
 * Aplica máscara de telefone brasileiro conforme o usuário digita:
 * (00) 0000-0000 ou (00) 00000-0000.
 */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits.replace(/^(\d*)/, "($1");
  if (digits.length <= 6)
    return digits.replace(/^(\d{2})(\d*)/, "($1) $2");
  if (digits.length <= 10)
    return digits.replace(/^(\d{2})(\d{4})(\d*)/, "($1) $2-$3");
  return digits.replace(/^(\d{2})(\d{5})(\d*)/, "($1) $2-$3");
}

export function unmaskPhone(value: string): string {
  return value.replace(/\D/g, "");
}
