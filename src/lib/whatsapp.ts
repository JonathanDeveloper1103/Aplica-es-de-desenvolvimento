import { buildWhatsappUrl, WHATSAPP_DEFAULT_MESSAGE } from "@/config/contact";

/**
 * Compatibilidade / conveniência: retorna o link do WhatsApp com a
 * mensagem informada. A configuração real (número e mensagem) vive em
 * `src/config/contact.ts`.
 */
export function getWhatsAppLink(
  message: string = WHATSAPP_DEFAULT_MESSAGE,
): string {
  return buildWhatsappUrl(message);
}
