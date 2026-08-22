import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section";
import { SlideUp, Reveal, StaggerGroup, StaggerItem, Scale } from "@/components/ui/motion";
import { isDemoMode } from "@/lib/demo";

type ConcessionaireProps = {
  address?: string;
  phone?: string;
  hours?: string;
};

export function Concessionaire({
  address,
  phone,
  hours,
}: ConcessionaireProps) {
  return (
    <section className="bg-muted py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Formosa"
            title="Toyota, más cerca de vos"
            description="Tu concesionaria en Formosa con atención personalizada y servicio postventa."
            align="center"
          />
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StaggerItem>
            <div className="rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/10">
              <MapPin className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">Ubicación</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {address || "Calle Ejemplo 123, Formosa"}
              </p>
              {isDemoMode && (
                <span className="mt-2 inline-block rounded bg-zinc-100 px-2 py-0.5 text-[10px] text-muted-foreground dark:bg-zinc-800">
                  DEMO
                </span>
              )}
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/10">
              <Clock className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">Horarios</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {hours || "Lun a Vie 9:00 - 19:00 / Sáb 9:00 - 13:00"}
              </p>
              {isDemoMode && (
                <span className="mt-2 inline-block rounded bg-zinc-100 px-2 py-0.5 text-[10px] text-muted-foreground dark:bg-zinc-800">
                  DEMO
                </span>
              )}
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/10">
              <Phone className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">Contacto</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {phone || "Consultar"}
              </p>
              {isDemoMode && (
                <span className="mt-2 inline-block rounded bg-zinc-100 px-2 py-0.5 text-[10px] text-muted-foreground dark:bg-zinc-800">
                  DEMO
                </span>
              )}
            </div>
          </StaggerItem>
        </StaggerGroup>

        <SlideUp delay={0.2}>
          <div className="mt-8 text-center">
            <Link
              href="/ubicacion"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Cómo llegar <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </SlideUp>

        {/* Banner */}
        <Scale>
          <div className="relative mt-12 overflow-hidden rounded-2xl">
            <Image
              src="/img/LandcruiserConFondoHorizontal.webp"
              alt="Land Cruiser en la concesionaria Toyota Formosa"
              width={1600}
              height={600}
              className="h-56 w-full object-cover sm:h-72 transition-transform duration-700 hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
          </div>
        </Scale>
      </Container>
    </section>
  );
}
