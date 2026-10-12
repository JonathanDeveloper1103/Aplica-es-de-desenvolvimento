import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Approach from "@/components/sections/Approach";
import CareTopics from "@/components/sections/CareTopics";
import Contact from "@/components/sections/Contact";
import { siteConfig } from "@/data/site-config";
import { whatsappUrl } from "@/config/contact";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    jobTitle: siteConfig.role,
    identifier: siteConfig.crp,
    description:
      "Psicólogo com acompanhamento psicológico humanizado, orientado pela Análise Existencial e pela Logoterapia Frankliana.",
    knowsAbout: [
      "Psicologia",
      "Análise Existencial",
      "Logoterapia",
      "Saúde mental",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Atendimento",
      url: whatsappUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Approach />
        <CareTopics />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
