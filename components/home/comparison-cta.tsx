import Link from "next/link";
import { Scale, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export function ComparisonCTA() {
  return (
    <section className="bg-muted py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Scale className="size-7" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-h2">¿No sabés cuál elegir?</h2>
          <p className="mt-3 max-w-lg text-body-lead text-muted-foreground">
            Compará modelos y encontrá el que mejor se adapte a tus necesidades.
          </p>
          {/* Placeholder: 3 vehicle slots */}
          <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex h-24 w-28 items-center justify-center rounded-xl border-2 border-dashed border-border sm:h-32 sm:w-40"
              >
                <span className="text-xs text-muted-foreground">
                  Vehículo {i}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/vehiculos"
            className={buttonVariants({ variant: "outline" }) + " mt-8"}
          >
            Comparar vehículos
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
