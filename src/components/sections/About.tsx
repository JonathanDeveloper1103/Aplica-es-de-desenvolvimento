import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site-config";

export default function About() {
  return (
    <section id="escritorio" className="bg-cream py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <SectionTitle
            eyebrow="Sobre a advogada"
            title="Uma advocacia orientada por ética, estratégia e proximidade com o cliente."
          />
          <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-soft">
            <p>
              A advogada {siteConfig.firmName} atua com foco em oferecer
              atendimento jurídico próximo e personalizado, buscando
              compreender a fundo cada situação antes de indicar um caminho a
              seguir.
            </p>
            <p>
              O trabalho é conduzido com responsabilidade, ética e atenção aos
              detalhes, sempre em conformidade com as normas que regulamentam
              a advocacia. A busca é por soluções jurídicas adequadas à
              realidade de cada cliente, com comunicação clara em todas as
              etapas do processo.
            </p>
            <p className="text-sm text-ink-soft/70">{siteConfig.oabInfo}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border-soft bg-green/5">
            <Image
              src="/images/leticia-institucional.jpg"
              alt={`Retrato institucional da advogada ${siteConfig.firmName}`}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
