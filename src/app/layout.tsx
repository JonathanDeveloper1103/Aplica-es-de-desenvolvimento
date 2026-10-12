import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { siteConfig } from "@/data/site-config";
import WhatsAppFloatingButton from "@/components/shared/WhatsAppFloatingButton";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl =
  rawSiteUrl && rawSiteUrl.length > 0
    ? rawSiteUrl
    : "https://vinicius-tomaz-psicologo.vercel.app";

const description =
  "Psicólogo (CRP 06/180116). Acompanhamento psicológico humanizado, com contribuições da Análise Existencial e da Logoterapia. Agende uma conversa pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.fullName} | Psicólogo`,
    template: `%s | ${siteConfig.fullName}`,
  },
  description,
  keywords: [
    "psicólogo",
    "psicologia",
    "acompanhamento psicológico",
    "saúde mental",
    "análise existencial",
    "logoterapia",
    "ansiedade",
    "depressão",
    "sentido",
    "Vinícius Tomaz Lacerda Silva",
  ],
  authors: [{ name: siteConfig.fullName }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: siteConfig.fullName,
    title: `${siteConfig.fullName} | Psicólogo`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.fullName} | Psicólogo`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#414b35",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-offwhite text-ink">
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
