import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  BadgeNuevo,
  BadgeHibrido,
  BadgeDestacado,
  BadgeDisponible,
  BadgeOferta,
  BadgeDemo,
} from "@/components/ui/vehicle-badges";
import { Spinner, LoadingButton, PageLoading } from "@/components/ui/loading";
import { EmptyState, ErrorState, SuccessState } from "@/components/ui/feedback";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import Image from "next/image";

export const metadata = { title: "Design System" };

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-10">
      <h2 className="text-h2 mb-6">{title}</h2>
      {children}
    </section>
  );
}

const demoVehicle = {
  id: "demo",
  slug: "corolla",
  model: "Corolla",
  categoryName: "Autos",
  price: "28000000",
  isNew: true,
  isHybrid: true,
  isAvailable: true,
  engine: "1.8 Híbrido",
  transmission: "CVT",
};

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Container className="py-12">
        <span className="text-eyebrow text-primary">Design System</span>
        <h1 className="text-display mt-2">Toyota Formosa</h1>
        <p className="text-body-lead mt-4 max-w-2xl text-muted-foreground">
          Fundamentos visuales: paleta, tipografía, componentes y estados.
        </p>

        {/* Paleta */}
        <Section title="Paleta">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {[
              { label: "Primary", c: "bg-primary" },
              { label: "Foreground", c: "bg-foreground" },
              { label: "Card", c: "bg-card border" },
              { label: "Muted", c: "bg-muted" },
              { label: "Secondary", c: "bg-secondary" },
              { label: "Destructive", c: "bg-destructive" },
            ].map((s) => (
              <div key={s.label} className="space-y-2">
                <div className={cn("h-20 rounded-xl", s.c)} />
                <p className="text-small text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Tipografía */}
        <Section title="Tipografía">
          <div className="space-y-5">
            <p className="text-eyebrow text-muted-foreground">Display / eyebrow</p>
            <p className="text-display">Preview display</p>
            <p className="text-h1">Preview H1</p>
            <p className="text-h2">Preview H2</p>
            <p className="text-h3">Preview H3</p>
            <p className="text-body-lead">
              Cuerpo lead — texto de lectura principal.
            </p>
            <p className="text-muted-foreground">Texto secundario.</p>
            <p className="text-small">
              Texto pequeño y <span className="text-caption">caption</span>.
            </p>
          </div>
        </Section>

        {/* Botones */}
        <Section title="Botones">
          <div className="flex flex-wrap gap-3">
            <button className={buttonVariants()}>Primary</button>
            <button className={buttonVariants({ variant: "secondary" })}>
              Secondary
            </button>
            <button className={buttonVariants({ variant: "outline" })}>
              Outline
            </button>
            <button className={buttonVariants({ variant: "ghost" })}>Ghost</button>
            <button className={buttonVariants({ variant: "destructive" })}>
              Danger
            </button>
            <button className={cn(buttonVariants(), "opacity-50")} disabled>
              Disabled
            </button>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges">
          <div className="flex flex-wrap items-center gap-3">
            <BadgeNuevo />
            <BadgeHibrido />
            <BadgeDestacado />
            <BadgeDisponible />
            <BadgeOferta />
            <BadgeDemo />
            <Badge variant="outline">Badge</Badge>
            <Badge>Default</Badge>
          </div>
        </Section>

        {/* Loading */}
        <Section title="Loading">
          <div className="flex flex-wrap items-center gap-4">
            <Spinner />
            <LoadingButton loading>Guardar</LoadingButton>
            <LoadingButton>Guardar</LoadingButton>
          </div>
          <div className="mt-6 h-40">
            <PageLoading label="Cargando" />
          </div>
        </Section>

        {/* Feedback */}
        <Section title="Estados">
          <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
            <EmptyState
              title="Sin resultados"
              description="No encontramos vehículos con esos filtros."
              action={{ label: "Limpiar filtros", href: "#" }}
            />
            <ErrorState
              title="Ocurrió un error"
              description="Volvé a intentar en unos minutos."
              action={{ label: "Reintentar" }}
            />
            <SuccessState
              title="¡Listo!"
              description="Tu solicitud fue enviada correctamente."
              action={{ label: "Ver vehículos", href: "#" }}
            />
          </div>
        </Section>

        {/* Logo */}
        <Section title="Logo">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { src: "/img/toyotaLogo.webp", label: "toyotaLogo" },
              { src: "/img/toyotaLogoRojoConTexto.webp", label: "Rojo con texto" },
              { src: "/img/toyotaLogoNegro.webp", label: "Negro" },
              { src: "/img/toyotaLogoNegroConTexto.webp", label: "Negro con texto" },
            ].map((logo) => (
              <div
                key={logo.src}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border bg-card p-6"
              >
                <Image
                  src={logo.src}
                  alt={logo.label}
                  width={160}
                  height={48}
                  className="h-12 w-auto"
                />
                <p className="text-small text-muted-foreground">{logo.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* VehicleCard */}
        <Section title="VehicleCard">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <VehicleCard vehicle={demoVehicle} />
            <VehicleCard vehicle={{ ...demoVehicle, isHybrid: false, featured: true }} />
          </div>
        </Section>
      </Container>
    </main>
  );
}
