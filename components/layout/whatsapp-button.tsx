import * as React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  message?: string;
  phone?: string;
  /** Variante flotante fija (abajo a la derecha). */
  floating?: boolean;
  label?: string;
  className?: string;
  variant?: "floating" | "button" | "round";
};

/**
 * Botón de WhatsApp consistente con el Design System.
 * Soporta: flotante (mobile/desktop) y CTA dentro de cards.
 */
export function WhatsAppButton({
  message = "Hola, tengo una consulta.",
  phone,
  floating = false,
  label = "WhatsApp",
  className,
  variant,
}: WhatsAppButtonProps) {
  const href = generateWhatsAppUrl(message, phone);
  const isFloating = floating || variant === "floating";

  if (isFloating) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp"
        title={label}
        className={cn(
          "fixed bottom-5 right-5 z-[80] flex size-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
          className,
        )}
      >
        <MessageCircle className="size-6" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-bold tracking-wide text-white transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
        variant === "round" && "size-9 rounded-full px-0 font-bold tracking-wide",
        className,
      )}
    >
      <MessageCircle className="size-4" aria-hidden="true" />
      {variant !== "round" && <span>{label}</span>}
    </a>
  );
}
