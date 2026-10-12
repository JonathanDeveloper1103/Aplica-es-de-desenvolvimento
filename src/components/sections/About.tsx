import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site-config";

export default function About() {
  return (
    <section id="sobre" className="bg-offwhite py-24 sm:py-32">
      <Container className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Foto */}
        <Reveal className="lg:sticky lg:top-28">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[1.75rem] border border-beige bg-beige/40">
            <Image
              src={siteConfig.photos.portrait}
              alt={`Retrato de ${siteConfig.fullName}, ${siteConfig.role}`}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </Reveal>

        {/* Texto */}
        <Reveal delay={120}>
          <SectionTitle
            eyebrow="Sobre mim"
            title="Conheça minha trajetória"
            description="Uma prática orientada pela escuta, pelo respeito e pela singularidade de cada pessoa."
          />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
            {siteConfig.bioParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-beige bg-white px-5 py-2.5 text-sm font-medium text-olive-deep">
            <BadgeCheck className="h-4 w-4 text-olive" aria-hidden="true" />
            {siteConfig.role} | {siteConfig.crp}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
