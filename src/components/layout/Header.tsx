"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site-config";
import { whatsappUrl } from "@/config/contact";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre mim", href: "#sobre" },
  { label: "Minha abordagem", href: "#abordagem" },
  { label: "Atendimento online", href: "#atendimento-online" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        solid ? "bg-offwhite/95 shadow-sm backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <Container className="flex h-20 max-w-7xl items-center justify-between gap-4">
        <a
          href="#inicio"
          className="flex min-w-0 shrink flex-col leading-tight"
          aria-label={`${siteConfig.fullName}, ${siteConfig.role}`}
        >
          <span
            className={cn(
              "truncate font-serif text-base leading-tight tracking-wide sm:text-lg",
              solid ? "text-olive-deep" : "text-white",
            )}
          >
            {siteConfig.fullName}
          </span>
          <span
            className={cn(
              "truncate text-[11px] uppercase tracking-[0.14em]",
              solid ? "text-muted" : "text-white/70",
            )}
          >
            {siteConfig.role} | {siteConfig.crp}
          </span>
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden shrink-0 items-center gap-4 lg:flex xl:gap-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-300 xl:tracking-[0.14em]",
                solid ? "text-muted hover:text-olive" : "text-white/85 hover:text-white",
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "whitespace-nowrap rounded-full border px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-300",
              solid
                ? "border-olive bg-olive text-white hover:bg-olive-deep"
                : "border-white/60 text-white hover:bg-white hover:text-olive-deep",
            )}
          >
            Agendar conversa
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
            solid ? "text-olive-deep" : "text-white",
          )}
        >
          {menuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden bg-offwhite transition-[grid-template-rows] duration-300 ease-out lg:hidden",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <nav
            aria-label="Navegação mobile"
            className="flex flex-col gap-1 px-6 pb-8 pt-2"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium uppercase tracking-[0.1em] text-olive-deep/90 transition-colors hover:bg-olive/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-3 rounded-full bg-olive px-4 py-3.5 text-center text-sm font-medium uppercase tracking-[0.1em] text-white"
            >
              Agendar conversa
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
