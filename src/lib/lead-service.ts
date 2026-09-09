import type { LeadFormValues } from "@/lib/validation";

/**
 * Camada de serviço isolada para o recebimento de leads.
 *
 * Nenhuma persistência real é feita aqui ainda — não existe banco de
 * dados, CRM ou e-mail configurado neste projeto. Esta função é o único
 * ponto de integração futura: para conectar um banco de dados, CRM,
 * disparo de e-mail ou WhatsApp Business API, implemente a chamada aqui
 * (usando variáveis de ambiente para quaisquer credenciais) e passe a
 * chamar essa função a partir de `src/app/api/leads/route.ts` sem
 * precisar alterar o formulário ou a validação.
 *
 * Exemplos de integração futura:
 * - Salvar em um banco de dados (Postgres, MongoDB, etc.);
 * - Enviar para um CRM (RD Station, Pipedrive, HubSpot);
 * - Disparar e-mail de notificação (Resend, SendGrid);
 * - Encaminhar para a API do WhatsApp Business.
 */
export async function receiveLead(lead: LeadFormValues): Promise<void> {
  console.log("[leads] Novo lead recebido:", {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    city: lead.city,
    practiceArea: lead.practiceArea,
  });
}
