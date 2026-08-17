import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionContainer } from "@/components/ui/section";
import { ConversionBar } from "@/components/ui/conversion-bar";

export const metadata = {
  title: "Cotizar",
  description:
    "Solicitanos una cotización para el Toyota que más te interese.",
  alternates: {
    canonical: "/cotizar",
  },
};

export default function CotizarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cotización"
        title="Cotizá tu Toyota"
        description="Completá el formulario y te contactamos a la brevedad con una propuesta personalizada."
        breadcrumbs={[{ label: "Cotizar" }]}
        variant="dark"
      />

      <Section padding="lg">
        <SectionContainer size="narrow">
          <div className="rounded-2xl border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              Formulario de cotización — próximamente en FASE 8 (Conversión).
            </p>
          </div>
        </SectionContainer>
      </Section>

      <ConversionBar />
    </>
  );
}
