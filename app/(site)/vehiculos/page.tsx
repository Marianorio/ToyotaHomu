import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { VehicleGrid } from "@/components/vehicles/vehicle-grid";
import { VehicleFilter } from "@/components/vehicles/vehicle-filter";
import { EmptyState } from "@/components/ui/feedback";
import { ConversionBar } from "@/components/ui/conversion-bar";
import { prisma } from "@/lib/db";
import { Container } from "@/components/ui/container";
import type { Prisma } from "@/lib/generated/prisma/client";

type VehiculosPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata = {
  title: "Vehículos",
  description:
    "Explorá la gama de vehículos Toyota en Formosa: autos, SUVs, pick-ups, híbridos y más.",
  alternates: {
    canonical: "/vehiculos",
  },
};

export default async function VehiculosPage({
  searchParams,
}: VehiculosPageProps) {
  const params = await searchParams;
  const cat = typeof params.cat === "string" ? params.cat : "";
  const fuel = typeof params.fuel === "string" ? params.fuel : "";
  const trans = typeof params.trans === "string" ? params.trans : "";
  const sort = typeof params.sort === "string" ? params.sort : "featured";

  // Fetch categories for filter
  const categories = await prisma.vehicleCategory.findMany({
    orderBy: { order: "asc" },
  });

  // Build where clause
  const where: Prisma.VehicleWhereInput = { isAvailable: true };

  if (cat) {
    if (cat === "hibridos") {
      where.isHybrid = true;
    } else {
      const category = categories.find((c) => c.slug === cat);
      if (category) {
        where.categoryId = category.id;
      }
    }
  }

  if (fuel === "hibrido") {
    where.isHybrid = true;
  } else if (fuel === "nafta") {
    where.fuelType = { contains: "nafta" };
  } else if (fuel === "diesel") {
    where.fuelType = { contains: "diesel" };
  }

  if (trans) {
    const transmissionMap: Record<string, string> = {
      manual: "Manual",
      automatica: "Automática",
      cvt: "CVT",
    };
    where.transmission = { contains: transmissionMap[trans] ?? trans };
  }

  // Build orderBy
  let orderBy: Prisma.VehicleOrderByWithRelationInput | Prisma.VehicleOrderByWithRelationInput[] = { model: "asc" };
  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  } else if (sort === "newest") {
    orderBy = { createdAt: "desc" };
  } else if (sort === "featured") {
    orderBy = [{ featured: "desc" }, { model: "asc" }];
  }

  // Fetch vehicles
  const vehicles = await prisma.vehicle.findMany({
    where,
    include: { category: true },
    orderBy,
  });

  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Encontrá el Toyota ideal para vos"
        description="Explorá nuestra gama de vehículos y encontrá el modelo que mejor se adapte a tus necesidades."
        breadcrumbs={[{ label: "Vehículos" }]}
        cta={{ label: "Cotizar", href: "/cotizar" }}
        backgroundImage="/img/toyotaConsecionaria.webp"
        variant="dark"
      />

      <Section padding="lg">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Filters sidebar */}
            <aside>
              <VehicleFilter categories={categories} />
            </aside>

            {/* Vehicle grid */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {vehicles.length} vehículo{vehicles.length !== 1 ? "s" : ""}{" "}
                  {cat || fuel || trans ? "encontrado" : "disponible"}
                  {vehicles.length !== 1 ? "s" : ""}
                </p>
              </div>

              {vehicles.length > 0 ? (
                <VehicleGrid
                  vehicles={vehicles.map((v) => ({
                    slug: v.slug,
                    model: v.model,
                    brand: v.brand,
                    categoryName: v.category?.name,
                    price: v.price?.toString(),
                    isNew: v.isNew,
                    isHybrid: v.isHybrid,
                    isAvailable: v.isAvailable,
                    engine: v.engine,
                    transmission: v.transmission,
                    mainImage: v.mainImage,
                  }))}
                />
              ) : (
                <EmptyState
                  title="No hay vehículos con esos filtros"
                  description="Probá ajustar los filtros para ver más resultados."
                  action={{ label: "Limpiar filtros", href: "/vehiculos" }}
                />
              )}
            </div>
          </div>
        </Container>
      </Section>

      <ConversionBar />
    </>
  );
}
