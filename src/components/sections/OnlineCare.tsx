import { MonitorSmartphone } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { siteConfig } from "@/data/site-config";

export default function OnlineCare() {
  const { onlineCare } = siteConfig;

  return (
    <section id="atendimento-online" className="bg-offwhite py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-beige bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-olive">
              <MonitorSmartphone className="h-4 w-4" aria-hidden="true" />
              Atendimento online
            </span>
            <SectionTitle
              title={onlineCare.title}
              description={onlineCare.intro}
              align="center"
              className="mx-auto"
            />
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {onlineCare.benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={index * 70}>
                <div className="flex h-full gap-4 rounded-2xl border border-beige bg-white p-6 transition-colors duration-200 hover:border-olive-soft">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-offwhite text-olive">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg leading-snug text-olive-deep">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-5 text-center">
            <p className="text-sm text-muted">{onlineCare.note}</p>
            <WhatsAppButton message="Olá, Vinícius! Gostaria de saber como funciona o atendimento psicológico online.">
              Agendar atendimento online
            </WhatsAppButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
