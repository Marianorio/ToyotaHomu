/**
 * Capa centralizada de ingegración con WhatsApp.
 *
 * El número de WhatsApp sale de la configuración (SiteSettings en la base,
 * cargada en Server Components). Este helper genera el link wa.me.
 */

const DEFAULT_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export function generateWhatsAppUrl(
  message: string,
  phone?: string,
): string {
  const number = (phone ?? DEFAULT_NUMBER).replace(/[^\d]/g, "");
  const encoded = encodeURIComponent(message);
  if (!number) return `https://wa.me/?text=${encoded}`;
  return `https://wa.me/${number}?text=${encoded}`;
}

export const WhatsAppMessages = {
  quote: (model?: string) =>
    model
      ? `Hola, quiero cotizar una ${model}.`
      : `Hola, quiero cotizar un vehículo.`,
  testDrive: (model?: string) =>
    model
      ? `Hola, quiero solicitar un test drive para la ${model}.`
      : `Hola, quiero solicitar un test drive.`,
  general: `Hola, tengo una consulta.`,
} as const;
