"use client";

import { AsyncForm } from "@/components/admin/async-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createVehicle, updateVehicle } from "@/actions/vehicles";

type Category = { id: string; name: string };
type VehicleData = {
  id?: string;
  brand: string;
  model: string;
  slug?: string | null;
  categoryId: string;
  description?: string | null;
  shortDescription?: string | null;
  isNew?: boolean;
  isHybrid?: boolean;
  isAvailable?: boolean;
  featured?: boolean;
  price?: unknown;
  currency?: string | null;
  year?: number | null;
  engine?: string | null;
  power?: string | null;
  torque?: string | null;
  transmission?: string | null;
  traction?: string | null;
  fuelType?: string | null;
  doors?: number | null;
  seats?: number | null;
  mainImage?: string | null;
};

type VehicleFormProps = {
  categories: Category[];
  initial?: VehicleData;
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

export function VehicleForm({ categories, initial, submitLabel }: VehicleFormProps) {
  return (
    <AsyncForm
      action={initial?.id ? updateVehicle.bind(null, initial.id) : createVehicle}
      submitLabel={submitLabel ?? "Guardar vehículo"}
    >
      <Card>
        <CardHeader>
          <CardTitle>Datos básicos</CardTitle>
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
          <Field label="Categoría" htmlFor="categoryId">
            <Select name="categoryId" defaultValue={initial?.categoryId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          <Field label="Moneda" htmlFor="currency">
            <Input
              id="currency"
              name="currency"
              defaultValue={initial?.currency ?? "ARS"}
            />
          </Field>
          <Field label="Año" htmlFor="year">
            <Input
              id="year"
              name="year"
              type="number"
              defaultValue={initial?.year != null ? String(initial.year) : ""}
            />
          </Field>
          <Field label="Combustible" htmlFor="fuelType">
            <Input
              id="fuelType"
              name="fuelType"
              defaultValue={initial?.fuelType ?? ""}
              placeholder="Nafta / Diesel / Híbrido"
            />
          </Field>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Motor y mecánica</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Motor" htmlFor="engine">
            <Input id="engine" name="engine" defaultValue={initial?.engine ?? ""} />
          </Field>
          <Field label="Potencia" htmlFor="power">
            <Input id="power" name="power" defaultValue={initial?.power ?? ""} />
          </Field>
          <Field label="Torque" htmlFor="torque">
            <Input id="torque" name="torque" defaultValue={initial?.torque ?? ""} />
          </Field>
          <Field label="Transmisión" htmlFor="transmission">
            <Input
              id="transmission"
              name="transmission"
              defaultValue={initial?.transmission ?? ""}
              placeholder="Manual / Automática / CVT"
            />
          </Field>
          <Field label="Tracción" htmlFor="traction">
            <Input id="traction" name="traction" defaultValue={initial?.traction ?? ""} />
          </Field>
          <Field label="Puertas" htmlFor="doors">
            <Input
              id="doors"
              name="doors"
              type="number"
              defaultValue={initial?.doors != null ? String(initial.doors) : ""}
            />
          </Field>
          <Field label="Plazas" htmlFor="seats">
            <Input
              id="seats"
              name="seats"
              type="number"
              defaultValue={initial?.seats != null ? String(initial.seats) : ""}
            />
          </Field>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Imagen y descripción</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field label="URL imagen principal" htmlFor="mainImage">
            <Input id="mainImage" name="mainImage" defaultValue={initial?.mainImage ?? ""} />
          </Field>
          <Field label="Descripción corta" htmlFor="shortDescription">
            <Textarea
              id="shortDescription"
              name="shortDescription"
              defaultValue={initial?.shortDescription ?? ""}
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
          <CardTitle>Estado y visibilidad</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="isNew"
              name="isNew"
              defaultChecked={initial?.isNew ?? true}
            />
            <Label htmlFor="isNew">Ve 0 km</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="isHybrid"
              name="isHybrid"
              defaultChecked={initial?.isHybrid ?? false}
            />
            <Label htmlFor="isHybrid">Híbrido</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="isAvailable"
              name="isAvailable"
              defaultChecked={initial?.isAvailable ?? true}
            />
            <Label htmlFor="isAvailable">Disponible</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="featured"
              name="featured"
              defaultChecked={initial?.featured ?? false}
            />
            <Label htmlFor="featured">Destacado en home</Label>
          </div>
        </CardContent>
      </Card>
    </AsyncForm>
  );
}