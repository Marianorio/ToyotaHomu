"use client";

import Link from "next/link";
import { Wrench, Settings, Package, ShoppingCart, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section";
import { SlideUp, Reveal, StaggerGroup, StaggerItem, Scale } from "@/components/ui/motion";

const services = [
  {
    icon: Settings,
    title: "Service oficial",
    description: "Mantenimiento planificado con repuestos originales.",
    featured: true,
  },
  {
    icon: Wrench,
    title: "Mantenimiento",
    description: "Revisiones y servicios programados.",
    featured: false,
  },
  {
    icon: Package,
    title: "Repuestos",
    description: "Repuestos originales Toyota.",
    featured: false,
  },
  {
    icon: ShoppingCart,
    title: "Accesorios",
    description: "Accesorios para tu vehículo.",
    featured: false,
  },
];

export function AfterSales() {
  const featured = services.find((s) => s.featured);
  const secondary = services.filter((s) => !s.featured);

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Postventa"
            title="Tu Toyota, siempre en buenas manos"
            description="Servicio oficial, repuestos originales y atención personalizada."
            action={{ label: "Conocé nuestra postventa", href: "/postventa" }}
          />
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Featured service */}
          {featured && (
            <Scale className="lg:col-span-1">
              <div className="flex h-full flex-col rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/10">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <featured.icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{featured.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {featured.description}
                </p>
                <Link
                  href="/postventa"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Más información <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </Scale>
          )}

          {/* Secondary services */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <StaggerGroup className="grid gap-6 sm:grid-cols-2">
              {secondary.map((s) => (
                <StaggerItem key={s.title}>
                  <div className="flex items-start gap-4 rounded-2xl border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-primary/10">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <s.icon className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{s.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
