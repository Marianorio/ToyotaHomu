import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SlideUp } from "@/components/ui/motion";

export function TestDrive() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <SlideUp>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
              <Image
                src="/img/YarisConFondoVertical.webp"
                alt="Experiencia de prueba de manejo"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </SlideUp>

          {/* Text */}
          <div>
            <SlideUp delay={0.1}>
              <span className="text-eyebrow text-primary">Test Drive</span>
            </SlideUp>
            <SlideUp delay={0.15}>
              <h2 className="mt-3 text-h2">Sentí la diferencia</h2>
            </SlideUp>
            <SlideUp delay={0.2}>
              <p className="mt-4 max-w-md text-body-lead text-muted-foreground">
                Elegí un modelo y solicitá tu test drive. La mejor manera
                de conocer tu próximo Toyota es manejarlo.
              </p>
            </SlideUp>
            <SlideUp delay={0.25}>
              <div className="mt-8">
                <Link
                  href="/test-drive"
                  className="btn-cta"
                >
                  <span className="btn-cta-inner">Solicitar test drive</span>
                </Link>
              </div>
            </SlideUp>
          </div>
        </div>
      </Container>
    </section>
  );
}
