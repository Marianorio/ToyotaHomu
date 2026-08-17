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
import { formatARS, formatKilometers } from "@/lib/format";
import { deleteUsedVehicle } from "@/actions/vehicles";
import { Plus, Pencil } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminUsadosPage() {
  const used = await prisma.usedVehicle.findMany({
    orderBy: [{ createdAt: "desc" }],
  });

  return (
    <div>
      <AdminPageHeader
        title="Vehículos usados"
        description={`${used.length} usados en stock`}
      >
        <Link href="/admin/usados/nuevo" className={buttonVariants({ size: "sm" })}>
          <Plus />
          Nuevo usado
        </Link>
      </AdminPageHeader>

      <div className="rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehículo</TableHead>
              <TableHead>Km</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {used.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-muted-foreground"
                >
                  No hay vehículos usados todavía.
                </TableCell>
              </TableRow>
            ) : (
              used.map((v) => (
                <TableRow key={v.id}>
                  <TableCell>
                    <div className="leading-tight">
                      <p className="font-medium">{v.brand} {v.model}</p>
                      <p className="text-xs text-muted-foreground">
                        {v.year ?? "—"} · {v.location ?? "Ubicación no especificada"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{formatKilometers(v.mileage)}</TableCell>
                  <TableCell>{formatARS(v.price)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        v.available
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {v.available ? "Disponible" : "Vendido"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/usados/${v.id}`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        <Pencil />
                        Editar
                      </Link>
                      <ConfirmDelete
                        action={deleteUsedVehicle.bind(null, v.id)}
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