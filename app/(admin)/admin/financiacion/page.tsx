import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { prisma } from "@/lib/db";
import { formatARS } from "@/lib/format";
import { deleteFinancingPlan } from "@/actions/promotions";
import { Plus, Pencil } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminFinanciacionPage() {
  const plans = await prisma.financingPlan.findMany({
    orderBy: [{ createdAt: "desc" }],
    include: { vehicle: { select: { brand: true, model: true } } },
  });

  return (
    <div>
      <AdminPageHeader
        title="Financiación"
        description={`${plans.length} planes de financiación`}
      >
        <Link
          href="/admin/financiacion/nuevo"
          className={buttonVariants({ size: "sm" })}
        >
          <Plus />
          Nuevo plan
        </Link>
      </AdminPageHeader>

      <div className="rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan</TableHead>
              <TableHead>Vehículo</TableHead>
              <TableHead>Cuotas</TableHead>
              <TableHead>Cuota mensual</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-muted-foreground"
                >
                  No hay planes de financiación todavía.
                </TableCell>
              </TableRow>
            ) : (
              plans.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>
                    {p.vehicle
                      ? `${p.vehicle.brand} ${p.vehicle.model}`
                      : "General"}
                  </TableCell>
                  <TableCell>{p.installments ?? "—"}</TableCell>
                  <TableCell>{formatARS(p.monthlyPayment)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        p.active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {p.active ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/financiacion/${p.id}`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        <Pencil />
                        Editar
                      </Link>
                      <ConfirmDelete
                        action={deleteFinancingPlan.bind(null, p.id)}
                        label="Eliminar"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}