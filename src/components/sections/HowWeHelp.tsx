import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/sections/ContactForm";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

export default function HowWeHelp() {
  return (
    <section id="como-ajudamos" className="bg-cream py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <SectionTitle
              eyebrow="Como podemos ajudar"
              title="Precisa de orientação jurídica?"
              description="Conte brevemente o que está acontecendo. Nossa equipe poderá analisar as informações iniciais e orientar você sobre os próximos passos."
            />
            <div className="mt-8">
              <WhatsAppButton message="Olá! Gostaria de falar com o escritório sobre a minha situação.">
                Quero falar com o escritório
              </WhatsAppButton>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
