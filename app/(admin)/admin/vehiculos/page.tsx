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
import { deleteVehicle } from "@/actions/vehicles";
import { Plus, Pencil } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminVehiculosPage() {
  const vehicles = await prisma.vehicle.findMany({
    orderBy: [{ createdAt: "desc" }],
    include: { category: true },
  });

  return (
    <div>
      <AdminPageHeader
        title="Vehículos 0 km"
        description={`${vehicles.length} vehículos en catálogo`}
      >
        <Link
          href="/admin/vehiculos/nuevo"
          className={buttonVariants({ size: "sm" })}
        >
          <Plus />
          Nuevo vehículo
        </Link>
      </AdminPageHeader>

      <div className="rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Modelo</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-muted-foreground"
                >
                  No hay vehículos todavía. Creá el primero.
                </TableCell>
              </TableRow>
            ) : (
              vehicles.map((v) => (
                <TableRow key={v.id}>
                  <TableCell>
                    <div className="leading-tight">
                      <p className="font-medium">{v.brand} {v.model}</p>
                      <p className="text-xs text-muted-foreground">{v.year ?? "—"}</p>
                    </div>
                  </TableCell>
                  <TableCell>{v.category.name}</TableCell>
                  <TableCell>{formatARS(v.price)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <Badge
                        variant="outline"
                        className={
                          v.isAvailable
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {v.isAvailable ? "Disponible" : "No disponible"}
                      </Badge>
                      {v.featured && (
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          Destacado
                        </Badge>
                      )}
                      {v.isHybrid && (
                        <Badge variant="outline">Híbrido</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/vehiculos/${v.id}`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        <Pencil />
                        Editar
                      </Link>
                      <ConfirmDelete action={deleteVehicle.bind(null, v.id)} label="Eliminar" />
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