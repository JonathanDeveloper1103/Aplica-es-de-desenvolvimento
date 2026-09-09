import { Resend } from "resend";
import type { LeadFormValues } from "@/lib/validation";
import { siteConfig } from "@/data/site-config";

/**
 * Camada de serviço isolada para o recebimento de leads.
 *
 * Não existe banco de dados ou CRM conectado ainda — o único canal de
 * entrega hoje é o e-mail de notificação via Resend. Para trocar ou
 * adicionar um destino (banco de dados, CRM, WhatsApp Business API),
 * implemente a chamada aqui e continue chamando esta função a partir de
 * `src/app/api/leads/route.ts`, sem precisar alterar o formulário ou a
 * validação.
 *
 * RESEND_API_KEY precisa estar configurada (variável de ambiente) para
 * o e-mail ser enviado. Sem ela, o lead ainda é registrado no log do
 * servidor, mas nenhum e-mail é disparado.
 */

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Remetente do domínio de testes do Resend — funciona sem verificar
// domínio próprio, desde que o destinatário seja o e-mail com o qual a
// conta Resend foi criada (ver README para detalhes).
const FROM_ADDRESS = "Site Letícia Lino Costa <onboarding@resend.dev>";

function buildEmailHtml(lead: LeadFormValues): string {
  const rows: [string, string][] = [
    ["Nome completo", lead.name],
    ["WhatsApp", lead.phone],
    ["E-mail", lead.email],
    ["Cidade", lead.city],
    ["Área de interesse", lead.practiceArea],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;color:#4b5563;font-size:13px;white-space:nowrap;">${label}</td>
          <td style="padding:8px 12px;color:#1c2530;font-size:13px;">${value}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;">
      <h2 style="color:#123a2c;font-size:18px;">Novo contato pelo site</h2>
      <table style="width:100%;border-collapse:collapse;background:#f7f6f1;border-radius:4px;">
        ${rowsHtml}
      </table>
      <p style="color:#4b5563;font-size:13px;margin-top:16px;"><strong>Mensagem:</strong></p>
      <p style="color:#1c2530;font-size:13px;white-space:pre-wrap;">${lead.message}</p>
    </div>
  `;
}

export async function receiveLead(lead: LeadFormValues): Promise<void> {
  console.log("[leads] Novo lead recebido:", {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    city: lead.city,
    practiceArea: lead.practiceArea,
  });

  if (!resend) {
    console.warn(
      "[leads] RESEND_API_KEY não configurada — e-mail de notificação não enviado.",
    );
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: siteConfig.email,
      replyTo: lead.email,
      subject: `Novo contato pelo site — ${lead.name}`,
      html: buildEmailHtml(lead),
    });
  } catch (error) {
    console.error("[leads] Falha ao enviar e-mail de notificação:", error);
  }
}
