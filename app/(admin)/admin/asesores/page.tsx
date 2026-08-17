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
import { prisma } from "@/lib/db";
import { deactivateUser, reactivateUser } from "@/actions/settings";
import { Plus, Pencil } from "lucide-react";
import { ToggleUserButton } from "@/components/admin/toggle-user-button";
import { requireAdminPage } from "@/lib/session";

export const dynamic = "force-dynamic";

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrador",
  SELLER: "Asesor de ventas",
  SERVICE: "Servicio técnico",
};

export default async function AdminAsesoresPage() {
  await requireAdminPage();
  const [users, leadGroups] = await Promise.all([
    prisma.user.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.lead.groupBy({
      by: ["assignedUserId"],
      _count: { _all: true },
    }),
  ]);

  const leadCounts = new Map(
    leadGroups.map((g) => [g.assignedUserId, g._count._all]),
  );

  return (
    <div>
      <AdminPageHeader
        title="Asesores"
        description={`${users.length} usuarios del panel`}
      >
        <Link href="/admin/asesores/nuevo" className={buttonVariants({ size: "sm" })}>
          <Plus />
          Nuevo asesor
        </Link>
      </AdminPageHeader>

      <div className="rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Leads</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <div className="leading-tight">
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                </TableCell>
                <TableCell>{ROLE_LABELS[u.role] ?? u.role}</TableCell>
                <TableCell>{leadCounts.get(u.id) ?? 0}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      u.isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {u.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/asesores/${u.id}`}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      <Pencil />
                      Editar
                    </Link>
                    {u.isActive ? (
                      <ToggleUserButton
                        label="Desactivar"
                        action={deactivateUser.bind(null, u.id)}
                      />
                    ) : (
                      <ToggleUserButton
                        label="Activar"
                        action={reactivateUser.bind(null, u.id)}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}