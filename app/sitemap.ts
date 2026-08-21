import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

type Freq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

const STATIC_ROUTES: { path: string; priority: number; freq: Freq }[] = [
  { path: "", priority: 1, freq: "weekly" },
  { path: "/vehiculos", priority: 0.9, freq: "weekly" },
  { path: "/usados", priority: 0.9, freq: "weekly" },
  { path: "/financiacion", priority: 0.8, freq: "monthly" },
  { path: "/comparador", priority: 0.7, freq: "monthly" },
  { path: "/cotizar", priority: 0.8, freq: "monthly" },
  { path: "/contacto", priority: 0.7, freq: "monthly" },
  { path: "/test-drive", priority: 0.8, freq: "monthly" },
  { path: "/promociones", priority: 0.7, freq: "weekly" },
  { path: "/postventa", priority: 0.6, freq: "monthly" },
  { path: "/servicios", priority: 0.6, freq: "monthly" },
  { path: "/nosotros", priority: 0.5, freq: "yearly" },
  { path: "/ubicacion", priority: 0.5, freq: "yearly" },
  { path: "/privacidad", priority: 0.2, freq: "yearly" },
  { path: "/terminos", priority: 0.2, freq: "yearly" },
  { path: "/preguntas-frecuentes", priority: 0.5, freq: "monthly" },
  { path: "/sustentabilidad", priority: 0.5, freq: "yearly" },
  { path: "/design-system", priority: 0.2, freq: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [vehicles, usedVehicles] = await Promise.all([
    prisma.vehicle.findMany({
      select: { slug: true, updatedAt: true },
    }),
    prisma.usedVehicle.findMany({
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  vehicles.forEach((v) => {
    entries.push({
      url: `${SITE_URL}/vehiculos/${v.slug}`,
      lastModified: v.updatedAt ?? now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  usedVehicles.forEach((v) => {
    entries.push({
      url: `${SITE_URL}/usados/${v.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return entries;
}