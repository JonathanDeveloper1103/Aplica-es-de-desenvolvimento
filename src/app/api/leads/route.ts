import { NextResponse, type NextRequest } from "next/server";
import { leadSchema } from "@/lib/validation";
import { receiveLead } from "@/lib/lead-service";

/**
 * Limitador de taxa em memória, por IP.
 *
 * É apenas uma proteção básica contra spam e reinicia a cada deploy ou
 * instância — não substitui um rate limiter real (Redis, Upstash, etc.)
 * em produção, especialmente em ambientes serverless com múltiplas
 * instâncias.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Não foi possível ler os dados enviados." },
      { status: 400 },
    );
  }

  const result = leadSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Dados inválidos. Verifique os campos e tente novamente.",
      },
      { status: 400 },
    );
  }

  // Honeypot preenchido: comportamento de bot. Responde como sucesso
  // (sem processar) para não revelar o mecanismo de proteção.
  if (result.data.website) {
    return NextResponse.json({ success: true, message: "Recebido." });
  }

  try {
    await receiveLead(result.data);
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Não foi possível processar sua solicitação. Tente novamente.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Mensagem recebida com sucesso.",
  });
}
