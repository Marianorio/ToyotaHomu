import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/feedback";
import { VehicleImage } from "@/components/vehicles/vehicle-image";
import { prisma } from "@/lib/db";
import { formatARS } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Check, Plus, X } from "lucide-react";

type ComparePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata = {
  title: "Comparador de vehículos",
  description:
    "Compará hasta 3 vehículos Toyota lado a lado: precio, motor, potencia, consumo y equipamiento.",
  alternates: {
    canonical: "/comparador",
  },
};

const MAX_COMPARE = 3;

function buildUrl(slugs: string[]): string {
  const qs = slugs.map((s) => `v=${encodeURIComponent(s)}`).join("&");
  return qs ? `/comparador?${qs}` : "/comparador";
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;

  // Normalizar slugs (string o string[]), deduplicar y acotar a 3
  const raw = params.v;
  const unique = Array.from(
    new Set(Array.isArray(raw) ? raw : raw ? [raw] : []),
  ).slice(0, MAX_COMPARE);

  const selected = await prisma.vehicle.findMany({
    where: { slug: { in: unique } },
    include: {
      category: true,
      specifications: true,
      vehicleFeatures: { include: { feature: true } },
    },
  });

  // Mantener el orden elegido por el usuario
  const ordered = unique
    .map((slug) => selected.find((v) => v.slug === slug))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  const remaining = await prisma.vehicle.findMany({
    where: { slug: { notIn: unique }, isAvailable: true },
    orderBy: [{ featured: "desc" }, { model: "asc" }],
    select: { slug: true, model: true, brand: true, mainImage: true, price: true },
  });

  const canAdd = ordered.length < MAX_COMPARE;

  // --- Construcción de filas de comparación -------------------------------
  const specMap = (v: (typeof ordered)[number]) =>
    Object.fromEntries(
      v.specifications.map((s) => [s.code, `${s.value}${s.unit ? ` ${s.unit}` : ""}`]),
    );

  const cell = (value: unknown): string =>
    value === null || value === undefined || value === "" ? "—" : String(value);

  const baseRows = [
    {
      label: "Precio",
      values: ordered.map((v) =>
        v.price ? formatARS(v.price.toString()) : "Consultar",
      ),
    },
    {
      label: "Categoría",
      values: ordered.map((v) => cell(v.category?.name)),
    },
    { label: "Año", values: ordered.map((v) => cell(v.year)) },
    {
      label: "Motor",
      values: ordered.map((v) => {
        const specVal = specMap(v)["motor"];
        return specVal ?? cell(v.engine);
      }),
    },
    {
      label: "Potencia",
      values: ordered.map((v) => {
        const specVal = specMap(v)["potencia"];
        return specVal ?? cell(v.power);
      }),
    },
    { label: "Torque", values: ordered.map((v) => cell(v.torque)) },
    {
      label: "Transmisión",
      values: ordered.map((v) => cell(v.transmission)),
    },
    { label: "Tracción", values: ordered.map((v) => cell(v.traction)) },
    { label: "Combustible", values: ordered.map((v) => cell(v.fuelType)) },
    { label: "Puertas", values: ordered.map((v) => cell(v.doors)) },
    { label: "Asientos", values: ordered.map((v) => cell(v.seats)) },
  ];

  // Filas desde Specifications (solo si al menos un vehículo la tiene)
  const specRowCodes = ["consumo", "baul", "carga", "capacidad", "0-100"];
  const specRows = specRowCodes.flatMap((code) => {
    const maps = ordered.map(specMap);
    if (!maps.some((m) => m[code])) return [];
    const label =
      ordered[0]?.specifications.find((s) => s.code === code)?.name ?? code;
    return [
      {
        label,
        values: maps.map((m) => (m[code] ? m[code] : "—")),
      },
    ];
  });

  // Filas de equipamiento (unión de features, chequeado por vehículo)
  const groupOrder = ["safety", "comfort", "technology", "performance"];
  const featureNames = new Map<
    string,
    { name: string; group: string }
  >();
  ordered.forEach((v) =>
    v.vehicleFeatures.forEach((vf) => {
      if (!featureNames.has(vf.feature.name)) {
        featureNames.set(vf.feature.name, {
          name: vf.feature.name,
          group: vf.feature.group,
        });
      }
    }),
  );
  const featureRows = Array.from(featureNames.values()).sort((a, b) => {
    const g = groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group);
    return g !== 0 ? g : a.name.localeCompare(b.name, "es");
  });

  return (
    <>
      <PageHeader
        eyebrow="Comparador"
        title="Compará modelos lado a lado"
        description="Elegí hasta 3 vehículos y compará precios, motor, consumo y equipamiento en una sola vista."
        breadcrumbs={[{ label: "Comparador" }]}
        backgroundImage="/img/toyotaConsecionaria.webp"
        variant="dark"
      />

      <Section padding="lg">
        <Container>
          {ordered.length < 2 ? (
            <div>
              {ordered.length === 0 ? (
                <EmptyState
                  title="No hay vehículos para comparar"
                  description="Elegí al menos dos vehículos para ver la comparación lado a lado."
                />
              ) : (
                <div className="mb-8 flex flex-wrap items-center gap-3">
                  {ordered.map((v) => (
                    <CompareChip
                      key={v.slug}
                      label={`${v.brand} ${v.model}`}
                      href={buildUrl(unique.filter((s) => s !== v.slug))}
                    />
                  ))}
                  <p className="text-sm text-muted-foreground">
                    Agregá al menos un vehículo más para comparar.
                  </p>
                </div>
              )}

              <PickyGrid
                title="Elegí vehículos para comparar"
                vehicles={remaining}
                selectedSlugs={unique}
              />
            </div>
          ) : (
            <>
              {/* Tabla de comparación */}
              <div className="overflow-x-auto rounded-2xl border border-border bg-background">
                <div
                  className="grid min-w-[640px]"
                  style={{
                    gridTemplateColumns: `minmax(150px, 200px) repeat(${ordered.length}, minmax(230px, 1fr))`,
                  }}
                >
                  {/* Header: columnas de vehículos */}
                  <div className="border-b border-r border-border bg-muted/40 p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Vehículo
                  </div>
                  {ordered.map((v) => (
                    <div
                      key={v.slug}
                      className="flex flex-col gap-3 border-b border-r border-border p-4 last:border-r-0"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
                        <VehicleImage
                          src={v.mainImage}
                          alt={`${v.brand} ${v.model}`}
                        />
                      </div>
                      <div>
                        <p className="text-lg font-semibold leading-tight">
                          {v.brand} {v.model}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {v.category?.name}
                        </p>
                        <p className="mt-1.5 font-semibold">
                          {v.price ? formatARS(v.price.toString()) : "Consultar"}
                        </p>
                      </div>
                      <div className="mt-auto flex flex-wrap gap-2 pt-1">
                        <Link
                          href={`/vehiculos/${v.slug}`}
                          className={buttonVariants({
                            variant: "outline",
                            size: "sm",
                            className: "gap-1",
                          })}
                        >
                          Ver modelo
                          <ArrowRight className="size-3.5" aria-hidden="true" />
                        </Link>
                        <Link
                          href={buildUrl(unique.filter((s) => s !== v.slug))}
                          className={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                            className: "gap-1 text-muted-foreground",
                          })}
                        >
                          <X className="size-3.5" aria-hidden="true" />
                          Quitar
                        </Link>
                      </div>
                    </div>
                  ))}
                  {canAdd && (
                    <div className="flex items-center justify-center border-b border-border p-4 text-muted-foreground">
                      <p className="text-center text-sm">
                        Podés agregar hasta {MAX_COMPARE - ordered.length}{" "}
                        vehículo{MAX_COMPARE - ordered.length !== 1 ? "s" : ""}{" "}
                        más.
                      </p>
                    </div>
                  )}
                </div>

                {/* Filas de atributos */}
                <CompareRows ordered={ordered} rows={[...baseRows, ...specRows]} />
              </div>

              {/* Equipamiento */}
              <div className="mt-10">
                <h2 className="mb-4 text-2xl font-bold">Equipamiento</h2>
                <div className="overflow-x-auto rounded-2xl border border-border bg-background">
                  <div
                    className="grid min-w-[640px]"
                    style={{
                      gridTemplateColumns: `minmax(150px, 200px) repeat(${ordered.length}, minmax(230px, 1fr))`,
                    }}
                  >
                    <div className="border-b border-r border-border bg-muted/40 p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Característica
                    </div>
                    {ordered.map((v) => (
                      <div
                        key={v.slug}
                        className="border-b border-r border-border bg-muted/40 p-4 text-sm font-semibold last:border-r-0"
                      >
                        {v.brand} {v.model}
                      </div>
                    ))}
                    {featureRows.map((f) => (
                      <CompareRow
                        key={`${f.group}-${f.name}`}
                        label={f.name}
                        values={ordered.map((v) =>
                          v.vehicleFeatures.some(
                            (vf) => vf.feature.name === f.name,
                          )
                            ? "check"
                            : "minus",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Agregar más vehículos */}
              {canAdd && remaining.length > 0 && (
                <div className="mt-10">
                  <PickyGrid
                    title="Agregar otro vehículo"
                    vehicles={remaining}
                    selectedSlugs={unique}
                  />
                </div>
              )}
            </>
          )}
        </Container>
      </Section>
    </>
  );
}

/** Filas de texto genéricas de la comparación. */
function CompareRows({
  ordered,
  rows,
}: {
  ordered: Array<{ slug: string }>;
  rows: { label: string; values: string[] }[];
}) {
  return (
    <div
      className="grid min-w-[640px]"
      style={{
        gridTemplateColumns: `minmax(150px, 200px) repeat(${ordered.length}, minmax(230px, 1fr))`,
      }}
    >
      {rows.map((row, i) => (
        <CompareRow
          key={`${row.label}-${i}`}
          label={row.label}
          values={row.values}
          highlighted={row.label === "Precio"}
        />
      ))}
    </div>
  );
}

function CompareRow({
  label,
  values,
  highlighted,
}: {
  label: string;
  values: string[]; // "check" | "minus" indican equipamiento; de lo contrario texto
  highlighted?: boolean;
}) {
  return (
    <>
      <div
        className={cn(
          "border-r border-b border-border p-3.5 text-sm text-muted-foreground",
          highlighted && "font-semibold text-foreground",
        )}
      >
        {label}
      </div>
      {values.map((value, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center justify-center border-b border-r border-border p-3.5 text-center text-sm font-medium last:border-r-0",
            highlighted && "text-base font-semibold",
          )}
        >
          {value === "check" ? (
            <Check className="size-4 text-emerald-600" aria-label="Incluido" />
          ) : value === "minus" ? (
            <span className="text-muted-foreground">—</span>
          ) : (
            value
          )}
        </div>
      ))}
    </>
  );
}

/** Chip de un vehículo ya seleccionado (con X para quitarlo). */
function CompareChip({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
    >
      {label}
      <X className="size-3.5" aria-hidden="true" />
      <span className="sr-only">Quitar</span>
    </Link>
  );
}

/** Grilla de vehículos disponibles para agregar a la comparación. */
function PickyGrid({
  title,
  vehicles,
  selectedSlugs,
}: {
  title: string;
  vehicles: {
    slug: string;
    model: string;
    brand?: string;
    mainImage?: string | null;
    price?: unknown;
  }[];
  selectedSlugs: string[];
}) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      {vehicles.length === 0 ? (
        <p className="text-muted-foreground">
          No hay más modelos disponibles.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => {
            const next = selectedSlugs.slice(0, MAX_COMPARE - 1).concat(v.slug);
            return (
              <div
                key={v.slug}
                className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
              >
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <VehicleImage
                    src={v.mainImage}
                    alt={`${v.brand ?? ""} ${v.model}`}
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {v.brand ? `${v.brand} ` : ""}
                    {v.model}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {v.price ? formatARS(v.price) : "Consultar"}
                  </p>
                </div>
                <Link
                  href={buildUrl(next)}
                  aria-label={`Agregar ${v.model} a la comparación`}
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Plus className="size-4" aria-hidden="true" />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}