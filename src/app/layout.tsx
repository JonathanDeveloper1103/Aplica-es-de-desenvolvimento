import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/data/site-config";
import WhatsAppFloatingButton from "@/components/shared/WhatsAppFloatingButton";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.exemplo-escritorio.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.firmName} | Advocacia`,
    template: `%s | ${siteConfig.firmName}`,
  },
  description:
    "Atendimento jurídico com estratégia, segurança e compromisso. Conte com orientação jurídica personalizada para compreender seus direitos.",
  keywords: [
    "advocacia",
    "escritório de advocacia",
    "advogado",
    "assessoria jurídica",
    "orientação jurídica",
    "direito de família",
    "direito trabalhista",
    "direito civil",
  ],
  authors: [{ name: siteConfig.firmName }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: siteConfig.firmName,
    title: `${siteConfig.firmName} | Advocacia`,
    description:
      "Atendimento jurídico com estratégia, segurança e compromisso. Conte com orientação jurídica personalizada para compreender seus direitos.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.firmName} | Advocacia`,
    description:
      "Atendimento jurídico com estratégia, segurança e compromisso.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#123a2c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
