import * as React from "react";
import Link from "next/link";
import { ArrowRight, Gauge, Fuel } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatARS } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { BadgeHibrido, BadgeNuevo } from "@/components/ui/vehicle-badges";
import { VehicleImage } from "@/components/vehicles/vehicle-image";
import { CompareButton } from "@/components/vehicles/compare-button";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { WhatsAppMessages } from "@/lib/whatsapp";

type VehicleCardData = {
  slug: string;
  model: string;
  brand?: string;
  categoryName?: string;
  price?: number | string | null;
  isNew?: boolean;
  isHybrid?: boolean;
  isAvailable?: boolean;
  featured?: boolean;
  engine?: string | null;
  transmission?: string | null;
  mainImage?: string | null;
};

interface VehicleCardProps {
  vehicle: VehicleCardData;
  variant?: "default" | "featured" | "compact";
  className?: string;
  priority?: boolean;
}

/**
 * VehicleCard — componente prioritario del Design System.
 * Muestra imagen, modelo, categoría, precio, badges, datos y CTAs.
 */
export function VehicleCard({
  vehicle,
  variant = "default",
  className,
  priority,
}: VehicleCardProps) {
  const href = `/vehiculos/${vehicle.slug}`;
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden bg-card transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:overflow-visible",
        className,
      )}
    >
      {/* Imagen */}
      <Link
        href={href}
        aria-label={`Ver ${vehicle.model}`}
        className={cn(
          "relative block overflow-hidden bg-transparent",
          isCompact ? "h-28 w-40 shrink-0" : "aspect-[16/9] w-full",
          isFeatured && "aspect-[16/8]",
          "transition-transform duration-500 group-hover:scale-105",
        )}
      >
        <VehicleImage
          src={vehicle.mainImage}
          alt={vehicle.model}
          priority={priority}
          className="transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {vehicle.isNew && <BadgeNuevo />}
          {vehicle.isHybrid && <BadgeHibrido />}
        </div>
        {!vehicle.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <Badge variant="secondary">Sin stock</Badge>
          </div>
        )}
      </Link>

      {/* Botón comparar (fuera del Link para no anidar interactivos) */}
      <CompareButton
        item={{
          slug: vehicle.slug,
          model: vehicle.model,
          mainImage: vehicle.mainImage,
        }}
        variant="overlay"
        className="absolute right-3 top-3"
      />

      {/* Contenido */}
      <div
        className={cn(
          "flex flex-1 flex-col gap-3",
          isCompact ? "p-4" : "p-5",
          isFeatured && "p-6",
        )}
      >
        {vehicle.categoryName && (
          <span className="text-eyebrow text-muted-foreground">
            {vehicle.categoryName}
          </span>
        )}

        <Link href={href}>
          <h3
            className={cn(
              "font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary",
              isCompact ? "text-base" : "text-xl",
            )}
          >
            {vehicle.model}
          </h3>
        </Link>

        {/* Datos principales */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {vehicle.engine && (
            <span className="inline-flex items-center gap-1.5">
              <Gauge className="size-3.5" aria-hidden="true" />
              {vehicle.engine}
            </span>
          )}
          {vehicle.transmission && (
            <span className="inline-flex items-center gap-1.5">
              <Fuel className="size-3.5" aria-hidden="true" />
              {vehicle.transmission}
            </span>
          )}
        </div>

        {!isCompact && (
          <p className="text-lg font-semibold tracking-tight">
            {formatARS(vehicle.price)}
          </p>
        )}

        {/* CTAs */}
        <div className="mt-auto flex items-center gap-2 pt-2">
          <Link
            href={href}
            className="btn-cta btn-cta-sm flex-1"
          >
            <span className="btn-cta-inner">
              Ver modelo
              <ArrowRight className="size-3" aria-hidden="true" />
            </span>
          </Link>
          <WhatsAppButton
            message={WhatsAppMessages.quote(vehicle.model)}
            variant="round"
            aria-label={`Cotizar ${vehicle.model} por WhatsApp`}
          />
        </div>
      </div>
    </article>
  );
}
