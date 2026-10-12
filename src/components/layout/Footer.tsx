import Link from "next/link";
import Container from "@/components/ui/Container";
import SocialIcon from "@/components/shared/SocialIcon";
import Logo from "@/components/shared/Logo";
import { siteConfig } from "@/data/site-config";

const FOOTER_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "O Escritório", href: "#escritorio" },
  { label: "Áreas de Atuação", href: "#areas-de-atuacao" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-dark text-cream/70">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Logo tone="onDark" full />
          </div>
          <p className="mt-4 text-sm leading-relaxed">{siteConfig.tagline}</p>
          <p className="mt-3 text-xs text-cream/50">{siteConfig.oabInfo}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cream/50">
            Navegação
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-cream">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cream/50">
            Contato
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>{siteConfig.phoneDisplay}</li>
            <li>{siteConfig.email}</li>
            <li>
              {siteConfig.address.city}/{siteConfig.address.state}
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cream/50">
            Institucional
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/politica-de-privacidade" className="transition-colors hover:text-cream">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/termos-de-uso" className="transition-colors hover:text-cream">
                Termos de Uso
              </Link>
            </li>
          </ul>

          {siteConfig.social.length > 0 && (
            <div className="mt-5 flex gap-3">
              {siteConfig.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold"
                >
                  <SocialIcon name={social.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.firmName}. Todos os direitos reservados.
          </p>
          <p className="max-w-xl sm:text-right">
            Esta página tem caráter meramente informativo e institucional,
            em conformidade com as normas de publicidade da advocacia. Não
            constitui consulta jurídica nem garante resultado de qualquer
            natureza.
          </p>
        </Container>
      </div>
    </footer>
  );
}
