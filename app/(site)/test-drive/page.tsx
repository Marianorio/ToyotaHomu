import Image from "next/image";
import Link from "next/link";
import {
  Car,
  Clock,
  MessageCircle,
  Shield,
  CalendarCheck,
  FileCheck,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionContainer, SectionHeader } from "@/components/ui/section";
import { ConversionBar } from "@/components/ui/conversion-bar";
import { SlideUp } from "@/components/ui/motion";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Test Drive",
  description:
    "Reservá tu test drive en Toyota Formosa y probá tu próximo Toyota en la calle. Sin compromiso.",
  alternates: {
    canonical: "/test-drive",
  },
};

const STEPS = [
  {
    number: "01",
    icon: Car,
    title: "Elegí tu modelo",
    description:
      "Recorré el catálogo, compará versiones y elegí el Toyota que querés sentir en la ruta.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Reservá día y hora",
    description:
      "Coordinamos tu turno por WhatsApp o teléfono. La prueba es gratuita y sin compromiso.",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Probalo con un asesor",
    description:
      "Un asesor te acompaña en el recorrido, responde tus dudas y te muestra cada detalle.",
  },
];

const BENEFITS = [
  {
    icon: Shield,
    title: "Sin compromiso",
    description: "La prueba es gratuita. No te pedimos ningún pago previo.",
  },
  {
    icon: Clock,
    title: "Horarios flexibles",
    description: "Turnos de mañana, tarde y sábados para que te sea cómodo.",
  },
  {
    icon: Car,
    title: "Modelo puntual",
    description: "Si el modelo no está en stock, coordinalo con tu asesor.",
  },
  {
    icon: MessageCircle,
    title: "Seguimiento cercano",
    description: "Te contactamos por WhatsApp para coordinar y luego darte el resultado.",
  },
];

const REQUIREMENTS = [
  "Ser mayor de 18 años",
  "Licencia de conducir vigente",
  "Presentarte en el día y horario acordado",
];

export default function TestDrivePage() {
  return (
    <>
      <PageHeader
        eyebrow="Test Drive"
        title="Vení y sentilo"
        description="Probar un Toyota es la mejor manera de tomar una decisión con confianza. Reservá tu lugar y salí a la calle con el modelo que te enamora."
        breadcrumbs={[{ label: "Test Drive" }]}
        cta={{ label: "Reservar turno", href: "/cotizar" }}
        variant="dark"
      />

      {/* Split: imagen + pasos numerados */}
      <Section padding="lg">
        <SectionContainer>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Imagen deportiva con glow */}
            <SlideUp className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 p-6 shadow-2xl">
                <div
                  className="pointer-events-none absolute -inset-x-10 -top-10 h-40 bg-primary/30 blur-3xl"
                  aria-hidden="true"
                />
                <Image
                  src="/img/gt86.png"
                  alt="Toyota GT86 listo para una prueba de manejo"
                  width={800}
                  height={451}
                  priority
                  className="relative mx-auto w-full max-w-md object-contain drop-shadow-2xl"
                />
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Reserva gratuita
                  </span>
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-zinc-300">
                    Sin compromiso
                  </span>
                </div>
              </div>
            </SlideUp>

            {/* Pasos numerados */}
            <SlideUp delay={0.1} className="order-1 lg:order-2">
              <SectionHeader
                eyebrow="Cómo funciona"
                title="Reservá tu prueba en tres pasos"
                description="Un proceso simple, transparente y pensado para que disfrutes la experiencia."
              />
              <ol className="mt-8 space-y-8">
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.number} className="relative flex gap-5">
                      {i < STEPS.length - 1 && (
                        <span
                          className="absolute left-6 top-14 h-[calc(100%-1rem)] w-px border-l-2 border-dashed border-border"
                          aria-hidden="true"
                        />
                      )}
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-eyebrow text-primary">{step.number}</p>
                        <h3 className="mt-1 text-h3">{step.title}</h3>
                        <p className="mt-2 max-w-md text-body-lead text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </SlideUp>
          </div>
        </SectionContainer>
      </Section>

      {/* Ventajas */}
      <Section bg="muted" padding="lg">
        <SectionContainer>
          <SectionHeader
            align="center"
            eyebrow="Por qué probar"
            title="Una experiencia pensada para vos"
            description="Esto es lo que vas a encontrar cuando agendés tu turno."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <SlideUp key={benefit.title} delay={i * 0.08}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-bold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </SlideUp>
              );
            })}
          </div>
        </SectionContainer>
      </Section>

      {/* Requisitos + CTA reserva */}
      <Section padding="lg">
        <SectionContainer size="narrow">
          <div className="rounded-3xl border bg-card p-8 sm:p-10">
            <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <span className="text-eyebrow text-primary">Antes de venir</span>
                <h2 className="mt-2 text-h2">¿Qué necesitás para la prueba?</h2>
                <ul className="mt-5 space-y-2.5">
                  {REQUIREMENTS.map((req) => (
                    <li key={req} className="flex items-center gap-3 text-body-lead">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <FileCheck className="size-3.5" aria-hidden="true" />
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-stretch gap-3 sm:items-start">
                <Link href="/cotizar" className={buttonVariants({ variant: "default", size: "lg" })}>
                  Solicitar test drive
                </Link>
                <p className="max-w-[200px] text-caption text-muted-foreground">
                  Formulario de reserva disponible en FASE 8. Mientras tanto, escribinos por
                  WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </Section>

      <ConversionBar />
    </>
  );
}