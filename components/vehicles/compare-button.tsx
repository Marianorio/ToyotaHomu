"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  toggleCompare,
  subscribeCompare,
  getCompareSnapshot,
  type CompareItem,
} from "@/lib/compare";
import { Columns3 } from "lucide-react";

type CompareButtonProps = {
  item: CompareItem;
  /** Usar el botón compacto (overlay sobre la imagen). */
  variant?: "default" | "overlay";
  className?: string;
};

/**
 * Botón para sumar/quitar un vehículo del comparador.
 * Sincroniza con otros botones vía evento `COMPARE_EVENT`.
 */
export function CompareButton({
  item,
  variant = "default",
  className,
}: CompareButtonProps) {
  const items = React.useSyncExternalStore(
    subscribeCompare,
    getCompareSnapshot,
    getCompareSnapshot,
  );
  const active = items.some((i) => i.slug === item.slug);

  function handleClick() {
    toggleCompare(item);
  }

  if (variant === "overlay") {
    return (
      <Button
        type="button"
        size="icon-sm"
        variant={active ? "default" : "secondary"}
        onClick={handleClick}
        aria-label={
          active
            ? `Quitar ${item.model} de la comparación`
            : `Agregar ${item.model} a la comparación`
        }
        aria-pressed={active}
        title={
          active
            ? "Quitar de la comparación"
            : "Agregar a la comparación"
        }
        className={cn(
          "relative z-10 shadow-sm backdrop-blur-md",
          className,
        )}
      >
        <Columns3 aria-hidden="true" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={handleClick}
      aria-pressed={active}
      className={cn("gap-1.5", className)}
    >
      <Columns3 className="size-3.5" aria-hidden="true" />
      {active ? "En comparación" : "Comparar"}
    </Button>
  );
}
