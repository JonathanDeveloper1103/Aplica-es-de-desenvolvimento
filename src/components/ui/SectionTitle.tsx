import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-3 block text-xs font-semibold uppercase tracking-[0.2em]",
            light ? "text-gold-light" : "text-gold",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-serif text-3xl leading-tight sm:text-4xl",
          light ? "text-cream" : "text-green",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-cream/80" : "text-ink-soft",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
