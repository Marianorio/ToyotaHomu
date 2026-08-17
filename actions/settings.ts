"use server";

import { prisma } from "@/lib/db";
import {
  siteSettingsSchema,
  homePageSchema,
  userCreateSchema,
  userUpdateSchema,
} from "@/lib/validations";
import { requireAdmin, requireRole } from "@/lib/session";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { toString, type ActionResult } from "./helpers";
import type { Role } from "@/lib/generated/prisma/client";

export async function updateSiteSettings(
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = siteSettingsSchema.safeParse({
      businessName: formData.get("businessName"),
      legalName: formData.get("legalName"),
      logoUrl: formData.get("logoUrl"),
      faviconUrl: formData.get("faviconUrl"),
      phone: formData.get("phone"),
      whatsapp: formData.get("whatsapp"),
      email: formData.get("email"),
      address: formData.get("address"),
      hours: formData.get("hours"),
      instagram: formData.get("instagram"),
      facebook: formData.get("facebook"),
      tiktok: formData.get("tiktok"),
      mapsUrl: formData.get("mapsUrl"),
      primaryColor: formData.get("primaryColor"),
      secondaryColor: formData.get("secondaryColor"),
      legalText: formData.get("legalText"),
    });

    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || "Datos inválidos";
      return { success: false, error };
    }

    const data = parsed.data;

    await prisma.siteSettings.upsert({
      where: { id: "single" },
      create: { id: "single", businessName: data.businessName },
      update: {
        businessName: data.businessName,
        legalName: toString(data.legalName),
        logoUrl: toString(data.logoUrl),
        faviconUrl: toString(data.faviconUrl),
        phone: toString(data.phone),
        whatsapp: toString(data.whatsapp),
        email: toString(data.email),
        address: toString(data.address),
        hours: toString(data.hours),
        instagram: toString(data.instagram),
        facebook: toString(data.facebook),
        tiktok: toString(data.tiktok),
        mapsUrl: toString(data.mapsUrl),
        primaryColor: toString(data.primaryColor) ?? "#e4002b",
        secondaryColor: toString(data.secondaryColor) ?? "#111111",
        legalText: toString(data.legalText),
      },
    });

    revalidatePath("/", "layout");
    revalidatePath("/admin/configuracion");
    return { success: true, message: "Configuración guardada" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function updateHomePage(
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = homePageSchema.safeParse({
      heroTitle: formData.get("heroTitle"),
      heroSubtitle: formData.get("heroSubtitle"),
      heroCtaText: formData.get("heroCtaText"),
      heroImage: formData.get("heroImage"),
      heroVideo: formData.get("heroVideo"),
      featuredVehicleIds: formData.get("featuredVehicleIds"),
      trendingVehicleIds: formData.get("trendingVehicleIds"),
      featuredPromotionIds: formData.get("featuredPromotionIds"),
      bannerIds: formData.get("bannerIds"),
      social: formData.get("social"),
    });

    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || "Datos inválidos";
      return { success: false, error };
    }

    const data = parsed.data;

    await prisma.homePage.upsert({
      where: { id: "single" },
      create: { id: "single", heroTitle: data.heroTitle, heroSubtitle: data.heroSubtitle },
      update: {
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroCtaText: toString(data.heroCtaText) ?? "Cotizar ahora",
        heroImage: toString(data.heroImage),
        heroVideo: toString(data.heroVideo),
        featuredVehicleIds: toString(data.featuredVehicleIds) ?? "[]",
        trendingVehicleIds: toString(data.trendingVehicleIds) ?? "[]",
        featuredPromotionIds: toString(data.featuredPromotionIds) ?? "[]",
        bannerIds: toString(data.bannerIds) ?? "[]",
        social: toString(data.social) ?? "{}",
      },
    });

    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/admin/contenido-home");
    return { success: true, message: "Contenido de la home guardado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

// -------------------------------------------------------------- Asesores ----

export async function createUser(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = userCreateSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      phone: formData.get("phone"),
      photo: formData.get("photo"),
      password: formData.get("password"),
    });

    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || "Datos inválidos";
      return { success: false, error };
    }

    const data = parsed.data;
    const passwordHash = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role as Role,
        phone: toString(data.phone),
        photo: toString(data.photo),
        passwordHash,
      },
    });

    revalidatePath("/admin/asesores");
    return { success: true, message: "Asesor creado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function updateUser(id: string, formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = userUpdateSchema.safeParse({
      id,
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      phone: formData.get("phone"),
      photo: formData.get("photo"),
      isActive: formData.get("isActive") === "on" || formData.get("isActive") === "true",
      password: formData.get("password"),
    });

    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || "Datos inválidos";
      return { success: false, error };
    }

    const data = parsed.data;

    await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        role: data.role as Role,
        phone: toString(data.phone),
        photo: toString(data.photo),
        isActive: data.isActive ?? true,
        ...(data.password
          ? { passwordHash: await bcrypt.hash(data.password, 10) }
          : {}),
      },
    });

    revalidatePath("/admin/asesores");
    return { success: true, message: "Asesor actualizado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function deactivateUser(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await prisma.user.update({ where: { id }, data: { isActive: false } });
    revalidatePath("/admin/asesores");
    return { success: true, message: "Asesor desactivado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function reactivateUser(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await prisma.user.update({ where: { id }, data: { isActive: true } });
    revalidatePath("/admin/asesores");
    return { success: true, message: "Asesor reactivado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function requireManager() {
  return requireRole(["ADMIN", "SELLER"]);
}