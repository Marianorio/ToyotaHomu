import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";

// Credenciales demo configurables por .env (SOLO desarrollo/demo).
const env = process.env;
const DEMO = {
  adminEmail: env.DEMO_ADMIN_EMAIL ?? "admin@demo.local",
  adminPassword: env.DEMO_ADMIN_PASSWORD ?? "admin123",
  sellerEmail: env.DEMO_SELLER_EMAIL ?? "vendedor@demo.local",
  sellerPassword: env.DEMO_SELLER_PASSWORD ?? "admin123",
  serviceEmail: env.DEMO_SERVICE_EMAIL ?? "service@demo.local",
  servicePassword: env.DEMO_SERVICE_PASSWORD ?? "admin123",
};

async function main() {
  console.log("🌱 Cargando seed DEMO (datos ilustrativos — no oficiales)...");
  const passwordHash = await bcrypt.hash(DEMO.adminPassword, 10);

  // ---------- Usuarios / roles ----------
  const admin = await prisma.user.upsert({
    where: { email: DEMO.adminEmail },
    update: {},
    create: {
      name: "Administrador",
      email: DEMO.adminEmail,
      passwordHash,
      role: "ADMIN",
    },
  });

  const sellerHash = await bcrypt.hash(DEMO.sellerPassword, 10);
  const seller = await prisma.user.upsert({
    where: { email: DEMO.sellerEmail },
    update: {},
    create: {
      name: "Vendedor Demo",
      email: DEMO.sellerEmail,
      passwordHash: sellerHash,
      role: "SELLER",
    },
  });

  const serviceHash = await bcrypt.hash(DEMO.servicePassword, 10);
  const service = await prisma.user.upsert({
    where: { email: DEMO.serviceEmail },
    update: {},
    create: {
      name: "Service Demo",
      email: DEMO.serviceEmail,
      passwordHash: serviceHash,
      role: "SERVICE",
    },
  });

  // Segundo vendedor para probar asignación de leads por asesor.
  const seller2 = await prisma.user.upsert({
    where: { email: "vendedor2@demo.local" },
    update: {},
    create: {
      name: "Vendedora Demo",
      email: "vendedor2@demo.local",
      passwordHash,
      role: "SELLER",
    },
  });

  console.log(
    `  Usuarios: ${admin.email}, ${seller.email}, ${service.email}, ${seller2.email}`,
  );

  // ---------- Categorías ----------
  const categories = [
    { name: "Autos", slug: "autos", order: 1 },
    { name: "SUV", slug: "suv", order: 2 },
    { name: "Pick-Up", slug: "pickup", order: 3 },
    { name: "Comercial", slug: "comercial", order: 4 },
    { name: "Deportivos", slug: "deportivos", order: 5 },
    { name: "Híbridos", slug: "hibridos", order: 6 },
  ];
  const catMap: Record<string, string> = {};
  for (const c of categories) {
    const cat = await prisma.vehicleCategory.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    catMap[c.slug] = cat.id;
  }

  // ---------- Características (catálogo) ----------
  const features = [
    { name: "Airbags frontales", code: "airbags_front", group: "safety" },
    { name: "Frenos ABS", code: "abs", group: "safety" },
    { name: "Control de estabilidad (VSC)", code: "vsc", group: "safety" },
    { name: "Cámara de retroceso", code: "camara", group: "technology" },
    { name: "Pantalla táctil", code: "pantalla", group: "technology" },
    { name: "Climatizador", code: "clima", group: "comfort" },
    { name: "Asientos calefaccionados", code: "calefaccion", group: "comfort" },
    { name: "Conexión inalámbrica (Apple CarPlay)", code: "carplay", group: "technology" },
    { name: "Airbags de cortina", code: "airbags_cortina", group: "safety" },
    { name: "Asistente de arranque en pendiente (HAC)", code: "hac", group: "safety" },
    { name: "Control de descenso (DAC)", code: "dac", group: "safety" },
    { name: "Control crucero adaptativo", code: "crucero", group: "technology" },
    { name: "Sensores de estacionamiento", code: "sensores", group: "technology" },
    { name: "Faros LED", code: "led", group: "technology" },
    { name: "Tapizado de cuero", code: "cuero", group: "comfort" },
    { name: "Asientos con ajuste eléctrico", code: "asientos_elec", group: "comfort" },
    { name: "Llantas de aleación", code: "llantas", group: "comfort" },
  ];
  const featureMap: Record<string, string> = {};
  for (const f of features) {
    const feat = await prisma.feature.upsert({
      where: { code: f.code },
      update: {},
      create: f,
    });
    featureMap[f.code] = feat.id;
  }

  // ---------- Vehículos (REFERENCIA de gama; specs ilustrativas) ----------
  type SeedVersion = {
    name: string;
    price: string;
    engine?: string;
    transmission?: string;
    traction?: string;
  };
  type SeedVehicle = {
    brand: string;
    model: string;
    slug: string;
    categorySlug: string;
    shortDescription: string;
    description: string;
    isHybrid: boolean;
    featured: boolean;
    isNew: boolean;
    price: string;
    year: number;
    engine: string;
    power: string;
    torque: string;
    transmission: string;
    traction: string;
    fuelType: string;
    doors: number;
    seats: number;
    mainImage?: string;
    colors: { name: string; hex: string }[];
    featureCodes: string[];
    specs: { code: string; name: string; value: string; unit: string | null }[];
    versions: SeedVersion[];
  };
  const vehicles: SeedVehicle[] = [
    {
      brand: "Toyota",
      model: "Yaris Hatchback",
      slug: "yaris",
      categorySlug: "autos",
      shortDescription: "Compacto urbano ágil y eficiente. Datos ilustrativos (demo).",
      description:
        "El Yaris combina agilidad urbana con el respaldo de la calidad Toyota. Equipamiento y precio ilustrativos para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "19000000",
      year: 2026,
      engine: "1.5",
      power: "107 CV",
      torque: "140 Nm",
      transmission: "Manual",
      traction: "Delantera (FWD)",
      fuelType: "Nafta",
      doors: 5,
      seats: 5,
      mainImage: "/img/yaris.webp",
      colors: [
        { name: "Azul", hex: "#0066b3" },
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Gris Plata", hex: "#c0c0c0" },
      ],
      featureCodes: ["airbags_front", "abs", "camara", "pantalla", "carplay"],
      specs: [
        { code: "motor", name: "Motor", value: "1.5 nafta", unit: null },
        { code: "consumo", name: "Consumo", value: "6.5", unit: "l/100km" },
        { code: "baul", name: "Baúl", value: "310", unit: "l" },
      ],
      versions: [
        { name: "1.5 XS MT", price: "19000000" },
        { name: "1.5 XLS CVT", price: "21500000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Corolla",
      slug: "corolla",
      categorySlug: "autos",
      shortDescription: "Sedán de referencia en versión nafta. Datos ilustrativos (demo).",
      description:
        "El Corolla combina confort, tecnología y seguridad en el segmento sedán. Esta versión nafta se complementa con la variante híbrida de la gama. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: true,
      isNew: true,
      price: "26500000",
      year: 2026,
      engine: "2.0",
      power: "171 CV",
      torque: "205 Nm",
      transmission: "CVT",
      traction: "Delantera (FWD)",
      fuelType: "Nafta",
      doors: 4,
      seats: 5,
      mainImage: "/img/corolla.webp",
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Negro Attitude", hex: "#111111" },
        { name: "Gris Plata", hex: "#c0c0c0" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "camara", "pantalla", "clima", "carplay", "sensores", "led", "crucero"],
      specs: [
        { code: "motor", name: "Motor", value: "2.0 nafta", unit: null },
        { code: "consumo", name: "Consumo", value: "6.8", unit: "l/100km" },
        { code: "baul", name: "Baúl", value: "471", unit: "l" },
        { code: "potencia", name: "Potencia", value: "171", unit: "CV" },
      ],
      versions: [
        { name: "2.0 XEI CVT", price: "26500000" },
        { name: "2.0 SEG CVT", price: "28500000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Corolla Hybrid",
      slug: "corolla-hybrid",
      categorySlug: "hibridos",
      shortDescription: "Sedán híbrido de referencia. Datos ilustrativos (demo).",
      description:
        "El Corolla Hybrid ofrece el mejor equilibrio entre confort, tecnología y eficiencia del segmento. Equipamiento ilustrativo para la demo.",
      isHybrid: true,
      featured: false,
      isNew: true,
      price: "30000000",
      year: 2026,
      engine: "1.8 Híbrido",
      power: "122 CV",
      torque: "142 Nm",
      transmission: "CVT",
      traction: "Delantera (FWD)",
      fuelType: "Híbrido",
      doors: 4,
      seats: 5,
      mainImage: "/img/corolla.webp",
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Negro Attitude", hex: "#111111" },
        { name: "Gris Plata", hex: "#c0c0c0" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "camara", "pantalla", "clima", "carplay", "sensores", "led", "crucero"],
      specs: [
        { code: "motor", name: "Motor", value: "1.8 híbrido", unit: null },
        { code: "consumo", name: "Consumo", value: "4.2", unit: "l/100km" },
        { code: "baul", name: "Baúl", value: "471", unit: "l" },
        { code: "potencia", name: "Potencia", value: "122", unit: "CV" },
      ],
      versions: [
        { name: "1.8 XEI CVT (híbrido)", price: "30000000" },
        { name: "1.8 SEG CVT (híbrido)", price: "32000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Camry",
      slug: "camry",
      categorySlug: "autos",
      shortDescription: "Sedán premium híbrido. Datos ilustrativos (demo).",
      description:
        "El Camry representa el lujo y la eficiencia Toyota en el segmento sedán grande. Equipamiento ilustrativo para la demo.",
      isHybrid: true,
      featured: false,
      isNew: true,
      price: "48000000",
      year: 2026,
      engine: "2.5 Híbrido",
      power: "218 CV",
      torque: "221 Nm",
      transmission: "CVT",
      traction: "Delantera (FWD)",
      fuelType: "Híbrido",
      doors: 4,
      seats: 5,
      mainImage: "/img/camry.webp",
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Negro Attitude", hex: "#111111" },
        { name: "Gris Metálico", hex: "#8a8a8a" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "camara", "pantalla", "clima", "carplay", "sensores", "led", "crucero", "cuero", "asientos_elec", "llantas"],
      specs: [
        { code: "motor", name: "Motor", value: "2.5 híbrido", unit: null },
        { code: "consumo", name: "Consumo", value: "4.5", unit: "l/100km" },
        { code: "baul", name: "Baúl", value: "524", unit: "l" },
        { code: "potencia", name: "Potencia", value: "218", unit: "CV" },
      ],
      versions: [
        { name: "2.5 HEV XLE", price: "48000000" },
        { name: "2.5 HEV XSE", price: "52000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Crown",
      slug: "crown",
      categorySlug: "hibridos",
      shortDescription: "Sedán híbrido tope de gama. Datos ilustrativos (demo).",
      description:
        "El Crown encarna el máximo exponente de la elegancia y tecnología híbrida Toyota. Equipamiento ilustrativo para la demo.",
      isHybrid: true,
      featured: true,
      isNew: true,
      price: "78000000",
      year: 2026,
      engine: "2.5 Híbrido",
      power: "249 CV",
      torque: "221 Nm",
      transmission: "CVT",
      traction: "Delantera (FWD)",
      fuelType: "Híbrido",
      doors: 4,
      seats: 5,
      mainImage: "/img/crown.webp",
      colors: [
        { name: "Negro Attitude", hex: "#111111" },
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Rojo Emoción", hex: "#c8102e" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "camara", "pantalla", "clima", "carplay", "sensores", "led", "crucero", "cuero", "asientos_elec", "llantas"],
      specs: [
        { code: "motor", name: "Motor", value: "2.5 híbrido", unit: null },
        { code: "consumo", name: "Consumo", value: "4.8", unit: "l/100km" },
        { code: "baul", name: "Baúl", value: "486", unit: "l" },
        { code: "potencia", name: "Potencia", value: "249", unit: "CV" },
      ],
      versions: [
        { name: "2.5 HEV Limited", price: "78000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Corolla Cross",
      slug: "corolla-cross",
      categorySlug: "suv",
      shortDescription: "SUV de referencia en versión nafta. Datos ilustrativos (demo).",
      description:
        "La Corolla Cross combina el ADN de la Corolla con la versatilidad de una SUV. Esta versión nafta se complementa con la variante híbrida de la gama. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "30500000",
      mainImage: "/img/corollacross.webp",
      year: 2026,
      engine: "2.0",
      power: "171 CV",
      torque: "205 Nm",
      transmission: "CVT",
      traction: "Delantera (FWD)",
      fuelType: "Nafta",
      doors: 5,
      seats: 5,
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Gris Plata", hex: "#c0c0c0" },
        { name: "Rojo", hex: "#c8102e" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "camara", "pantalla", "clima", "carplay", "sensores", "led", "crucero"],
      specs: [
        { code: "motor", name: "Motor", value: "2.0 nafta", unit: null },
        { code: "consumo", name: "Consumo", value: "7.2", unit: "l/100km" },
        { code: "baul", name: "Baúl", value: "440", unit: "l" },
      ],
      versions: [
        { name: "2.0 XEI CVT", price: "30500000" },
        { name: "2.0 XLS CVT", price: "33000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Corolla Cross Hybrid",
      slug: "corolla-cross-hybrid",
      categorySlug: "hibridos",
      shortDescription: "SUV híbrida de referencia. Datos ilustrativos (demo).",
      description:
        "La Corolla Cross Hybrid combina el ADN de la Corolla con la versatilidad de una SUV y la eficiencia de la tecnología híbrida. Equipamiento ilustrativo para la demo.",
      isHybrid: true,
      featured: false,
      isNew: true,
      price: "35000000",
      mainImage: "/img/corollacross.webp",
      year: 2026,
      engine: "1.8 Híbrido",
      power: "122 CV",
      torque: "142 Nm",
      transmission: "CVT",
      traction: "Delantera (FWD)",
      fuelType: "Híbrido",
      doors: 5,
      seats: 5,
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Gris Plata", hex: "#c0c0c0" },
        { name: "Rojo", hex: "#c8102e" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "camara", "pantalla", "clima", "carplay", "sensores", "led", "crucero"],
      specs: [
        { code: "motor", name: "Motor", value: "1.8 híbrido", unit: null },
        { code: "consumo", name: "Consumo", value: "4.4", unit: "l/100km" },
        { code: "baul", name: "Baúl", value: "440", unit: "l" },
      ],
      versions: [
        { name: "1.8 HEV XEI", price: "35000000" },
        { name: "1.8 HEV XLS", price: "37500000" },
      ],
    },
    {
      brand: "Toyota",
      model: "RAV4",
      slug: "rav4",
      categorySlug: "hibridos",
      shortDescription: "SUV híbrida AWD. Datos ilustrativos (demo).",
      description:
        "La RAV4 es la SUV híbrida más vendida del mundo, con tracción total disponible. Equipamiento ilustrativo para la demo.",
      isHybrid: true,
      featured: false,
      isNew: true,
      price: "52000000",
      year: 2026,
      engine: "2.5 Híbrido",
      power: "222 CV",
      torque: "221 Nm",
      transmission: "CVT",
      traction: "AWD",
      fuelType: "Híbrido",
      doors: 5,
      seats: 5,
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Negro Attitude", hex: "#111111" },
        { name: "Azul Metalizado", hex: "#1f4e8c" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "camara", "pantalla", "clima", "carplay", "sensores", "led", "crucero", "llantas"],
      specs: [
        { code: "motor", name: "Motor", value: "2.5 híbrido", unit: null },
        { code: "consumo", name: "Consumo", value: "5.0", unit: "l/100km" },
        { code: "baul", name: "Baúl", value: "580", unit: "l" },
        { code: "potencia", name: "Potencia", value: "222", unit: "CV" },
      ],
      versions: [
        { name: "2.5 HEV XLE AWD", price: "52000000" },
        { name: "2.5 HEV Limited AWD", price: "58000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Yaris Cross",
      slug: "yaris-cross",
      categorySlug: "suv",
      shortDescription: "SUV compacta urbana. Datos ilustrativos (demo).",
      description:
        "La Yaris Cross combina la agilidad del Yaris con la presencia de una SUV compacta, ideal para la ciudad. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "26000000",
      year: 2026,
      engine: "1.5",
      power: "120 CV",
      torque: "145 Nm",
      transmission: "CVT",
      traction: "Delantera (FWD)",
      fuelType: "Nafta",
      doors: 5,
      seats: 5,
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Gris Plata", hex: "#c0c0c0" },
        { name: "Azul Metalizado", hex: "#1f4e8c" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "camara", "pantalla", "clima", "carplay", "sensores", "led"],
      specs: [
        { code: "motor", name: "Motor", value: "1.5 nafta", unit: null },
        { code: "consumo", name: "Consumo", value: "6.0", unit: "l/100km" },
        { code: "baul", name: "Baúl", value: "397", unit: "l" },
      ],
      versions: [
        { name: "1.5 XS CVT", price: "26000000" },
        { name: "1.5 XLS CVT", price: "28500000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Yaris Cross Hybrid",
      slug: "yaris-cross-hybrid",
      categorySlug: "hibridos",
      shortDescription: "SUV compacta híbrida. Datos ilustrativos (demo).",
      description:
        "La Yaris Cross Hybrid suma la eficiencia de la tecnología híbrida Toyota al formato SUV compacto. Equipamiento ilustrativo para la demo.",
      isHybrid: true,
      featured: false,
      isNew: true,
      price: "32000000",
      year: 2026,
      engine: "1.5 Híbrido",
      power: "116 CV",
      torque: "120 Nm",
      transmission: "CVT",
      traction: "Delantera (FWD)",
      fuelType: "Híbrido",
      doors: 5,
      seats: 5,
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Gris Plata", hex: "#c0c0c0" },
        { name: "Rojo", hex: "#c8102e" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "camara", "pantalla", "clima", "carplay", "sensores", "led", "crucero"],
      specs: [
        { code: "motor", name: "Motor", value: "1.5 híbrido", unit: null },
        { code: "consumo", name: "Consumo", value: "3.9", unit: "l/100km" },
        { code: "baul", name: "Baúl", value: "350", unit: "l" },
      ],
      versions: [
        { name: "1.5 HEV XS", price: "32000000" },
        { name: "1.5 HEV XLS", price: "34500000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Land Cruiser 300",
      slug: "land-cruiser-300",
      categorySlug: "suv",
      shortDescription: "SUV 4x4 insignia de la gama. Datos ilustrativos (demo).",
      description:
        "El Land Cruiser 300 es la máxima expresión de robustez, lujo y capacidad 4x4 de Toyota. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "190000000",
      year: 2026,
      engine: "3.5 V6 biturbo",
      power: "415 CV",
      torque: "650 Nm",
      transmission: "Automática",
      traction: "4x4",
      fuelType: "Nafta",
      doors: 5,
      seats: 7,
      mainImage: "/img/landcruiser.webp",
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Negro Attitude", hex: "#111111" },
        { name: "Gris Metálico", hex: "#8a8a8a" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "hac", "dac", "camara", "pantalla", "clima", "carplay", "sensores", "led", "crucero", "cuero", "asientos_elec", "llantas"],
      specs: [
        { code: "motor", name: "Motor", value: "3.5 V6 biturbo", unit: null },
        { code: "consumo", name: "Consumo", value: "10.5", unit: "l/100km" },
        { code: "baul", name: "Baúl", value: "265 (7 plazas)", unit: "l" },
        { code: "potencia", name: "Potencia", value: "415", unit: "CV" },
      ],
      versions: [
        { name: "ZX 4x4 AT", price: "190000000" },
        { name: "GR Sport 4x4 AT", price: "205000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "SW4",
      slug: "sw4",
      categorySlug: "suv",
      shortDescription: "SUV 4x4 de 7 plazas. Datos ilustrativos (demo).",
      description:
        "La SW4 combina la robustez de la Hilux con el confort de una SUV familiar de 7 plazas. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "78000000",
      year: 2026,
      engine: "2.8 TDi",
      power: "204 CV",
      torque: "500 Nm",
      transmission: "Automática",
      traction: "4x4",
      fuelType: "Diesel",
      doors: 5,
      seats: 7,
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Gris Plata", hex: "#c0c0c0" },
        { name: "Negro Attitude", hex: "#111111" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "dac", "camara", "pantalla", "clima", "carplay", "sensores", "led", "crucero", "cuero", "llantas"],
      specs: [
        { code: "motor", name: "Motor", value: "2.8 turbo diésel", unit: null },
        { code: "consumo", name: "Consumo", value: "8.4", unit: "l/100km" },
        { code: "baul", name: "Baúl", value: "300 (7 plazas)", unit: "l" },
        { code: "potencia", name: "Potencia", value: "204", unit: "CV" },
      ],
      versions: [
        { name: "2.8 SRX AT 4x4", price: "78000000" },
        { name: "2.8 Diamond AT 4x4", price: "86000000" },
        { name: "2.8 GR Sport 4x4 AT", price: "90000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Hilux",
      slug: "hilux",
      categorySlug: "pickup",
      shortDescription: "Pick-Up 4x4 y 4x2, la más vendida del país. Datos ilustrativos (demo).",
      description:
        "La Hilux es la pick-up más vendida de Argentina. Disponible en versiones 4x2 y 4x4 para todo tipo de trabajo y aventura. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: true,
      isNew: true,
      price: "42000000",
      year: 2026,
      engine: "2.8 TDi",
      power: "204 CV",
      torque: "500 Nm",
      transmission: "Automática",
      traction: "4x4",
      fuelType: "Diesel",
      doors: 4,
      seats: 5,
      mainImage: "/img/hilux.webp",
      colors: [
        { name: "Gris Plata", hex: "#c0c0c0" },
        { name: "Rojo", hex: "#c8102e" },
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Negro Attitude", hex: "#111111" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "hac", "dac", "camara", "pantalla", "clima", "carplay", "sensores", "led", "crucero", "llantas"],
      specs: [
        { code: "motor", name: "Motor", value: "2.8 turbo diésel", unit: null },
        { code: "consumo", name: "Consumo", value: "8.0", unit: "l/100km" },
        { code: "carga", name: "Carga útil", value: "1000", unit: "kg" },
        { code: "potencia", name: "Potencia", value: "204", unit: "CV" },
      ],
      versions: [
        { name: "DX 4x2 MT", price: "42000000" },
        { name: "SR 4x2 AT", price: "46500000" },
        { name: "SRV 4x4 AT", price: "52000000" },
        { name: "SRX 4x4 AT", price: "57000000" },
        { name: "GR Sport 4x4 AT", price: "62000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Hiace Furgón",
      slug: "hiace-furgon",
      categorySlug: "comercial",
      shortDescription: "Furgón comercial de carga. Datos ilustrativos (demo).",
      description:
        "La Hiace Furgón es la solución de carga urbana y de larga distancia de Toyota. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "40000000",
      year: 2026,
      engine: "2.8 TDi",
      power: "177 CV",
      torque: "420 Nm",
      transmission: "Manual",
      traction: "Trasera (RWD)",
      fuelType: "Diesel",
      doors: 3,
      seats: 3,
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Gris Plata", hex: "#c0c0c0" },
      ],
      featureCodes: ["airbags_front", "abs", "vsc", "led"],
      specs: [
        { code: "motor", name: "Motor", value: "2.8 turbo diésel", unit: null },
        { code: "consumo", name: "Consumo", value: "8.5", unit: "l/100km" },
        { code: "carga", name: "Carga útil", value: "850", unit: "kg" },
      ],
      versions: [
        { name: "L1H1 MT", price: "40000000" },
        { name: "L2H2 MT", price: "43000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Hiace Minibús",
      slug: "hiace-minibus",
      categorySlug: "comercial",
      shortDescription: "Minibús de pasajeros. Datos ilustrativos (demo).",
      description:
        "La Hiace Minibús transporta hasta 15 pasajeros con confort y seguridad. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "46000000",
      year: 2026,
      engine: "2.8 TDi",
      power: "177 CV",
      torque: "420 Nm",
      transmission: "Manual",
      traction: "Trasera (RWD)",
      fuelType: "Diesel",
      doors: 4,
      seats: 15,
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Gris Plata", hex: "#c0c0c0" },
      ],
      featureCodes: ["airbags_front", "abs", "vsc", "led", "clima"],
      specs: [
        { code: "motor", name: "Motor", value: "2.8 turbo diésel", unit: null },
        { code: "consumo", name: "Consumo", value: "9.0", unit: "l/100km" },
        { code: "capacidad", name: "Capacidad", value: "15", unit: "pasajeros" },
      ],
      versions: [
        { name: "15 plazas MT", price: "46000000" },
        { name: "18 plazas MT", price: "49000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Hiace Commuter",
      slug: "hiace-commuter",
      categorySlug: "comercial",
      shortDescription: "Larga distancia de pasajeros. Datos ilustrativos (demo).",
      description:
        "La Hiace Commuter está pensada para recorridos de media y larga distancia con máximo confort. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "52000000",
      year: 2026,
      engine: "2.8 TDi",
      power: "177 CV",
      torque: "420 Nm",
      transmission: "Automática",
      traction: "Trasera (RWD)",
      fuelType: "Diesel",
      doors: 4,
      seats: 15,
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Gris Plata", hex: "#c0c0c0" },
      ],
      featureCodes: ["airbags_front", "abs", "vsc", "led", "clima", "pantalla", "carplay"],
      specs: [
        { code: "motor", name: "Motor", value: "2.8 turbo diésel", unit: null },
        { code: "consumo", name: "Consumo", value: "9.2", unit: "l/100km" },
        { code: "capacidad", name: "Capacidad", value: "15", unit: "pasajeros" },
      ],
      versions: [
        { name: "Commuter AT", price: "52000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Hiace Wagon",
      slug: "hiace-wagon",
      categorySlug: "comercial",
      shortDescription: "Furgón de pasajeros de 7 plazas. Datos ilustrativos (demo).",
      description:
        "La Hiace Wagon transporta hasta 7 pasajeros con la confiabilidad y el espacio de la gama Hiace. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "55000000",
      year: 2026,
      engine: "2.8 TDi",
      power: "177 CV",
      torque: "420 Nm",
      transmission: "Manual",
      traction: "Trasera (RWD)",
      fuelType: "Diesel",
      doors: 4,
      seats: 7,
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Gris Plata", hex: "#c0c0c0" },
      ],
      featureCodes: ["airbags_front", "abs", "vsc", "led", "clima", "pantalla", "carplay"],
      specs: [
        { code: "motor", name: "Motor", value: "2.8 turbo diésel", unit: null },
        { code: "consumo", name: "Consumo", value: "8.8", unit: "l/100km" },
        { code: "capacidad", name: "Capacidad", value: "7", unit: "pasajeros" },
      ],
      versions: [
        { name: "Wagon MT 7 plazas", price: "55000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "GR Corolla",
      slug: "gr-corolla",
      categorySlug: "deportivos",
      shortDescription: "Compacto deportivo AWD. Datos ilustrativos (demo).",
      description:
        "El GR Corolla es un compacto de altas prestaciones con tracción total GR-FOUR. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "88000000",
      year: 2026,
      engine: "1.6 T",
      power: "304 CV",
      torque: "400 Nm",
      transmission: "Manual",
      traction: "AWD",
      fuelType: "Nafta",
      doors: 5,
      seats: 5,
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Negro Attitude", hex: "#111111" },
        { name: "Rojo", hex: "#c8102e" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "camara", "pantalla", "carplay", "led", "llantas"],
      specs: [
        { code: "motor", name: "Motor", value: "1.6 turbo", unit: null },
        { code: "potencia", name: "Potencia", value: "304", unit: "CV" },
        { code: "baul", name: "Baúl", value: "410", unit: "l" },
        { code: "0-100", name: "0-100 km/h", value: "5.4", unit: "s" },
      ],
      versions: [
        { name: "Circuit 1.6T MT", price: "88000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "GR Yaris",
      slug: "gr-yaris",
      categorySlug: "deportivos",
      shortDescription: "Hot hatch AWD de rally. Datos ilustrativos (demo).",
      description:
        "El GR Yaris nace del mundo de los rallyes con tracción total y un motor turbo de altas prestaciones. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "72000000",
      year: 2026,
      engine: "1.6 T",
      power: "280 CV",
      torque: "390 Nm",
      transmission: "Manual",
      traction: "AWD",
      fuelType: "Nafta",
      doors: 3,
      seats: 4,
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Negro Attitude", hex: "#111111" },
        { name: "Azul Metalizado", hex: "#1f4e8c" },
      ],
      featureCodes: ["airbags_front", "abs", "vsc", "pantalla", "carplay", "led", "llantas"],
      specs: [
        { code: "motor", name: "Motor", value: "1.6 turbo", unit: null },
        { code: "potencia", name: "Potencia", value: "280", unit: "CV" },
        { code: "0-100", name: "0-100 km/h", value: "5.5", unit: "s" },
      ],
      versions: [
        { name: "1.6T MT AWD", price: "72000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "GR Supra",
      slug: "gr-supra",
      categorySlug: "deportivos",
      shortDescription: "Deportivo coupé de altas prestaciones. Datos ilustrativos (demo).",
      description:
        "El GR Supra es un coupé deportivo de altas prestaciones con herencia de pista. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "112000000",
      year: 2026,
      engine: "3.0 T",
      power: "387 CV",
      torque: "500 Nm",
      transmission: "Automática",
      traction: "Trasera (RWD)",
      fuelType: "Nafta",
      doors: 2,
      seats: 2,
      colors: [
        { name: "Rojo", hex: "#c8102e" },
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Amarillo", hex: "#f5b301" },
      ],
      featureCodes: ["airbags_front", "abs", "vsc", "pantalla", "carplay", "led", "llantas"],
      specs: [
        { code: "motor", name: "Motor", value: "3.0 turbo", unit: null },
        { code: "potencia", name: "Potencia", value: "387", unit: "CV" },
        { code: "0-100", name: "0-100 km/h", value: "4.3", unit: "s" },
      ],
      versions: [
        { name: "3.0T AT", price: "112000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "GR86",
      slug: "gr86",
      categorySlug: "deportivos",
      shortDescription: "Coupé deportivo de tracción trasera. Datos ilustrativos (demo).",
      description:
        "El GR86 es un coupé liviano de tracción trasera, heredero del legendario GT86. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "68000000",
      year: 2026,
      engine: "2.4",
      power: "235 CV",
      torque: "250 Nm",
      transmission: "Manual",
      traction: "Trasera (RWD)",
      fuelType: "Nafta",
      doors: 2,
      seats: 4,
      mainImage: "/img/gt86.webp",
      colors: [
        { name: "Azul Metalizado", hex: "#1f4e8c" },
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Rojo", hex: "#c8102e" },
      ],
      featureCodes: ["airbags_front", "abs", "vsc", "pantalla", "carplay", "led", "llantas"],
      specs: [
        { code: "motor", name: "Motor", value: "2.4 boxer", unit: null },
        { code: "potencia", name: "Potencia", value: "235", unit: "CV" },
        { code: "0-100", name: "0-100 km/h", value: "6.3", unit: "s" },
      ],
      versions: [
        { name: "2.4 MT", price: "68000000" },
        { name: "2.4 AT", price: "70000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Corolla GR-Sport",
      slug: "corolla-gr-sport",
      categorySlug: "deportivos",
      shortDescription: "Sedán deportivo de la familia GR. Datos ilustrativos (demo).",
      description:
        "El Corolla GR-Sport combina el ADN de la Corolla con el carácter deportivo de la familia GR. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "30000000",
      year: 2026,
      engine: "2.0",
      power: "171 CV",
      torque: "205 Nm",
      transmission: "CVT",
      traction: "Delantera (FWD)",
      fuelType: "Nafta",
      doors: 4,
      seats: 5,
      mainImage: "/img/corolla.webp",
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Negro Attitude", hex: "#111111" },
        { name: "Gris Plata", hex: "#c0c0c0" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "camara", "pantalla", "clima", "carplay", "sensores", "led", "crucero", "llantas"],
      specs: [
        { code: "motor", name: "Motor", value: "2.0 nafta", unit: null },
        { code: "consumo", name: "Consumo", value: "6.8", unit: "l/100km" },
        { code: "baul", name: "Baúl", value: "471", unit: "l" },
        { code: "potencia", name: "Potencia", value: "171", unit: "CV" },
      ],
      versions: [
        { name: "2.0 GR-Sport CVT", price: "30000000" },
      ],
    },
    {
      brand: "Toyota",
      model: "Corolla Cross GR-Sport",
      slug: "corolla-cross-gr-sport",
      categorySlug: "deportivos",
      shortDescription: "SUV deportiva de la familia GR. Datos ilustrativos (demo).",
      description:
        "La Corolla Cross GR-Sport suma el carácter deportivo de la familia GR a la versatilidad de la SUV. Equipamiento ilustrativo para la demo.",
      isHybrid: false,
      featured: false,
      isNew: true,
      price: "36000000",
      mainImage: "/img/corollacross.webp",
      year: 2026,
      engine: "2.0",
      power: "171 CV",
      torque: "205 Nm",
      transmission: "CVT",
      traction: "Delantera (FWD)",
      fuelType: "Nafta",
      doors: 5,
      seats: 5,
      colors: [
        { name: "Blanco Perlado", hex: "#f0f0f0" },
        { name: "Negro Attitude", hex: "#111111" },
        { name: "Rojo", hex: "#c8102e" },
      ],
      featureCodes: ["airbags_front", "airbags_cortina", "abs", "vsc", "camara", "pantalla", "clima", "carplay", "sensores", "led", "crucero", "llantas"],
      specs: [
        { code: "motor", name: "Motor", value: "2.0 nafta", unit: null },
        { code: "consumo", name: "Consumo", value: "7.2", unit: "l/100km" },
        { code: "baul", name: "Baúl", value: "440", unit: "l" },
      ],
      versions: [
        { name: "2.0 GR-Sport CVT", price: "36000000" },
      ],
    },
  ];

  const vehicleIds: Record<string, string> = {};
  for (const v of vehicles) {
    const vehicle = await prisma.vehicle.upsert({
      where: { slug: v.slug },
      update: {
        brand: v.brand,
        model: v.model,
        categoryId: catMap[v.categorySlug],
        shortDescription: v.shortDescription,
        description: v.description,
        isHybrid: v.isHybrid,
        featured: v.featured,
        isNew: v.isNew ?? true,
        price: v.price,
        year: v.year,
        engine: v.engine,
        power: v.power,
        torque: v.torque,
        transmission: v.transmission,
        traction: v.traction,
        fuelType: v.fuelType,
        doors: v.doors,
        seats: v.seats,
        mainImage: v.mainImage ?? null,
      },
      create: {
        brand: v.brand,
        model: v.model,
        slug: v.slug,
        categoryId: catMap[v.categorySlug],
        shortDescription: v.shortDescription,
        description: v.description,
        isHybrid: v.isHybrid,
        featured: v.featured,
        isNew: v.isNew ?? true,
        price: v.price,
        year: v.year,
        engine: v.engine,
        power: v.power,
        torque: v.torque,
        transmission: v.transmission,
        traction: v.traction,
        fuelType: v.fuelType,
        doors: v.doors,
        seats: v.seats,
        mainImage: v.mainImage ?? null,
      },
    });

    // Reconstrucción determinística de relaciones (demo)
    await prisma.vehicleImage.deleteMany({ where: { vehicleId: vehicle.id } });

    await prisma.vehicleColor.deleteMany({ where: { vehicleId: vehicle.id } });
    for (let ci = 0; ci < v.colors.length; ci++) {
      const c = v.colors[ci];
      await prisma.vehicleColor.create({
        data: {
          vehicleId: vehicle.id,
          name: c.name,
          hex: c.hex,
        },
      });
    }

    await prisma.vehicleFeature.deleteMany({ where: { vehicleId: vehicle.id } });
    for (const code of v.featureCodes) {
      const featureId = featureMap[code];
      if (!featureId) continue;
      await prisma.vehicleFeature.create({
        data: { vehicleId: vehicle.id, featureId },
      });
    }

    await prisma.specification.deleteMany({ where: { vehicleId: vehicle.id } });
    for (const s of v.specs) {
      await prisma.specification.create({
        data: {
          vehicleId: vehicle.id,
          code: s.code,
          name: s.name,
          unit: s.unit,
          value: s.value,
        },
      });
    }

    await prisma.vehicleVersion.deleteMany({ where: { vehicleId: vehicle.id } });
    for (const ver of v.versions) {
      await prisma.vehicleVersion.create({
        data: {
          vehicleId: vehicle.id,
          name: ver.name,
          price: ver.price,
          engine: ver.engine ?? v.engine,
          transmission: ver.transmission ?? v.transmission,
          traction: ver.traction ?? v.traction,
        },
      });
    }

    vehicleIds[v.slug] = vehicle.id;
    console.log(`  Vehículo: ${v.model}`);
  }

  // ---------- Promociones (ilustrativas) ----------
  await prisma.promotion.upsert({
    where: { slug: "demo-lanzamiento" },
    update: {},
    create: {
      title: "Promoción de apertura (demo)",
      slug: "demo-lanzamiento",
      description:
        "Beneficio ilustrativo para la demostración. Las condiciones reales se cargan desde el panel.",
      discount: "Consultar",
      terms: "Condiciones sujetas a modificación y aprobación.",
      validFrom: new Date("2026-01-01"),
      validUntil: new Date("2026-12-31"),
      featured: true,
      active: true,
    },
  });

  await prisma.promotion.upsert({
    where: { slug: "demo-hilux" },
    update: {},
    create: {
      title: "Hilux en promoción (demo)",
      slug: "demo-hilux",
      description: "Beneficio ilustrativo para la demostración.",
      discount: "Consultar",
      vehicleId: vehicleIds["hilux"],
      validFrom: new Date("2026-06-01"),
      validUntil: new Date("2026-12-31"),
      featured: false,
      active: true,
    },
  });

  // ---------- Planes de financiación (ilustrativos) ----------
  const financing = [
    {
      id: "demo-plan-1",
      name: "Plan en 24 cuotas (demo)",
      vehicleId: undefined as string | undefined,
      description: "Simulación orientativa para la demostración.",
      percentage: "Consultar",
      installments: 24,
      interestRate: "0",
    },
    {
      id: "demo-plan-hilux",
      name: "Plan Hilux 60/40 (demo)",
      vehicleId: vehicleIds["hilux"],
      description: "Simulación orientativa para la demostración.",
      percentage: "60/40",
      installments: 36,
      interestRate: "0",
    },
  ];
  for (const p of financing) {
    await prisma.financingPlan.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        name: p.name,
        vehicleId: p.vehicleId,
        description: p.description,
        percentage: p.percentage,
        installments: p.installments,
        interestRate: p.interestRate,
        legalText:
          "Las condiciones están sujetas a modificación y aprobación. Consultá con nuestros asesores.",
        active: true,
        validFrom: new Date("2026-01-01"),
        validUntil: new Date("2026-12-31"),
      },
    });
  }

  // ---------- Servicios ----------
  const services = [
    { name: "Service oficial", slug: "service-oficial", description: "Mantenimiento planificado de tu vehículo." },
    { name: "Mantenimiento", slug: "mantenimiento", description: "Revisiones y servicios programados." },
    { name: "Repuestos", slug: "repuestos", description: "Repuestos originales." },
    { name: "Accesorios", slug: "accesorios", description: "Accesorios para tu Toyota." },
    { name: "Neumáticos", slug: "neumaticos", description: "Cambio y balanceo." },
    { name: "Chapa y pintura", slug: "chapa-y-pintura", description: "Reparaciones estéticas." },
  ];
  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: { name: s.name, slug: s.slug, description: s.description, order: services.indexOf(s) + 1 },
    });
  }

  // ---------- Accesorios (ilustrativos) ----------
  const accessories = [
    { name: "Cubierta trasera (demo)", slug: "cubierta-trasera", price: "90000" },
    { name: "Estribos laterales (demo)", slug: "estribos", price: "150000" },
    { name: "Kit alfombras (demo)", slug: "alfombras", price: "45000" },
  ];
  for (const a of accessories) {
    await prisma.accessory.upsert({
      where: { slug: a.slug },
      update: {},
      create: { name: a.name, slug: a.slug, description: "Accesorio ilustrativo (demo).", price: a.price, active: true },
    });
  }

  // ---------- Usados (ilustrativos) ----------
  if ((await prisma.usedVehicle.count()) === 0) {
    const used = [
      { brand: "Toyota", model: "Corolla", slug: "usado-corolla-2021", year: 2021, mileage: 45000, price: "15500000", fuelType: "Nafta", transmission: "CVT", location: "Formosa", condition: "Excelente", description: "Corolla 2021 en excelente estado. Un solo dueño, service oficial al día. Interior impecable, neumáticos nuevos.", featured: true, images: { create: [{ url: "/img/corolla.webp", alt: "Toyota Corolla 2021", order: 0 }] } },
      { brand: "Toyota", model: "Hilux", slug: "usado-hilux-2020", year: 2020, mileage: 80000, price: "32000000", fuelType: "Diésel", transmission: "Automática", location: "Formosa", condition: "Muy bueno", description: "Hilux SRX 4x4 2020. Ideal para trabajo y aventura. Equipada con caja de protección y enganche.", featured: true, images: { create: [{ url: "/img/hilux.webp", alt: "Toyota Hilux 2020", order: 0 }] } },
      { brand: "Toyota", model: "Yaris", slug: "usado-yaris-2022", year: 2022, mileage: 20000, price: "14500000", fuelType: "Nafta", transmission: "Manual", location: "Formosa", condition: "Excelente", description: "Yaris Hatchback 2022 con muy pocos kilómetros. Ideal para ciudad, económico y confiable.", images: { create: [{ url: "/img/yaris.webp", alt: "Toyota Yaris 2022", order: 0 }] } },
      { brand: "Toyota", model: "Corolla Cross", slug: "usado-corolla-cross-2021", year: 2021, mileage: 55000, price: "22000000", fuelType: "Nafta", transmission: "CVT", location: "Formosa", condition: "Muy bueno", description: "Corolla Cross XEI 2021. SUV versátil y cómoda. Techos panorámico, cámara de reversa.", images: { create: [{ url: "/img/corollacross.webp", alt: "Toyota Corolla Cross 2021", order: 0 }] } },
      { brand: "Toyota", model: "SW4", slug: "usado-sw4-2019", year: 2019, mileage: 95000, price: "38000000", fuelType: "Diésel", transmission: "Automática", location: "Formosa", condition: "Bueno", description: "SW4 SRX 4x4 2019. Potencia y confort para toda la familia. 7 asientos, techo solar.", featured: true, images: { create: [{ url: "/img/landcruiser.webp", alt: "Toyota SW4 2019", order: 0 }] } },
      { brand: "Toyota", model: "Camry", slug: "usado-camry-2020", year: 2020, mileage: 60000, price: "28000000", fuelType: "Nafta", transmission: "Automática", location: "Formosa", condition: "Excelente", description: "Camry 2020 en estado impecable. Sedán premium con todos los comforts. Asientos de cuero.", images: { create: [{ url: "/img/camry.webp", alt: "Toyota Camry 2020", order: 0 }] } },
      { brand: "Toyota", model: "Crown", slug: "usado-crown-2021", year: 2021, mileage: 35000, price: "55000000", fuelType: "Híbrido", transmission: "CVT", location: "Formosa", condition: "Excelente", description: "Crown Hybrid 2021. Lujo y eficiencia en su máxima expresión. Equipamiento completo.", featured: true, images: { create: [{ url: "/img/crown.webp", alt: "Toyota Crown 2021", order: 0 }] } },
      { brand: "Toyota", model: "RAV4", slug: "usado-rav4-2020", year: 2020, mileage: 70000, price: "26000000", fuelType: "Nafta", transmission: "Automática", location: "Formosa", condition: "Muy bueno", description: "RAV4 2020. SUV de referencia en su segmento. Tracción integral, cámara 360°.", images: { create: [{ url: "/img/corollacross.webp", alt: "Toyota RAV4 2020", order: 0 }] } },
      { brand: "Toyota", model: "Yaris Cross", slug: "usado-yaris-cross-2022", year: 2022, mileage: 25000, price: "18000000", fuelType: "Nafta", transmission: "CVT", location: "Formosa", condition: "Excelente", description: "Yaris Cross 2022. Compacta pero espaciosa. Ideal para la ciudad con toque de aventura.", images: { create: [{ url: "/img/yaris.webp", alt: "Toyota Yaris Cross 2022", order: 0 }] } },
    ];
    for (const u of used) {
      await prisma.usedVehicle.create({ data: u, include: { images: true } });
    }
    console.log("  Vehículos usados: 9 (demo)");
  }

  // ---------- Leads demo (mini-CRM) ----------
  if ((await prisma.lead.count()) === 0) {
    await prisma.lead.create({
      data: {
        name: "Juan",
        lastname: "Pérez",
        email: "juan@example.com",
        phone: "3704-123456",
        city: "Formosa",
        type: "QUOTE",
        source: "FORM",
        status: "NUEVO",
        vehicleId: vehicleIds["corolla"],
        message: "Quiero cotizar un Corolla híbrido.",
        assignedUserId: seller.id,
      },
    });
    await prisma.lead.create({
      data: {
        name: "María",
        lastname: "González",
        email: "maria@example.com",
        phone: "3704-654321",
        city: "Clorinda",
        type: "QUOTE",
        source: "WHATSAPP",
        status: "SEGUIMIENTO",
        vehicleId: vehicleIds["hilux"],
        message: "Consulto por la Hilux 4x4.",
        assignedUserId: seller2.id,
      },
    });
    await prisma.lead.create({
      data: {
        name: "Carlos",
        lastname: "Rodríguez",
        phone: "3704-111222",
        city: "Formosa",
        type: "CONTACT",
        source: "FORM",
        status: "NEGOCIACION",
        message: "Consulta general sobre financiación.",
        assignedUserId: seller.id,
        notes: "Interesado en plan.",
      },
    });
    await prisma.lead.create({
      data: {
        name: "Ana",
        lastname: "López",
        email: "ana@example.com",
        city: "Pirané",
        type: "QUOTE",
        source: "INSTAGRAM",
        status: "CONVERTIDO",
        vehicleId: vehicleIds["corolla-cross"],
        message: "Quiere cotizar Corolla Cross híbrido.",
        assignedUserId: seller2.id,
      },
    });
    console.log("  Leads demo: 4");
  }

  // ---------- Test drives demo ----------
  if ((await prisma.testDrive.count()) === 0) {
    await prisma.testDrive.create({
      data: {
        name: "Laura",
        lastname: "Fernández",
        phone: "3704-999888",
        email: "laura@example.com",
        vehicleId: vehicleIds["hilux"],
        preferredDate: new Date("2026-08-20"),
        preferredTime: "10:00",
        comments: "Quiere probar la Hilux SRX.",
        status: "PENDIENTE",
      },
    });
    await prisma.testDrive.create({
      data: {
        name: "Pedro",
        lastname: "Álvarez",
        phone: "3704-555444",
        vehicleId: vehicleIds["corolla"],
        preferredDate: new Date("2026-08-18"),
        preferredTime: "16:00",
        status: "CONFIRMADO",
      },
    });
    console.log("  Test drives demo: 2");
  }

  // ---------- Configuración global (placeholders claramente ficticios) ----------
  await prisma.siteSettings.upsert({
    where: { id: "single" },
    update: {},
    create: {
      id: "single",
      businessName: "Concesionaria Toyota Formosa",
      legalName: "Concesionaria Demo (portfolio)",
      logoUrl: "/img/toyotaLogoRojoConTexto.webp",
      phone: "011-5555-0000",
      whatsapp: "5491155550000",
      email: "contacto@demo.local",
      address: "Calle Ejemplo 123, Formosa, Argentina",
      hours: "Lun a Vie 9:00 - 19:00 / Sáb 9:00 - 13:00",
      instagram: "",
      facebook: "",
      tiktok: "",
      mapsUrl: "",
      primaryColor: "#e4002b",
      secondaryColor: "#111111",
      legalText:
        "Sitio de demostración para portfolio. La información mostrada es ilustrativa y no corresponde a un concesionario oficial.",
    },
  });

  // ---------- Home (contenido CMS) ----------
  await prisma.homePage.upsert({
    where: { id: "single" },
    update: {
      featuredVehicleIds: JSON.stringify([
        vehicleIds["corolla"],
        vehicleIds["hilux"],
        vehicleIds["crown"],
      ]),
      trendingVehicleIds: JSON.stringify([
        vehicleIds["corolla-hybrid"],
        vehicleIds["corolla-cross-hybrid"],
        vehicleIds["yaris-cross"],
      ]),
    },
    create: {
      id: "single",
      heroTitle: "Tu próximo Toyota está en Formosa.",
      heroSubtitle:
        "Descubrí nuestra gama de vehículos, financiación y servicios.",
      heroCtaText: "Cotizar ahora",
      heroImage: null,
      heroVideo: null,
      featuredVehicleIds: JSON.stringify([
        vehicleIds["corolla"],
        vehicleIds["hilux"],
        vehicleIds["crown"],
      ]),
      trendingVehicleIds: JSON.stringify([
        vehicleIds["corolla-hybrid"],
        vehicleIds["corolla-cross-hybrid"],
        vehicleIds["yaris-cross"],
      ]),
      featuredPromotionIds: "[]",
      bannerIds: "[]",
      social: "{}",
    },
  });

  console.log("✅ Seed DEMO completado.");
  console.log(`   Admin: ${DEMO.adminEmail} / ${DEMO.adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
