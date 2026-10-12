import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import PracticeAreas from "@/components/sections/PracticeAreas";
import Differentiators from "@/components/sections/Differentiators";
import HowWeHelp from "@/components/sections/HowWeHelp";
import Contact from "@/components/sections/Contact";
import { siteConfig } from "@/data/site-config";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.firmName,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "BR",
    },
    areaServed: siteConfig.address.city,
    knowsAbout: siteConfig.practiceAreas.map((area) => area.name),
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
        <PracticeAreas />
        <Differentiators />
        <HowWeHelp />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
