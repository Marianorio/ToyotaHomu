import { AdminPageHeader } from "@/components/admin/admin-page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusSelect } from "@/components/admin/status-select";
import { prisma } from "@/lib/db";
import { updateTestDriveStatus } from "@/actions/leads";

const TEST_DRIVE_STATUS_OPTIONS = [
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "CONFIRMADO", label: "Confirmado" },
  { value: "REPROGRAMADO", label: "Reprogramado" },
  { value: "CANCELADO", label: "Cancelado" },
  { value: "COMPLETADO", label: "Completado" },
];

export const dynamic = "force-dynamic";

export default async function AdminTestDrivesPage() {
  const testDrives = await prisma.testDrive.findMany({
    orderBy: [{ createdAt: "desc" }],
    include: { vehicle: { select: { brand: true, model: true } } },
  });

  return (
    <div>
      <AdminPageHeader
        title="Test drives"
        description={`${testDrives.length} solicitudes de prueba de manejo`}
      />

      <div className="rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contacto</TableHead>
              <TableHead>Vehículo</TableHead>
              <TableHead>Fecha preferida</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testDrives.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-muted-foreground"
                >
                  No hay solicitudes de test drive todavía.
                </TableCell>
              </TableRow>
            ) : (
              testDrives.map((td) => (
                <TableRow key={td.id}>
                  <TableCell>
                    <div className="leading-tight">
                      <p className="font-medium">
                        {td.name} {td.lastname ?? ""}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {td.phone ?? "—"} · {td.email ?? "—"}
                      </p>
                      {td.comments ? (
                        <p className="text-xs text-muted-foreground">
                          {td.comments.slice(0, 60)}
                        </p>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell>
                    {td.vehicle
                      ? `${td.vehicle.brand} ${td.vehicle.model}`
                      : "A definir"}
                  </TableCell>
                  <TableCell>
                    {td.preferredDate
                      ? new Date(td.preferredDate).toLocaleDateString("es-AR")
                      : "—"}
                    {td.preferredTime ? ` · ${td.preferredTime}` : ""}
                  </TableCell>
                  <TableCell>
                    <StatusSelect
                      value={td.status}
                      action={updateTestDriveStatus.bind(null, td.id)}
                      options={TEST_DRIVE_STATUS_OPTIONS}
                    />
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