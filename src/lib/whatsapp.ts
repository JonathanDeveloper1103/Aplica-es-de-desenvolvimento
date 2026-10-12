import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_NUMBER } from "@/data/site-config";

export function getWhatsAppLink(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
