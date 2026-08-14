import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SlideUp } from "@/components/ui/motion";
import { VehicleImage } from "@/components/vehicles/vehicle-image";

type FeaturedVehicle = {
  slug: string;
  model: string;
  brand: string;
  description?: string | null;
  engine?: string | null;
  transmission?: string | null;
  mainImage?: string | null;
};

type FeaturedVehicleExperienceProps = {
  vehicle: FeaturedVehicle | null;
};

/**
 * Sección grande para el vehículo destacado del CMS.
 * Composición editorial: texto a la izquierda, imagen grande a la derecha.
 */
export function FeaturedVehicleExperience({
  vehicle,
}: FeaturedVehicleExperienceProps) {
  if (!vehicle) return null;

  return (
    <section className="overflow-hidden bg-zinc-900 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div>
            <SlideUp>
              <span className="text-eyebrow text-red-400">Experiencia</span>
            </SlideUp>
            <SlideUp delay={0.1}>
              <h2 className="mt-3 text-h1 text-white">{vehicle.model}</h2>
            </SlideUp>
            {vehicle.description && (
              <SlideUp delay={0.2}>
                <p className="mt-4 max-w-md text-body-lead text-zinc-300">
                  {vehicle.description}
                </p>
              </SlideUp>
            )}
            <SlideUp delay={0.25}>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-400">
                {vehicle.engine && <span>{vehicle.engine}</span>}
                {vehicle.transmission && <span>{vehicle.transmission}</span>}
              </div>
            </SlideUp>
            <SlideUp delay={0.3}>
              <div className="mt-8">
                <Link
                  href={`/vehiculos/${vehicle.slug}`}
                  className="btn-cta"
                >
                  <span className="btn-cta-inner">
                    Conocer {vehicle.model}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </SlideUp>
          </div>

          {/* Image */}
          <SlideUp delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-800">
              <VehicleImage
                src={{
                  corolla: "/img/CorollaConFondoVertical.webp",
                  "corolla-hybrid": "/img/CorollaConFondoVertical.webp",
                  "corolla-gr-sport": "/img/CorollaConFondoVertical.webp",
                  hilux: "/img/HiluxConFondoVertical.webp",
                  "land-cruiser-300": "/img/LandcruiserConFondoHorizontal.webp",
                  yaris: "/img/YarisConFondoVertical.webp",
                }[vehicle.slug] ?? vehicle.mainImage}
                alt={vehicle.model}
                priority
                className="rounded-2xl"
              />
            </div>
          </SlideUp>
        </div>
      </Container>
    </section>
  );
}
