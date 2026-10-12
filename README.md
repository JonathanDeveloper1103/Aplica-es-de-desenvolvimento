# Landing Page — Vinícius Tomaz Lacerda Silva (Psicólogo)

Landing page institucional e de conversão para o psicólogo **Vinícius Tomaz
Lacerda Silva** (CRP 06/180116), com foco em apresentar sua trajetória,
transmitir confiança e facilitar o contato pelo WhatsApp. Construída com
Next.js (App Router), TypeScript e Tailwind CSS. Identidade visual em
verde-oliva, branco e tons naturais.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **lucide-react** — ícones
- Sem formulários, sem banco de dados, sem rastreadores. O contato é feito
  diretamente pelo WhatsApp.

## Como executar

```bash
npm install
npm run dev
```

O site fica disponível em `http://localhost:3000`.

Outros comandos:

```bash
npm run build   # build de produção
npm run start   # serve o build
npm run lint    # ESLint
```

## Onde alterar o WhatsApp

Toda a configuração de contato está centralizada em
[`src/config/contact.ts`](src/config/contact.ts):

- `WHATSAPP_NUMBER` — número no formato internacional (`5516997232427`)
- `WHATSAPP_DISPLAY` — exibição amigável (`(16) 99723-2427`)
- `WHATSAPP_DEFAULT_MESSAGE` — mensagem inicial pré-preenchida

Todos os botões (cabeçalho, hero, seção de contato, rodapé e botão flutuante)
importam a partir desse arquivo.

## Fotografias

As imagens ficam em [`public/images/`](public/images):

| Arquivo                      | Onde aparece                         |
| ---------------------------- | ------------------------------------ |
| `vinicius-hero.jpg`          | Capa / primeira dobra (hero)         |
| `vinicius-retrato.jpg`       | Seção "Conheça minha trajetória"     |
| `vinicius-abordagem.jpg`     | Seção "Minha abordagem"              |

> **Importante:** os arquivos atuais são **placeholders** indicando onde cada
> foto deve entrar. Substitua cada um pela fotografia real do profissional
> **mantendo exatamente o mesmo nome**. Recomenda-se proporção retrato
> (4:5), com o rosto bem enquadrado e centralizado no topo
> (`object-position: top`, já configurado). Formatos `.jpg`, `.webp` ou
> `.avif` são aceitos — se trocar a extensão, ajuste o caminho em
> [`src/data/site-config.ts`](src/data/site-config.ts) (`siteConfig.photos`).

## Conteúdo profissional

Textos, biografia, blocos da abordagem e temas do acompanhamento estão em
[`src/data/site-config.ts`](src/data/site-config.ts).

## Seções

1. Header fixo (nome, CRP, navegação, "Agendar conversa")
2. Hero / primeira dobra (texto + foto + CTA WhatsApp)
3. Sobre mim — "Conheça minha trajetória"
4. Minha abordagem (verde profundo + 3 blocos)
5. Temas do acompanhamento (4 cartões)
6. Convite ao contato (conversão via WhatsApp)
7. Rodapé + botão flutuante do WhatsApp

## Deploy na Vercel

O projeto está pronto para a Vercel. Opcionalmente, defina
`NEXT_PUBLIC_SITE_URL` com o domínio final para metadata, `sitemap.xml` e
`robots.txt`.
