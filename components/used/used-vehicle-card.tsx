import Link from "next/link";
import { ArrowRight, Gauge, Fuel, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatARS } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { VehicleImage } from "@/components/vehicles/vehicle-image";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { WhatsAppMessages } from "@/lib/whatsapp";

type UsedVehicleCardData = {
  id: string;
  slug: string;
  model: string;
  brand?: string;
  year?: number | null;
  mileage?: number | null;
  price?: string | null;
  fuelType?: string | null;
  transmission?: string | null;
  location?: string | null;
  condition?: string | null;
  featured?: boolean;
  available?: boolean;
  mainImage?: string | null;
};

interface UsedVehicleCardProps {
  vehicle: UsedVehicleCardData;
  className?: string;
  priority?: boolean;
}

export function UsedVehicleCard({
  vehicle,
  className,
  priority,
}: UsedVehicleCardProps) {
  const href = `/usados/${vehicle.slug}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden bg-card transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:overflow-visible",
        vehicle.featured && "ring-2 ring-primary/20",
        className,
      )}
    >
      {/* Imagen */}
      <Link
        href={href}
        aria-label={`Ver ${vehicle.brand} ${vehicle.model}`}
        className="relative block aspect-[16/9] w-full overflow-hidden bg-transparent transition-transform duration-500 group-hover:scale-105"
      >
        <VehicleImage
          src={vehicle.mainImage}
          alt={`${vehicle.brand} ${vehicle.model}`}
          priority={priority}
          className="transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {vehicle.featured && (
            <Badge className="bg-primary text-white">Destacado</Badge>
          )}
          {vehicle.condition && (
            <Badge variant="secondary">{vehicle.condition}</Badge>
          )}
        </div>
        {!vehicle.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <Badge variant="secondary">Vendido</Badge>
          </div>
        )}
      </Link>

      {/* Contenido */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Brand + Model */}
        <Link href={href}>
          <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {vehicle.brand} {vehicle.model}
          </h3>
        </Link>

        {/* Year + Mileage */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {vehicle.year && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" aria-hidden="true" />
              {vehicle.year}
            </span>
          )}
          {vehicle.mileage && (
            <span className="inline-flex items-center gap-1.5">
              <Gauge className="size-3.5" aria-hidden="true" />
              {vehicle.mileage.toLocaleString("es-AR")} km
            </span>
          )}
        </div>

        {/* Fuel + Transmission + Location */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {vehicle.fuelType && (
            <span className="inline-flex items-center gap-1.5">
              <Fuel className="size-3.5" aria-hidden="true" />
              {vehicle.fuelType}
            </span>
          )}
          {vehicle.transmission && (
            <span className="inline-flex items-center gap-1.5">
              {vehicle.transmission}
            </span>
          )}
          {vehicle.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden="true" />
              {vehicle.location}
            </span>
          )}
        </div>

        {/* Price */}
        <p className="text-lg font-semibold tracking-tight">
          {formatARS(vehicle.price)}
        </p>

        {/* CTAs */}
        <div className="mt-auto flex items-center gap-2 pt-2">
          <Link
            href={href}
            className="btn-cta btn-cta-sm flex-1"
          >
            <span className="btn-cta-inner">
              Ver detalle
              <ArrowRight className="size-3" aria-hidden="true" />
            </span>
          </Link>
          <WhatsAppButton
            message={WhatsAppMessages.quote(`${vehicle.brand} ${vehicle.model} ${vehicle.year}`)}
            variant="round"
            aria-label={`Cotizar ${vehicle.brand} ${vehicle.model} por WhatsApp`}
          />
        </div>
      </div>
    </article>
  );
}
