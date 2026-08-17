import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";
import {
  Car,
  CarFront,
  Tag,
  Calculator,
  Users,
  CalendarCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  NUEVO: "bg-emerald-100 text-emerald-700",
  SEGUIMIENTO: "bg-amber-100 text-amber-700",
  NEGOCIACION: "bg-blue-100 text-blue-700",
  CONVERTIDO: "bg-primary/15 text-primary",
  PERDIDO: "bg-muted text-muted-foreground",
};

export default async function DashboardPage() {
  const [
    vehicleCount,
    usedCount,
    promotionCount,
    financingCount,
    pendingLeads,
    pendingTestDrives,
    userCount,
    recentLeads,
  ] = await Promise.all([
    prisma.vehicle.count(),
    prisma.usedVehicle.count(),
    prisma.promotion.count({ where: { active: true } }),
    prisma.financingPlan.count({ where: { active: true } }),
    prisma.lead.count({ where: { status: "NUEVO" } }),
    prisma.testDrive.count({ where: { status: "PENDIENTE" } }),
    prisma.user.count({ where: { isActive: true } }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        assignedTo: { select: { name: true } },
        vehicle: { select: { brand: true, model: true } },
      },
    }),
  ]);

  const metrics = [
    { label: "Vehículos 0 km", value: vehicleCount, icon: Car },
    { label: "Usados", value: usedCount, icon: CarFront },
    { label: "Promociones activas", value: promotionCount, icon: Tag },
    { label: "Planes de financiación", value: financingCount, icon: Calculator },
    { label: "Leads nuevos", value: pendingLeads, icon: Users },
    { label: "Test drives pendientes", value: pendingTestDrives, icon: CalendarCheck },
    { label: "Asesores activos", value: userCount, icon: Users },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Resumen del estado del negocio"
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label} size="sm">
            <CardHeader className="flex-row items-center gap-3 space-y-0">
              <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <m.icon className="size-4 text-muted-foreground" />
              </span>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {m.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl font-semibold">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Leads recientes</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {recentLeads.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Sin leads todavía
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {recentLeads.map((lead) => (
                <li
                  key={lead.id}
                  className="flex flex-wrap items-center justify-between gap-2 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {lead.name} {lead.lastname}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {lead.type} ·{" "}
                      {lead.vehicle
                        ? `${lead.vehicle.brand} ${lead.vehicle.model}`
                        : lead.message?.slice(0, 40) ?? "Sin detalle"}
                      {lead.assignedTo ? ` · ${lead.assignedTo.name}` : ""}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("font-normal", STATUS_COLORS[lead.status])}
                  >
                    {lead.status}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}