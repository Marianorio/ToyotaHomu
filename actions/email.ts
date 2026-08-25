"use server";

import { sendTestEmail } from "@/lib/email";
import { requireRole } from "@/lib/session";

export async function testEmailAction(formData: FormData) {
  try {
    await requireRole(["ADMIN"]);
  } catch {
    return { success: false as const, error: "No autorizado" };
  }

  const to = String(formData.get("to") || "").trim();
  if (!to || !to.includes("@")) {
    return { success: false as const, error: "Email destino inválido" };
  }

  const result = await sendTestEmail(to);
  if (!result.success) {
    return { success: false as const, error: result.error };
  }

  return {
    success: true as const,
    mocked: (result as { mocked?: boolean }).mocked ?? false,
    id: (result as { id?: string }).id,
  };
}
