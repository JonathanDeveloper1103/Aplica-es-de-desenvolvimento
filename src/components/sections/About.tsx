import { Scale } from "lucide-react";
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
              {/* PLACEHOLDER — substituir por texto institucional real revisado pela advogada */}
              A advogada {siteConfig.firmName} atua com foco em oferecer
              atendimento jurídico próximo e personalizado, buscando
              compreender a fundo cada situação antes de indicar um caminho a
              seguir. PLACEHOLDER.
            </p>
            <p>
              {/* PLACEHOLDER — substituir por texto institucional real revisado pela advogada */}
              O trabalho é conduzido com responsabilidade, ética e atenção aos
              detalhes, sempre em conformidade com as normas que regulamentam
              a advocacia. A busca é por soluções jurídicas adequadas à
              realidade de cada cliente, com comunicação clara em todas as
              etapas do processo. PLACEHOLDER.
            </p>
            <p className="text-sm text-ink-soft/70">{siteConfig.oabInfo}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative flex aspect-[4/5] w-full items-center justify-center rounded-sm border border-dashed border-green/20 bg-green/[0.03] p-10 text-center">
            <div className="flex flex-col items-center gap-4 text-green/40">
              <Scale className="h-12 w-12" strokeWidth={1} aria-hidden="true" />
              <p className="max-w-[220px] text-sm leading-relaxed">
                Espaço reservado para foto institucional da advogada
                <br />
                <span className="text-xs uppercase tracking-wide">
                  [INSERIR IMAGEM]
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
