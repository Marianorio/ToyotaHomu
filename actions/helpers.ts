import { revalidatePath } from "next/cache";

export type ActionResult =
  | { success: true; message?: string }
  | { success: false; error: string };

/** Resultado con datos (para lecturas o listas que devuelven algo al cliente). */
export type ActionResultData<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Convierte un string ISO (yyyy-mm-dd) o vacío a Date | null. */
export function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Convierte un valor libre (string vacío = null) a número o null. */
export function toNumber(value: unknown): number | null {
  if (value === "" || value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

/** Convierte un valor libre a string o null ('' → null). */
export function toString(value: unknown): string | null {
  if (value === "" || value === null || value === undefined) return null;
  const s = String(value).trim();
  return s === "" ? null : s;
}

/** Revalida las rutas públicas y admin afectadas por cambios de contenido. */
export function revalidateContent() {
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
}