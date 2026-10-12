/**
 * Configuração central de contato do psicólogo.
 *
 * ÚNICO lugar para alterar o número do WhatsApp e a mensagem inicial.
 * Nunca espalhe o número ou a mensagem pelo restante do código — importe
 * `whatsappUrl` (ou `buildWhatsappUrl`) a partir daqui.
 */

// Apenas dígitos, no formato internacional: código do país (Brasil = 55)
// + DDD + número. Ex.: 55 + 16 + 997232427.
export const WHATSAPP_NUMBER = "5516997232427";

// Exibição amigável do telefone.
export const WHATSAPP_DISPLAY = "(16) 99723-2427";

// Mensagem inicial pré-preenchida ao abrir a conversa.
export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá, Vinícius! Conheci seu trabalho pelo site e gostaria de obter informações sobre o acompanhamento psicológico.";

/**
 * Monta um link do WhatsApp com a mensagem informada (ou a mensagem
 * padrão). A mensagem é sempre codificada para URL.
 */
export function buildWhatsappUrl(
  message: string = WHATSAPP_DEFAULT_MESSAGE,
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Link pronto com a mensagem padrão — usado na maioria dos botões.
export const whatsappUrl = buildWhatsappUrl();
