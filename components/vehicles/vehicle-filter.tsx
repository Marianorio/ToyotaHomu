"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type VehicleFilterProps = {
  categories: Category[];
};

const FUEL_OPTIONS = [
  { value: "nafta", label: "Nafta" },
  { value: "diesel", label: "Diésel" },
  { value: "hibrido", label: "Híbrido" },
];

const TRANSMISSION_OPTIONS = [
  { value: "manual", label: "Manual" },
  { value: "automatica", label: "Automática" },
  { value: "cvt", label: "CVT" },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "newest", label: "Más recientes" },
];

export function VehicleFilter({ categories }: VehicleFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = React.useState(searchParams.get("cat") || "");
  const [fuel, setFuel] = React.useState(searchParams.get("fuel") || "");
  const [transmission, setTransmission] = React.useState(searchParams.get("trans") || "");
  const [sort, setSort] = React.useState(searchParams.get("sort") || "featured");
  const [showFilters, setShowFilters] = React.useState(false);

  const activeFilters = [category, fuel, transmission].filter(Boolean).length;

  const updateFilters = React.useCallback(() => {
    const params = new URLSearchParams();
    if (category) params.set("cat", category);
    if (fuel) params.set("fuel", fuel);
    if (transmission) params.set("trans", transmission);
    if (sort && sort !== "featured") params.set("sort", sort);

    router.push(`/vehiculos?${params.toString()}`, { scroll: false });
  }, [router, category, fuel, transmission, sort]);

  React.useEffect(() => {
    updateFilters();
  }, [updateFilters]);

  const clearFilters = () => {
    setCategory("");
    setFuel("");
    setTransmission("");
    setSort("featured");
  };

  return (
    <div className="space-y-4">
      {/* Mobile filter toggle */}
      <div className="flex items-center justify-between lg:hidden">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="size-4" />
          Filtros
          {activeFilters > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilters}
            </Badge>
          )}
        </Button>
        {activeFilters > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Limpiar
          </Button>
        )}
      </div>

      {/* Filters panel */}
      <div
        className={cn(
          "space-y-4 rounded-lg border bg-card p-4",
          showFilters ? "block" : "hidden lg:block"
        )}
      >
        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium">Categoría</label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("")}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-bold tracking-wide transition-colors",
                !category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-foreground"
              )}
            >
              Todas
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.slug)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-bold tracking-wide transition-colors",
                  category === cat.slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-foreground"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Fuel type */}
        <div>
          <label className="mb-2 block text-sm font-medium">Combustible</label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFuel("")}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-bold tracking-wide transition-colors",
                !fuel
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-foreground"
              )}
            >
              Todos
            </button>
            {FUEL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFuel(opt.value)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-bold tracking-wide transition-colors",
                  fuel === opt.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div>
          <label className="mb-2 block text-sm font-medium">Transmisión</label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTransmission("")}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-bold tracking-wide transition-colors",
                !transmission
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-foreground"
              )}
            >
              Todas
            </button>
            {TRANSMISSION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTransmission(opt.value)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-bold tracking-wide transition-colors",
                  transmission === opt.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="mb-2 block text-sm font-medium">Ordenar por</label>
          <Select
            value={sort}
            onValueChange={(value) => setSort(value ?? "featured")}
            items={Object.fromEntries(
              SORT_OPTIONS.map((opt) => [opt.value, opt.label])
            )}
          >
            <SelectTrigger className="w-full font-bold tracking-wide">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear button (desktop) */}
        {activeFilters > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="hidden w-full lg:flex"
          >
            <X className="mr-2 size-4" />
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  );
}
