import Link from "next/link";
import { MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/shared/Logo";
import { siteConfig } from "@/data/site-config";
import { whatsappUrl, WHATSAPP_DISPLAY } from "@/config/contact";

const FOOTER_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre mim", href: "#sobre" },
  { label: "Minha abordagem", href: "#abordagem" },
  { label: "Temas do acompanhamento", href: "#temas" },
  { label: "Atendimento online", href: "#atendimento-online" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-olive-deep text-white/70">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <Logo tone="onDark" full />
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            {siteConfig.role} | {siteConfig.crp}
          </p>
          <p className="mt-3 text-xs text-white/50">
            Acompanhamento psicológico humanizado, com contribuições da Análise
            Existencial e da Logoterapia.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
            Navegação
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
            Contato
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp · {WHATSAPP_DISPLAY}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
            Privacidade
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                href="/politica-de-privacidade"
                className="transition-colors hover:text-white"
              >
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.fullName}. Todos os direitos reservados.
          </p>
          <p className="max-w-xl sm:text-right">
            Este site tem caráter informativo e segue as normas de publicidade
            aplicáveis à Psicologia. Não constitui atendimento psicológico nem
            garante resultados.
          </p>
        </Container>
      </div>
    </footer>
  );
}
