# Landing Page — Letícia Ribeiro Lino Costa (Advocacia)

Landing page institucional e de captação de leads para a advogada Letícia Ribeiro Lino Costa (OAB/SP 497.404), construída com Next.js (App Router), TypeScript e Tailwind CSS. Identidade visual (verde escuro + dourado) e dados de contato extraídos do cartão de visita oficial.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **React Hook Form + Zod** — validação de formulário (client e server)
- **lucide-react** — ícones

## Como executar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

Outros comandos:

```bash
npm run build   # build de produção
npm run start   # servir o build de produção
npm run lint    # eslint
npx tsc --noEmit  # checagem de tipos
```

## Estrutura do projeto

```
src/
  app/
    page.tsx                     # monta as seções da landing page
    layout.tsx                   # layout raiz, fontes e metadata
    api/leads/route.ts           # endpoint POST de captação de leads
    politica-de-privacidade/     # página LGPD
    termos-de-uso/               # página institucional
    sitemap.ts / robots.ts       # SEO
  components/
    layout/                      # Header, Footer
    sections/                    # Hero, About, PracticeAreas, Differentiators, HowWeHelp, Contact, ContactForm
    shared/                      # Logo, WhatsAppButton, WhatsAppFloatingButton, PracticeAreaCard, SocialIcon
    ui/                          # Button, Container, SectionTitle, Reveal (animação de entrada)
  data/
    site-config.ts               # ⚠️ configuração central do escritório
  lib/
    validation.ts                # schema Zod compartilhado (client + server)
    lead-service.ts              # camada de serviço para persistência futura dos leads
    phone-mask.ts / whatsapp.ts / utils.ts
```

## Configuração

Toda a informação institucional fica centralizada em **`src/data/site-config.ts`**.

### Já preenchido com dados reais do cartão de visita

- Nome (`firmName`/`shortName`), OAB/SP 497.404 (`oabInfo`);
- Tagline "Previdenciário · Cível · Criminal";
- Telefone/WhatsApp `(16) 98231-3310` e e-mail `leticialinocosta@hotmail.com`;
- `WHATSAPP_NUMBER = "5516982313310"` — usado por todos os botões de WhatsApp do site (header, hero, cards de áreas, seção de contato e botão flutuante) via `src/lib/whatsapp.ts`;
- As 3 áreas de atuação do cartão (`practiceAreas`): Direito Previdenciário, Direito Civil, Direito Criminal.

### Ainda precisa ser preenchido (não constava no cartão)

Campos marcados com `[INSERIR ...]` em `site-config.ts`:

- Endereço completo e horário de atendimento;
- Redes sociais (`social` está vazio — nenhum perfil foi informado).

### Textos institucionais

Os textos da seção "Sobre a advogada" (`src/components/sections/About.tsx`) e das páginas de Política de Privacidade e Termos de Uso são **placeholders** (marcados no texto) e devem ser revisados e aprovados pela advogada antes da publicação — em especial o conteúdo jurídico da Política de Privacidade (LGPD) e dos Termos de Uso.

### Foto institucional / logo

Não há foto ou arquivo de logo em alta resolução neste repositório — apenas as cores e o ícone de balança extraídos do cartão de visita (ver `src/components/shared/Logo.tsx` e `src/app/icon.tsx`). O espaço para a foto institucional está marcado visualmente na seção "Sobre" com um placeholder tracejado.

## Formulário de leads

O formulário (`ContactForm.tsx`) envia os dados para `POST /api/leads` (`src/app/api/leads/route.ts`), que hoje:

1. Valida os dados no servidor (schema compartilhado em `src/lib/validation.ts`);
2. Aplica um rate limit básico em memória por IP;
3. Descarta silenciosamente envios de bots (campo honeypot `website`);
4. Repassa o lead para `src/lib/lead-service.ts`.

**Nenhum dado é persistido ainda** — `receiveLead()` em `lead-service.ts` apenas registra o lead em log. Para conectar a um banco de dados, CRM, disparo de e-mail ou WhatsApp Business API, implemente a integração dentro dessa função (usando variáveis de ambiente para credenciais); nem o formulário, nem a rota, nem a validação precisam mudar.

## SEO

- Metadata (title/description/keywords/Open Graph) configurada em `src/app/layout.tsx`;
- `sitemap.ts` e `robots.ts` gerados dinamicamente;
- Dados estruturados `LegalService` (JSON-LD) em `src/app/page.tsx`;
- Defina `NEXT_PUBLIC_SITE_URL` no ambiente de produção para que a metadata, o sitemap e o robots apontem para o domínio correto.

## Acessibilidade e performance

- HTML semântico (`header`, `main`, `section`, `footer`), labels em todos os campos do formulário, `aria-label` em botões de ícone, foco visível customizado;
- Animações de entrada respeitam `prefers-reduced-motion`;
- Sem bibliotecas de animação pesadas; ícones via `lucide-react` (tree-shakeable).
