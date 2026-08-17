import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { UsedVehicleForm } from "@/components/admin/used-vehicle-form";
import { prisma } from "@/lib/db";

export default async function EditUsedVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await prisma.usedVehicle.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!vehicle) notFound();

  const initial = {
    id: vehicle.id,
    brand: vehicle.brand,
    model: vehicle.model,
    slug: vehicle.slug,
    year: vehicle.year,
    mileage: vehicle.mileage,
    price: vehicle.price != null ? String(vehicle.price) : "",
    fuelType: vehicle.fuelType,
    transmission: vehicle.transmission,
    location: vehicle.location,
    condition: vehicle.condition,
    description: vehicle.description,
    featured: vehicle.featured,
    available: vehicle.available,
    images: vehicle.images.map((i) => i.url).join("\n"),
  };

  return (
    <div>
      <AdminPageHeader
        title={`Editar ${vehicle.brand} ${vehicle.model}`}
        description="Modificá los datos del usado"
      />
      <UsedVehicleForm initial={initial} submitLabel="Guardar cambios" />
    </div>
  );
}