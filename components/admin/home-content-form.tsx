"use client";

import { AsyncForm } from "@/components/admin/async-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateHomePage } from "@/actions/settings";

type HomePageData = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaText?: string | null;
  heroImage?: string | null;
  heroVideo?: string | null;
  featuredVehicleIds?: string;
  trendingVehicleIds?: string;
  featuredPromotionIds?: string;
  bannerIds?: string;
  social?: string;
};

function Field({
  label,
  htmlFor,
  children,
  className,
  hint,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
  hint?: string;
}) {
  return (
    <div className={`grid gap-1.5 ${className ?? ""}`}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function HomeContentForm({ initial }: { initial?: HomePageData }) {
  return (
    <AsyncForm action={updateHomePage} submitLabel="Guardar contenido">
      <Card>
        <CardHeader>
          <CardTitle>Hero de portada</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Título" htmlFor="heroTitle">
            <Input id="heroTitle" name="heroTitle" defaultValue={initial?.heroTitle} required />
          </Field>
          <Field label="Subtítulo" htmlFor="heroSubtitle">
            <Input id="heroSubtitle" name="heroSubtitle" defaultValue={initial?.heroSubtitle} />
          </Field>
          <Field label="Texto del botón" htmlFor="heroCtaText">
            <Input id="heroCtaText" name="heroCtaText" defaultValue={initial?.heroCtaText ?? ""} />
          </Field>
          <Field label="Imagen de fondo" htmlFor="heroImage">
            <Input id="heroImage" name="heroImage" defaultValue={initial?.heroImage ?? ""} />
          </Field>
          <Field label="Video de fondo (URL)" htmlFor="heroVideo">
            <Input id="heroVideo" name="heroVideo" defaultValue={initial?.heroVideo ?? ""} />
          </Field>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Selección de contenido</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field
            label="IDs de vehículos destacados"
            htmlFor="featuredVehicleIds"
            hint="Separados por coma. Dejá [] para selección automática."
          >
            <Input
              id="featuredVehicleIds"
              name="featuredVehicleIds"
              defaultValue={initial?.featuredVehicleIds ?? "[]"}
            />
          </Field>
          <Field
            label="IDs de vehículos tendencia"
            htmlFor="trendingVehicleIds"
            hint="Separados por coma."
          >
            <Input
              id="trendingVehicleIds"
              name="trendingVehicleIds"
              defaultValue={initial?.trendingVehicleIds ?? "[]"}
            />
          </Field>
          <Field
            label="IDs de promociones destacadas"
            htmlFor="featuredPromotionIds"
          >
            <Input
              id="featuredPromotionIds"
              name="featuredPromotionIds"
              defaultValue={initial?.featuredPromotionIds ?? "[]"}
            />
          </Field>
          <Field label="IDs de banners" htmlFor="bannerIds">
            <Input
              id="bannerIds"
              name="bannerIds"
              defaultValue={initial?.bannerIds ?? "[]"}
            />
          </Field>
          <Field label="Redes sociales (JSON)" htmlFor="social" hint='Formato JSON, ej: {"instagram":"miperfil"}'>
            <Textarea
              id="social"
              name="social"
              defaultValue={initial?.social ?? "{}"}
              className="font-mono text-xs"
            />
          </Field>
        </CardContent>
      </Card>
    </AsyncForm>
  );
}