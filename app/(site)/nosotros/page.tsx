import Image from "next/image";
import Link from "next/link";
import { HandCoins, Eye, Heart, ThumbsUp, MapPin, CalendarCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionContainer, SectionHeader } from "@/components/ui/section";
import { ConversionBar } from "@/components/ui/conversion-bar";
import { SlideUp } from "@/components/ui/motion";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Nosotros",
  description:
    "Concesionaria Toyota Formosa: nuestra historia, valores y compromiso con cada familia que elige Toyota.",
  alternates: {
    canonical: "/nosotros",
  },
};

const TIMELINE = [
  {
    year: "2015",
    title: "Abrimos las puertas",
    description: "Nace Toyota Formosa con la convicción de acercar Toyota a nuestra región.",
  },
  {
    year: "2017",
    title: "Taller propio",
    description: "Sumamos servicio oficial con técnicos certificados y taller bajo techo.",
  },
  {
    year: "2020",
    title: "Usados certificados",
    description: "Lanzamos el programa de usados revisados con garantía y respaldo de marca.",
  },
  {
    year: "2023",
    title: "Planes propios",
    description: "Integramos financiación y planes de ahorro pensados para chaqueños y formoseños.",
  },
  {
    year: "Hoy",
    title: "Seguimos eligiendo Toyota",
    description: "Una misma premisa: cercanía, transparencia y confianza en cada venta.",
  },
];

const VALUES = [
  {
    icon: HandCoins,
    title: "Confianza",
    description: "Creamos vínculos que arrancan en la primera visita y duran toda la vida del vehículo.",
  },
  {
    icon: Eye,
    title: "Transparencia",
    description: "Precios claros, condiciones escritas y cero letra chica escondida.",
  },
  {
    icon: Heart,
    title: "Cercanía",
    description: "Te hablamos de vos, te asesoramos como a un amigo y te acompañamos después de la venta.",
  },
  {
    icon: ThumbsUp,
    title: "Compromiso",
    description: "Con nuestra gente, con la región y con la calidad que el nombre Toyota representa.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nosotros"
        title="Más de una década eligiendo Toyota juntos"
        description="Nuestra historia es simple: personas que aman los autos, cuidando a personas que aman los autos."
        breadcrumbs={[{ label: "Nosotros" }]}
        cta={{ label: "Conocénos", href: "/ubicacion" }}
      />

      {/* Quiénes somos */}
      <Section padding="lg">
        <SectionContainer>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <SlideUp>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-100 to-zinc-200 p-6">
                <Image
                  src="/img/camry.png"
                  alt="Toyota Camry, parte de nuestra historia"
                  width={1280}
                  height={960}
                  className="mx-auto w-full max-w-lg object-contain"
                />
                <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-white">
                  Desde 2015
                </span>
              </div>
            </SlideUp>

            <div>
              <SectionHeader
                eyebrow="Quiénes somos"
                title="Un equipo que vive Toyota todos los días"
                description="Somos la concesionaria de referencia en Formosa. Vendedores, asesores y técnicos formados en la filosofía Toyota: mejora continua y respeto por las personas."
              />
              <ul className="mt-6 space-y-3 text-body-lead text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                  Atención en nuestra casa central: Av. Arturo Frondizi 1450, Formosa.
                </li>
                <li className="flex items-start gap-3">
                  <CalendarCheck className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                  Visitanos, probá y volvé — la puerta queda abierta.
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contacto" className={buttonVariants({ variant: "default", size: "lg" })}>
                  Contactanos
                </Link>
                <Link href="/vehiculos" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Ver el catálogo
                </Link>
              </div>
            </div>
          </div>
        </SectionContainer>
      </Section>

      {/* Cita editorial serif */}
      <Section bg="dark" padding="lg">
        <SectionContainer size="narrow" className="text-center">
          <SlideUp>
            <span className="font-serif text-6xl leading-none text-primary" aria-hidden="true">
              “
            </span>
            <blockquote className="mt-2 font-serif text-2xl font-medium italic leading-snug text-white sm:text-3xl lg:text-4xl">
              Nuestra misión no es vender autos. Es construir confianza, kilómetro a kilómetro.
            </blockquote>
            <p className="mt-6 text-eyebrow text-red-400">Equipo Toyota Formosa</p>
          </SlideUp>
        </SectionContainer>
      </Section>

      {/* Línea de tiempo */}
      <Section padding="lg">
        <SectionContainer>
          <SectionHeader
            eyebrow="Nuestra historia"
            title="Los momentos que nos hicieron"
          />
          <ol className="mt-10 space-y-0">
            {TIMELINE.map((item, i) => (
              <SlideUp key={item.year} delay={i * 0.05}>
                <li className="relative flex flex-col gap-2 pb-8 pl-8 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6">
                  {/* línea vertical */}
                  {i < TIMELINE.length - 1 && (
                    <span
                      className="absolute left-[7px] top-4 hidden h-[calc(100%-1rem)] w-px bg-border sm:block"
                      aria-hidden="true"
                    />
                  )}
                  <span className="absolute left-0 top-1 hidden size-[15px] rounded-full border-[3px] border-primary bg-background sm:block" aria-hidden="true" />
                  <p className="w-24 shrink-0 font-mono text-sm font-bold tracking-tight text-primary">
                    {item.year}
                  </p>
                  <div>
                    <h3 className="text-h3">{item.title}</h3>
                    <p className="mt-1.5 max-w-2xl text-body-lead text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </li>
              </SlideUp>
            ))}
          </ol>
        </SectionContainer>
      </Section>

      {/* Valores */}
      <Section bg="muted" padding="lg">
        <SectionContainer>
          <SectionHeader
            align="center"
            eyebrow="Cómo nos guiamos"
            title="Nuestros valores"
            description="Todo lo que hacemos se apoya en cuatro pilares simples."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <SlideUp key={value.title} delay={i * 0.08}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl border bg-card p-6">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-bold">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
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