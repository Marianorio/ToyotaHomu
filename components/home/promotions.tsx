import Link from "next/link";
import { Tag, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

type Promotion = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  discount?: string | null;
  validUntil?: Date | null;
  vehicle?: { model: string } | null;
};

type PromotionsProps = {
  promotions: Promotion[];
};

export function Promotions({ promotions }: PromotionsProps) {
  if (promotions.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow="Ofertas"
          title="Promociones"
          description="Aprovechá las mejores condiciones para tu próximo Toyota."
          action={{ label: "Ver promociones", href: "/promociones" }}
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {promotions.slice(0, 3).map((promo) => (
            <Link
              key={promo.id}
              href={`/promociones#${promo.slug}`}
              className="group rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <Tag className="size-5 text-primary" aria-hidden="true" />
                {promo.vehicle && (
                  <Badge variant="secondary">{promo.vehicle.model}</Badge>
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{promo.title}</h3>
              {promo.description && (
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {promo.description}
                </p>
              )}
              {promo.discount && (
                <p className="mt-3 text-sm font-medium text-primary">
                  {promo.discount}
                </p>
              )}
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Ver detalles <ArrowRight className="size-3.5" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
