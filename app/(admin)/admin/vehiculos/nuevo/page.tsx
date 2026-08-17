import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { VehicleForm } from "@/components/admin/vehicle-form";
import { prisma } from "@/lib/db";

export default async function NewVehiclePage() {
  const categories = await prisma.vehicleCategory.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <AdminPageHeader
        title="Nuevo vehículo 0 km"
        description="Completá los datos básicos del vehículo"
      />
      <VehicleForm categories={categories} />
    </div>
  );
}