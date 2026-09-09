"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "O Escritório", href: "#escritorio" },
  { label: "Áreas de Atuação", href: "#areas-de-atuacao" },
  { label: "Como Podemos Ajudar", href: "#como-ajudamos" },
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled || menuOpen
          ? "bg-cream/95 shadow-sm backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <a
          href="#inicio"
          className={cn(
            "min-w-0 shrink truncate font-serif text-lg tracking-wide transition-colors duration-300",
            scrolled || menuOpen ? "text-navy" : "text-cream",
          )}
        >
          {siteConfig.firmName}
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden shrink-0 items-center gap-6 xl:gap-8 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-300 xl:tracking-[0.14em]",
                scrolled
                  ? "text-ink-soft hover:text-navy"
                  : "text-cream/85 hover:text-cream",
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className={cn(
              "whitespace-nowrap rounded-sm border px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-300",
              scrolled
                ? "border-navy text-navy hover:bg-navy hover:text-cream"
                : "border-cream/60 text-cream hover:bg-cream hover:text-navy",
            )}
          >
            Fale conosco
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-sm lg:hidden",
            scrolled || menuOpen ? "text-navy" : "text-cream",
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
          "grid overflow-hidden bg-cream transition-[grid-template-rows] duration-300 ease-out lg:hidden",
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
                className="rounded-sm px-2 py-3 text-sm font-medium uppercase tracking-[0.1em] text-navy/90 transition-colors hover:bg-navy/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setMenuOpen(false)}
              className="mt-3 rounded-sm bg-navy px-4 py-3.5 text-center text-sm font-medium uppercase tracking-[0.1em] text-cream"
            >
              Fale conosco
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
