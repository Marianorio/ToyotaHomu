import { z } from "zod";

const optionalString = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v === "" ? undefined : v))
  .nullable();

const optionalNumber = z
  .union([z.number(), z.string().trim()])
  .transform((v) => {
    if (v === "") return null;
    const n = typeof v === "number" ? v : Number(v);
    return Number.isNaN(n) ? null : n;
  })
  .optional()
  .nullable();

export const vehicleSchema = z.object({
  brand: z.string().trim().min(1, "Marca requerida"),
  model: z.string().trim().min(1, "Modelo requerido"),
  slug: optionalString,
  categoryId: z.string().trim().min(1, "Categoría requerida"),
  description: optionalString,
  shortDescription: optionalString,
  isNew: z.boolean().optional().default(true),
  isHybrid: z.boolean().optional().default(false),
  isAvailable: z.boolean().optional().default(true),
  featured: z.boolean().optional().default(false),
  price: optionalNumber,
  currency: optionalString,
  year: optionalNumber,
  engine: optionalString,
  power: optionalString,
  torque: optionalString,
  transmission: optionalString,
  traction: optionalString,
  fuelType: optionalString,
  doors: optionalNumber,
  seats: optionalNumber,
  mainImage: optionalString,
});

export const usedVehicleSchema = z.object({
  brand: z.string().trim().min(1, "Marca requerida"),
  model: z.string().trim().min(1, "Modelo requerido"),
  slug: optionalString,
  year: optionalNumber,
  mileage: optionalNumber,
  price: optionalNumber,
  fuelType: optionalString,
  transmission: optionalString,
  location: optionalString,
  condition: optionalString,
  description: optionalString,
  featured: z.boolean().optional().default(false),
  available: z.boolean().optional().default(true),
  images: optionalString,
});

export const promotionSchema = z.object({
  title: z.string().trim().min(1, "Título requerido"),
  slug: optionalString,
  description: optionalString,
  image: optionalString,
  vehicleId: optionalString,
  discount: optionalString,
  terms: optionalString,
  validFrom: optionalString,
  validUntil: optionalString,
  featured: z.boolean().optional().default(false),
  active: z.boolean().optional().default(true),
});

export const financingPlanSchema = z.object({
  name: z.string().trim().min(1, "Nombre requerido"),
  vehicleId: optionalString,
  description: optionalString,
  percentage: optionalString,
  installments: optionalNumber,
  initialPayment: optionalNumber,
  interestRate: optionalNumber,
  monthlyPayment: optionalNumber,
  active: z.boolean().optional().default(true),
  validFrom: optionalString,
  validUntil: optionalString,
  legalText: optionalString,
});

export const leadUpdateSchema = z.object({
  status: z.enum(["NUEVO", "SEGUIMIENTO", "NEGOCIACION", "CONVERTIDO", "PERDIDO"]),
  assignedUserId: optionalString,
  notes: optionalString,
});

export const testDriveSchema = z.object({
  status: z.enum([
    "PENDIENTE",
    "CONFIRMADO",
    "REPROGRAMADO",
    "CANCELADO",
    "COMPLETADO",
  ]),
});

export const siteSettingsSchema = z.object({
  businessName: z.string().trim().min(1, "Nombre comercial requerido"),
  legalName: optionalString,
  logoUrl: optionalString,
  faviconUrl: optionalString,
  phone: optionalString,
  whatsapp: optionalString,
  email: optionalString,
  address: optionalString,
  hours: optionalString,
  instagram: optionalString,
  facebook: optionalString,
  tiktok: optionalString,
  mapsUrl: optionalString,
  primaryColor: optionalString,
  secondaryColor: optionalString,
  legalText: optionalString,
});

export const homePageSchema = z.object({
  heroTitle: z.string().trim().min(1, "Título del hero requerido"),
  heroSubtitle: z.string().trim().min(1, "Subtítulo del hero requerido"),
  heroCtaText: optionalString,
  heroImage: optionalString,
  heroVideo: optionalString,
  featuredVehicleIds: optionalString,
  trendingVehicleIds: optionalString,
  featuredPromotionIds: optionalString,
  bannerIds: optionalString,
  social: optionalString,
});

export const userCreateSchema = z.object({
  name: z.string().trim().min(1, "Nombre requerido"),
  email: z.string().trim().email("Email inválido"),
  role: z.enum(["ADMIN", "SELLER", "SERVICE"]),
  phone: optionalString,
  photo: optionalString,
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const userUpdateSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, "Nombre requerido"),
  email: z.string().trim().email("Email inválido"),
  role: z.enum(["ADMIN", "SELLER", "SERVICE"]),
  phone: optionalString,
  photo: optionalString,
  isActive: z.boolean().optional().default(true),
  password: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v)),
});

export type VehicleInput = z.infer<typeof vehicleSchema>;
export type UsedVehicleInput = z.infer<typeof usedVehicleSchema>;
export type PromotionInput = z.infer<typeof promotionSchema>;
export type FinancingPlanInput = z.infer<typeof financingPlanSchema>;
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
export type HomePageInput = z.infer<typeof homePageSchema>;