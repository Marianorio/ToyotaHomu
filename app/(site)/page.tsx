import { prisma } from "@/lib/db";
import { isDemoMode } from "@/lib/demo";
import { Hero } from "@/components/home/hero";
import { QuickActions } from "@/components/home/quick-actions";
import { WhyChooseToyota } from "@/components/home/vehicle-discovery";
import { FeaturedVehicles } from "@/components/home/featured-vehicles";
import { FeaturedVehicleExperience } from "@/components/home/featured-vehicle-experience";
import { Promotions } from "@/components/home/promotions";
import { FinancingPreview } from "@/components/home/financing-preview";
import { ComparisonCTA } from "@/components/home/comparison-cta";
import { AfterSales } from "@/components/home/after-sales";
import { TradeIn } from "@/components/home/trade-in";
import { TestDrive } from "@/components/home/test-drive";
import { Concessionaire } from "@/components/home/concessionaire";
import { Location } from "@/components/home/location";
import { FinalCTA } from "@/components/home/final-cta";
import { SectionDivider } from "@/components/ui/section";
import { JsonLd } from "@/components/ui/json-ld";
import { SITE_URL, absoluteImage } from "@/lib/site";

export const metadata = {
  title: "Toyota en Formosa | Concesionaria",
  description:
    "Concesionaria Toyota Formosa: vehículos 0 km, financiación, test drive, postventa y atención personalizada. Sitio de demostración.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  // Data fetching — todo en paralelo
  const [settings, home, vehicles, promotions] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "single" } }),
    prisma.homePage.findUnique({ where: { id: "single" } }),
    prisma.vehicle.findMany({
      where: { isAvailable: true },
      include: { category: true },
    }),
    prisma.promotion.findMany({
      where: { active: true },
      include: { vehicle: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  // Featured vehicles — from HomePage config or DB featured flag
  const featuredIds = home?.featuredVehicleIds
    ? (JSON.parse(home.featuredVehicleIds) as string[])
    : [];
  const featuredVehicles = vehicles
    .filter((v) => featuredIds.includes(v.id) || v.featured)
    .slice(0, 3);

  // Hero vehicle — first featured or first vehicle
  const heroVehicle = featuredVehicles[0] || vehicles[0] || null;

  // Featured vehicle experience — from HomePage or first featured
  const featuredExpId = home?.featuredVehicleIds
    ? (JSON.parse(home.featuredVehicleIds) as string[])[0]
    : null;
  const featuredExpVehicle = featuredExpId
    ? vehicles.find((v) => v.id === featuredExpId) || featuredVehicles[0] || null
    : featuredVehicles[0] || null;

  return (
    <>
      {/* Datos estructurados: concesionaria */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AutoDealer",
          name: settings?.businessName || "Concesionaria Toyota Formosa",
          url: SITE_URL,
          image: absoluteImage(settings?.logoUrl) || `${SITE_URL}/img/toyotaLogo.webp`,
          telephone: settings?.phone,
          email: settings?.email,
          address: settings?.address,
          openingHours: settings?.hours,
          sameAs: [
            settings?.instagram,
            settings?.facebook,
            settings?.tiktok,
          ].filter(Boolean) as string[],
        }}
      />

      {/* 1 — Hero: primera impresion + CTA principal */}
      <Hero
        title={home?.heroTitle || "Tu próximo Toyota está en Formosa."}
        subtitle={
          home?.heroSubtitle ||
          "Descubrí nuestra gama de vehículos, financiación y servicios."
        }
        ctaText={home?.heroCtaText || "Cotizar ahora"}
        ctaHref="/cotizar"
        vehicle={
          heroVehicle
            ? { model: heroVehicle.model, mainImage: heroVehicle.mainImage }
            : null
        }
      />

      {/* 2 — Acciones rapidas: atajos inmediatos (cotizar / WhatsApp) */}
      <QuickActions whatsappNumber={settings?.whatsapp ?? undefined} />
      <div className="h-8 bg-background" aria-hidden="true" />

      {/* 3 — Producto core: lo que el usuario vino a ver */}
      <FeaturedVehicles
        vehicles={featuredVehicles.map((v) => ({
          slug: v.slug,
          model: v.model,
          brand: v.brand,
          categoryName: v.category?.name || "",
          price: v.price?.toString() ?? null,
          isNew: v.isNew,
          isHybrid: v.isHybrid,
          isAvailable: v.isAvailable,
          engine: v.engine,
          transmission: v.transmission,
          mainImage: v.mainImage,
        }))}
      />

      {/* 4 — Experiencia inmersiva del destacado (profundiza el interes) */}
      <FeaturedVehicleExperience
        vehicle={
          featuredExpVehicle
            ? {
                slug: featuredExpVehicle.slug,
                model: featuredExpVehicle.model,
                brand: featuredExpVehicle.brand,
                description: featuredExpVehicle.description,
                engine: featuredExpVehicle.engine,
                transmission: featuredExpVehicle.transmission,
                mainImage: featuredExpVehicle.mainImage,
              }
            : null
        }
      />

      <SectionDivider variant="gradient" />

      {/* 5 — Urgencia comercial: promociones vigentes */}
      <Promotions
        promotions={promotions.map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          description: p.description,
          discount: p.discount,
          validUntil: p.validUntil,
          vehicle: p.vehicle ? { model: p.vehicle.model } : null,
        }))}
      />

      {/* 6 — Financiacion: habilitar la compra (objecion principal) */}
      <FinancingPreview />

      {/* 7 — Lead experiencial: probar el auto (alta conversion) */}
      <TestDrive />

      <SectionDivider variant="gradient" />

      {/* 8 — Ayuda a decidir: comparador */}
      <ComparisonCTA />

      {/* 9 — Confianza de marca: por que elegir Toyota */}
      <WhyChooseToyota />

      {/* 10 — Segundo funnel: canje de usado */}
      <TradeIn />

      <SectionDivider variant="gradient" />

      {/* 11 — Confianza post-compra: servicio y garantia */}
      <AfterSales />

      {/* 12 — Institucional: concesionaria */}
      <Concessionaire
        address={settings?.address ?? undefined}
        phone={settings?.phone ?? undefined}
        hours={settings?.hours ?? undefined}
      />

      {/* 13 — Visita: ubicacion y como llegar */}
      <Location />

      {/* 14 — Cierre: CTA final de conversion */}
      <FinalCTA />

      {/* DEMO indicator */}
      {isDemoMode && (
        <div className="bg-zinc-100 py-4 text-center text-xs text-muted-foreground dark:bg-zinc-900">
          Sitio de demostración para portfolio. La información mostrada es
          ilustrativa.
        </div>
      )}
    </>
  );
}
