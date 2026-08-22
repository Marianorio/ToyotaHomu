import * as React from "react";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SlideUp, Reveal, Scale } from "@/components/ui/motion";

export function FinancingPreview() {
  return (
    <section className="bg-zinc-900 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div>
            <SlideUp>
              <span className="text-eyebrow text-red-400">Financiación</span>
            </SlideUp>
            <Reveal delay={0.1}>
              <h2 className="mt-3 text-h2 text-white">
                Encontrá una forma de llegar a tu próximo Toyota
              </h2>
            </Reveal>
            <SlideUp delay={0.2}>
              <p className="mt-4 max-w-md text-body-lead text-zinc-300">
                Planes de financiación flexibles pensados para vos.
                Simulá tu cuota y descubrí cuánto podrías pagar.
              </p>
            </SlideUp>
            <SlideUp delay={0.25}>
              <p className="mt-2 text-sm text-zinc-500">
                Datos ilustrativos — Demo.
              </p>
            </SlideUp>
            <SlideUp delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/financiacion"
                  className="btn-cta"
                >
                  <span className="btn-cta-inner">Ver financiación</span>
                </Link>
                <Link
                  href="/financiacion#simulador"
                  className="btn-cta"
                    style={{
                      "--btn-cta-gradient": "linear-gradient(32deg, #52525b, #71717a, #52525b, #71717a)",
                      "--btn-cta-inner-bg": "rgba(255, 255, 255, 1)",
                      "--btn-cta-text": "#000",
                      "--btn-cta-hover-text": "white",
                    } as React.CSSProperties}
                >
                  <span className="btn-cta-inner">
                    <Calculator className="size-4" aria-hidden="true" />
                    Simular cuota
                  </span>
                </Link>
              </div>
            </SlideUp>
          </div>

          {/* Preview card */}
          <Scale delay={0.18}>
            <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-8 shadow-2xl transition-all hover:border-zinc-600 hover:shadow-primary/10">
              <h3 className="text-lg font-semibold text-white">
                ¿Querés saber cuánto podrías pagar?
              </h3>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm text-zinc-400">
                    Vehículo
                  </label>
                  <div className="rounded-lg border border-zinc-600 bg-zinc-700/50 px-4 py-2.5 text-sm text-zinc-300">
                    Seleccionar…
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-zinc-400">
                    Anticipo
                  </label>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                    <div className="h-full w-1/3 rounded-full bg-primary" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-zinc-400">
                    Cuotas
                  </label>
                  <div className="rounded-lg border border-zinc-600 bg-zinc-700/50 px-4 py-2.5 text-sm text-zinc-300">
                    48
                  </div>
                </div>
                <Link
                  href="/financiacion#simulador"
                  className="btn-cta w-full"
                >
                  <span className="btn-cta-inner justify-center">
                    Simular
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </div>
          </Scale>
        </div>
      </Container>
    </section>
  );
}
