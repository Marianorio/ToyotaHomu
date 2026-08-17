"use client";

import { AsyncForm } from "@/components/admin/async-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateSiteSettings } from "@/actions/settings";

type SiteSettingsData = {
  businessName?: string;
  legalName?: string | null;
  logoUrl?: string | null;
  faviconUrl?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  address?: string | null;
  hours?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  tiktok?: string | null;
  mapsUrl?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  legalText?: string | null;
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

export function SettingsForm({ initial }: { initial?: SiteSettingsData }) {
  return (
    <AsyncForm action={updateSiteSettings} submitLabel="Guardar configuración">
      <Card>
        <CardHeader>
          <CardTitle>Identidad y contacto</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Nombre comercial" htmlFor="businessName">
            <Input
              id="businessName"
              name="businessName"
              defaultValue={initial?.businessName}
              required
            />
          </Field>
          <Field label="Razón social" htmlFor="legalName">
            <Input id="legalName" name="legalName" defaultValue={initial?.legalName ?? ""} />
          </Field>
          <Field label="Logo (URL)" htmlFor="logoUrl">
            <Input id="logoUrl" name="logoUrl" defaultValue={initial?.logoUrl ?? ""} />
          </Field>
          <Field label="Favicon (URL)" htmlFor="faviconUrl">
            <Input id="faviconUrl" name="faviconUrl" defaultValue={initial?.faviconUrl ?? ""} />
          </Field>
          <Field label="Teléfono" htmlFor="phone">
            <Input id="phone" name="phone" defaultValue={initial?.phone ?? ""} />
          </Field>
          <Field label="WhatsApp" htmlFor="whatsapp" hint="Con código de país, ej: 5493704000000">
            <Input id="whatsapp" name="whatsapp" defaultValue={initial?.whatsapp ?? ""} />
          </Field>
          <Field label="Email" htmlFor="email">
            <Input id="email" name="email" type="email" defaultValue={initial?.email ?? ""} />
          </Field>
          <Field label="Dirección" htmlFor="address">
            <Input id="address" name="address" defaultValue={initial?.address ?? ""} />
          </Field>
          <Field label="Horarios" htmlFor="hours">
            <Input id="hours" name="hours" defaultValue={initial?.hours ?? ""} />
          </Field>
          <Field label="URL Google Maps" htmlFor="mapsUrl">
            <Input id="mapsUrl" name="mapsUrl" defaultValue={initial?.mapsUrl ?? ""} />
          </Field>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Redes sociales</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <Field label="Instagram" htmlFor="instagram">
            <Input id="instagram" name="instagram" defaultValue={initial?.instagram ?? ""} />
          </Field>
          <Field label="Facebook" htmlFor="facebook">
            <Input id="facebook" name="facebook" defaultValue={initial?.facebook ?? ""} />
          </Field>
          <Field label="TikTok" htmlFor="tiktok">
            <Input id="tiktok" name="tiktok" defaultValue={initial?.tiktok ?? ""} />
          </Field>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Identidad de marca</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Color principal" htmlFor="primaryColor" hint="Hex, ej: #e4002b">
            <Input
              id="primaryColor"
              name="primaryColor"
              defaultValue={initial?.primaryColor ?? "#e4002b"}
            />
          </Field>
          <Field label="Color secundario" htmlFor="secondaryColor" hint="Hex, ej: #111111">
            <Input
              id="secondaryColor"
              name="secondaryColor"
              defaultValue={initial?.secondaryColor ?? "#111111"}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Texto legal (footer)" htmlFor="legalText">
              <Textarea id="legalText" name="legalText" defaultValue={initial?.legalText ?? ""} />
            </Field>
          </div>
        </CardContent>
      </Card>
    </AsyncForm>
  );
}