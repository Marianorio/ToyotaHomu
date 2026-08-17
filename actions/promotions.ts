"use server";

import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/db";
import { promotionSchema, financingPlanSchema } from "@/lib/validations";
import { requireRole } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { slugify, toNumber, toString, parseDate, type ActionResult } from "./helpers";

function toDecimal(value: unknown) {
  const n = toNumber(value);
  return n === null ? null : new Prisma.Decimal(n);
}

// ------------------------------------------------------------ Promociones ----

export async function createPromotion(
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    const parsed = promotionSchema.safeParse({
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      image: formData.get("image"),
      vehicleId: formData.get("vehicleId"),
      discount: formData.get("discount"),
      terms: formData.get("terms"),
      validFrom: formData.get("validFrom"),
      validUntil: formData.get("validUntil"),
      featured: formData.get("featured") === "on" || formData.get("featured") === "true",
      active: formData.get("active") === "on" || formData.get("active") === "true",
    });

    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || "Datos inválidos";
      return { success: false, error };
    }

    const data = parsed.data;
    const slug = data.slug || slugify(data.title);

    await prisma.promotion.create({
      data: {
        title: data.title,
        slug,
        description: toString(data.description),
        image: toString(data.image),
        vehicleId: toString(data.vehicleId),
        discount: toString(data.discount),
        terms: toString(data.terms),
        validFrom: parseDate(data.validFrom),
        validUntil: parseDate(data.validUntil),
        featured: data.featured ?? false,
        active: data.active ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/promociones");
    return { success: true, message: "Promoción creada" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function updatePromotion(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    const parsed = promotionSchema.safeParse({
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      image: formData.get("image"),
      vehicleId: formData.get("vehicleId"),
      discount: formData.get("discount"),
      terms: formData.get("terms"),
      validFrom: formData.get("validFrom"),
      validUntil: formData.get("validUntil"),
      featured: formData.get("featured") === "on" || formData.get("featured") === "true",
      active: formData.get("active") === "on" || formData.get("active") === "true",
    });

    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || "Datos inválidos";
      return { success: false, error };
    }

    const data = parsed.data;
    const slug = data.slug || slugify(data.title);

    await prisma.promotion.update({
      where: { id },
      data: {
        title: data.title,
        slug,
        description: toString(data.description),
        image: toString(data.image),
        vehicleId: toString(data.vehicleId),
        discount: toString(data.discount),
        terms: toString(data.terms),
        validFrom: parseDate(data.validFrom),
        validUntil: parseDate(data.validUntil),
        featured: data.featured ?? false,
        active: data.active ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/promociones");
    return { success: true, message: "Promoción actualizada" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function deletePromotion(id: string): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    await prisma.promotion.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/promociones");
    return { success: true, message: "Promoción eliminada" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

// ---------------------------------------------------------- Financiación ----

export async function createFinancingPlan(
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    const parsed = financingPlanSchema.safeParse({
      name: formData.get("name"),
      vehicleId: formData.get("vehicleId"),
      description: formData.get("description"),
      percentage: formData.get("percentage"),
      installments: formData.get("installments"),
      initialPayment: formData.get("initialPayment"),
      interestRate: formData.get("interestRate"),
      monthlyPayment: formData.get("monthlyPayment"),
      active: formData.get("active") === "on" || formData.get("active") === "true",
      validFrom: formData.get("validFrom"),
      validUntil: formData.get("validUntil"),
      legalText: formData.get("legalText"),
    });

    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || "Datos inválidos";
      return { success: false, error };
    }

    const data = parsed.data;

    await prisma.financingPlan.create({
      data: {
        name: data.name,
        vehicleId: toString(data.vehicleId),
        description: toString(data.description),
        percentage: toString(data.percentage),
        installments: toNumber(data.installments),
        initialPayment: toDecimal(data.initialPayment),
        interestRate: toDecimal(data.interestRate),
        monthlyPayment: toDecimal(data.monthlyPayment),
        active: data.active ?? true,
        validFrom: parseDate(data.validFrom),
        validUntil: parseDate(data.validUntil),
        legalText: toString(data.legalText),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/financiacion");
    return { success: true, message: "Plan de financiación creado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function updateFinancingPlan(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    const parsed = financingPlanSchema.safeParse({
      name: formData.get("name"),
      vehicleId: formData.get("vehicleId"),
      description: formData.get("description"),
      percentage: formData.get("percentage"),
      installments: formData.get("installments"),
      initialPayment: formData.get("initialPayment"),
      interestRate: formData.get("interestRate"),
      monthlyPayment: formData.get("monthlyPayment"),
      active: formData.get("active") === "on" || formData.get("active") === "true",
      validFrom: formData.get("validFrom"),
      validUntil: formData.get("validUntil"),
      legalText: formData.get("legalText"),
    });

    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || "Datos inválidos";
      return { success: false, error };
    }

    const data = parsed.data;

    await prisma.financingPlan.update({
      where: { id },
      data: {
        name: data.name,
        vehicleId: toString(data.vehicleId),
        description: toString(data.description),
        percentage: toString(data.percentage),
        installments: toNumber(data.installments),
        initialPayment: toDecimal(data.initialPayment),
        interestRate: toDecimal(data.interestRate),
        monthlyPayment: toDecimal(data.monthlyPayment),
        active: data.active ?? true,
        validFrom: parseDate(data.validFrom),
        validUntil: parseDate(data.validUntil),
        legalText: toString(data.legalText),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/financiacion");
    return { success: true, message: "Plan de financiación actualizado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function deleteFinancingPlan(id: string): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    await prisma.financingPlan.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/financiacion");
    return { success: true, message: "Plan eliminado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}