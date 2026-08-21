"use client";

import * as React from "react";
import { Eye, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FlipBook } from "@/components/sustentabilidad/flip-book";
import { Leaf, Droplets, Factory } from "lucide-react";

function PdfScrollView() {
  const pages = [
    {
      title: "Portada — Reporte 2024",
      content: (
        <>
          <div className="h-1.5 w-full rounded bg-primary" aria-hidden="true" />
          <span className="mt-4 text-eyebrow text-primary">Toyota Formosa</span>
          <h3 className="mt-3 font-serif text-2xl font-bold leading-tight">
            Reporte de Sustentabilidad 2024
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Compromiso ambiental y social. 48 páginas con indicadores, objetivos y resultados.
          </p>
        </>
      ),
    },
    {
      title: "Índice",
      content: (
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
            <span>Pilar Agua y Energía</span>
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
      ),
    },
    {
      title: "Carta — Un compromiso que se mide en hechos",
      content: (
        <p className="text-sm leading-relaxed text-muted-foreground">
          “Cada vehículo que entregamos es una oportunidad de hacerlo mejor. Este reporte resume cómo
          reducimos impacto y cómo nos vinculamos con nuestra comunidad.” — Dirección Toyota Formosa
        </p>
      ),
    },
    {
      title: "Pilar Ambiente — −18% emisiones",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <Leaf className="size-4" aria-hidden="true" />
            </span>
            <span className="text-eyebrow text-emerald-700">Ambiente</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Optimización de logística, compensación y talleres más eficientes. Objetivo 2025: −25%.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border bg-muted/50 p-3 text-center">
              <p className="font-mono text-lg font-bold">42 t</p>
              <p className="text-caption text-muted-foreground">CO₂ compensadas</p>
            </div>
            <div className="rounded-xl border bg-muted/50 p-3 text-center">
              <p className="font-mono text-lg font-bold">100 %</p>
              <p className="text-caption text-muted-foreground">residuos clasificados</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Pilar Agua y Energía",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border p-3">
              <Droplets className="size-4 text-sky-600" aria-hidden="true" />
              <p className="mt-2 font-mono text-lg font-bold">−22 %</p>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Agua</p>
            </div>
            <div className="rounded-xl border p-3">
              <Factory className="size-4 text-zinc-600" aria-hidden="true" />
              <p className="mt-2 font-mono text-lg font-bold">64 %</p>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Energía</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Circuitos cerrados de lavado y luminaria LED en toda la concesionaria.
          </p>
        </div>
      ),
    },
    {
      title: "Pilar Comunidad — +340 h voluntariado",
      content: (
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>· 12 escuelas visitadas</li>
          <li>· 850 kg de donaciones</li>
          <li>· Programa Jóvenes al Volante</li>
        </ul>
      ),
    },
    {
      title: "Objetivos 2025",
      content: (
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>· Alcanzar −25% de emisiones por vehículo.</li>
          <li>· 100% de energía renovable en operación.</li>
          <li>· Ampliar voluntariado a 500 h anuales.</li>
        </ul>
      ),
    },
    {
      title: "Cierre",
      content: (
        <p className="text-sm leading-relaxed text-muted-foreground">
          Gracias por leer este reporte. Toyota Formosa · Formosa, Argentina — www.toyotaformosa.com.ar
        </p>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {pages.map((p, i) => (
        <div key={p.title} className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-sm font-bold">{p.title}</h4>
            <span className="font-mono text-xs text-muted-foreground">
              {String(i + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
            </span>
          </div>
          <div className="pt-4">{p.content}</div>
        </div>
      ))}
    </div>
  );
}

export function ReportActions() {
  const [openBook, setOpenBook] = React.useState(false);
  const [openPdf, setOpenPdf] = React.useState(false);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg" onClick={() => setOpenBook(true)}>
          <Eye className="size-4" aria-hidden="true" />
          Abrir libro
        </Button>
        <Button variant="outline" size="lg" onClick={() => setOpenPdf(true)}>
          <FileText className="size-4" aria-hidden="true" />
          Ver archivo
        </Button>
      </div>
      <p className="mt-3 font-mono text-xs text-muted-foreground">
        Libro: vista interactiva en pantalla grande · Archivo: vista PDF normal en scroll
      </p>

      {/* Dialog — Libro en pantalla grande */}
      <Dialog open={openBook} onOpenChange={setOpenBook}>
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-hidden bg-zinc-50 p-0 sm:max-w-5xl">
          <div className="flex items-center justify-between border-b bg-white px-6 py-4">
            <div>
              <DialogTitle>Reporte de Sustentabilidad 2024</DialogTitle>
              <DialogDescription>Vista libro · pantalla grande · arrastra o usa las flechas</DialogDescription>
            </div>
          </div>
          <div className="max-h-[75vh] overflow-auto bg-zinc-100 p-4 sm:p-6">
            <div className="mx-auto max-w-4xl">
              <FlipBook variant="fullscreen" />
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t bg-white px-6 py-3">
            <Button variant="outline" onClick={() => setOpenBook(false)}>
              Cerrar
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setOpenBook(false);
                setTimeout(() => setOpenPdf(true), 200);
              }}
            >
              <FileText className="size-4" aria-hidden="true" />
              Ver como PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog — Archivo PDF normal */}
      <Dialog open={openPdf} onOpenChange={setOpenPdf}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden bg-zinc-50 p-0 sm:max-w-3xl">
          <div className="flex items-center justify-between border-b bg-white px-6 py-4">
            <div>
              <DialogTitle>Reporte 2024 — Vista PDF</DialogTitle>
              <DialogDescription>Formato normal · scroll vertical · 8 páginas demo</DialogDescription>
            </div>
          </div>
          <div className="max-h-[70vh] overflow-auto bg-zinc-100 p-4 sm:p-6">
            <PdfScrollView />
          </div>
          <div className="flex items-center justify-between border-t bg-white px-6 py-3">
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Download className="size-4" aria-hidden="true" />
              Reemplaza con tu PDF real de x páginas
            </span>
            <Button variant="outline" onClick={() => setOpenPdf(false)}>
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
