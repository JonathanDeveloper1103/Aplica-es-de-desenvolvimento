import { ArrowRight } from "lucide-react";
import type { PracticeArea } from "@/data/site-config";
import { getWhatsAppLink } from "@/lib/whatsapp";

interface PracticeAreaCardProps {
  area: PracticeArea;
}

export default function PracticeAreaCard({ area }: PracticeAreaCardProps) {
  const Icon = area.icon;

  return (
    <div className="group flex h-full flex-col rounded-sm border border-border-soft bg-white p-8 transition-colors duration-200 hover:border-gold/50">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-navy/5 text-navy">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="font-serif text-xl text-navy">{area.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
        {area.shortDescription}
      </p>
      <a
        href={getWhatsAppLink(
          `Olá! Gostaria de falar sobre ${area.name.toLowerCase()}.`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors duration-200 group-hover:text-navy"
      >
        Falar conosco
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
