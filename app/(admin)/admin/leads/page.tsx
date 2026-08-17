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
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { StatusSelect } from "@/components/admin/status-select";
import { LeadAssign } from "@/components/admin/lead-assign";
import { LeadNotes } from "@/components/admin/lead-notes";
import { prisma } from "@/lib/db";
import { deleteLead, setLeadStatus } from "@/actions/leads";

const LEAD_STATUS_OPTIONS = [
  { value: "NUEVO", label: "Nuevo" },
  { value: "SEGUIMIENTO", label: "Seguimiento" },
  { value: "NEGOCIACION", label: "Negociación" },
  { value: "CONVERTIDO", label: "Convertido" },
  { value: "PERDIDO", label: "Perdido" },
];

const LEAD_TYPE_LABELS: Record<string, string> = {
  QUOTE: "Cotización",
  TEST_DRIVE: "Test drive",
  USED_VALUATION: "Tasación usados",
  CONTACT: "Consulta",
  SERVICE: "Servicio",
  WHATSAPP: "WhatsApp",
};

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const [leads, asesores] = await Promise.all([
    prisma.lead.findMany({
      orderBy: [{ createdAt: "desc" }],
      include: {
        assignedTo: { select: { id: true, name: true } },
        vehicle: { select: { brand: true, model: true } },
      },
    }),
    prisma.user.findMany({
      where: { isActive: true, role: { in: ["ADMIN", "SELLER"] } },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  return (
    <div>
      <AdminPageHeader
        title="Leads (mini-CRM)"
        description={`${leads.length} solicitudes · asignalas, cambiá su estado y seguilas`}
      />

      <div className="rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-40">Contacto</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Asesor</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-muted-foreground"
                >
                  No hay leads todavía. Se cargan al recibir cotizaciones,
                  test drives, consultas y contactos desde el sitio.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="leading-tight">
                      <p className="font-medium">
                        {lead.name} {lead.lastname ?? ""}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {lead.email ?? "—"} · {lead.phone ?? "—"}
                        {lead.city ? ` · ${lead.city}` : ""}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {lead.vehicle
                          ? `${lead.vehicle.brand} ${lead.vehicle.model} · `
                          : ""}
                        {lead.message?.slice(0, 60) ?? ""}
                      </p>
                      <div className="mt-1">
                        <LeadNotes id={lead.id} initial={lead.notes} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {LEAD_TYPE_LABELS[lead.type] ?? lead.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusSelect
                      value={lead.status}
                      action={setLeadStatus.bind(null, lead.id)}
                      options={LEAD_STATUS_OPTIONS}
                    />
                  </TableCell>
                  <TableCell>
                    <LeadAssign
                      id={lead.id}
                      users={asesores}
                      value={lead.assignedUserId}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <ConfirmDelete
                      action={deleteLead.bind(null, lead.id)}
                      label="Eliminar"
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