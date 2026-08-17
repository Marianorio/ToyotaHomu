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
import { deletePromotion } from "@/actions/promotions";
import { Plus, Pencil } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPromocionesPage() {
  const promotions = await prisma.promotion.findMany({
    orderBy: [{ createdAt: "desc" }],
    include: { vehicle: { select: { brand: true, model: true } } },
  });

  return (
    <div>
      <AdminPageHeader
        title="Promociones"
        description={`${promotions.length} promociones en total`}
      >
        <Link
          href="/admin/promociones/nueva"
          className={buttonVariants({ size: "sm" })}
        >
          <Plus />
          Nueva promoción
        </Link>
      </AdminPageHeader>

      <div className="rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Promoción</TableHead>
              <TableHead>Vehículo</TableHead>
              <TableHead>Beneficio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-muted-foreground"
                >
                  No hay promociones todavía.
                </TableCell>
              </TableRow>
            ) : (
              promotions.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>
                    {p.vehicle
                      ? `${p.vehicle.brand} ${p.vehicle.model}`
                      : "General"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {p.discount ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        p.active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {p.active ? "Activa" : "Inactiva"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/promociones/${p.id}`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        <Pencil />
                        Editar
                      </Link>
                      <ConfirmDelete
                        action={deletePromotion.bind(null, p.id)}
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