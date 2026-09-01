/**
 * Geração de link "click-to-chat" do WhatsApp (https://wa.me).
 *
 * Nenhuma integração com a API oficial por enquanto — apenas abrimos o WhatsApp
 * com a mensagem pré-preenchida. Quando a API oficial entrar, a origem dos
 * dados (agendamento) e a montagem da mensagem permanecem; só o "envio" muda:
 * troca-se `window.open(gerarLinkWhatsApp(...))` por uma chamada de serviço.
 */

import { formatarHorario } from './date';
import { apenasDigitos } from './phone';

const DDI_BRASIL = '55';

/**
 * Mensagem de lembrete montada dinamicamente a partir dos dados reais do
 * agendamento. O cron só cria notificação para cortes do próprio dia, por isso
 * a mensagem fala em "hoje".
 */
export function gerarMensagemLembrete(nome: string, horario: string): string {
  return `Olá, ${nome}! Passando para lembrar que seu corte está agendado para hoje às ${formatarHorario(
    horario,
  )}.`;
}

/** Normaliza o número para o formato aceito pelo wa.me (DDI + DDD + número). */
export function normalizarNumeroWhatsApp(numero: string): string {
  const digitos = apenasDigitos(numero);

  if (!digitos) return '';

  return digitos.startsWith(DDI_BRASIL) ? digitos : `${DDI_BRASIL}${digitos}`;
}

/**
 * Link final para abrir a conversa no WhatsApp com a mensagem pré-preenchida.
 * Retorna `null` quando não há número utilizável.
 */
export function gerarLinkWhatsApp(
  numero: string,
  mensagem: string,
): string | null {
  const telefone = normalizarNumeroWhatsApp(numero);

  if (!telefone) return null;

  return `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
}
