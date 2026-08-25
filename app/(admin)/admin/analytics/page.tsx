import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { prisma } from "@/lib/db";
import { requireAdminPage } from "@/lib/session";
import { Eye, TrendingUp, CalendarDays, Car } from "lucide-react";

export const dynamic = "force-dynamic";

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("es-AR", { month: "short", day: "numeric" });
}

export default async function AdminAnalyticsPage() {
  await requireAdminPage();

  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);
  const todayStart = startOfDay(now);

  const [total, last30, today, topPaths, topVehicles, recentViews] = await Promise.all([
    prisma.pageView.count(),
    prisma.pageView.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.pageView.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.pageView.groupBy({
      by: ["path"],
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 8,
    }),
    prisma.pageView.groupBy({
      by: ["vehicleSlug"],
      where: { vehicleSlug: { not: null } },
      _count: { vehicleSlug: true },
      orderBy: { _count: { vehicleSlug: "desc" } },
      take: 8,
    }),
    prisma.pageView.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
      take: 1000,
    }),
  ]);

  // Agrupa últimos 7 días para mini gráfico
  const last7: { label: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const start = startOfDay(d);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    const count = recentViews.filter((v) => v.createdAt >= start && v.createdAt < end).length;
    last7.push({ label: formatDate(d), count });
  }
  const max7 = Math.max(1, ...last7.map((x) => x.count));

  const topVehicleSlugs = topVehicles
    .map((v) => v.vehicleSlug)
    .filter(Boolean) as string[];

  const vehiclesMap = topVehicleSlugs.length
    ? Object.fromEntries(
        (
          await prisma.vehicle.findMany({
            where: { slug: { in: topVehicleSlugs } },
            select: { slug: true, model: true, brand: true },
          })
        ).map((v) => [v.slug, v]),
      )
    : {};

  return (
    <div>
      <AdminPageHeader
        title="Analytics de vistas"
        description="Vistas de páginas y vehículos (privado, IP hasheada, sin cookies). Tracking vía sendBeacon en el sitio público."
      />

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="size-4" aria-hidden="true" />
            Total vistas
          </div>
          <p className="mt-2 font-mono text-2xl font-bold">{total}</p>
          <p className="mt-1 text-xs text-muted-foreground">Desde el inicio</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="size-4" aria-hidden="true" />
            Últimos 30 días
          </div>
          <p className="mt-2 font-mono text-2xl font-bold">{last30}</p>
          <p className="mt-1 text-xs text-muted-foreground">Ventana móvil</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" aria-hidden="true" />
            Hoy
          </div>
          <p className="mt-2 font-mono text-2xl font-bold">{today}</p>
          <p className="mt-1 text-xs text-muted-foreground">Desde las 00:00</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Car className="size-4" aria-hidden="true" />
            Vehículo top
          </div>
          <p className="mt-2 truncate text-sm font-bold">
            {topVehicles[0]?.vehicleSlug
              ? (vehiclesMap[topVehicles[0].vehicleSlug]?.model ?? topVehicles[0].vehicleSlug)
              : "—"}
          </p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {topVehicles[0]?._count.vehicleSlug ?? 0} vistas
          </p>
        </div>
      </div>

      {/* Últimos 7 días */}
      <div className="mt-6 rounded-xl border bg-card p-6">
        <h3 className="text-sm font-semibold">Últimos 7 días</h3>
        <div className="mt-4 flex items-end gap-2">
          {last7.map((d) => (
            <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded bg-primary/80 transition-all"
                style={{ height: `${Math.max(6, (d.count / max7) * 80)}px` }}
                title={`${d.label}: ${d.count}`}
              />
              <span className="text-[10px] leading-none text-muted-foreground">{d.label}</span>
              <span className="font-mono text-[10px] text-muted-foreground">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Top páginas */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-sm font-semibold">Páginas más vistas</h3>
          <p className="mt-1 text-xs text-muted-foreground">Top por path</p>
          <div className="mt-4 space-y-2">
            {topPaths.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Aún sin datos</p>
            ) : (
              topPaths.map((r) => (
                <div key={r.path} className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2">
                  <span className="truncate pr-4 font-mono text-xs">{r.path}</span>
                  <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 font-mono text-xs font-bold text-primary-foreground">
                    {r._count.path}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top vehículos */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-sm font-semibold">Vehículos más vistos</h3>
          <p className="mt-1 text-xs text-muted-foreground">Por slug (0 km)</p>
          <div className="mt-4 space-y-2">
            {topVehicles.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Aún sin datos</p>
            ) : (
              topVehicles.map((r) => {
                const v = r.vehicleSlug ? vehiclesMap[r.vehicleSlug] : null;
                const label = v ? `${v.brand} ${v.model}` : r.vehicleSlug;
                return (
                  <div key={r.vehicleSlug} className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2">
                    <span className="truncate pr-4 text-xs font-medium">{label}</span>
                    <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 font-mono text-xs font-bold text-primary-foreground">
                      {r._count.vehicleSlug}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <p className="mt-6 rounded-lg border bg-muted/50 p-3 text-xs leading-relaxed text-muted-foreground">
        Privacidad: no se guardan IPs reales (solo hash SHA-256 con salt), sin cookies, sin fingerprint. El tracker usa{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-[11px]">navigator.sendBeacon</code> y respeta el layout
        público <code className="rounded bg-muted px-1 py-0.5 text-[11px]">(site)</code> — no trackea{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-[11px]">/admin</code> ni <code className="rounded bg-muted px-1 py-0.5 text-[11px]">/api</code>.
        En <code className="rounded bg-muted px-1 py-0.5 text-[11px]">DEMO_MODE</code> se sigue trackeando pero anonimizado.
      </p>
    </div>
  );
}
