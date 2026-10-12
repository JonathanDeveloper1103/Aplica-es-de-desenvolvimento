import Image from "next/image";
import { Leaf } from "lucide-react";
import Container from "@/components/ui/Container";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { siteConfig } from "@/data/site-config";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-olive-deep pt-28 pb-20 sm:pt-32 lg:pb-28"
    >
      {/* Textura orgânica discreta */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--color-beige) 0, transparent 45%), radial-gradient(circle at 85% 70%, var(--color-olive-soft) 0, transparent 40%)",
        }}
      />
      <Leaf
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-[380px] w-[380px] text-white/[0.04]"
        strokeWidth={0.5}
      />

      <Container className="relative max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Coluna esquerda — texto */}
          <div className="order-2 lg:order-1">
            <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-beige">
              {siteConfig.eyebrow}
            </span>
            <h1 className="font-serif text-[2rem] leading-[1.18] text-white sm:text-5xl lg:text-[3.3rem] lg:leading-[1.12]">
              {siteConfig.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {siteConfig.heroSupport}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <WhatsAppButton>Entre em contato pelo WhatsApp</WhatsAppButton>
              <a
                href="#sobre"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
              >
                Conhecer a trajetória
              </a>
            </div>

            <p className="mt-7 text-sm leading-relaxed text-white/60">
              {siteConfig.heroHelper}
            </p>
          </div>

          {/* Coluna direita — foto */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/15 bg-olive shadow-xl shadow-black/20 lg:ml-auto">
              <Image
                src={siteConfig.photos.hero}
                alt={`${siteConfig.fullName}, ${siteConfig.role} — ${siteConfig.crp}`}
                fill
                priority
                sizes="(min-width: 1024px) 448px, (min-width: 640px) 448px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
