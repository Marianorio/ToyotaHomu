import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { SlideUp } from "@/components/ui/motion";

export function FinalCTA() {
  return (
    <section className="bg-primary py-16 pb-28 sm:py-20 sm:pb-28 lg:py-24">
      <Container>
        <div className="flex flex-col items-center text-center">
          <SlideUp>
            <h2 className="text-h2 text-white">
              ¿Listo para encontrar tu próximo Toyota?
            </h2>
          </SlideUp>
          <SlideUp delay={0.1}>
            <p className="mt-3 max-w-lg text-body-lead text-white/80">
              Explorá nuestra gama, cotizá y hacete con el tuyo.
            </p>
          </SlideUp>
          <SlideUp delay={0.2}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/vehiculos"
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                  className:
                    "rounded-full bg-gray px-6 text-base font-bold tracking-wide text-black shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-[0_16px_30px_rgba(0,0,0,0.18)]",
                })}
              >
                Ver vehículos
              </Link>
              <Link
                href="/cotizar"
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                  className:
                    "rounded-full border border-white/80 bg-transparent px-6 text-base font-bold tracking-wide text-white shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 hover:shadow-[0_16px_30px_rgba(0,0,0,0.16)]",
                })}
              >
                Cotizar
              </Link>
            </div>
          </SlideUp>
        </div>
      </Container>
    </section>
  );
}
