/**
 * lucide-react removeu os ícones de marcas (Instagram, LinkedIn, Facebook).
 * Ícones simples e monocromáticos, mantidos aqui para não depender de uma
 * segunda biblioteca de ícones apenas para redes sociais.
 */
type SocialIconName = "instagram" | "linkedin" | "facebook";

const paths: Record<SocialIconName, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7" y1="10" x2="7" y2="17" />
      <line x1="7" y1="7" x2="7" y2="7.01" />
      <line x1="12" y1="17" x2="12" y2="10" />
      <path d="M12 13a2.5 2.5 0 0 1 5 0v4" />
    </>
  ),
  facebook: (
    <path d="M14 9h2V6h-2a4 4 0 0 0-4 4v2H8v3h2v6h3v-6h2.5l.5-3H13v-2a1 1 0 0 1 1-1Z" />
  ),
};

interface SocialIconProps {
  name: SocialIconName;
  className?: string;
}

export default function SocialIcon({ name, className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
