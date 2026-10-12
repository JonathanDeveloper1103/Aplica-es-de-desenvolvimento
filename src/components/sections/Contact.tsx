import { Leaf } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { WHATSAPP_DISPLAY } from "@/config/contact";

export default function Contact() {
  return (
    <section id="contato" className="bg-offwhite py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-olive px-6 py-16 text-center text-white sm:px-12 sm:py-20">
            <Leaf
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-white/[0.06]"
              strokeWidth={0.5}
            />
            <Leaf
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-12 -left-10 h-56 w-56 text-white/[0.06]"
              strokeWidth={0.5}
            />

            <div className="relative">
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-beige">
                Contato
              </span>
              <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl">
                Você não precisa organizar tudo sozinho para começar uma
                conversa.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80">
                Se deseja conhecer melhor o trabalho e obter informações sobre o
                acompanhamento psicológico, entre em contato para conversar
                sobre as possibilidades de atendimento.
              </p>

              <div className="mt-9 flex justify-center">
                <WhatsAppButton className="text-base">
                  Conversar pelo WhatsApp
                </WhatsAppButton>
              </div>

              <p className="mt-6 text-sm text-white/60">
                WhatsApp: {WHATSAPP_DISPLAY}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
