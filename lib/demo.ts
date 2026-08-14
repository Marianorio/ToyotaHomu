/**
 * Configuración central del modo DEMO / Portfolio.
 *
 * Cuando NEXT_PUBLIC_DEMO_MODE está activo:
 * - Se muestra una insignia discreta "DEMO / Portfolio" en la UI.
 * - Los datos ficticios se presentan claramente como ilustrativos.
 * - No se envían comunicaciones reales (email / WhatsApp).
 * - Toda la arquitectura queda lista para producción al desactivarlo.
 */
export const isDemoMode: boolean =
  process.env.NEXT_PUBLIC_DEMO_MODE === "true";

/** Etiqueta discreta usada en la insignia y en datos ilustrativos. */
export const DEMO_LABEL = "DEMO / Portfolio";
