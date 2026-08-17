"use client";

import { AsyncForm } from "@/components/admin/async-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createUsedVehicle, updateUsedVehicle } from "@/actions/vehicles";

type UsedVehicleData = {
  id?: string;
  brand: string;
  model: string;
  slug?: string | null;
  year?: number | null;
  mileage?: number | null;
  price?: unknown;
  fuelType?: string | null;
  transmission?: string | null;
  location?: string | null;
  condition?: string | null;
  description?: string | null;
  featured?: boolean;
  available?: boolean;
  images?: string;
};

type UsedVehicleFormProps = {
  initial?: UsedVehicleData;
  submitLabel?: string;
};

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-1.5 ${className ?? ""}`}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

export function UsedVehicleForm({
  initial,
  submitLabel,
}: UsedVehicleFormProps) {
  return (
    <AsyncForm
      action={
        initial?.id ? updateUsedVehicle.bind(null, initial.id) : createUsedVehicle
      }
      submitLabel={submitLabel ?? "Guardar usado"}
    >
      <Card>
        <CardHeader>
          <CardTitle>Datos del vehículo</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Marca" htmlFor="brand">
            <Input id="brand" name="brand" defaultValue={initial?.brand} required />
          </Field>
          <Field label="Modelo" htmlFor="model">
            <Input id="model" name="model" defaultValue={initial?.model} required />
          </Field>
          <Field label="Slug (vacío = auto)" htmlFor="slug">
            <Input id="slug" name="slug" defaultValue={initial?.slug ?? ""} />
          </Field>
          <Field label="Año" htmlFor="year">
            <Input
              id="year"
              name="year"
              type="number"
              defaultValue={initial?.year != null ? String(initial.year) : ""}
            />
          </Field>
          <Field label="Kilometraje" htmlFor="mileage">
            <Input
              id="mileage"
              name="mileage"
              type="number"
              defaultValue={initial?.mileage != null ? String(initial.mileage) : ""}
              placeholder="125000"
            />
          </Field>
          <Field label="Precio (ARS)" htmlFor="price">
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              defaultValue={initial?.price != null ? String(initial.price) : ""}
            />
          </Field>
          <Field label="Combustible" htmlFor="fuelType">
            <Input
              id="fuelType"
              name="fuelType"
              defaultValue={initial?.fuelType ?? ""}
            />
          </Field>
          <Field label="Transmisión" htmlFor="transmission">
            <Input
              id="transmission"
              name="transmission"
              defaultValue={initial?.transmission ?? ""}
            />
          </Field>
          <Field label="Ubicación" htmlFor="location">
            <Input
              id="location"
              name="location"
              defaultValue={initial?.location ?? ""}
              placeholder="Formosa"
            />
          </Field>
          <Field label="Condición" htmlFor="condition">
            <Input
              id="condition"
              name="condition"
              defaultValue={initial?.condition ?? ""}
              placeholder="Bueno / Muy bueno / Excelente"
            />
          </Field>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Imágenes y descripción</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field label="URLs de imágenes (una por línea)" htmlFor="images">
            <Textarea
              id="images"
              name="images"
              defaultValue={initial?.images ?? ""}
              placeholder={"https://…/foto1.jpg\nhttps://…/foto2.jpg"}
            />
          </Field>
          <Field label="Descripción" htmlFor="description">
            <Textarea
              id="description"
              name="description"
              defaultValue={initial?.description ?? ""}
            />
          </Field>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Estado</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="available"
              name="available"
              defaultChecked={initial?.available ?? true}
            />
            <Label htmlFor="available">Disponible</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="featured"
              name="featured"
              defaultChecked={initial?.featured ?? false}
            />
            <Label htmlFor="featured">Destacado</Label>
          </div>
        </CardContent>
      </Card>
    </AsyncForm>
  );
}