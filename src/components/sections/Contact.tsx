import { Mail, MapPin, Clock, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { siteConfig } from "@/data/site-config";

const contactItems = [
  {
    icon: Phone,
    label: "Telefone",
    value: siteConfig.phoneDisplay,
    href: `tel:${siteConfig.phone.replace(/\D/g, "")}`,
  },
  {
    icon: Mail,
    label: "E-mail",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: "Endereço",
    value: `${siteConfig.address.street}, ${siteConfig.address.complement} — ${siteConfig.address.city}/${siteConfig.address.state}`,
  },
  {
    icon: Clock,
    label: "Atendimento",
    value: siteConfig.businessHours,
  },
];

export default function Contact() {
  return (
    <section id="contato" className="bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Contato"
            title="Fale diretamente com o escritório"
            description="Estamos disponíveis pelos canais abaixo para o primeiro contato. Você também pode utilizar o formulário acima a qualquer momento."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-2">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green/5 text-green">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-green">
                    {item.value}
                  </p>
                </div>
              </div>
            );

            return (
              <Reveal key={item.label} delay={index * 60}>
                {item.href ? (
                  <a href={item.href} className="block transition-opacity hover:opacity-80">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mx-auto mt-14 flex max-w-4xl flex-col items-center gap-4 border-t border-border-soft pt-14 text-center">
            <p className="text-sm text-ink-soft">
              Prefere falar agora? Envie uma mensagem pelo WhatsApp.
            </p>
            <WhatsAppButton />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
