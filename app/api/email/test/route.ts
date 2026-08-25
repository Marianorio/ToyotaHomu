import { NextResponse } from "next/server";
import { sendTestEmail } from "@/lib/email";
import { requireRole } from "@/lib/session";

export async function POST(req: Request) {
  try {
    await requireRole(["ADMIN"]);
  } catch {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const to = body.to as string | undefined;

  if (!to || !to.includes("@")) {
    return NextResponse.json({ error: "Email destino requerido" }, { status: 400 });
  }

  const result = await sendTestEmail(to);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    mocked: (result as { mocked?: boolean }).mocked ?? false,
    id: (result as { id?: string }).id,
  });
}
