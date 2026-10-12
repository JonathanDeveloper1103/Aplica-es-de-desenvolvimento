import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Tom do texto/ícone: "onDark" para fundos verdes, "onLight" para fundo claro. */
  tone?: "onDark" | "onLight";
  /** Exibe o nome completo (rodapé) em vez do nome curto. */
  full?: boolean;
}

/**
 * Marca do profissional: um monograma orgânico (folha estilizada) + nome.
 * Retorna apenas os elementos internos (sem wrapper próprio) para que o
 * elemento pai seja o único container flex — necessário para que o nome
 * realmente encolha e trunque quando o espaço disponível diminui.
 */
export default function Logo({ tone = "onLight", full = false }: LogoProps) {
  const onDark = tone === "onDark";

  return (
    <>
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
          onDark ? "border-white/40 text-white" : "border-olive/40 text-olive",
        )}
        aria-hidden="true"
      >
        {/* Folha orgânica minimalista */}
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
          <path
            d="M20 4C11 4 5 9 5 16c0 1.5.3 2.8.8 4C10 16 14 13 19 12c-4 2.3-7 5.3-9.2 9.3 1 .4 2 .7 3.2.7 7 0 11-6 11-14 0-1.4-.2-2.7-.5-4H20z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
      </span>
      <span
        className={cn(
          "min-w-0 truncate font-serif text-lg leading-none tracking-wide",
          onDark ? "text-white" : "text-olive-deep",
        )}
      >
        {full ? siteConfig.fullName : siteConfig.shortName}
      </span>
    </>
  );
}
