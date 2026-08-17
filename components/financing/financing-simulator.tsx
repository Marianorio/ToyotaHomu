"use client";

import * as React from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatARS } from "@/lib/format";
import { ArrowRight, Calculator } from "lucide-react";

export type SimulatorVehicle = {
  slug: string;
  model: string;
  brand: string;
  price: number | null;
};

type FinancingSimulatorProps = {
  vehicles: SimulatorVehicle[];
  defaultTna: number;
  whatsappNumber?: string;
};

const CUOTAS_OPTIONS = [12, 24, 36, 48, 60];

function compute(
  price: number,
  anticipoPct: number,
  cuotas: number,
  tna: number,
) {
  const anticipo = price * (anticipoPct / 100);
  const financiado = Math.max(price - anticipo, 0);
  const mensual = tna / 100 / 12;
  let cuota =
    mensual > 0
      ? (financiado * mensual) / (1 - Math.pow(1 + mensual, -cuotas))
      : financiado / cuotas;
  if (!Number.isFinite(cuota) || cuota < 0) cuota = 0;
  const totalCuotas = cuota * cuotas;
  const intereses = Math.max(totalCuotas - financiado, 0);
  const total = anticipo + totalCuotas;
  return { anticipo, financiado, cuota, totalCuotas, intereses, total };
}

/**
 * Simulador de financiación (sistema francés de amortización, cuota fija).
 * Datos ilustrativos — demo. Preset de cuotas, anticipo y TNA editable.
 */
export function FinancingSimulator({
  vehicles,
  defaultTna,
  whatsappNumber,
}: FinancingSimulatorProps) {
  const first = vehicles[0];
  const [slug, setSlug] = React.useState<string>(first?.slug ?? "");
  const [price, setPrice] = React.useState<number>(first?.price ?? 0);
  const [anticipoPct, setAnticipoPct] = React.useState(30);
  const [cuotas, setCuotas] = React.useState(36);
  const [tna, setTna] = React.useState(defaultTna);

  const current = vehicles.find((v) => v.slug === slug);

  function handleVehicleChange(next: string | null) {
    if (!next) return;
    const v = vehicles.find((x) => x.slug === next);
    setSlug(next);
    if (v?.price) setPrice(v.price);
  }

  const r = compute(price, anticipoPct, cuotas, tna);
  const anticipoPesos = (price * anticipoPct) / 100;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      {/* Controles */}
      <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Calculator className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Simulador de cuotas</h3>
            <p className="text-sm text-muted-foreground">
              Datos ilustrativos — Demo
            </p>
          </div>
        </div>

        <div className="grid gap-5">
          {/* Vehículo */}
          <div className="grid gap-2">
            <label htmlFor="sim-vehicle" className="text-sm font-medium">
              Vehículo
            </label>
            <Select value={slug} onValueChange={handleVehicleChange}>
              <SelectTrigger id="sim-vehicle" className="w-full">
                <SelectValue placeholder="Elegí un vehículo" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((v) => (
                  <SelectItem key={v.slug} value={v.slug}>
                    {v.brand} {v.model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Precio */}
          <div className="grid gap-2">
            <label htmlFor="sim-price" className="text-sm font-medium">
              Precio del vehículo
            </label>
            <div className="flex gap-2">
              <input
                id="sim-price"
                type="number"
                inputMode="numeric"
                min={0}
                step={100000}
                value={Number.isFinite(price) ? price : 0}
                onChange={(e) => setPrice(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              <span className="inline-flex items-center rounded-lg bg-muted px-3 text-sm text-muted-foreground">
                ARS
              </span>
            </div>
            {current?.price && (
              <p className="text-xs text-muted-foreground">
                Precio base: {formatARS(current.price)}
              </p>
            )}
          </div>

          {/* Anticipo */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="sim-anticipo" className="text-sm font-medium">
                Anticipo
              </label>
              <span className="text-sm font-semibold">{anticipoPct}%</span>
            </div>
            <input
              id="sim-anticipo"
              type="range"
              min={0}
              max={80}
              step={5}
              value={anticipoPct}
              onChange={(e) => setAnticipoPct(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-xs text-muted-foreground">
              {formatARS(anticipoPesos)}
            </p>
          </div>

          {/* Cuotas */}
          <div className="grid gap-2">
            <span className="text-sm font-medium">Cuotas</span>
            <div className="flex flex-wrap gap-2">
              {CUOTAS_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCuotas(n)}
                  aria-pressed={cuotas === n}
                  className={cn(
                    "min-w-12 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    cuotas === n
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-transparent hover:bg-muted",
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* TNA */}
          <div className="grid gap-2">
            <label htmlFor="sim-tna" className="text-sm font-medium">
              Tasa nominal anual (TNA)
            </label>
            <div className="flex gap-2">
              <input
                id="sim-tna"
                type="number"
                inputMode="decimal"
                min={0}
                step={0.1}
                value={tna}
                onChange={(e) => setTna(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              <span className="inline-flex items-center rounded-lg bg-muted px-3 text-sm text-muted-foreground">
                %
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Resultado */}
      <div className="rounded-2xl border border-border bg-background p-6">
        <p className="text-sm text-muted-foreground">Cuota mensual estimada</p>
        <p className="mt-1 text-3xl font-bold tracking-tight">
          {price > 0 ? formatARS(r.cuota) : "—"}
        </p>

        <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Anticipo</dt>
            <dd className="font-medium">{formatARS(r.anticipo)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">A financiar</dt>
            <dd className="font-medium">{formatARS(r.financiado)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">
              Intereses ({cuotas} cuotas)
            </dt>
            <dd className="font-medium">{formatARS(r.intereses)}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3">
            <dt className="font-medium">Total a pagar</dt>
            <dd className="font-semibold">{formatARS(r.total)}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            href={`/cotizar?vehicle=${slug}`}
            className={cn(
              buttonVariants({ size: "lg", className: "w-full gap-1.5" }),
            )}
          >
            Cotizar este plan
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <WhatsAppButton
            message={`Hola, quiero consultar sobre la financiación de ${current ? `${current.brand} ${current.model}` : "un vehículo"} (cuota estimada: ${price > 0 ? formatARS(r.cuota) : "consultar"}).`}
            phone={whatsappNumber}
            label="Consultar por WhatsApp"
            className="w-full"
          />
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Cálculo estimado con sistema francés (cuota fija). La tasa y las
          condiciones finales pueden variar. Demo.
        </p>
      </div>
    </div>
  );
}