import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SlideUp, Reveal, Scale } from "@/components/ui/motion";

export function TradeIn() {
  return (
    <section className="relative overflow-hidden bg-zinc-900 py-16 sm:py-20 lg:py-24">
      {/* Background image */}
      <Image
        src="/img/HiluxConFondoVertical.webp"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover opacity-15"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900/70 to-zinc-900" />

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <Scale>
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ArrowRightLeft className="size-7" aria-hidden="true" />
            </div>
          </Scale>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-h2 text-white">
              Tu usado puede acercarte a tu próximo Toyota
            </h2>
          </Reveal>
          <SlideUp delay={0.14}>
            <p className="mt-3 max-w-lg text-body-lead text-zinc-300">
              Tasá tu vehículo actual y descubrí cuánto podés aplicar como parte de tu nueva compra.
            </p>
          </SlideUp>
          <SlideUp delay={0.18}>
            <p className="mt-2 text-sm text-zinc-500">Datos ilustrativos — Demo.</p>
          </SlideUp>
          <SlideUp delay={0.24}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/usados"
                className="btn-cta"
              >
                <span className="btn-cta-inner">Quiero tasar mi usado</span>
              </Link>
              <Link
                href="/usados"
                className="btn-cta"
                  style={{
                    "--btn-cta-gradient": "linear-gradient(32deg, #52525b, #71717a, #52525b, #71717a)",
                    "--btn-cta-inner-bg": "rgba(255, 255, 255, 1)",
                    "--btn-cta-text": "#000",
                    "--btn-cta-hover-text": "white",
                  } as React.CSSProperties}
              >
                <span className="btn-cta-inner">Ver usados</span>
              </Link>
            </div>
          </SlideUp>
        </div>
      </Container>
    </section>
  );
}
