import Image from "next/image";
import Link from "next/link";
import { Wrench, ClipboardCheck, Cog, Gift, ShieldCheck, Truck, CalendarClock } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionContainer, SectionHeader } from "@/components/ui/section";
import { ConversionBar } from "@/components/ui/conversion-bar";
import { SlideUp } from "@/components/ui/motion";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Postventa",
  description:
    "Servicio oficial Toyota en Formosa: mantenimiento, reparaciones y garantía con repuestos originales y técnicos certificados.",
  alternates: {
    canonical: "/postventa",
  },
};

const STATS = [
  { value: "4.500+", label: "servicios realizados" },
  { value: "30 min", label: "respuesta al pedir turno" },
  { value: "100%", label: "repuestos originales" },
  { value: "12 meses", label: "garantía en reparaciones" },
];

const PROCESS = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Ingresá tu vehículo",
    description: "Recepcionamos tu Toyota, registramos su estado y escuchamos tu consulta.",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Diagnóstico y presupuesto",
    description: "Te confirmamos el diagnóstico y el presupuesto antes de hacer cualquier trabajo.",
  },
  {
    number: "03",
    icon: Cog,
    title: "Reparación certificada",
    description: "Trabajo a cargo de técnicos certificados con repuestos originales Toyota.",
  },
  {
    number: "04",
    icon: Gift,
    title: "Entrega explicada",
    description: "Realizamos la prueba final y te explicamos cada detalle del servicio realizado.",
  },
];

const COMMITMENTS = [
  {
    icon: ShieldCheck,
    title: "Garantía oficial",
    description: "Todo el respaldo de la red oficial Toyota después de la entrega.",
  },
  {
    icon: Truck,
    title: "Plan de mantenimiento",
    description: "Servicio programado cada 15.000 km para que tu vehículo esté siempre al día.",
  },
  {
    icon: CalendarClock,
    title: "Turnos coordinados",
    description: "Agendamos el horario que mejor se adapte a tu rutina, incluso los sábados.",
  },
];

export default function PostventaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Postventa"
        title="Que tu Toyota siga siendo Toyota"
        description="Servicio oficial, repuestos originales y técnicos certificados. Tu vehículo, en las mejores manos."
        breadcrumbs={[{ label: "Postventa" }]}
        cta={{ label: "Pedir turno", href: "/contacto" }}
        variant="dark"
      />

      {/* Stats con números mono */}
      <section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((stat, i) => (
            <SlideUp key={stat.label} delay={i * 0.06}>
              <div className="text-center">
                <p className="font-mono text-3xl font-bold tracking-tight text-white tabular-nums sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-caption text-zinc-400">{stat.label}</p>
              </div>
            </SlideUp>
          ))}
        </div>
      </section>

      {/* Proceso numerado */}
      <Section padding="lg">
        <SectionContainer>
          <SectionHeader
            eyebrow="Así trabajamos"
            title="Un proceso claro, de la entrada a la entrega"
            description="Cuatro pasos simples, con presupuesto aprobado antes de tocar vehículo."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => {
              const Icon = step.icon;
              return (
                <SlideUp key={step.number} delay={i * 0.08} className="h-full">
                  <div className="relative flex h-full flex-col gap-3 rounded-2xl border bg-card p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-2xl font-bold text-zinc-200">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-h3">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </SlideUp>
              );
            })}
          </div>
        </SectionContainer>
      </Section>

      {/* Compromiso + imagen */}
      <Section bg="muted" padding="lg">
        <SectionContainer>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <SlideUp>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-200 via-zinc-100 to-zinc-200 p-6">
                <Image
                  src="/img/hilux.png"
                  alt="Toyota Hilux lista para su service oficial"
                  width={800}
                  height={600}
                  className="mx-auto w-full max-w-sm object-contain"
                />
                <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-white">
                  Service oficial
                </span>
              </div>
            </SlideUp>

            <div>
              <SectionHeader
                eyebrow="Nuestro compromiso"
                title="Garantía y atención posventa"
                description="Comprar un Toyota es empezar una relación larga. Por eso cuidamos cada detalle después de la entrega."
              />
              <div className="mt-8 space-y-5">
                {COMMITMENTS.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <SlideUp key={c.title} delay={i * 0.08}>
                      <div className="flex gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="size-5" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold">{c.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {c.description}
                          </p>
                        </div>
                      </div>
                    </SlideUp>
                  );
                })}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/cotizar" className={buttonVariants({ variant: "default", size: "lg" })}>
                  Pedir turno
                </Link>
                <Link href="/servicios" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Ver todos los servicios
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