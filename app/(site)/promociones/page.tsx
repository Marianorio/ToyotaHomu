import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent, Sparkles, Wallet } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionContainer, SectionHeader } from "@/components/ui/section";
import { ConversionBar } from "@/components/ui/conversion-bar";
import { SlideUp, Scale } from "@/components/ui/motion";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Promociones",
  description:
    "Descuentos, bonificaciones y planes de financiación vigentes en Toyota Formosa. No te pierdas nuestras ofertas del mes.",
  alternates: {
    canonical: "/promociones",
  },
};

const PROMOS = [
  {
    image: "/img/corolla.png",
    alt: "Toyota Corolla en promoción",
    badge: "Vigente",
    tag: "Plan 12 cuotas",
    title: "Corolla 1.8 XEI",
    price: "34.900",
    description:
      "Financiación fija en 12 cuotas y bonificación de patentamiento. Pensado para mudarte a un 0 km sin sobresaltos.",
    bullets: ["Cuotas fijas en pesos", "Primer servicio incluido", "Patentamiento bonificado"],
    href: "/vehiculos/corolla",
  },
  {
    image: "/img/corollacross.png",
    alt: "Toyota Corolla Cross en plan canje",
    badge: "Canje",
    tag: "Plan canje",
    title: "Corolla Cross XLI",
    price: "Valor de tu usado",
    description:
      "Tasamos tu vehículo actual y usamos su valor como anticipo. Cerrá tu usado con la SUV que marca tendencia.",
    bullets: ["Tasación en el momento", "Anticipo sin tope", "Entrega sin vueltas"],
    href: "/cotizar",
  },
];

export default function PromocionesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Promociones"
        title="Ofertas que se mueven"
        description="Descuentos, bonificaciones y planes de financiación que duran poco. Aprovechalos antes de que se vayan."
        breadcrumbs={[{ label: "Promociones" }]}
        cta={{ label: "Ver promociones activas", href: "/cotizar" }}
        variant="dark"
      />

      {/* Ofertas del mes */}
      <Section padding="lg">
        <SectionContainer>
          <SectionHeader
            eyebrow="Este mes"
            title="Promociones vigentes"
            description="Condiciones ilustrativas de demostración. Consultá disponibilidad y vigencia en concesionaria."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {PROMOS.map((promo) => (
              <Scale key={promo.title} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-shadow hover:shadow-lg">
                  {/* Imagen */}
                  <div className="relative overflow-hidden bg-gradient-to-b from-zinc-100 to-zinc-50">
                    <div className="h-52 p-6">
                      <Image
                        src={promo.image}
                        alt={promo.alt}
                        width={1200}
                        height={719}
                        className="mx-auto h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <Badge className="absolute left-4 top-4">{promo.badge}</Badge>
                    <span className="absolute right-4 top-4 rounded-full bg-black/75 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                      {promo.tag}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div>
                      <p className="text-eyebrow text-primary">{promo.title}</p>
                      <p className="mt-1 text-4xl font-black tracking-tight tabular-nums">
                        {promo.price}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {promo.description}
                    </p>
                    <ul className="mt-auto space-y-1.5 pt-3">
                      {promo.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-small text-muted-foreground">
                          <BadgePercent className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={promo.href}
                      className={buttonVariants({
                        variant: "outline",
                        className: "mt-4 w-full justify-between",
                      })}
                    >
                      <span>Quiero esta promo</span>
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Scale>
            ))}
          </div>

          {/* Destacado full width */}
          <SlideUp className="mt-8">
            <article className="relative overflow-hidden rounded-3xl bg-zinc-900 text-white">
              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-64 overflow-hidden bg-gradient-to-r from-zinc-900 to-zinc-800">
                  <Image
                    src="/img/landcruiser.png"
                    alt="Toyota Land Cruiser 300 con financiación especial"
                    width={1011}
                    height={628}
                    className="absolute inset-0 h-full w-full object-contain object-right p-8"
                  />
                </div>
                <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" aria-hidden="true" />
                    <Badge>Financiación</Badge>
                  </div>
                  <h3 className="text-h2">Land Cruiser 300 con tasa especial</h3>
                  <p className="max-w-md text-body-lead text-zinc-300">
                    Financiá tu 4×4 insignia con una tasa preferencial y entrega coordinada a
                    medida. Cupos limitados al mes.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <Link href="/cotizar" className={buttonVariants({ variant: "default", size: "lg" })}>
                      Cotizar ahora
                    </Link>
                    <span className="inline-flex items-center gap-2 text-small text-zinc-400">
                      <Wallet className="size-4" aria-hidden="true" />
                      Financiación hasta 60 cuotas
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </SlideUp>
        </SectionContainer>
      </Section>

      {/* Banda CTA */}
      <Section bg="primary" padding="md">
        <SectionContainer>
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-h3 text-white">¿Buscás algo puntual?</h2>
              <p className="mt-1 max-w-xl text-sm text-white/85">
                Consultanos por planes según tu necesidad: primera cuota, canje, leasing o
                financiación directa.
              </p>
            </div>
            <Link
              href="/contacto"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Consultar disponibilidad
            </Link>
          </div>
        </SectionContainer>
      </Section>

      <ConversionBar />
    </>
  );
}