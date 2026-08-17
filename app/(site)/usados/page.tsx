import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { UsedVehicleCard } from "@/components/used/used-vehicle-card";
import { UsedVehicleFilter } from "@/components/used/used-vehicle-filter";
import { EmptyState } from "@/components/ui/feedback";
import { ConversionBar } from "@/components/ui/conversion-bar";
import { SlideUp } from "@/components/ui/motion";
import { Shield, Wrench, FileCheck, Clock } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { Prisma } from "@/lib/generated/prisma/client";

type UsadosPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata = {
  title: "Usados",
  description:
    "Vehículos usados certificados Toyota en Formosa. Calidad, garantía y confianza en cada unidad.",
};

const TRUST_BENEFITS = [
  {
    icon: Shield,
    title: "Revisión 100 puntos",
    description: "Cada usado pasa por una inspección exhaustiva de calidad.",
  },
  {
    icon: Wrench,
    title: "Garantía Toyota",
    description: "Respaldados por la garantía oficial de la marca.",
  },
  {
    icon: FileCheck,
    title: "Historial verificado",
    description: "Documentación completa y transparente del vehículo.",
  },
  {
    icon: Clock,
    title: "Financiación",
    description: "Planes de pago flexibles para tu próximo usado.",
  },
];

export default async function UsadosPage({
  searchParams,
}: UsadosPageProps) {
  const params = await searchParams;
  const brand = typeof params.brand === "string" ? params.brand : "";
  const year = typeof params.year === "string" ? params.year : "";
  const sort = typeof params.sort === "string" ? params.sort : "featured";

  const where: Prisma.UsedVehicleWhereInput = { available: true };

  if (brand) {
    where.brand = { contains: brand };
  }

  if (year) {
    where.year = parseInt(year, 10);
  }

  let orderBy: Prisma.UsedVehicleOrderByWithRelationInput | Prisma.UsedVehicleOrderByWithRelationInput[] = { createdAt: "desc" };
  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  } else if (sort === "year-desc") {
    orderBy = { year: "desc" };
  } else if (sort === "mileage-asc") {
    orderBy = { mileage: "asc" };
  } else if (sort === "featured") {
    orderBy = [{ featured: "desc" }, { year: "desc" }];
  }

  const usedVehicles = await prisma.usedVehicle.findMany({
    where,
    include: { images: { orderBy: { order: "asc" } } },
    orderBy,
  });

  // Get unique brands for filter
  const allUsedVehicles = await prisma.usedVehicle.findMany({
    where: { available: true },
    select: { brand: true },
    distinct: ["brand"],
  });
  const brands = allUsedVehicles.map((v) => v.brand).filter(Boolean) as string[];

  return (
    <>
      {/* Hero */}
      <PageHeader
        eyebrow="Usados certificados"
        title="Tu próximo Toyota, con el respaldo de siempre"
        description="Vehículos usados revisados, certificados y con garantía oficial. Calidad Toyota en cada kilómetro."
        breadcrumbs={[{ label: "Usados" }]}
        cta={{ label: "Cotizar", href: "/cotizar" }}
        backgroundImage="/img/toyotaUsadosConFondo.webp"
        variant="dark"
      />

      {/* Trust benefits */}
      <section className="bg-zinc-900 border-b border-zinc-800">
        <Container className="py-10 sm:py-12">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {TRUST_BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <SlideUp key={benefit.title} delay={i * 0.08}>
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{benefit.title}</h3>
                    <p className="text-xs text-zinc-400">{benefit.description}</p>
                  </div>
                </SlideUp>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Main content */}
      <Section padding="lg">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* Filters sidebar */}
            <aside>
              <UsedVehicleFilter brands={brands} />
            </aside>

            {/* Vehicle grid */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {usedVehicles.length} vehículo{usedVehicles.length !== 1 ? "s" : ""}{" "}
                  disponible{usedVehicles.length !== 1 ? "s" : ""}
                </p>
              </div>

              {usedVehicles.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {usedVehicles.map((v) => (
                    <UsedVehicleCard
                      key={v.id}
                      vehicle={{
                        id: v.id,
                        slug: v.slug,
                        model: v.model,
                        brand: v.brand,
                        year: v.year,
                        mileage: v.mileage,
                        price: v.price?.toString() ?? null,
                        fuelType: v.fuelType,
                        transmission: v.transmission,
                        location: v.location,
                        condition: v.condition,
                        featured: v.featured,
                        available: v.available,
                        mainImage: v.images[0]?.url ?? null,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No hay vehículos usados con esos filtros"
                  description="Probá ajustar los filtros para ver más resultados."
                  action={{ label: "Limpiar filtros", href: "/usados" }}
                />
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section with second background */}
      <section className="relative overflow-hidden bg-zinc-900 py-16 sm:py-20 lg:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/img/toyotaUsadosConFondo2.webp)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900/80 to-zinc-900" />
        <Container className="relative z-10">
          <div className="flex flex-col items-center text-center">
            <SlideUp>
              <h2 className="text-h2 text-white">
                ¿Querés vender tu usado?
              </h2>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="mt-3 max-w-lg text-body-lead text-zinc-300">
                Tasamos tu vehículo actual y te ofrecemos el mejor valor de mercado.
              </p>
            </SlideUp>
            <SlideUp delay={0.2}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/cotizar"
                  className={buttonVariants({ variant: "default", size: "lg" })}
                >
                  Quiero tasar mi usado
                </Link>
                <Link
                  href="/contacto"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "border-zinc-600 text-black hover:bg-zinc-800 hover:text-white",
                  })}
                >
                  Contactanos
                </Link>
              </div>
            </SlideUp>
          </div>
        </Container>
      </section>

      <ConversionBar />
    </>
  );
}
