import Image from "next/image";
import Link from "next/link";
import {
  Wrench,
  Cog,
  Gauge,
  Zap,
  Snowflake,
  Disc,
  ChevronDown,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionContainer, SectionHeader } from "@/components/ui/section";
import { ConversionBar } from "@/components/ui/conversion-bar";
import { SlideUp } from "@/components/ui/motion";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Servicios",
  description:
    "Todos los servicios para tu Toyota: mantenimiento, reparaciones, frenos, electricidad, climatización y neumáticos.",
  alternates: {
    canonical: "/servicios",
  },
};

const SERVICE_CATEGORIES = [
  { id: "mantenimiento", label: "Mantenimiento" },
  { id: "reparaciones", label: "Reparaciones" },
  { id: "frenos", label: "Frenos y suspensión" },
  { id: "electricidad", label: "Electricidad" },
  { id: "climatizacion", label: "Climatización" },
  { id: "neumaticos", label: "Neumáticos" },
];

const SERVICES = [
  {
    id: "mantenimiento",
    icon: Wrench,
    title: "Mantenimiento programado",
    duration: "Servicio cada 15.000 km",
    description:
      "Cambio de aceite y filtros, revisión de niveles, chequeo general de la unidad según el plan oficial Toyota.",
  },
  {
    id: "reparaciones",
    icon: Cog,
    title: "Reparaciones mecánicas",
    duration: "Presupuesto previo",
    description:
      "Motor, caja, dirección y sistema de combustión. Diagnóstico digital y repuestos originales.",
  },
  {
    id: "frenos",
    icon: Disc,
    title: "Frenos y suspensión",
    duration: "Chequeo integral",
    description:
      "Pastillas, discos, amortiguadores y alineación. Seguridad al día con equipamiento especializado.",
  },
  {
    id: "electricidad",
    icon: Zap,
    title: "Electricidad y electrónica",
    duration: "Diagnóstico digital",
    description:
      "Sensores del tablero, scanner, batería, alternador y sistemas electrónicos de asistencia a la conducción.",
  },
  {
    id: "climatizacion",
    icon: Snowflake,
    title: "Aire acondicionado",
    duration: "Servicio de carga",
    description:
      "Recarga de gas, revisión de fugas, limpieza del filtro y manteniendo la temperatura ideal todo el año.",
  },
  {
    id: "neumaticos",
    icon: Gauge,
    title: "Neumáticos",
    duration: "Balanceo y alineación",
    description:
      "Rotación, balanceo y alineación para un rodaje parejo, seguro y con desgaste uniforme.",
  },
];

const EXTRAS = [
  {
    icon: Sparkles,
    title: "Estética y vestibulado",
    description: "Lavado, pulido, encerado y cuidado interior por dentro y por fuera.",
  },
  {
    icon: ShieldCheck,
    title: "Accesorios originales",
    description: "Barras, estribos, alfombras y más, 100% originales Toyota.",
  },
];

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Servicios"
        title="Todo lo que tu vehículo necesita"
        description="Del mantenimiento más simple a la reparación más compleja. Un solo lugar, atención oficial."
        breadcrumbs={[{ label: "Servicios" }]}
      />

      {/* Chips de navegación por categoría */}
      <section className="border-b bg-muted/50">
        <div className="container-site flex flex-wrap gap-2 py-6">
          {SERVICE_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {cat.label}
            </a>
          ))}
        </div>
      </section>

      {/* Acordeón de servicios */}
      <Section padding="lg">
        <SectionContainer size="narrow">
          <SectionHeader
            eyebrow="Catálogo"
            title="Elegí el servicio que necesitás"
            description="Cada servicio tiene su detalle. Tocá para conocerlo."
          />

          <div className="mt-10 space-y-3">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <SlideUp key={service.id} delay={i * 0.04}>
                  <details
                    id={service.id}
                    className="group overflow-hidden rounded-2xl border bg-card transition-shadow open:shadow-md"
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold sm:text-h3">{service.title}</h3>
                        <p className="mt-0.5 text-caption text-muted-foreground">
                          {service.duration}
                        </p>
                      </div>
                      <ChevronDown
                        className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="border-t border-border px-5 pb-5 sm:px-6 sm:pb-6">
                      <p className="pt-4 text-body-lead text-muted-foreground">
                        {service.description}
                      </p>
                      <div className="mt-4">
                        <Link
                          href="/cotizar"
                          className={buttonVariants({ variant: "outline", size: "sm" })}
                        >
                          Solicitar presupuesto
                        </Link>
                      </div>
                    </div>
                  </details>
                </SlideUp>
              );
            })}
          </div>
        </SectionContainer>
      </Section>

      {/* Servicio premium + extras */}
      <Section bg="accent" padding="lg">
        <SectionContainer>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <SlideUp>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6">
                <Image
                  src="/img/crown.png"
                  alt="Toyota Crown con terminación premium"
                  width={1280}
                  height={960}
                  className="mx-auto w-full max-w-md object-contain"
                />
                <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-white">
                  Premium
                </span>
              </div>
            </SlideUp>

            <div>
              <SectionHeader
                eyebrow="Atención de lujo"
                title="Detalles que marcan la diferencia"
                description="Sumale a tu Toyota ese toque que lo hace único."
              />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {EXTRAS.map((extra, i) => {
                  const Icon = extra.icon;
                  return (
                    <SlideUp key={extra.title} delay={i * 0.08}>
                      <div className="flex h-full flex-col gap-3 rounded-2xl border bg-card p-6">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="size-5" aria-hidden="true" />
                        </div>
                        <h3 className="text-sm font-bold">{extra.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {extra.description}
                        </p>
                      </div>
                    </SlideUp>
                  );
                })}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/postventa" className={buttonVariants({ variant: "default", size: "lg" })}>
                  Conocé el proceso
                </Link>
              </div>
            </div>
          </div>
        </SectionContainer>
      </Section>

      <ConversionBar />
    </>
  );
}