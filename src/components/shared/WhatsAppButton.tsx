import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "solid" | "text";
}

export default function WhatsAppButton({
  message,
  className,
  children = "Falar no WhatsApp",
  variant = "solid",
}: WhatsAppButtonProps) {
  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Iniciar conversa no WhatsApp"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm text-sm font-medium tracking-wide transition-colors duration-200",
        variant === "solid" &&
          "bg-green px-6 py-3.5 text-cream hover:bg-green-light",
        variant === "text" && "text-green underline-offset-4 hover:underline",
        className,
      )}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {children}
    </a>
  );
}
