"use client";

import Link from "next/link";
import { Scale, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { SlideUp, Reveal, StaggerGroup, StaggerItem, Scale as ScaleMotion } from "@/components/ui/motion";

export function ComparisonCTA() {
  return (
    <section className="bg-muted py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col items-center text-center">
          <ScaleMotion>
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Scale className="size-7" aria-hidden="true" />
            </div>
          </ScaleMotion>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-h2">¿No sabés cuál elegir?</h2>
          </Reveal>
          <SlideUp delay={0.12}>
            <p className="mt-3 max-w-lg text-body-lead text-muted-foreground">
              Compará modelos y encontrá el que mejor se adapte a tus necesidades.
            </p>
          </SlideUp>
          {/* Placeholder: 3 vehicle slots */}
          <StaggerGroup className="mt-8 grid grid-cols-3 gap-4 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <StaggerItem key={i}>
                <div className="flex h-24 w-28 items-center justify-center rounded-xl border-2 border-dashed border-border bg-card transition-all hover:border-primary/20 hover:bg-card sm:h-32 sm:w-40">
                  <span className="text-xs text-muted-foreground">Vehículo {i}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <SlideUp delay={0.2}>
            <Link
              href="/vehiculos"
              className={buttonVariants({ variant: "outline" }) + " mt-8"}
            >
              Comparar vehículos
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </SlideUp>
        </div>
      </Container>
    </section>
  );
}
