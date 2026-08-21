import Link from "next/link";
import { MapPin, Clock, Phone, Mail, Car, Bus, Info } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionContainer, SectionHeader } from "@/components/ui/section";
import { ConversionBar } from "@/components/ui/conversion-bar";
import { SlideUp } from "@/components/ui/motion";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Ubicación",
  description:
    "Encontranos en Toyota Formosa. Dirección, horarios de atención y cómo llegar a nuestra concesionaria.",
  alternates: {
    canonical: "/ubicacion",
  },
};

const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: "Dirección",
    value: "Av. Arturo Frondizi 1450",
    detail: "Formosa, Argentina",
  },
  {
    icon: Clock,
    title: "Horarios",
    value: "Lunes a viernes: 8:30 a 18:30",
    detail: "Sábados: 9:00 a 13:00",
  },
  {
    icon: Phone,
    title: "Teléfono",
    value: "+54 9 370 450-1234",
    detail: "Consultas y turnos",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@toyotaformosa.com.ar",
    detail: "Respuesta en 24 h hábiles",
  },
];

const DIRECTIONS = [
  {
    icon: Car,
    title: "En auto",
    description: "Sobre la Av. Arturo Frondizi, a tres cuadras del puente. Playa de estacionamiento propia.",
  },
  {
    icon: Bus,
    title: "Transporte público",
    description: "Las líneas 9 y 24 tienen parada en la intersección con la Av. Néstor Kirchner.",
  },
  {
    icon: Info,
    title: "Referencias",
    description: "Frente a la estación de servicio. No podés pasar de largo: nos ves a la altura del semáforo.",
  },
];

export default function UbicacionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ubicación"
        title="Vení a visitarnos"
        description="Te esperamos en casa, con empanadas a la mañana y siempre un asesor para charlar de Toyota."
        breadcrumbs={[{ label: "Ubicación" }]}
        cta={{ label: "Consultar un turno", href: "/contacto" }}
      />

      <Section padding="lg">
        <SectionContainer>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            {/* Mapa artboard (estilizado, sin embed) */}
            <SlideUp>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border bg-zinc-100 shadow-inner">
                {/* cuadrícula de calles */}
                <div
                  className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:3rem_3rem]"
                  aria-hidden="true"
                />
                {/* río / zona verde */}
                <div
                  className="absolute bottom-0 right-0 h-1/3 w-2/3 rounded-tl-full bg-emerald-200/60"
                  aria-hidden="true"
                />
                {/* avenida principal */}
                <div
                  className="absolute inset-x-0 top-[58%] h-9 bg-white/90 shadow-sm"
                  aria-hidden="true"
                />
                <div
                  className="absolute left-[46%] top-0 h-full w-7 bg-white/80 shadow-sm"
                  aria-hidden="true"
                />
                {/* puente */}
                <div
                  className="absolute right-[6%] top-[46%] h-10 w-24 rounded-lg bg-zinc-300/80"
                  aria-hidden="true"
                />
                {/* pin central */}
                <div className="absolute left-[52%] top-[40%] -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/30" aria-hidden="true" />
                  <MapPin className="size-10 fill-primary text-white drop-shadow-lg" aria-hidden="true" />
                </div>
                {/* etiqueta */}
                <div className="absolute left-[52%] top-[40%] z-10 -translate-x-1/2 translate-y-6">
                  <span className="whitespace-nowrap rounded-full bg-zinc-900 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    Toyota Formosa
                  </span>
                </div>
                {/* esquinas de mapa */}
                <span className="absolute left-4 top-4 rounded-md bg-white/85 px-2 py-1 font-mono text-[0.7rem] font-semibold text-zinc-500 backdrop-blur-sm">
                  Av. Néstor Kirchner
                </span>
                <span className="absolute bottom-4 left-4 rounded-md bg-white/85 px-2 py-1 font-mono text-[0.7rem] font-semibold text-zinc-500 backdrop-blur-sm">
                  Ruta 84
                </span>
              </div>
            </SlideUp>

            {/* Info cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {CONTACT_CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <SlideUp key={card.title} delay={i * 0.06}>
                    <div className="flex h-full flex-col gap-2 rounded-2xl border bg-card p-5">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {card.title}
                      </h3>
                      <p className="text-sm font-semibold">{card.value}</p>
                      <p className="text-caption text-muted-foreground">{card.detail}</p>
                    </div>
                  </SlideUp>
                );
              })}
              <SlideUp delay={0.32} className="sm:col-span-2">
                <div className="flex flex-col gap-3 rounded-2xl bg-primary/5 p-5">
                  <p className="text-sm font-semibold">
                    ¿No sabés cómo llegar? Coordinalo con tu asesor.
                  </p>
                  <Link
                    href="/contacto"
                    className={buttonVariants({ variant: "default", size: "sm", className: "w-fit" })}
                  >
                    Escribinos
                  </Link>
                </div>
              </SlideUp>
            </div>
          </div>
        </SectionContainer>
      </Section>

      {/* Cómo llegar */}
      <Section bg="muted" padding="lg">
        <SectionContainer>
          <SectionHeader
            eyebrow="Cómo llegar"
            title="Tres formas de encontrarnos"
            description="Elegí la que más te convenga y vení cuando quieras."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {DIRECTIONS.map((dir, i) => {
              const Icon = dir.icon;
              return (
                <SlideUp key={dir.title} delay={i * 0.08}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl border bg-card p-6">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-h3">{dir.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {dir.description}
                    </p>
                  </div>
                </SlideUp>
              );
            })}
          </div>
        </SectionContainer>
      </Section>

      <ConversionBar />
    </>
  );
}