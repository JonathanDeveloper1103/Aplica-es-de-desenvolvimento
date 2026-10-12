import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import CareTopicCard from "@/components/shared/CareTopicCard";
import { siteConfig } from "@/data/site-config";

export default function CareTopics() {
  return (
    <section id="temas" className="bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Temas do acompanhamento"
            title="Questões que podem ser acolhidas no acompanhamento psicológico"
            description="Alguns dos temas que podem ser trabalhados ao longo do processo, sempre a partir da escuta e do respeito à sua história."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.careTopics.map((topic, index) => (
            <Reveal key={topic.slug} delay={index * 80}>
              <CareTopicCard topic={topic} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
