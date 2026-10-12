import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como o escritório coleta, utiliza e protege os dados pessoais fornecidos através deste site.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-cream py-28">
      <Container className="max-w-3xl">
        <Link href="/" className="text-sm text-green underline underline-offset-2">
          ← Voltar ao início
        </Link>

        <h1 className="mt-6 font-serif text-3xl text-green sm:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Última atualização: 09 de setembro de 2026
        </p>

        <div className="prose-content mt-10 space-y-6 text-sm leading-relaxed text-ink-soft">
          <p>
            {/* PLACEHOLDER — conteúdo a ser revisado por profissional habilitado */}
            Esta Política de Privacidade descreve, de forma provisória, como
            o {siteConfig.firmName} pretende tratar os dados pessoais
            coletados através do formulário de contato deste site, em
            conformidade com a Lei Geral de Proteção de Dados (Lei nº
            13.709/2018 — LGPD). Este texto é um placeholder e deve ser
            revisado e finalizado por profissional habilitado antes da
            publicação em produção.
          </p>

          <h2 className="font-serif text-xl text-green">
            1. Dados coletados
          </h2>
          <p>
            Ao preencher o formulário de contato, coletamos: nome completo,
            telefone/WhatsApp, e-mail, cidade, área de interesse e a
            descrição da situação informada voluntariamente. Nenhum dado
            sensível é solicitado.
          </p>

          <h2 className="font-serif text-xl text-green">
            2. Finalidade do tratamento
          </h2>
          <p>
            Os dados fornecidos são utilizados exclusivamente para viabilizar
            o contato inicial e o atendimento pelo escritório, não sendo
            compartilhados com terceiros para fins comerciais.
          </p>

          <h2 className="font-serif text-xl text-green">
            3. Consentimento
          </h2>
          <p>
            O envio do formulário depende da autorização expressa do
            titular dos dados, marcada no próprio formulário antes do envio.
          </p>

          <h2 className="font-serif text-xl text-green">
            4. Direitos do titular
          </h2>
          <p>
            Nos termos da LGPD, o titular pode solicitar a qualquer momento
            a confirmação, o acesso, a correção ou a exclusão de seus dados
            pessoais, entrando em contato pelo e-mail{" "}
            <a href={`mailto:${siteConfig.email}`} className="underline">
              {siteConfig.email}
            </a>
            .
          </p>

          <h2 className="font-serif text-xl text-green">
            5. Contato
          </h2>
          <p>
            Em caso de dúvidas sobre esta política, entre em contato através
            dos canais informados na seção de contato deste site.
          </p>
        </div>
      </Container>
    </main>
  );
}
