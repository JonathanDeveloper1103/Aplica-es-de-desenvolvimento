import { Scale } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy pt-28 pb-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #faf8f4 1px, transparent 1px), linear-gradient(to bottom, #faf8f4 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <Scale
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 text-cream/[0.04]"
        strokeWidth={0.6}
      />

      <Container className="relative">
        <div className="max-w-2xl">
          <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">
            {siteConfig.tagline}
          </span>
          <h1 className="font-serif text-4xl leading-[1.15] text-cream sm:text-5xl lg:text-6xl">
            Atendimento jurídico com estratégia, segurança e compromisso.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
            Conte com orientação jurídica personalizada para compreender seus
            direitos e encontrar o melhor caminho para a sua situação.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={getWhatsAppLink()} variant="gold" target="_blank" rel="noopener noreferrer">
              Falar com o escritório
            </Button>
            <Button href="#escritorio" variant="outline-light">
              Conhecer o escritório
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
