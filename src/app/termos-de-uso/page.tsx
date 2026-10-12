import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições gerais de uso do site institucional do escritório.",
};

export default function TermsOfUsePage() {
  return (
    <main className="bg-cream py-28">
      <Container className="max-w-3xl">
        <Link href="/" className="text-sm text-green underline underline-offset-2">
          ← Voltar ao início
        </Link>

        <h1 className="mt-6 font-serif text-3xl text-green sm:text-4xl">
          Termos de Uso
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Última atualização: [INSERIR DATA]
        </p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-ink-soft">
          <p>
            {/* PLACEHOLDER — conteúdo a ser revisado por profissional habilitado */}
            Este site tem caráter meramente informativo e institucional,
            destinado à apresentação do {siteConfig.firmName} e de suas
            áreas de atuação, em conformidade com as normas de publicidade
            aplicáveis à advocacia (Provimento nº 205/2021 do Conselho
            Federal da OAB). Este texto é um placeholder e deve ser revisado
            por profissional habilitado antes da publicação em produção.
          </p>

          <h2 className="font-serif text-xl text-green">
            1. Caráter informativo
          </h2>
          <p>
            As informações disponibilizadas neste site não constituem
            consulta jurídica, parecer ou aconselhamento legal, tampouco
            garantem qualquer resultado. O contato através do formulário ou
            do WhatsApp é apenas o primeiro passo para uma eventual análise
            do caso pelo escritório.
          </p>

          <h2 className="font-serif text-xl text-green">
            2. Uso do formulário de contato
          </h2>
          <p>
            Ao preencher o formulário, o usuário declara que as informações
            fornecidas são verdadeiras e autoriza o contato pelo escritório,
            conforme descrito na Política de Privacidade.
          </p>

          <h2 className="font-serif text-xl text-green">
            3. Propriedade intelectual
          </h2>
          <p>
            Os textos, identidade visual e demais conteúdos deste site
            pertencem ao {siteConfig.firmName}, sendo vedada sua reprodução
            sem autorização prévia.
          </p>

          <h2 className="font-serif text-xl text-green">
            4. Alterações
          </h2>
          <p>
            Estes termos podem ser atualizados a qualquer momento, sem aviso
            prévio, para refletir alterações no site ou na legislação
            aplicável.
          </p>
        </div>
      </Container>
    </main>
  );
}
