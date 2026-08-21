import Image from "next/image";
import Link from "next/link";
import {
  CircleHelp,
  Search,
  MessageCircle,
  ShieldCheck,
  Wallet,
  Wrench,
  Car,
  FileText,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionContainer, SectionHeader } from "@/components/ui/section";
import { ConversionBar } from "@/components/ui/conversion-bar";
import { SlideUp } from "@/components/ui/motion";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Preguntas frecuentes",
  description:
    "Resolvé tus dudas sobre compra, financiacion, postventa y garantia en Toyota Formosa.",
  alternates: {
    canonical: "/preguntas-frecuentes",
  },
};

const CATEGORIES = [
  { id: "compra", label: "Compra", icon: Car },
  { id: "financiacion", label: "Financiacion", icon: Wallet },
  { id: "postventa", label: "Postventa", icon: Wrench },
  { id: "garantia", label: "Garantia", icon: ShieldCheck },
  { id: "documentacion", label: "Documentacion", icon: FileText },
];

const FAQS = [
  {
    category: "compra",
    q: "¿Como reservo mi Toyota?",
    a: "Elegi el modelo en el catalogo, pedi una cotizacion y coordina la reserva con tu asesor. La reserva se confirma por escrito y con sena segun version.",
  },
  {
    category: "compra",
    q: "¿Cuanto tarda la entrega?",
    a: "Depende de la version y disponibilidad. Tu asesor te confirma el plazo estimado al reservar y te mantiene al tanto hasta la entrega.",
  },
  {
    category: "compra",
    q: "¿Toman mi usado en parte de pago?",
    a: "Si. Tasamos tu usado en el dia y su valor se usa como anticipo. Coordinalo en la seccion de cotizacion o visitanos.",
  },
  {
    category: "financiacion",
    q: "¿Que planes de financiacion ofrecen?",
    a: "Trabajamos con planes en cuotas fijas, canje y financiacion directa. Las condiciones vigentes estan en la seccion de financiacion y se confirman con tu asesor.",
  },
  {
    category: "financiacion",
    q: "¿Puedo cambiar el anticipo o la cantidad de cuotas?",
    a: "Si, el simulador te permite probar distintos anticipos y plazos. La propuesta final se arma a medida con tu asesor.",
  },
  {
    category: "financiacion",
    q: "¿La tasa es fija?",
    a: "Los planes publicados son demostrativos. La tasa y condiciones reales dependen del plan y se informan por escrito antes de firmar.",
  },
  {
    category: "postventa",
    q: "¿Cada cuanto hago el service?",
    a: "Cada 15.000 km o 12 meses, lo que ocurra primero, segun el plan oficial Toyota.",
  },
  {
    category: "postventa",
    q: "¿Necesito turno para el taller?",
    a: "Si. Agendalo por telefono o WhatsApp y te asignamos el horario mas conveniente.",
  },
  {
    category: "garantia",
    q: "¿Que cubre la garantia?",
    a: "La garantia oficial cubre defectos de fabricacion segun manual. Repuestos originales y mano de obra certificada estan incluidos.",
  },
  {
    category: "documentacion",
    q: "¿Que necesito para retirar?",
    a: "DNI, licencia vigente y documentacion acordada en la reserva. Tu asesor te envia el checklist antes de la entrega.",
  },
];

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Centro de ayuda"
        title="Preguntas frecuentes"
        description="Todo lo que necesitas saber, en un solo lugar. Si no encontras tu respuesta, te contestamos enseguida."
        breadcrumbs={[{ label: "Preguntas frecuentes" }]}
        cta={{ label: "Hablar con un asesor", href: "/contacto" }}
      />

      {/* Buscador visual + chips */}
      <section className="border-b bg-muted/50">
        <div className="container-site py-6">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 shadow-sm">
              <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                aria-label="Buscar en preguntas frecuentes"
                placeholder="Busca por palabra clave — ej. garantia, cuotas, entrega"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                disabled
              />
              <span className="hidden rounded-full bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground sm:inline">
                Solo vista
              </span>
            </div>
          </div>
          <div className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {cat.label}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ agrupada */}
      <Section padding="lg">
        <SectionContainer size="narrow">
          <SectionHeader
            eyebrow="Respuestas rapidas"
            title="Lo mas consultado"
            description="Agrupamos las dudas por tema para que llegues mas rapido a lo que buscas."
          />

          <div className="mt-10 space-y-10">
            {CATEGORIES.map((cat) => {
              const items = FAQS.filter((f) => f.category === cat.id);
              if (items.length === 0) return null;
              const CatIcon = cat.icon;
              return (
                <section key={cat.id} id={cat.id} className="scroll-mt-28">
                  <div className="flex items-center gap-3 border-b pb-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CatIcon className="size-4" aria-hidden="true" />
                    </div>
                    <h2 className="text-h3">{cat.label}</h2>
                    <span className="ml-auto rounded-full bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground">
                      {items.length} preguntas
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {items.map((faq, i) => (
                      <SlideUp key={faq.q} delay={i * 0.03}>
                        <details className="group overflow-hidden rounded-2xl border bg-card open:shadow-md">
                          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                            <span className="flex gap-3">
                              <CircleHelp
                                className="mt-0.5 size-5 shrink-0 text-primary"
                                aria-hidden="true"
                              />
                              <span className="text-sm font-semibold leading-snug sm:text-base">
                                {faq.q}
                              </span>
                            </span>
                            <span className="mt-1 size-6 shrink-0 rounded-full border bg-muted text-muted-foreground transition-colors group-open:bg-primary group-open:text-white">
                              <span className="flex size-6 items-center justify-center text-sm leading-none group-open:hidden">
                                +
                              </span>
                              <span className="hidden size-6 items-center justify-center text-sm leading-none group-open:flex">
                                −
                              </span>
                            </span>
                          </summary>
                          <div className="border-t px-5 pb-5 pl-[3.25rem] pt-4 sm:px-6 sm:pb-6">
                            <p className="text-body-lead leading-relaxed text-muted-foreground">
                              {faq.a}
                            </p>
                          </div>
                        </details>
                      </SlideUp>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </SectionContainer>
      </Section>

      {/* CTA con imagen yaris */}
      <Section bg="muted" padding="lg">
        <SectionContainer>
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <SectionHeader
                eyebrow="¿No encontraste tu respuesta?"
                title="Hablemos"
                description="Escribinos y te respondemos en el dia. Por WhatsApp, telefono o formulario."
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contacto" className={buttonVariants({ variant: "default", size: "lg" })}>
                  Ir a contacto
                </Link>
                <Link href="/cotizar" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Pedir cotizacion
                </Link>
              </div>
              <p className="mt-4 flex items-center gap-2 text-small text-muted-foreground">
                <MessageCircle className="size-4" aria-hidden="true" />
                Tambien por WhatsApp, todos los dias habiles.
              </p>
            </div>
            <SlideUp>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-100 to-zinc-200 p-6">
                <Image
                  src="/img/yaris.png"
                  alt="Toyota Yaris ilustrativo de atencion al cliente"
                  width={1194}
                  height={685}
                  className="mx-auto w-full max-w-sm object-contain"
                />
                <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-white">
                  Estamos para ayudarte
                </span>
              </div>
            </SlideUp>
          </div>
        </SectionContainer>
      </Section>

      <ConversionBar />
    </>
  );
}