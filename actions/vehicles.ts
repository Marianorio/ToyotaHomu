"use server";

import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/db";
import { vehicleSchema, usedVehicleSchema } from "@/lib/validations";
import { requireRole } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { slugify, toNumber, toString, type ActionResult } from "./helpers";

function toDecimal(value: unknown) {
  const n = toNumber(value);
  return n === null ? null : new Prisma.Decimal(n);
}

export async function createVehicle(formData: FormData): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    const parsed = vehicleSchema.safeParse({
      brand: formData.get("brand"),
      model: formData.get("model"),
      slug: formData.get("slug"),
      categoryId: formData.get("categoryId"),
      description: formData.get("description"),
      shortDescription: formData.get("shortDescription"),
      isNew: formData.get("isNew") === "on" || formData.get("isNew") === "true",
      isHybrid:
        formData.get("isHybrid") === "on" ||
        formData.get("isHybrid") === "true",
      isAvailable:
        formData.get("isAvailable") === "on" ||
        formData.get("isAvailable") === "true",
      featured: formData.get("featured") === "on" || formData.get("featured") === "true",
      price: formData.get("price"),
      currency: formData.get("currency"),
      year: formData.get("year"),
      engine: formData.get("engine"),
      power: formData.get("power"),
      torque: formData.get("torque"),
      transmission: formData.get("transmission"),
      traction: formData.get("traction"),
      fuelType: formData.get("fuelType"),
      doors: formData.get("doors"),
      seats: formData.get("seats"),
      mainImage: formData.get("mainImage"),
    });

    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || "Datos inválidos";
      return { success: false, error };
    }

    const data = parsed.data;
    const slug = data.slug || slugify(`${data.brand} ${data.model}`);

    await prisma.vehicle.create({
      data: {
        brand: data.brand,
        model: data.model,
        slug,
        categoryId: data.categoryId,
        description: toString(data.description),
        shortDescription: toString(data.shortDescription),
        isNew: data.isNew ?? true,
        isHybrid: data.isHybrid ?? false,
        isAvailable: data.isAvailable ?? true,
        featured: data.featured ?? false,
        price: toDecimal(data.price),
        currency: data.currency ?? "ARS",
        year: toNumber(data.year),
        engine: toString(data.engine),
        power: toString(data.power),
        torque: toString(data.torque),
        transmission: toString(data.transmission),
        traction: toString(data.traction),
        fuelType: toString(data.fuelType),
        doors: toNumber(data.doors),
        seats: toNumber(data.seats),
        mainImage: toString(data.mainImage),
      },
    });

    revalidatePath("/vehiculos");
    revalidatePath("/admin/vehiculos");
    return { success: true, message: "Vehículo creado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function updateVehicle(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    const parsed = vehicleSchema.safeParse({
      brand: formData.get("brand"),
      model: formData.get("model"),
      slug: formData.get("slug"),
      categoryId: formData.get("categoryId"),
      description: formData.get("description"),
      shortDescription: formData.get("shortDescription"),
      isNew: formData.get("isNew") === "on" || formData.get("isNew") === "true",
      isHybrid:
        formData.get("isHybrid") === "on" ||
        formData.get("isHybrid") === "true",
      isAvailable:
        formData.get("isAvailable") === "on" ||
        formData.get("isAvailable") === "true",
      featured: formData.get("featured") === "on" || formData.get("featured") === "true",
      price: formData.get("price"),
      currency: formData.get("currency"),
      year: formData.get("year"),
      engine: formData.get("engine"),
      power: formData.get("power"),
      torque: formData.get("torque"),
      transmission: formData.get("transmission"),
      traction: formData.get("traction"),
      fuelType: formData.get("fuelType"),
      doors: formData.get("doors"),
      seats: formData.get("seats"),
      mainImage: formData.get("mainImage"),
    });

    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || "Datos inválidos";
      return { success: false, error };
    }

    const data = parsed.data;
    const slug = data.slug || slugify(`${data.brand} ${data.model}`);

    await prisma.vehicle.update({
      where: { id },
      data: {
        brand: data.brand,
        model: data.model,
        slug,
        categoryId: data.categoryId,
        description: toString(data.description),
        shortDescription: toString(data.shortDescription),
        isNew: data.isNew ?? true,
        isHybrid: data.isHybrid ?? false,
        isAvailable: data.isAvailable ?? true,
        featured: data.featured ?? false,
        price: toDecimal(data.price),
        currency: data.currency ?? "ARS",
        year: toNumber(data.year),
        engine: toString(data.engine),
        power: toString(data.power),
        torque: toString(data.torque),
        transmission: toString(data.transmission),
        traction: toString(data.traction),
        fuelType: toString(data.fuelType),
        doors: toNumber(data.doors),
        seats: toNumber(data.seats),
        mainImage: toString(data.mainImage),
      },
    });

    revalidatePath("/vehiculos");
    revalidatePath(`/vehiculos/${slug}`);
    revalidatePath("/admin/vehiculos");
    return { success: true, message: "Vehículo actualizado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function deleteVehicle(id: string): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    await prisma.vehicle.delete({ where: { id } });
    revalidatePath("/vehiculos");
    revalidatePath("/admin/vehiculos");
    return { success: true, message: "Vehículo eliminado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

// ---------------------------------------------------------------- Usados ----

export async function createUsedVehicle(
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    const parsed = usedVehicleSchema.safeParse({
      brand: formData.get("brand"),
      model: formData.get("model"),
      slug: formData.get("slug"),
      year: formData.get("year"),
      mileage: formData.get("mileage"),
      price: formData.get("price"),
      fuelType: formData.get("fuelType"),
      transmission: formData.get("transmission"),
      location: formData.get("location"),
      condition: formData.get("condition"),
      description: formData.get("description"),
      featured: formData.get("featured") === "on" || formData.get("featured") === "true",
      available: formData.get("available") === "on" || formData.get("available") === "true",
      images: formData.get("images"),
    });

    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || "Datos inválidos";
      return { success: false, error };
    }

    const data = parsed.data;
    const slug = data.slug || slugify(`${data.brand} ${data.model}`);
    const imageUrls = toString(data.images)
      ?.split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    await prisma.usedVehicle.create({
      data: {
        brand: data.brand,
        model: data.model,
        slug,
        year: toNumber(data.year),
        mileage: toNumber(data.mileage),
        price: toDecimal(data.price),
        fuelType: toString(data.fuelType),
        transmission: toString(data.transmission),
        location: toString(data.location),
        condition: toString(data.condition),
        description: toString(data.description),
        featured: data.featured ?? false,
        available: data.available ?? true,
        images: imageUrls?.length
          ? { create: imageUrls.map((url) => ({ url })) }
          : undefined,
      },
    });

    revalidatePath("/usados");
    revalidatePath("/admin/usados");
    return { success: true, message: "Usado creado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function updateUsedVehicle(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    const parsed = usedVehicleSchema.safeParse({
      brand: formData.get("brand"),
      model: formData.get("model"),
      slug: formData.get("slug"),
      year: formData.get("year"),
      mileage: formData.get("mileage"),
      price: formData.get("price"),
      fuelType: formData.get("fuelType"),
      transmission: formData.get("transmission"),
      location: formData.get("location"),
      condition: formData.get("condition"),
      description: formData.get("description"),
      featured: formData.get("featured") === "on" || formData.get("featured") === "true",
      available: formData.get("available") === "on" || formData.get("available") === "true",
      images: formData.get("images"),
    });

    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || "Datos inválidos";
      return { success: false, error };
    }

    const data = parsed.data;
    const slug = data.slug || slugify(`${data.brand} ${data.model}`);
    const imageUrls = toString(data.images)
      ?.split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    await prisma.usedVehicle.update({
      where: { id },
      data: {
        brand: data.brand,
        model: data.model,
        slug,
        year: toNumber(data.year),
        mileage: toNumber(data.mileage),
        price: toDecimal(data.price),
        fuelType: toString(data.fuelType),
        transmission: toString(data.transmission),
        location: toString(data.location),
        condition: toString(data.condition),
        description: toString(data.description),
        featured: data.featured ?? false,
        available: data.available ?? true,
      },
    });

    if (imageUrls) {
      await prisma.usedVehicleImage.deleteMany({ where: { usedVehicleId: id } });
      await prisma.usedVehicleImage.createMany({
        data: imageUrls.map((url) => ({
          usedVehicleId: id,
          url,
          order: 0,
        })),
      });
    }

    revalidatePath("/usados");
    revalidatePath(`/usados/${slug}`);
    revalidatePath("/admin/usados");
    return { success: true, message: "Usado actualizado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function deleteUsedVehicle(id: string): Promise<ActionResult> {
  try {
    await requireRole(["ADMIN", "SELLER"]);
    await prisma.usedVehicle.delete({ where: { id } });
    revalidatePath("/usados");
    revalidatePath("/admin/usados");
    return { success: true, message: "Usado eliminado" };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}