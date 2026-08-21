import { Scale, Tag, Wallet, Car, Globe, Lock } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso del sitio y servicios de la Concesionaria Toyota Formosa.",
  alternates: {
    canonical: "/terminos",
  },
};

const SECTIONS = [
  {
    icon: Scale,
    title: "1. Objeto",
    paragraphs: [
      "Estos términos regulan el uso del sitio de la Concesionaria Toyota Formosa y de los servicios que ofrecemos en forma presencial y digital.",
      "Al navegar el sitio o interactuar con nuestros canales se entiende que aceptás estas condiciones. En este proyecto de demostración son ilustrativas y no constituyen obligaciones reales.",
    ],
  },
  {
    icon: Tag,
    title: "2. Cotizaciones y precios",
    paragraphs: [
      "Los valores publicados son orientativos y pueden variar según el día, la versión, la disponibilidad y las condiciones de financiación vigentes.",
      "La cotización confirmada por escrito por un asesor es la única que tiene carácter de oferta. Cualquier otro valor mostrado se considera de referencia.",
    ],
  },
  {
    icon: Wallet,
    title: "3. Financiación",
    paragraphs: [
      "Los planes de pago, tasas y montos son demostrativos y no constituyen una oferta financiera. Las condiciones reales se definen en la concesionaria con la documentación correspondiente.",
      "Antes de firmar, revisá con tu asesor el detalle de cuotas, intereses, seguros y gastos administrativos.",
    ],
  },
  {
    icon: Car,
    title: "4. Test drive y reservas",
    paragraphs: [
      "El test drive es gratuito y requiere licencia de conducir vigente y presentarse en horario acordado.",
      "La reserva de un turno no implica reserva del vehículo. La entrega y disponibilidad se confirman por separado.",
    ],
  },
  {
    icon: Globe,
    title: "5. Uso del sitio",
    paragraphs: [
      "Este es un sitio de demostración y portafolio: el contenido, imágenes y datos son ilustrativos.",
      "No debes usarlo para cargar información personal real o datos sensibles.",
    ],
  },
  {
    icon: Lock,
    title: "6. Propiedad intelectual y responsabilidad",
    paragraphs: [
      "Las marcas, nombres y logotipos pertenecen a sus respectivos dueños. Las imágenes de vehículos son ilustrativas.",
      "Toyota Formosa no se hace responsable por decisiones tomadas con la información aquí presentada.",
    ],
  },
];

export default function TerminosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Términos y Condiciones"
        description="Las reglas simples que gobiernan este sitio de demostración y nuestros servicios."
        breadcrumbs={[{ label: "Términos" }]}
        variant="dark"
      />

      <Section padding="lg">
        <Container>
          <p className="mx-auto mb-10 max-w-prose text-center">
            <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-1.5 font-mono text-xs text-zinc-300">
              Última actualización: 18 de mayo de 2026 · Versión demo
            </span>
          </p>

          <div className="mx-auto max-w-3xl space-y-6">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <section
                  key={s.title}
                  className="relative overflow-hidden rounded-2xl border bg-card p-6 sm:p-8"
                >
                  <span
                    className="pointer-events-none absolute -right-4 -top-6 font-serif text-[7rem] font-black leading-none text-foreground/[0.04]"
                    aria-hidden="true"
                  >
                    {s.title.split(".")[0]}
                  </span>
                  <div className="relative flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-h3">{s.title}</h2>
                      {s.paragraphs.map((p) => (
                        <p
                          key={p}
                          className="mt-3 text-body-lead leading-relaxed text-muted-foreground"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}

            <p className="rounded-2xl border border-dashed p-5 text-center text-small text-muted-foreground">
              ¿Tenés dudas sobre estas condiciones? Escribinos a{" "}
              <a
                href="mailto:info@toyotaformosa.com.ar"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                info@toyotaformosa.com.ar
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}