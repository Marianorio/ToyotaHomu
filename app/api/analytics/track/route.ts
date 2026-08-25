import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.AUTH_SECRET || "toyota-analytics-salt";
  return createHash("sha256").update(ip + salt).digest("hex").slice(0, 16);
}

function getIp(req: NextRequest): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? null;
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  // @ts-expect-error NextRequest ip is available in some runtimes
  const ip = req.ip as string | undefined;
  return ip ?? null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = typeof body.path === "string" ? body.path.trim() : "";
    const vehicleSlug = typeof body.vehicleSlug === "string" ? body.vehicleSlug.trim() : null;
    const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 500) : null;

    if (!path || !path.startsWith("/")) {
      return NextResponse.json({ error: "path inválido" }, { status: 400 });
    }

    // No trackear admin/api/_next/static
    if (
      path.startsWith("/admin") ||
      path.startsWith("/api") ||
      path.startsWith("/_next") ||
      path === "/favicon.ico"
    ) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    // Corta paths muy largos
    const cleanPath = path.slice(0, 300);
    const cleanVehicleSlug = vehicleSlug ? vehicleSlug.slice(0, 100) : null;

    const ip = getIp(req);
    const ipHash = hashIp(ip);
    const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;

    await prisma.pageView.create({
      data: {
        path: cleanPath,
        vehicleSlug: cleanVehicleSlug,
        referrer,
        userAgent,
        ipHash,
      },
    });

    // También incrementa viewCount del vehículo si aplica (para ranking rápido)
    if (cleanVehicleSlug) {
      await prisma.vehicle
        .update({
          where: { slug: cleanVehicleSlug },
          data: { viewCount: { increment: 1 } },
        })
        .catch(() => {
          // ignora si es usado o slug no existe en Vehicle
        });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[analytics] track error:", e);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
