import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FinancingForm } from "@/components/admin/financing-form";
import { prisma } from "@/lib/db";

export default async function EditFinancingPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [plan, vehicles] = await Promise.all([
    prisma.financingPlan.findUnique({ where: { id } }),
    prisma.vehicle.findMany({
      where: { isAvailable: true },
      orderBy: { brand: "asc" },
    }),
  ]);

  if (!plan) notFound();

  return (
    <div>
      <AdminPageHeader
        title={`Editar ${plan.name}`}
        description="Modificá los datos del plan"
      />
      <FinancingForm
        vehicles={vehicles}
        initial={{
          id: plan.id,
          name: plan.name,
          vehicleId: plan.vehicleId,
          description: plan.description,
          percentage: plan.percentage,
          installments: plan.installments,
          initialPayment:
            plan.initialPayment != null ? String(plan.initialPayment) : "",
          interestRate:
            plan.interestRate != null ? String(plan.interestRate) : "",
          monthlyPayment:
            plan.monthlyPayment != null ? String(plan.monthlyPayment) : "",
          active: plan.active,
          validFrom: plan.validFrom,
          validUntil: plan.validUntil,
          legalText: plan.legalText,
        }}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}