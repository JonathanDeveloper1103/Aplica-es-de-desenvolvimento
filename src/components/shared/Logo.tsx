import { Scale } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Tom do texto/ícone: "onDark" para fundos verdes, "onLight" para fundo claro. */
  tone?: "onDark" | "onLight";
  full?: boolean;
}

/**
 * Retorna apenas os elementos internos (sem wrapper próprio) para que o
 * elemento pai seja o único container flex — necessário para que o texto
 * realmente encolha e trunque quando o espaço disponível diminui, em vez
 * de vazar por fora de um `inline-flex` aninhado com largura automática.
 */
export default function Logo({ tone = "onLight", full = false }: LogoProps) {
  return (
    <>
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
          tone === "onDark" ? "border-gold-light/60 text-gold-light" : "border-gold/60 text-gold",
        )}
      >
        <Scale className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span
        className={cn(
          "min-w-0 truncate font-serif text-lg leading-none tracking-wide",
          tone === "onDark" ? "text-cream" : "text-green",
        )}
      >
        {full ? siteConfig.firmName : siteConfig.shortName}
      </span>
    </>
  );
}
