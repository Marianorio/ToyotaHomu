"use client";

import { useRef, useState, useCallback, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Leaf, Droplets, Factory, Users } from "lucide-react";

type FlipBookRef = {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    getCurrentPageIndex: () => number;
    getPageCount: () => number;
  };
};

const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; cover?: boolean }>(
  function Page({ children, cover = false }, ref) {
    return (
      <div
        ref={ref}
        className="flex h-full flex-col overflow-hidden bg-white"
        data-density={cover ? "hard" : "soft"}
      >
        <div className="flex h-full flex-col p-6 sm:p-7">{children}</div>
      </div>
    );
  },
);
Page.displayName = "Page";

export function FlipBook() {
  const bookRef = useRef<FlipBookRef>(null);
  const [page, setPage] = useState(0);

  const onFlip = useCallback((e: { data: number }) => {
    setPage(e.data);
  }, []);

  const total = 8;

  return (
    <div id="libro" className="mx-auto w-full max-w-[560px] scroll-mt-24">
      <div className="overflow-hidden rounded-2xl border bg-zinc-100 p-3 shadow-inner sm:p-4">
        {/* @ts-expect-error react-pageflip types mismatch with React 19 */}
        <HTMLFlipBook
          width={400}
          height={520}
          size="stretch"
          minWidth={280}
          maxWidth={560}
          minHeight={360}
          maxHeight={720}
          maxShadowOpacity={0.35}
          showCover
          mobileScrollSupport
          ref={bookRef as never}
          onFlip={onFlip as never}
          className="mx-auto"
          style={{ margin: "0 auto" }}
          drawShadow
          flippingTime={700}
          usePortrait={false}
          startZIndex={0}
          autoSize
          clickEventForward
          useMouseEvents
          swipeDistance={30}
        >
          <Page cover>
            <div className="h-1.5 w-full rounded bg-primary" aria-hidden="true" />
            <span className="mt-4 text-eyebrow text-primary">Toyota Formosa</span>
            <h3 className="mt-3 font-serif text-2xl font-bold leading-tight">
              Reporte de
              <br />
              Sustentabilidad
            </h3>
            <p className="mt-2 font-mono text-sm font-bold text-primary">2024</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Compromiso ambiental y social. Indicadores, objetivos y resultados del ultimo
              anio.
            </p>
            <div className="mt-auto flex items-center gap-2 border-t pt-5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Leaf className="size-4" aria-hidden="true" />
              </span>
              <span className="text-caption text-muted-foreground">48 paginas · Edicion anual</span>
            </div>
            <p className="mt-3 text-center font-mono text-[0.65rem] text-muted-foreground">
              Toca o arrastra para pasar pagina →
            </p>
          </Page>

          <Page>
            <p className="text-eyebrow text-primary">Indice</p>
            <h4 className="mt-2 text-h3">Contenido</h4>
            <ol className="mt-4 space-y-2.5 text-sm">
              <li className="flex justify-between border-b border-dashed pb-2">
                <span>Carta del Director</span>
                <span className="font-mono text-muted-foreground">03</span>
              </li>
              <li className="flex justify-between border-b border-dashed pb-2">
                <span>Pilar Ambiente</span>
                <span className="font-mono text-muted-foreground">04</span>
              </li>
              <li className="flex justify-between border-b border-dashed pb-2">
                <span>Pilar Agua y Energia</span>
                <span className="font-mono text-muted-foreground">05</span>
              </li>
              <li className="flex justify-between border-b border-dashed pb-2">
                <span>Pilar Comunidad</span>
                <span className="font-mono text-muted-foreground">06</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Objetivos 2025</span>
                <span className="font-mono text-muted-foreground">07</span>
              </li>
            </ol>
            <p className="mt-auto text-caption text-muted-foreground">
              Vista demo con paginas ilustrativas. Tu PDF real de x paginas se renderiza igual.
            </p>
          </Page>

          <Page>
            <p className="text-eyebrow text-primary">Carta</p>
            <h4 className="mt-2 font-serif text-xl font-bold leading-tight">
              Un compromiso que se mide en hechos
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              “Cada vehiculo que entregamos es una oportunidad de hacerlo mejor. Este reporte
              resume como reducimos impacto y como nos vinculamos con nuestra comunidad.”
            </p>
            <p className="mt-4 text-sm font-semibold">— Direccion Toyota Formosa</p>
            <div className="mt-auto rounded-xl bg-muted p-3 text-caption leading-relaxed text-muted-foreground">
              Este es contenido demo. Al integrar tu PDF, cada pagina mantiene texto seleccionable si
              usas imagenes + capa de texto.
            </div>
          </Page>

          <Page>
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <Leaf className="size-4" aria-hidden="true" />
              </span>
              <span className="text-eyebrow text-emerald-700">Pilar Ambiente</span>
            </div>
            <h4 className="mt-3 text-h3">−18 % emisiones</h4>
            <p className="text-sm text-muted-foreground">por vehiculo vs. 2021</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Optimizacion de logistica, compensacion y talleres mas eficientes. El objetivo 2025 es
              −25 %.
            </p>
            <div className="mt-auto grid grid-cols-2 gap-3">
              <div className="rounded-xl border bg-muted/50 p-3 text-center">
                <p className="font-mono text-lg font-bold">42 t</p>
                <p className="text-caption text-muted-foreground">CO₂ compensadas</p>
              </div>
              <div className="rounded-xl border bg-muted/50 p-3 text-center">
                <p className="font-mono text-lg font-bold">100 %</p>
                <p className="text-caption text-muted-foreground">residuos clasificados</p>
              </div>
            </div>
          </Page>

          <Page>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border p-3">
                <Droplets className="size-4 text-sky-600" aria-hidden="true" />
                <p className="mt-2 font-mono text-lg font-bold">−22 %</p>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Agua</p>
                <p className="mt-1 text-caption leading-relaxed text-muted-foreground">
                  Consumo en taller y lavado
                </p>
              </div>
              <div className="rounded-xl border p-3">
                <Factory className="size-4 text-zinc-600" aria-hidden="true" />
                <p className="mt-2 font-mono text-lg font-bold">64 %</p>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Energia</p>
                <p className="mt-1 text-caption leading-relaxed text-muted-foreground">
                  De fuentes renovables
                </p>
              </div>
            </div>
            <h4 className="mt-5 text-h3">Agua y energia</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Circuitos cerrados de lavado y luminaria LED en toda la concesionaria.
            </p>
            <p className="mt-auto text-caption text-muted-foreground">
              Pag. 05 · El PDF real conserva estos graficos como imagenes de alta resolucion.
            </p>
          </Page>

          <Page>
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                <Users className="size-4" aria-hidden="true" />
              </span>
              <span className="text-eyebrow text-violet-700">Pilar Comunidad</span>
            </div>
            <h4 className="mt-3 text-h3">+340 h de voluntariado</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Talleres en escuelas, colectas y acompaniamiento a organizaciones locales.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <li>· 12 escuelas visitadas</li>
              <li>· 850 kg de donaciones</li>
              <li>· Programa Jovenes al Volante</li>
            </ul>
            <p className="mt-auto text-caption text-muted-foreground">Pag. 06</p>
          </Page>

          <Page>
            <p className="text-eyebrow text-primary">Objetivos 2025</p>
            <h4 className="mt-2 text-h3">Lo que sigue</h4>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                Alcanzar −25 % de emisiones por vehiculo.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                100 % de energia renovable en operacion.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                Ampliar voluntariado a 500 h anuales.
              </li>
            </ul>
            <div className="mt-auto rounded-xl bg-primary/5 p-3 text-center">
              <p className="text-sm font-semibold">Gracias por leer este reporte</p>
              <p className="mt-1 text-caption text-muted-foreground">Toyota Formosa · Formosa, Argentina</p>
            </div>
          </Page>

          <Page cover>
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Leaf className="size-6" aria-hidden="true" />
              </div>
              <p className="mt-4 text-eyebrow text-primary">Toyota Formosa</p>
              <p className="mt-2 font-serif text-lg font-bold">Nos vemos en la proxima edicion</p>
              <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-muted-foreground">
                Este libro es una demo interactiva. Tu PDF de x paginas se integra sin cambiar el
                layout.
              </p>
              <p className="mt-6 font-mono text-xs text-muted-foreground">www.toyotaformosa.com.ar</p>
            </div>
          </Page>
        </HTMLFlipBook>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => (bookRef.current?.pageFlip() as unknown as { flipPrev: () => void })?.flipPrev?.()}
          className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
          aria-label="Pagina anterior"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Anterior
        </button>
        <span className="font-mono text-xs text-muted-foreground">
          {String(page + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => (bookRef.current?.pageFlip() as unknown as { flipNext: () => void })?.flipNext?.()}
          className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
          aria-label="Pagina siguiente"
        >
          Siguiente
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-2 text-center font-mono text-xs text-muted-foreground">
        Usa las flechas, arrastra la esquina o toca la pagina para pasar
      </p>
    </div>
  );
}
