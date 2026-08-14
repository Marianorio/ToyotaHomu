import { Container } from "@/components/ui/container";
import { SlideUp } from "@/components/ui/motion";
import { isDemoMode } from "@/lib/demo";

export function Location() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Map placeholder */}
          <SlideUp>
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border bg-muted">
              <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
                <svg
                  viewBox="0 0 24 24"
                  className="size-12 opacity-30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span className="text-sm">
                  {isDemoMode
                    ? "Mapa placeholder — Demo"
                    : "Mapa interactivo"}
                </span>
              </div>
            </div>
          </SlideUp>

          {/* Info */}
          <div>
            <SlideUp delay={0.1}>
              <h2 className="text-h2">Encontranos en Formosa</h2>
            </SlideUp>
            <SlideUp delay={0.15}>
              <p className="mt-3 text-body-lead text-muted-foreground">
                Visitá nuestras instalaciones y conocé toda la gama de
                vehículos Toyota disponibles.
              </p>
            </SlideUp>
            <SlideUp delay={0.2}>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Dirección:</strong>{" "}
                  Calle Ejemplo 123, Formosa
                </p>
                <p>
                  <strong className="text-foreground">Horarios:</strong>{" "}
                  Lun a Vie 9:00 - 19:00 / Sáb 9:00 - 13:00
                </p>
              </div>
            </SlideUp>
            {isDemoMode && (
              <SlideUp delay={0.25}>
                <span className="mt-4 inline-block rounded bg-zinc-100 px-2 py-0.5 text-[10px] text-muted-foreground dark:bg-zinc-800">
                  Datos DEMO
                </span>
              </SlideUp>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
