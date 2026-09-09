# Landing Page — Letícia Ribeiro Lino Costa (Advocacia)

Landing page institucional e de captação de leads para a advogada Letícia Ribeiro Lino Costa (OAB/SP 497.404), construída com Next.js (App Router), TypeScript e Tailwind CSS. Identidade visual (verde escuro + dourado) e dados de contato extraídos do cartão de visita oficial.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **React Hook Form + Zod** — validação de formulário (client e server)
- **lucide-react** — ícones
- **Resend** — envio do e-mail de notificação de novos leads

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
    lead-service.ts              # envia o e-mail de notificação do lead (Resend) + log
    phone-mask.ts / whatsapp.ts / utils.ts
```

## Configuração

Toda a informação institucional fica centralizada em **`src/data/site-config.ts`**.

### Já preenchido

- Nome (`firmName`/`shortName`), OAB/SP 497.404 (`oabInfo`);
- Tagline "Previdenciário · Cível · Criminal";
- Telefone/WhatsApp `(16) 99171-7064` e e-mail `leticialinocosta@hotmail.com`;
- `WHATSAPP_NUMBER = "5516991717064"` — usado por todos os botões de WhatsApp do site (header, hero, cards de áreas, seção de contato e botão flutuante) via `src/lib/whatsapp.ts`;
- Endereço (Rua Jacinto Felizardo Barbosa, 750, Centro — Miguelópolis/SP) e horário de atendimento (segunda a sexta, 9h às 17h);
- As 3 áreas de atuação do cartão (`practiceAreas`): Direito Previdenciário, Direito Civil, Direito Criminal;
- Foto institucional em `public/images/leticia-institucional.jpg`, usada na seção "Sobre a advogada".

### Ainda precisa ser preenchido

- CEP (`address.zip` em `site-config.ts`, marcado como `[INSERIR CEP]`);
- Redes sociais (`social` está vazio — nenhum perfil foi informado).

### Textos institucionais

Os textos da seção "Sobre a advogada" (`src/components/sections/About.tsx`) e das páginas de Política de Privacidade e Termos de Uso devem ser revisados e aprovados pela advogada antes da publicação — em especial o conteúdo jurídico da Política de Privacidade (LGPD) e dos Termos de Uso, que seguem marcados como texto provisório.

## Formulário de leads

O formulário (`ContactForm.tsx`) envia os dados para `POST /api/leads` (`src/app/api/leads/route.ts`), que:

1. Valida os dados no servidor (schema compartilhado em `src/lib/validation.ts`);
2. Aplica um rate limit básico em memória por IP;
3. Descarta silenciosamente envios de bots (campo honeypot `website`);
4. Repassa o lead para `src/lib/lead-service.ts`, que registra o lead no log do servidor e envia um e-mail de notificação via Resend para `siteConfig.email`.

**Não existe banco de dados** — o lead não fica salvo em lugar nenhum além do e-mail recebido e do log do servidor (visível na aba "Logs" do projeto na Vercel). Para conectar um banco de dados, CRM ou a API do WhatsApp Business, implemente a integração dentro de `receiveLead()`; nem o formulário, nem a rota, nem a validação precisam mudar.

### Configurar o envio de e-mail (Resend)

1. Crie uma conta gratuita em [resend.com](https://resend.com) **usando o e-mail `leticialinocosta@hotmail.com`** — sem domínio próprio verificado, o Resend só entrega e-mails de teste para o endereço com o qual a conta foi criada, e é exatamente esse o destinatário das notificações.
2. No painel, vá em **API Keys → Create API Key** e copie a chave gerada (começa com `re_`).
3. Adicione a variável de ambiente:
   - **Localmente**: copie `.env.example` para `.env.local` e cole a chave em `RESEND_API_KEY`.
   - **Na Vercel**: **Project Settings → Environment Variables** → adicione `RESEND_API_KEY` com o mesmo valor, e faça um redeploy.
4. Pronto — a partir daí, todo envio do formulário chega por e-mail na caixa de entrada da advogada, com **Responder** já configurado para o e-mail de quem preencheu o formulário.

Sem essa chave configurada, o site continua funcionando normalmente (o formulário envia e recebe a mensagem de sucesso), só que nenhum e-mail é disparado — o lead fica registrado apenas no log do servidor.

## SEO

- Metadata (title/description/keywords/Open Graph) configurada em `src/app/layout.tsx`;
- `sitemap.ts` e `robots.ts` gerados dinamicamente;
- Dados estruturados `LegalService` (JSON-LD) em `src/app/page.tsx`;
- Defina `NEXT_PUBLIC_SITE_URL` no ambiente de produção para que a metadata, o sitemap e o robots apontem para o domínio correto.

## Acessibilidade e performance

- HTML semântico (`header`, `main`, `section`, `footer`), labels em todos os campos do formulário, `aria-label` em botões de ícone, foco visível customizado;
- Animações de entrada respeitam `prefers-reduced-motion`;
- Sem bibliotecas de animação pesadas; ícones via `lucide-react` (tree-shakeable).
