import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FinancingForm } from "@/components/admin/financing-form";
import { prisma } from "@/lib/db";

export default async function NewFinancingPlanPage() {
  const vehicles = await prisma.vehicle.findMany({
    where: { isAvailable: true },
    orderBy: { brand: "asc" },
  });

  return (
    <div>
      <AdminPageHeader
        title="Nuevo plan de financiación"
        description="Creá un plan para ofrecer financiación"
      />
      <FinancingForm vehicles={vehicles} />
    </div>
  );
}