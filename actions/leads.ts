"use server";

import { prisma } from "@/lib/db";
import {
  leadUpdateSchema,
  testDriveSchema,
} from "@/lib/validations";
import { requireRole } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { toString, type ActionResult } from "./helpers";
import type { LeadStatus } from "@/lib/generated/prisma/client";

export async function setLeadStatus(
  id: string,
  status: string,
): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    const parsed = leadUpdateSchema.pick({ status: true }).safeParse({ status });
    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || "Estado inválido";
      return { success: false, error };
    }
    await prisma.lead.update({
      where: { id },
      data: { status: parsed.data.status as LeadStatus },
    });
    revalidatePath("/admin/leads");
    return { success: true, message: "Estado actualizado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function assignLead(
  id: string,
  assignedUserId: string,
): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    await prisma.lead.update({
      where: { id },
      data: { assignedUserId: toString(assignedUserId) },
    });
    revalidatePath("/admin/leads");
    return { success: true, message: "Asesor asignado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function setLeadNotes(
  id: string,
  notes: string,
): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    await prisma.lead.update({
      where: { id },
      data: { notes: toString(notes) },
    });
    revalidatePath("/admin/leads");
    return { success: true, message: "Notas guardadas" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function updateTestDriveStatus(
  id: string,
  status: string,
): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    const parsed = testDriveSchema.safeParse({ status });
    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || "Estado inválido";
      return { success: false, error };
    }
    await prisma.testDrive.update({
      where: { id },
      data: { status: parsed.data.status },
    });
    revalidatePath("/admin/test-drives");
    return { success: true, message: "Estado actualizado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function deleteLead(id: string): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN"]);
    await prisma.lead.delete({ where: { id } });
    revalidatePath("/admin/leads");
    return { success: true, message: "Lead eliminado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}