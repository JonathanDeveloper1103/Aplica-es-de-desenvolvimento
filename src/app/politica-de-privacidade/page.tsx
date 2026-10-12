import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site-config";
import { WHATSAPP_DISPLAY } from "@/config/contact";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como este site trata os dados pessoais e qual o papel do contato realizado pelo WhatsApp.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-offwhite py-28">
      <Container className="max-w-3xl">
        <Link href="/" className="text-sm text-olive underline underline-offset-2">
          ← Voltar ao início
        </Link>

        <h1 className="mt-6 font-serif text-3xl text-olive-deep sm:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-2 text-sm text-muted">
          {siteConfig.fullName} — {siteConfig.role} | {siteConfig.crp}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted">
          <section className="space-y-3">
            <p>
              Este site tem caráter informativo e apresenta a atuação
              profissional de {siteConfig.fullName}. Ele foi desenvolvido para
              priorizar a privacidade dos visitantes e não coleta dados pessoais
              por meio de formulários.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-olive-deep">
              1. Dados coletados neste site
            </h2>
            <p>
              Este site <strong>não possui formulários de contato</strong> e
              não solicita nome, e-mail, telefone ou informações sobre saúde. A
              navegação não exige cadastro.
            </p>
            <p>
              O contato é realizado diretamente pelo WhatsApp, por iniciativa do
              próprio visitante, ao clicar em um dos botões de contato
              (WhatsApp: {WHATSAPP_DISPLAY}).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-olive-deep">
              2. Contato pelo WhatsApp
            </h2>
            <p>
              Ao iniciar uma conversa pelo WhatsApp, as informações que você
              decidir compartilhar são tratadas no âmbito desse aplicativo,
              conforme a política de privacidade do próprio WhatsApp, e
              utilizadas exclusivamente para responder ao seu contato e, quando
              for o caso, orientar sobre o acompanhamento psicológico.
            </p>
            <p>
              Eventuais informações compartilhadas durante o atendimento
              psicológico são protegidas pelo sigilo profissional, conforme o
              Código de Ética Profissional do Psicólogo.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-olive-deep">
              3. Cookies e rastreadores
            </h2>
            <p>
              Este site não utiliza cookies de rastreamento, pixels de
              publicidade ou ferramentas de análise que identifiquem o
              visitante. Caso esse cenário mude, esta política será atualizada e
              os requisitos de consentimento aplicáveis serão observados.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-olive-deep">
              4. Seus direitos (LGPD)
            </h2>
            <p>
              Nos termos da Lei Geral de Proteção de Dados (Lei nº
              13.709/2018), você pode solicitar informações sobre eventuais
              dados pessoais tratados em decorrência de um contato, bem como sua
              correção ou exclusão. Para isso, basta entrar em contato pelo
              WhatsApp informado neste site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-olive-deep">5. Atualizações</h2>
            <p>
              Esta Política de Privacidade pode ser atualizada a qualquer
              momento para refletir mudanças no site ou na legislação aplicável.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
