import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { PromotionForm } from "@/components/admin/promotion-form";
import { prisma } from "@/lib/db";

export default async function EditPromotionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [promotion, vehicles] = await Promise.all([
    prisma.promotion.findUnique({ where: { id } }),
    prisma.vehicle.findMany({
      where: { isAvailable: true },
      orderBy: { brand: "asc" },
    }),
  ]);

  if (!promotion) notFound();

  return (
    <div>
      <AdminPageHeader
        title={`Editar ${promotion.title}`}
        description="Modificá los datos de la promoción"
      />
      <PromotionForm
        vehicles={vehicles}
        initial={{
          id: promotion.id,
          title: promotion.title,
          slug: promotion.slug,
          description: promotion.description,
          image: promotion.image,
          vehicleId: promotion.vehicleId,
          discount: promotion.discount,
          terms: promotion.terms,
          validFrom: promotion.validFrom,
          validUntil: promotion.validUntil,
          featured: promotion.featured,
          active: promotion.active,
        }}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}