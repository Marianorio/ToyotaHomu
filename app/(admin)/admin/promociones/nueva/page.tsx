import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { PromotionForm } from "@/components/admin/promotion-form";
import { prisma } from "@/lib/db";

export default async function NewPromotionPage() {
  const vehicles = await prisma.vehicle.findMany({
    where: { isAvailable: true },
    orderBy: { brand: "asc" },
  });

  return (
    <div>
      <AdminPageHeader
        title="Nueva promoción"
        description="Creá una promoción del concesionario"
      />
      <PromotionForm vehicles={vehicles} />
    </div>
  );
}