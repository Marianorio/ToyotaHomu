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
import { createPromotion, updatePromotion } from "@/actions/promotions";

type PromotionData = {
  id?: string;
  title: string;
  slug?: string | null;
  description?: string | null;
  image?: string | null;
  vehicleId?: string | null;
  discount?: string | null;
  terms?: string | null;
  validFrom?: Date | string | null;
  validUntil?: Date | string | null;
  featured?: boolean;
  active?: boolean;
};

type PromotionFormProps = {
  vehicles: { id: string; brand: string; model: string }[];
  initial?: PromotionData;
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

function toDateInput(value: Date | string | null | undefined): string {
  if (!value) return "";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export function PromotionForm({
  vehicles,
  initial,
  submitLabel,
}: PromotionFormProps) {
  return (
    <AsyncForm
      action={
        initial?.id ? updatePromotion.bind(null, initial.id) : createPromotion
      }
      submitLabel={submitLabel ?? "Guardar promoción"}
    >
      <Card>
        <CardHeader>
          <CardTitle>Promoción</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Título" htmlFor="title">
            <Input id="title" name="title" defaultValue={initial?.title} required />
          </Field>
          <Field label="Slug (vacío = auto)" htmlFor="slug">
            <Input id="slug" name="slug" defaultValue={initial?.slug ?? ""} />
          </Field>
          <Field label="Descuento / beneficio" htmlFor="discount">
            <Input
              id="discount"
              name="discount"
              defaultValue={initial?.discount ?? ""}
              placeholder="12 cuotas sin interés"
            />
          </Field>
          <Field label="Vehículo asociado (opcional)" htmlFor="vehicleId">
            <Select
              name="vehicleId"
              defaultValue={initial?.vehicleId ?? ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sin vehículo asociado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Sin vehículo</SelectItem>
                {vehicles.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.brand} {v.model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="URL imagen" htmlFor="image">
            <Input id="image" name="image" defaultValue={initial?.image ?? ""} />
          </Field>
          <Field label="Vigente desde" htmlFor="validFrom">
            <Input
              id="validFrom"
              name="validFrom"
              type="date"
              defaultValue={toDateInput(initial?.validFrom)}
            />
          </Field>
          <Field label="Vigente hasta" htmlFor="validUntil">
            <Input
              id="validUntil"
              name="validUntil"
              type="date"
              defaultValue={toDateInput(initial?.validUntil)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Descripción" htmlFor="description">
              <Textarea
                id="description"
                name="description"
                defaultValue={initial?.description ?? ""}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Términos y condiciones" htmlFor="terms">
              <Textarea
                id="terms"
                name="terms"
                defaultValue={initial?.terms ?? ""}
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Estado</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="active"
              name="active"
              defaultChecked={initial?.active ?? true}
            />
            <Label htmlFor="active">Activa</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="featured"
              name="featured"
              defaultChecked={initial?.featured ?? false}
            />
            <Label htmlFor="featured">Destacada</Label>
          </div>
        </CardContent>
      </Card>
    </AsyncForm>
  );
}