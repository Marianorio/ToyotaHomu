"use client";

import * as React from "react";
import Link from "next/link";
import { Car, FileText, MessageCircle } from "lucide-react";
import { generateWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Acciones inferiores fijas en mobile (Vehículos · Cotizar · WhatsApp).
 * Visible solo en pantallas pequeñas (oculto en lg+).
 * Soporta safe-area para iPhones.
 */
export function MobileBottomActions({
  whatsappNumber,
}: {
  whatsappNumber?: string;
}) {
  const whatsappHref = generateWhatsAppUrl(
    "Hola, tengo una consulta.",
    whatsappNumber,
  );

  return (
    <nav
      aria-label="Accesos rápidos"
      className="fixed inset-x-0 bottom-0 z-[70] border-t bg-background/95 backdrop-blur-md safe-area-bottom lg:hidden"
    >
      <div className="grid grid-cols-3">
        <Link
          href="/vehiculos"
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <Car className="size-5" aria-hidden="true" />
          Vehículos
        </Link>

        <Link
          href="/cotizar"
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-primary"
        >
          <FileText className="size-5" aria-hidden="true" />
          Cotizar
        </Link>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-500"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
