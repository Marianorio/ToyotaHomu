import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { UsedVehicleForm } from "@/components/admin/used-vehicle-form";

export default function NewUsedVehiclePage() {
  return (
    <div>
      <AdminPageHeader
        title="Nuevo usado"
        description="Ingresá un vehículo usado al stock"
      />
      <UsedVehicleForm />
    </div>
  );
}