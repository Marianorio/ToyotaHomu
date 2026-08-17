"use client";

import * as React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { VehicleImage } from "@/components/vehicles/vehicle-image";
import {
  clearCompare,
  removeCompare,
  subscribeCompare,
  getCompareSnapshot,
  COMPARE_MAX,
} from "@/lib/compare";
import { Columns3, X } from "lucide-react";

/**
 * Barra flotante de comparación. Se muestra en todo el sitio cuando hay
 * vehículos seleccionados (persistidos en localStorage) y enlaza a /comparador
 * construyendo la URL con `?v=slug...`.
 */
export function CompareBar() {
  const items = React.useSyncExternalStore(
    subscribeCompare,
    getCompareSnapshot,
    getCompareSnapshot,
  );

  if (items.length === 0) return null;

  const compareHref = `/comparador?${items
    .map((i) => `v=${encodeURIComponent(i.slug)}`)
    .join("&")}`;

  return (
    <div
      className="fixed inset-x-0 bottom-[56px] z-[80] flex justify-center px-3 safe-area-bottom lg:bottom-6"
      role="region"
      aria-label="Comparador de vehículos"
    >
      <div className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-border bg-background/95 p-2.5 pr-3 shadow-xl shadow-black/10 backdrop-blur-md">
        {/* Miniaturas */}
        <div className="flex items-center">
          {items.map((item) => (
            <div
              key={item.slug}
              className="group relative -ml-1.5 first:ml-0"
              title={item.model}
            >
              <div className="relative h-10 w-16 overflow-hidden rounded-lg border border-border bg-muted">
                <VehicleImage
                  src={item.mainImage}
                  alt={item.model}
                  sizes="64px"
                />
              </div>
              <button
                type="button"
                onClick={() => removeCompare(item.slug)}
                aria-label={`Quitar ${item.model} de la comparación`}
                className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-foreground text-background opacity-0 shadow transition-opacity hover:opacity-100 group-hover:opacity-100 focus-visible:opacity-100"
              >
                <X className="size-3" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex-1 text-center">
          <Link href={compareHref} className="text-sm font-semibold text-primary hover:underline">
            Comparar ({items.length}/{COMPARE_MAX})
          </Link>
        </div>

        <Link
          href={compareHref}
          className={buttonVariants({ size: "sm", className: "gap-1.5" })}
        >
          <Columns3 className="size-3.5" aria-hidden="true" />
          Comparar
        </Link>

        <button
          type="button"
          onClick={clearCompare}
          aria-label="Vaciar comparador"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
