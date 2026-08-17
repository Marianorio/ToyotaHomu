import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { VehicleGallery } from "@/components/vehicles/vehicle-gallery";
import { VehicleSpecs } from "@/components/vehicles/vehicle-specs";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { formatARS } from "@/lib/format";
import {
  Fuel,
  Settings2,
  Users,
  Zap,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { CompareButton } from "@/components/vehicles/compare-button";
import { cn } from "@/lib/utils";

type VehicleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: VehicleDetailPageProps) {
  const { slug } = await params;
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!vehicle) {
    return { title: "Vehículo no encontrado" };
  }

  return {
    title: `${vehicle.brand} ${vehicle.model} ${vehicle.year || ""} - Toyota Formosa`,
    description:
      vehicle.shortDescription ||
      `${vehicle.brand} ${vehicle.model} disponible en Toyota Formosa. ${vehicle.category?.name || ""} con ${vehicle.transmission || ""} transmisión.`,
    openGraph: {
      title: `${vehicle.brand} ${vehicle.model}`,
      description:
        vehicle.shortDescription ||
        `${vehicle.brand} ${vehicle.model} en Toyota Formosa`,
      images: vehicle.mainImage ? [{ url: vehicle.mainImage }] : [],
    },
  };
}

export default async function VehicleDetailPage({
  params,
}: VehicleDetailPageProps) {
  const { slug } = await params;

  const vehicle = await prisma.vehicle.findUnique({
    where: { slug },
    include: {
      category: true,
      versions: true,
      colors: true,
      images: { orderBy: { order: "asc" } },
      specifications: { orderBy: { code: "asc" } },
      vehicleFeatures: {
        include: { feature: true },
      },
    },
  });

  if (!vehicle) {
    notFound();
  }

  // Get related vehicles (same category, excluding current)
  const relatedVehicles = await prisma.vehicle.findMany({
    where: {
      categoryId: vehicle.categoryId,
      id: { not: vehicle.id },
      isAvailable: true,
    },
    include: { category: true },
    take: 3,
  });

  // Group features by category
  const featuresByGroup = vehicle.vehicleFeatures.reduce(
    (acc, vf) => {
      const group = vf.feature.group;
      if (!acc[group]) acc[group] = [];
      acc[group].push(vf.feature);
      return acc;
    },
    {} as Record<string, typeof vehicle.vehicleFeatures[number]["feature"][]>
  );

  const groupLabels: Record<string, string> = {
    safety: "Seguridad",
    comfort: "Confort",
    technology: "Tecnología",
    performance: "Performance",
  };

  return (
    <div className="pb-16">
      <Container className="py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Vehículos", href: "/vehiculos" },
            { label: vehicle.category?.name || "", href: `/vehiculos?cat=${vehicle.category?.slug || ""}` },
            { label: `${vehicle.brand} ${vehicle.model}` },
          ]}
        />
      </Container>

      {/* Main content */}
      <Container className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left: Gallery */}
        <div>
          <VehicleGallery
            images={vehicle.images.map((img) => ({
              id: img.id,
              url: img.url,
              alt: img.alt || `${vehicle.brand} ${vehicle.model}`,
            }))}
            mainImage={vehicle.mainImage}
            vehicleName={`${vehicle.brand} ${vehicle.model}`}
          />
        </div>

        {/* Right: Info */}
        <div className="space-y-6">
          {/* Title & badges */}
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              {vehicle.isNew && <Badge variant="default">Nuevo</Badge>}
              {vehicle.isHybrid && <Badge variant="secondary">Híbrido</Badge>}
              {vehicle.featured && <Badge variant="outline">Destacado</Badge>}
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {vehicle.brand} {vehicle.model}
            </h1>
            {vehicle.category && (
              <p className="mt-1 text-muted-foreground">
                {vehicle.category.name}
                {vehicle.year && ` • ${vehicle.year}`}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Precio desde</p>
            <p className="text-2xl font-bold">
              {vehicle.price ? formatARS(vehicle.price.toString()) : "Consultar"}
            </p>
          </div>

          {/* Quick specs */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {vehicle.engine && (
              <div className="text-center">
                <Fuel className="mx-auto mb-1 size-5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Motor</p>
                <p className="text-sm font-medium">{vehicle.engine}</p>
              </div>
            )}
            {vehicle.power && (
              <div className="text-center">
                <Zap className="mx-auto mb-1 size-5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Potencia</p>
                <p className="text-sm font-medium">{vehicle.power}</p>
              </div>
            )}
            {vehicle.transmission && (
              <div className="text-center">
                <Settings2 className="mx-auto mb-1 size-5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Transmisión</p>
                <p className="text-sm font-medium">{vehicle.transmission}</p>
              </div>
            )}
            {vehicle.seats && (
              <div className="text-center">
                <Users className="mx-auto mb-1 size-5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Capacidad</p>
                <p className="text-sm font-medium">{vehicle.seats} personas</p>
              </div>
            )}
          </div>

          {/* Versions */}
          {vehicle.versions.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
                Versiones disponibles
              </h3>
              <div className="space-y-2">
                {vehicle.versions.map((version) => (
                  <div
                    key={version.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{version.name}</p>
                      {version.engine && (
                        <p className="text-sm text-muted-foreground">
                          {version.engine} • {version.transmission}
                        </p>
                      )}
                    </div>
                    <p className="font-semibold">
                      {version.price ? formatARS(version.price.toString()) : "Consultar"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {vehicle.colors.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
                Colores disponibles
              </h3>
              <div className="flex flex-wrap gap-3">
                {vehicle.colors.map((color) => (
                  <div key={color.id} className="flex items-center gap-2">
                    <div
                      className="size-6 rounded-full border-2 border-border"
                      style={{ backgroundColor: color.hex || "#ccc" }}
                      title={color.name}
                    />
                    <span className="text-sm">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Link
              href={`/cotizar?vehicle=${vehicle.slug}`}
              className={cn(buttonVariants({ size: "lg" }), "flex-1 text-center font-bold tracking-wide")}
            >
              Cotizar este vehículo
            </Link>
            <Link
              href={`/test-drive?vehicle=${vehicle.slug}`}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "flex-1 text-center font-bold tracking-wide")}
            >
              Solicitar test drive
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <CompareButton
              item={{
                slug: vehicle.slug,
                model: vehicle.model,
                mainImage: vehicle.mainImage,
              }}
            />
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Hola, quiero consultar por el ${vehicle.brand} ${vehicle.model}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "gap-2 font-bold tracking-wide text-emerald-600 hover:text-emerald-700"
              )}
            >
              <MessageCircle className="size-4" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </Container>

      {/* Description */}
      {vehicle.description && (
        <Container className="mt-12">
          <div className="max-w-3xl">
            <h2 className="mb-4 text-2xl font-bold">Descripción</h2>
            <p className="leading-relaxed text-muted-foreground">
              {vehicle.description}
            </p>
          </div>
        </Container>
      )}

      {/* Specifications */}
      {vehicle.specifications.length > 0 && (
        <Container className="mt-12">
          <VehicleSpecs specifications={vehicle.specifications} />
        </Container>
      )}

      {/* Features */}
      {Object.keys(featuresByGroup).length > 0 && (
        <Container className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Equipamiento</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(featuresByGroup).map(([group, features]) => (
              <div key={group}>
                <h3 className="mb-3 text-lg font-semibold">
                  {groupLabels[group] || group}
                </h3>
                <ul className="space-y-2">
                  {features.map((feature) => (
                    <li
                      key={feature.id}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="mt-0.5 size-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {feature.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      )}

      {/* Related vehicles */}
      {relatedVehicles.length > 0 && (
        <Container className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Vehículos relacionados</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedVehicles.map((v) => (
              <VehicleCard
                key={v.id}
                vehicle={{
                  slug: v.slug,
                  model: v.model,
                  brand: v.brand,
                  categoryName: v.category?.name || "",
                  price: v.price ? v.price.toString() : null,
                  isNew: v.isNew,
                  isHybrid: v.isHybrid,
                  isAvailable: v.isAvailable,
                  engine: v.engine,
                  transmission: v.transmission,
                  mainImage: v.mainImage,
                }}
              />
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}
