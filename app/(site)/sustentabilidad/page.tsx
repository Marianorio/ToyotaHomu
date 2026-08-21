import Link from "next/link";
import {
  BookOpen,
  Leaf,
  Factory,
  Droplets,
  Sprout,
  Users,
  FileText,
  ArrowRight,
  Download,
  Eye,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionContainer, SectionHeader } from "@/components/ui/section";
import { ConversionBar } from "@/components/ui/conversion-bar";
import { SlideUp } from "@/components/ui/motion";
import { buttonVariants } from "@/components/ui/button";
import { FlipBook } from "@/components/sustentabilidad/flip-book";

export const metadata = {
  title: "Reportes de Sustentabilidad",
  description:
    "Compromiso ambiental y social de Toyota Formosa. Reportes anuales en formato libro digital con indicadores y objetivos.",
  alternates: {
    canonical: "/sustentabilidad",
  },
};

const PILLARS = [
  {
    icon: Leaf,
    title: "Ambiente",
    value: "−18 %",
    detail: "emisiones por vehiculo vs. 2021",
  },
  {
    icon: Droplets,
    title: "Agua",
    value: "−22 %",
    detail: "consumo en taller y lavado",
  },
  {
    icon: Factory,
    title: "Energia",
    value: "64 %",
    detail: "de energia de fuentes renovables",
  },
  {
    icon: Users,
    title: "Comunidad",
    value: "+340 h",
    detail: "de voluntariado en el ultimo anio",
  },
];

const ARCHIVE = [
  { year: "2024", pages: 48, title: "Reporte 2024", status: "Nuevo" },
  { year: "2023", pages: 44, title: "Reporte 2023", status: "Vigente" },
  { year: "2022", pages: 40, title: "Reporte 2022", status: "Archivo" },
  { year: "2021", pages: 36, title: "Reporte 2021", status: "Archivo" },
];

export default function SustentabilidadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sustentabilidad"
        title="Movemos el futuro con responsabilidad"
        description="Cada Toyota que entregamos es una oportunidad de hacerlo mejor: menos impacto, mas comunidad y objetivos claros."
        breadcrumbs={[{ label: "Sustentabilidad" }]}
        variant="dark"
      />

      {/* Pilares con numeros mono */}
      <section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <SlideUp key={p.title} delay={i * 0.06}>
                <div className="text-center">
                  <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <p className="mt-3 font-mono text-3xl font-bold tracking-tight text-white tabular-nums">
                    {p.value}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">{p.title}</p>
                  <p className="mt-1 text-caption text-zinc-400">{p.detail}</p>
                </div>
              </SlideUp>
            );
          })}
        </div>
      </section>

      {/* Libro — flip interactivo con react-pageflip */}
      <Section padding="lg">
        <SectionContainer>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Reporte anual"
                title="Un libro digital para leer con calma"
                description="El reporte completo como si lo tuvieras en las manos. Portada, indice y paginas que pasan con el gesto de un libro real."
              />
              <ul className="mt-6 space-y-3 text-body-lead text-muted-foreground">
                <li className="flex items-start gap-3">
                  <BookOpen className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                  Lectura pagina a pagina con efecto de pase realista y sombra.
                </li>
                <li className="flex items-start gap-3">
                  <Sprout className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                  Tu PDF de x paginas se integra sin cambiar el layout — cada pagina se vuelve una hoja.
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#libro" className={buttonVariants({ variant: "default", size: "lg" })}>
                  <Eye className="size-4" aria-hidden="true" />
                  Abrir libro
                </a>
                <Link href="#archivo" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Ver archivo
                </Link>
              </div>
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                Demo interactiva · 8 paginas ilustrativas · Reemplaza por tu PDF real
              </p>
            </div>

            <FlipBook />
          </div>
        </SectionContainer>
      </Section>

      {/* Archivo de reportes */}
      <Section padding="lg">
        <SectionContainer>
          <div id="archivo" className="scroll-mt-24">
            <SectionHeader
              eyebrow="Archivo"
              title="Todos los reportes"
              description="Cada edicion con su portada y cantidad de paginas. La descarga y el libro se habilitaran al integrar el PDF real."
            />
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ARCHIVE.map((report, i) => (
              <SlideUp key={report.year} delay={i * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card">
                  <div className="relative flex h-48 items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-800 p-6">
                    <div className="relative h-full w-28 rounded-lg border bg-white p-3 shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
                      <div className="h-1.5 w-full rounded bg-primary" aria-hidden="true" />
                      <p className="mt-3 font-serif text-sm font-bold leading-tight">
                        Reporte
                        <br />
                        {report.year}
                      </p>
                      <p className="mt-2 font-mono text-xs text-muted-foreground">{report.pages} pag.</p>
                      <FileText className="absolute bottom-3 right-3 size-4 text-zinc-300" aria-hidden="true" />
                    </div>
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-zinc-700 backdrop-blur-sm">
                      {report.status}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="text-sm font-bold">{report.title}</h3>
                    <p className="text-caption text-muted-foreground">{report.pages} paginas · PDF</p>
                    <div className="mt-auto flex gap-2">
                      <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground opacity-60">
                        <Eye className="size-3.5" aria-hidden="true" />
                        Ver libro
                      </span>
                      <span className="inline-flex items-center justify-center gap-1 rounded-lg border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground opacity-60">
                        <Download className="size-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </article>
              </SlideUp>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/contacto" className={buttonVariants({ variant: "outline" })}>
              Consultar por ediciones anteriores
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </SectionContainer>
      </Section>

      <ConversionBar />
    </>
  );
}