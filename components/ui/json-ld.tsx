/**
 * Inyector de datos estructurados (JSON-LD) para SEO.
 * Renderiza <script type="application/ld+json"> dentro del body.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}