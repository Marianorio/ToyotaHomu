"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/vehicles/vehicle-card";

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

type VehicleGridProps = {
  vehicles: VehicleCardData[];
  /** Número de vehículos visibles por defecto (2 filas en desktop = 6 en 3 columnas). */
  visibleCount?: number;
};

export function VehicleGrid({
  vehicles,
  visibleCount = 6,
}: VehicleGridProps) {
  const [expanded, setExpanded] = React.useState(false);
  const hasMore = vehicles.length > visibleCount;
  const visibleVehicles = expanded ? vehicles : vehicles.slice(0, visibleCount);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visibleVehicles.map((v) => (
          <VehicleCard key={v.slug} vehicle={v} priority={false} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setExpanded((prev) => !prev)}
            className="gap-2 font-bold tracking-wide"
          >
            {expanded ? (
              <>
                Ver menos
                <ChevronUp className="size-4" aria-hidden="true" />
              </>
            ) : (
              <>
                Ver más modelos ({vehicles.length - visibleCount} restantes)
                <ChevronDown className="size-4" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>
      )}
    </>
  );
}