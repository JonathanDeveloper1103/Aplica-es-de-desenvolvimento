import type { CareTopic } from "@/data/site-config";

interface CareTopicCardProps {
  topic: CareTopic;
}

export default function CareTopicCard({ topic }: CareTopicCardProps) {
  const Icon = topic.icon;

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-beige bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:border-olive-soft hover:shadow-lg hover:shadow-olive/5">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-offwhite text-olive">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="font-serif text-lg leading-snug text-olive-deep">
        {topic.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {topic.description}
      </p>
    </div>
  );
}
