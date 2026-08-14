import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Gauge, Fuel, MapPin, MessageCircle, Shield, FileCheck, Wrench } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VehicleImage } from "@/components/vehicles/vehicle-image";
import { formatARS } from "@/lib/format";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type UsedVehicleDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: UsedVehicleDetailProps) {
  const { slug } = await params;
  const vehicle = await prisma.usedVehicle.findUnique({ where: { slug } });

  if (!vehicle) {
    return { title: "Vehículo no encontrado" };
  }

  return {
    title: `${vehicle.brand} ${vehicle.model} ${vehicle.year ?? ""} | Usados`,
    description: vehicle.description ?? `Vehículo usado ${vehicle.brand} ${vehicle.model} en Formosa.`,
  };
}

export default async function UsedVehicleDetail({
  params,
}: UsedVehicleDetailProps) {
  const { slug } = await params;

  const vehicle = await prisma.usedVehicle.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!vehicle) {
    notFound();
  }

  const mainImage = vehicle.images[0]?.url ?? null;
  const whatsappHref = generateWhatsAppUrl(
    `Hola, me interesa el ${vehicle.brand} ${vehicle.model} ${vehicle.year ?? ""} que vi en la sección de usados.`,
  );

  const specs = [
    { icon: Calendar, label: "Año", value: vehicle.year?.toString() ?? "N/A" },
    { icon: Gauge, label: "Kilómetros", value: vehicle.mileage ? `${vehicle.mileage.toLocaleString("es-AR")} km` : "N/A" },
    { icon: Fuel, label: "Combustible", value: vehicle.fuelType ?? "N/A" },
    { icon: Wrench, label: "Transmisión", value: vehicle.transmission ?? "N/A" },
    { icon: MapPin, label: "Ubicación", value: vehicle.location ?? "Formosa" },
    { icon: Shield, label: "Estado", value: vehicle.condition ?? "N/A" },
  ];

  return (
    <>
      {/* Back link */}
      <div className="border-b bg-zinc-950">
        <Container className="py-4">
          <Link
            href="/usados"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Volver a usados
          </Link>
        </Container>
      </div>

      {/* Hero image */}
      <section className="relative bg-zinc-950">
        <div className="relative aspect-[16/8] w-full overflow-hidden bg-zinc-800">
          <VehicleImage
            src={mainImage}
            alt={`${vehicle.brand} ${vehicle.model}`}
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Badges */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {vehicle.featured && (
              <Badge className="bg-primary text-white text-sm px-3 py-1">Destacado</Badge>
            )}
            {vehicle.condition && (
              <Badge variant="secondary" className="text-sm px-3 py-1">{vehicle.condition}</Badge>
            )}
            {!vehicle.available && (
              <Badge variant="secondary" className="text-sm px-3 py-1">Vendido</Badge>
            )}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-zinc-950 py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            {/* Left: Info */}
            <div>
              {/* Brand + Model */}
              <span className="text-eyebrow text-red-400">{vehicle.brand}</span>
              <h1 className="mt-2 text-h1 text-white">{vehicle.model}</h1>

              {/* Price */}
              <p className="mt-4 text-3xl font-bold text-white">
                {formatARS(vehicle.price?.toString())}
              </p>

              {/* Description */}
              {vehicle.description && (
                <p className="mt-6 max-w-2xl text-body-lead text-zinc-300">
                  {vehicle.description}
                </p>
              )}

              {/* Specs grid */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-white">Especificaciones</h2>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {specs.map((spec) => {
                    const Icon = spec.icon;
                    return (
                      <div
                        key={spec.label}
                        className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-4"
                      >
                        <Icon className="size-5 text-primary" aria-hidden="true" />
                        <p className="mt-2 text-xs text-zinc-500">{spec.label}</p>
                        <p className="mt-1 text-sm font-semibold text-white">{spec.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Image gallery */}
              {vehicle.images.length > 1 && (
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-white">Galería</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {vehicle.images.slice(1).map((img) => (
                      <div
                        key={img.id}
                        className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-800"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt ?? `${vehicle.brand} ${vehicle.model}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust badges */}
              <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-800/30 p-6">
                <h2 className="text-lg font-bold text-white">¿Por qué elegir este usado?</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {[
                    { icon: Shield, title: "Revisión 100 puntos", desc: "Inspección exhaustiva de calidad." },
                    { icon: FileCheck, title: "Documentación al día", desc: "Papeles listos para transferir." },
                    { icon: Wrench, title: "Garantía oficial", desc: "Respaldado por Toyota." },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex flex-col items-center text-center gap-2">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="size-5" aria-hidden="true" />
                        </div>
                        <h3 className="text-sm font-bold text-white">{item.title}</h3>
                        <p className="text-xs text-zinc-400">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: CTA sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6">
                <h3 className="text-lg font-bold text-white">¿Te interesa?</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Contactanos para más información o para agendar una visita.
                </p>

                <div className="mt-6 space-y-3">
                  <Link
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "w-full gap-2"
                    )}
                  >
                    <MessageCircle className="size-4" />
                    Consultar por WhatsApp
                  </Link>
                  <Link
                    href="/cotizar"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "w-full border-zinc-600 text-black hover:bg-zinc-800 hover:text-white"
                    )}
                  >
                    Cotizar este vehículo
                  </Link>
                </div>

                {/* Quick info */}
                <div className="mt-6 space-y-3 border-t border-zinc-700 pt-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Año</span>
                    <span className="font-semibold text-white">{vehicle.year ?? "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Kilómetros</span>
                    <span className="font-semibold text-white">
                      {vehicle.mileage ? `${vehicle.mileage.toLocaleString("es-AR")} km` : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Combustible</span>
                    <span className="font-semibold text-white">{vehicle.fuelType ?? "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Transmisión</span>
                    <span className="font-semibold text-white">{vehicle.transmission ?? "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
