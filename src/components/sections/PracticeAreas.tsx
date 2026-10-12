import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import PracticeAreaCard from "@/components/shared/PracticeAreaCard";
import { siteConfig } from "@/data/site-config";

export default function PracticeAreas() {
  return (
    <section id="areas-de-atuacao" className="bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Áreas de Atuação"
            title="Orientação jurídica dedicada a cada área do direito"
            description="Conheça as principais frentes de atuação do escritório. Entre em contato para entender como podemos ajudar na sua situação específica."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.practiceAreas.map((area, index) => (
            <Reveal key={area.slug} delay={index * 80}>
              <PracticeAreaCard area={area} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
