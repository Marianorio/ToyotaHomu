/**
 * URL base del sitio y helper para URLs absolutas.
 * En producción apunta al dominio real (NEXT_PUBLIC_SITE_URL).
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "http://localhost:3000";

export function absoluteUrl(path = ""): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

/** URL absoluta de una imagen (acepta tanto rutas locales como URLs completas). */
export function absoluteImage(src?: string | null): string | undefined {
  if (!src) return undefined;
  if (/^https?:\/\//.test(src)) return src;
  return `${SITE_URL}/${src.replace(/^\/+/, "")}`;
}