import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { FinancingSimulator } from "@/components/financing/financing-simulator";
import { prisma } from "@/lib/db";
import { formatARS } from "@/lib/format";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock3, HandCoins } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Financiación",
  description:
    "Planes de financiación flexibles y simulador de cuotas interactivo para tu próximo Toyota en Formosa.",
  alternates: {
    canonical: "/financiacion",
  },
};

export const dynamic = "force-dynamic";

const DEFAULT_TNA = 29;

export default async function FinanciacionPage() {
  const [plans, vehicles, settings] = await Promise.all([
    prisma.financingPlan.findMany({
      where: { active: true },
      orderBy: [{ createdAt: "asc" }],
      include: { vehicle: { select: { brand: true, model: true, slug: true } } },
    }),
    prisma.vehicle.findMany({
      where: { isAvailable: true, price: { not: null } },
      orderBy: [{ featured: "desc" }, { model: "asc" }],
      select: { slug: true, model: true, brand: true, price: true },
    }),
    prisma.siteSettings.findUnique({ where: { id: "single" } }),
  ]);

  const planWithRate = plans.find((p) => p.interestRate != null);
  const defaultTna =
    planWithRate?.interestRate != null
      ? Number(planWithRate.interestRate)
      : DEFAULT_TNA;

  const simVehicles = vehicles.flatMap((v) =>
    v.price != null
      ? [{ slug: v.slug, model: v.model, brand: v.brand, price: Number(v.price) }]
      : [],
  );

  const benefits = [
    {
      icon: HandCoins,
      title: "Plan a medida",
      text: "Elegí anticipo desde 0% según tu banco o aseguradora.",
    },
    {
      icon: Clock3,
      title: "Plazos flexibles",
      text: "Financiación de 12 a 60 cuotas con sistema de cuota fija.",
    },
    {
      icon: ShieldCheck,
      title: "Acompañamiento",
      text: "Asesores te guían en todo el proceso de financiación.",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Financiación"
        title="Encontrá la forma de llegar a tu Toyota"
        description="Planes flexibles y un simulador de cuotas interactivo para estimar tu inversión."
        breadcrumbs={[{ label: "Financiación" }]}
        cta={{ label: "Simular cuota", href: "#simulador" }}
        backgroundImage="/img/toyotaConsecionaria.webp"
        variant="dark"
      />

      {/* Beneficios */}
      <Section padding="md">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <b.icon className="size-6 text-primary" aria-hidden="true" />
                <h2 className="mt-3 font-semibold">{b.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Planes vigentes */}
      {plans.length > 0 && (
        <Section padding="md">
          <Container>
            <h2 className="mb-6 text-2xl font-bold">Planes vigentes</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col rounded-2xl border border-border bg-background p-6"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold leading-tight">{p.name}</h3>
                    <Badge variant="outline">Vigente</Badge>
                  </div>
                  {p.vehicle && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {p.vehicle.brand} {p.vehicle.model}
                    </p>
                  )}
                  <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                    {p.installments != null && (
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Cuotas</dt>
                        <dd className="font-medium">{p.installments}</dd>
                      </div>
                    )}
                    {p.percentage && (
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Anticipo</dt>
                        <dd className="font-medium">{p.percentage}</dd>
                      </div>
                    )}
                    {p.interestRate != null && (
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">TNA</dt>
                        <dd className="font-medium">
                          {Number(p.interestRate)} %
                        </dd>
                      </div>
                    )}
                    {p.monthlyPayment != null && (
                      <div className="flex items-center justify-between border-t border-border pt-2">
                        <dt className="text-muted-foreground">
                          Cuota desde
                        </dt>
                        <dd className="font-semibold">
                          {formatARS(p.monthlyPayment.toString())}
                        </dd>
                      </div>
                    )}
                  </dl>
                  <Link
                    href={
                      p.vehicle
                        ? `/cotizar?vehicle=${p.vehicle.slug}`
                        : "/cotizar"
                    }
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        className: "mt-5 gap-1.5",
                      }),
                    )}
                  >
                    Quiero este plan
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Simulador */}
      <Section padding={plans.length > 0 ? "lg" : "md"}>
        <Container id="simulador" scroll-mt-24>
          <h2 className="mb-2 text-2xl font-bold">Simulá tu cuota</h2>
          <p className="mb-8 max-w-2xl text-muted-foreground">
            Elegí el vehículo y ajustá anticipo, cantidad de cuotas y tasa para
            ver una estimación al instante.
          </p>

          {simVehicles.length > 0 ? (
            <FinancingSimulator
              vehicles={simVehicles}
              defaultTna={defaultTna}
              whatsappNumber={settings?.whatsapp ?? undefined}
            />
          ) : (
            <div className="rounded-2xl border border-border bg-background p-10 text-center text-muted-foreground">
              Todavía no hay vehículos disponibles para simular. Volvé pronto.
            </div>
          )}

          <p className="mt-6 text-xs text-muted-foreground">
            Los cálculos son orientativos (sistema francés de amortización) y no
            constituyen oferta comercial. Las condiciones finales las define la
            entidad financiera. Demo.
          </p>
        </Container>
      </Section>
    </>
  );
}