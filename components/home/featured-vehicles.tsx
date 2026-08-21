"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SlideUp } from "@/components/ui/motion";
import { ArrowRight } from "lucide-react";

type Vehicle = {
  slug: string;
  model: string;
  brand: string;
  categoryName: string;
  price?: number | string | null;
  isNew?: boolean;
  isHybrid?: boolean;
  isAvailable?: boolean;
  engine?: string | null;
  transmission?: string | null;
  mainImage?: string | null;
};

type FeaturedVehiclesProps = {
  vehicles: Vehicle[];
};

export function FeaturedVehicles({ vehicles }: FeaturedVehiclesProps) {
  const [active, setActive] = React.useState(0);

  if (vehicles.length === 0) return null;

  const displayVehicles = vehicles.slice(0, 5);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(index);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((prev) => (prev + 1) % displayVehicles.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((prev) => (prev - 1 + displayVehicles.length) % displayVehicles.length);
    }
  };

  return (
    <section className="bg-zinc-950 py-16 sm:py-20 lg:py-24">
      <Container>
        <SlideUp>
          <div className="mb-8 text-center sm:text-left">
            <span className="text-eyebrow text-red-400">Destacados</span>
            <h2 className="mt-2 text-h2 text-white">Modelos destacados</h2>
            <p className="mt-2 max-w-lg text-body-lead text-zinc-400">
              Los vehículos que están marcando la diferencia.
            </p>
          </div>
        </SlideUp>

        <div
          className="featured-options"
          role="tablist"
          aria-label="Modelos destacados"
        >
          {displayVehicles.map((v, i) => (
            <div
              key={v.slug}
              role="tab"
              tabIndex={0}
              aria-selected={active === i}
              aria-label={`${v.model} — ${v.categoryName}`}
              className={cn(
                "option",
                active === i && "active",
              )}
              style={
                {
                  "--optionBackground": v.mainImage
                    ? `url(${v.mainImage})`
                    : undefined,
                } as React.CSSProperties
              }
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onFocus={() => setActive(i)}
            >
              <div className="shadow" aria-hidden="true" />
              <div className="label">
                <div className="icon">
                  <Link
                    href={`/vehiculos/${v.slug}`}
                    aria-label={`Ver ${v.model}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="info">
                  <div className="main">{v.model}</div>
                  <div className="sub">{v.categoryName}</div>
                  <div className="phrase">Descubrí más</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores mobile */}
        <div className="mt-6 flex justify-center gap-2 sm:hidden" aria-hidden="true">
          {displayVehicles.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                active === i ? "w-6 bg-white" : "w-1.5 bg-white/30",
              )}
              aria-label={`Ir a ${displayVehicles[i].model}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
