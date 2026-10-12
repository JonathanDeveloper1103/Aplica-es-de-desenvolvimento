import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site-config";

export default function Approach() {
  const { approach } = siteConfig;

  return (
    <section id="abordagem" className="bg-olive-deep py-24 text-white sm:py-32">
      <Container className="max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Foto */}
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-white/15 bg-olive">
              <Image
                src={siteConfig.photos.approach}
                alt={`${siteConfig.fullName} em seu espaço de atendimento`}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 384px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          {/* Título + intro */}
          <Reveal delay={120}>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-beige">
              Minha abordagem
            </span>
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              {approach.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {approach.intro}
            </p>
          </Reveal>
        </div>

        {/* Três blocos */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {approach.blocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <Reveal key={block.title} delay={index * 90}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition-colors duration-200 hover:bg-white/[0.07]">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-beige/40 text-beige">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl text-white">{block.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {block.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
