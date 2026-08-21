import { Lock, FileText, Eye, Database, MailCheck, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Política de Privacidad",
  description:
    "Conocé cómo recopilamos, usamos y protegemos tus datos personales en la Concesionaria Toyota Formosa.",
  alternates: {
    canonical: "/privacidad",
  },
};

const SECTIONS = [
  {
    id: "informacion",
    icon: Database,
    title: "1. Información que recopilamos",
    paragraphs: [
      "Al navegar el sitio, participar de promociones o completar formularios podemos recopilar datos de contacto: nombre, correo electrónico, teléfono y cualquier información que nos compartas voluntariamente.",
      "También registramos datos de navegación agregados (secciones visitadas, páginas más consultadas) con fines estadísticos y de mejora de la experiencia.",
    ],
  },
  {
    id: "uso",
    icon: FileText,
    title: "2. Uso de la información",
    paragraphs: [
      "Usamos tus datos para responder consultas, preparar cotizaciones, coordinar test drives y mantenerte al tanto de novedades, promociones o recordatorios de servicio.",
      "Solo contactamos por los canales que hayas habilitado. En cualquier momento podés pedir dejar de recibir nuestras comunicaciones.",
    ],
  },
  {
    id: "compartir",
    icon: Eye,
    title: "3. Compartir y comunicación",
    paragraphs: [
      "No vendemos ni cedemos tus datos a terceros para fines publicitarios. Solo los compartimos con los equipos internos necesarios para atender tu consulta.",
      "Las comunicaciones que nos lleguen por formulario se procesan de forma interna y quedan disponibles para el equipo comercial y de venta.",
    ],
  },
  {
    id: "seguridad",
    icon: Lock,
    title: "4. Almacenamiento y seguridad",
    paragraphs: [
      "Aplicamos medidas razonables para proteger la información que nos confiás: control de accesos, registros de auditoría y menores privilegios posibles.",
      "En este sitio de demostración, los datos se almacenan en una base local y pueden reiniciarse en cualquier momento. No deben cargarse datos reales ni sensibles.",
    ],
  },
  {
    id: "tus-derechos",
    icon: MailCheck,
    title: "5. Tus derechos",
    paragraphs: [
      "Podés solicitar acceso, rectificación o eliminación de tus datos en cualquier momento.",
      "Para ejercer estos derechos escribinos a info@toyotaformosa.com.ar y te responderemos a la brevedad.",
    ],
  },
  {
    id: "cambios",
    title: "6. Cambios en esta política",
    paragraphs: [
      "Podemos actualizar esta política para reflejar cambios legales o de funcionamiento. La versión vigente siempre estará disponible en esta página.",
    ],
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Política de Privacidad"
        description="Transparencia sobre cómo tratamos la información que nos confiás al visitar nuestro sitio."
        breadcrumbs={[{ label: "Privacidad" }]}
      />

      {/* Documento con TOC sticky */}
      <Section padding="lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
            {/* TOC */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-eyebrow text-muted-foreground">Índice</p>
              <nav className="mt-4 space-y-1" aria-label="Secciones de privacidad">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {s.title.replace(/^\d+\.\s*/, "")}
                  </a>
                ))}
              </nav>
              <p className="mt-6 rounded-xl border bg-muted/50 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                Última actualización: 18 de mayo de 2026 · Documento de demostración
              </p>
            </aside>

            {/* Cláusulas */}
            <article className="max-w-prose space-y-12">
              <p className="text-body-lead text-muted-foreground">
                En la Concesionaria Toyota Formosa tratamos tus datos con respeto y sentido común.
                Esta política explica qué recopilamos, para qué lo usamos y qué derechos tenés.
              </p>

              {SECTIONS.map((s) =>
                s.icon ? (
                  <PrivacySection key={s.id} {...s} />
                ) : (
                  <section key={s.id} id={s.id} className="scroll-mt-24 border-t border-border pt-8">
                    <h2 className="text-h2">{s.title}</h2>
                    {s.paragraphs.map((p) => (
                      <p key={p} className="mt-4 text-body-lead leading-relaxed text-muted-foreground">
                        {p}
                      </p>
                    ))}
                  </section>
                ),
              )}

              <p className="rounded-2xl border border-border bg-muted/40 p-5 text-small text-muted-foreground">
                Este sitio forma parte de un proyecto de demostración y portafolio. La información
                volcada aquí es ilustrativa: no recopilamos datos reales ni es una política legal
                definitiva.
              </p>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}

function PrivacySection({
  id,
  icon: Icon,
  title,
  paragraphs,
}: {
  id: string;
  icon?: LucideIcon;
  title: string;
  paragraphs: string[];
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-8">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-4" aria-hidden="true" />
          </div>
        )}
        <h2 className="text-h2">{title}</h2>
      </div>
      {paragraphs.map((p) => (
        <p key={p} className="mt-4 text-body-lead leading-relaxed text-muted-foreground">
          {p}
        </p>
      ))}
    </section>
  );
}