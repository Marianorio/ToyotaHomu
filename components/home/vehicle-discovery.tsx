import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SlideUp } from "@/components/ui/motion";

export function WhyChooseToyota() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Logo */}
          <SlideUp>
            <div className="relative h-48 w-48 sm:h-64 sm:w-64 lg:h-80 lg:w-80">
              <Image
                src="/img/toyotaLogo.webp"
                alt="Logo Toyota"
                fill
                className="object-contain"
                priority
              />
            </div>
          </SlideUp>

          {/* Quote */}
          <SlideUp delay={0.15}>
            <div className="max-w-xl text-center lg:text-left">
              <blockquote className="text-2xl font-medium italic leading-relaxed text-black sm:text-3xl lg:text-4xl">
                "El éxito no se logra con lo que se sabe, sino con lo que se aprende cada día."
              </blockquote>
              <p className="mt-6 text-lg text-zinc-400">
                — Kiichiro Toyoda, Fundador de Toyota
              </p>
            </div>
          </SlideUp>
        </div>
      </Container>
    </section>
  );
}
