import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { VehicleForm } from "@/components/admin/vehicle-form";
import { prisma } from "@/lib/db";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categories = await prisma.vehicleCategory.findMany({
    orderBy: { order: "asc" },
  });
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });

  if (!vehicle) notFound();

  const initial = {
    id: vehicle.id,
    brand: vehicle.brand,
    model: vehicle.model,
    slug: vehicle.slug,
    categoryId: vehicle.categoryId,
    description: vehicle.description,
    shortDescription: vehicle.shortDescription,
    isNew: vehicle.isNew,
    isHybrid: vehicle.isHybrid,
    isAvailable: vehicle.isAvailable,
    featured: vehicle.featured,
    price: vehicle.price != null ? String(vehicle.price) : "",
    currency: vehicle.currency,
    year: vehicle.year,
    engine: vehicle.engine,
    power: vehicle.power,
    torque: vehicle.torque,
    transmission: vehicle.transmission,
    traction: vehicle.traction,
    fuelType: vehicle.fuelType,
    doors: vehicle.doors,
    seats: vehicle.seats,
    mainImage: vehicle.mainImage,
  };

  return (
    <div>
      <AdminPageHeader
        title={`Editar ${vehicle.brand} ${vehicle.model}`}
        description="Modificá los datos del vehículo"
      />
      <VehicleForm
        categories={categories}
        initial={initial}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}