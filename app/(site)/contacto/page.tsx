import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionContainer } from "@/components/ui/section";
import { ConversionBar } from "@/components/ui/conversion-bar";

export const metadata = {
  title: "Contacto",
  description:
    "Contactanos por consultas, cotizaciones o solicitudes de test drive.",
  alternates: {
    canonical: "/contacto",
  },
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos"
        description="¿Tenés alguna consulta? Completá el formulario o contactanos directamente."
        breadcrumbs={[{ label: "Contacto" }]}
      />

      <Section padding="lg">
        <SectionContainer size="narrow">
          <div className="rounded-2xl border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              Formulario de contacto — próximamente en FASE 8 (Conversión).
            </p>
          </div>
        </SectionContainer>
      </Section>

      <ConversionBar />
    </>
  );
}
