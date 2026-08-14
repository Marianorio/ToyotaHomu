import * as React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { generateWhatsAppUrl } from "@/lib/whatsapp";

interface ConversionBarProps {
  title?: string;
  whatsappNumber?: string;
  className?: string;
  /** Variante de fondo. */
  variant?: "default" | "dark" | "accent";
}

/**
 * Barra de conversión reutilizable.
 * Aparece en Home, detalle de vehículo, financiación, usados.
 */
export function ConversionBar({
  title = "¿Ya encontraste tu Toyota?",
  whatsappNumber,
  className,
  variant = "default",
}: ConversionBarProps) {
  const whatsappHref = generateWhatsAppUrl(
    "Hola, tengo una consulta sobre un vehículo.",
    whatsappNumber,
  );

  const bgClasses = {
    default: "bg-muted text-foreground",
    dark: "bg-zinc-900 text-white",
    accent: "bg-primary/5 text-foreground",
  };

  return (
    <section
      className={cn("border-y", bgClasses[variant], className)}
      aria-label="Acciones de conversión"
    >
      <Container className="flex flex-col items-center gap-5 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-h3">{title}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/cotizar"
            className={buttonVariants({ variant: "default" }) + " font-bold tracking-wide"}
          >
            Cotizar
          </Link>
          <Link
            href="/test-drive"
            className={buttonVariants({ variant: "outline" }) + " font-bold tracking-wide"}
          >
            Solicitar test drive
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "gap-1.5 font-bold tracking-wide text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:text-emerald-500 dark:hover:bg-emerald-950",
            )}
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
