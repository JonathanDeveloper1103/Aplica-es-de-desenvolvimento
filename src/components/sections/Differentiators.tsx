import { CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site-config";

export default function Differentiators() {
  return (
    <section className="bg-navy py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Diferenciais"
            title="O que orienta o nosso atendimento"
            light
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.differentiators.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <div className="flex gap-4">
                <CheckCircle2
                  className="mt-1 h-5 w-5 shrink-0 text-gold-light"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-serif text-lg text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
