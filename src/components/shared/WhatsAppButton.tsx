import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "solid" | "whatsapp" | "text";
}

export default function WhatsAppButton({
  message,
  className,
  children = "Falar no WhatsApp",
  variant = "whatsapp",
}: WhatsAppButtonProps) {
  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Iniciar conversa no WhatsApp"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2",
        variant === "whatsapp" &&
          "bg-[#25D366] px-7 py-3.5 text-white hover:bg-[#1ebe5a]",
        variant === "solid" &&
          "bg-olive px-7 py-3.5 text-white hover:bg-olive-deep",
        variant === "text" && "text-olive underline-offset-4 hover:underline",
        className,
      )}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {children}
    </a>
  );
}
