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

type UsedVehicleFilterProps = {
  brands: string[];
};

const YEAR_OPTIONS = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "year-desc", label: "Más recientes" },
  { value: "mileage-asc", label: "Menor kilometraje" },
];

export function UsedVehicleFilter({ brands }: UsedVehicleFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [brand, setBrand] = React.useState(searchParams.get("brand") || "");
  const [year, setYear] = React.useState(searchParams.get("year") || "");
  const [sort, setSort] = React.useState(searchParams.get("sort") || "featured");
  const [showFilters, setShowFilters] = React.useState(false);

  const activeFilters = [brand, year].filter(Boolean).length;

  const updateFilters = React.useCallback(() => {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (year) params.set("year", year);
    if (sort && sort !== "featured") params.set("sort", sort);

    router.push(`/usados?${params.toString()}`, { scroll: false });
  }, [router, brand, year, sort]);

  React.useEffect(() => {
    updateFilters();
  }, [updateFilters]);

  const clearFilters = () => {
    setBrand("");
    setYear("");
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
        {/* Brand */}
        <div>
          <label className="mb-2 block text-sm font-bold tracking-wide">Marca</label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setBrand("")}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-bold tracking-wide transition-colors",
                !brand
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-foreground"
              )}
            >
              Todas
            </button>
            {brands.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBrand(b)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-bold tracking-wide transition-colors",
                  brand === b
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-foreground"
                )}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Year */}
        <div>
          <label className="mb-2 block text-sm font-bold tracking-wide">Año</label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setYear("")}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-bold tracking-wide transition-colors",
                !year
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-foreground"
              )}
            >
              Todos
            </button>
            {YEAR_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setYear(opt.value)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-bold tracking-wide transition-colors",
                  year === opt.value
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
          <label className="mb-2 block text-sm font-bold tracking-wide">Ordenar por</label>
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
