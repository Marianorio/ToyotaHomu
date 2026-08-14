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

        <div className="featured-options">
          {displayVehicles.map((v, i) => (
            <div
              key={v.slug}
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
            >
              <div className="shadow" />
              <div className="label">
                <div className="icon">
                  <Link
                    href={`/vehiculos/${v.slug}`}
                    aria-label={`Ver ${v.model}`}
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
      </Container>
    </section>
  );
}
