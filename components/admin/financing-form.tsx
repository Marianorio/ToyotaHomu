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
import { createFinancingPlan, updateFinancingPlan } from "@/actions/promotions";

type FinancingData = {
  id?: string;
  name: string;
  vehicleId?: string | null;
  description?: string | null;
  percentage?: string | null;
  installments?: number | null;
  initialPayment?: unknown;
  interestRate?: unknown;
  monthlyPayment?: unknown;
  active?: boolean;
  validFrom?: Date | string | null;
  validUntil?: Date | string | null;
  legalText?: string | null;
};

type FinancingFormProps = {
  vehicles: { id: string; brand: string; model: string }[];
  initial?: FinancingData;
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

export function FinancingForm({
  vehicles,
  initial,
  submitLabel,
}: FinancingFormProps) {
  return (
    <AsyncForm
      action={
        initial?.id
          ? updateFinancingPlan.bind(null, initial.id)
          : createFinancingPlan
      }
      submitLabel={submitLabel ?? "Guardar plan"}
    >
      <Card>
        <CardHeader>
          <CardTitle>Plan de financiación</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Nombre" htmlFor="name">
            <Input id="name" name="name" defaultValue={initial?.name} required />
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
                <SelectItem value="">Plan general</SelectItem>
                {vehicles.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.brand} {v.model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Porcentaje de entrega (%)" htmlFor="percentage">
            <Input
              id="percentage"
              name="percentage"
              defaultValue={initial?.percentage ?? ""}
              placeholder="30"
            />
          </Field>
          <Field label="Cuotas" htmlFor="installments">
            <Input
              id="installments"
              name="installments"
              type="number"
              defaultValue={
                initial?.installments != null ? String(initial.installments) : ""
              }
              placeholder="36"
            />
          </Field>
          <Field label="Entrega inicial (ARS)" htmlFor="initialPayment">
            <Input
              id="initialPayment"
              name="initialPayment"
              type="number"
              step="0.01"
              defaultValue={
                initial?.initialPayment != null
                  ? String(initial.initialPayment)
                  : ""
              }
            />
          </Field>
          <Field label="Tasa de interés (%)" htmlFor="interestRate">
            <Input
              id="interestRate"
              name="interestRate"
              type="number"
              step="0.01"
              defaultValue={
                initial?.interestRate != null ? String(initial.interestRate) : ""
              }
            />
          </Field>
          <Field label="Cuota mensual (ARS)" htmlFor="monthlyPayment">
            <Input
              id="monthlyPayment"
              name="monthlyPayment"
              type="number"
              step="0.01"
              defaultValue={
                initial?.monthlyPayment != null
                  ? String(initial.monthlyPayment)
                  : ""
              }
            />
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
            <Field label="Texto legal" htmlFor="legalText">
              <Textarea
                id="legalText"
                name="legalText"
                defaultValue={initial?.legalText ?? ""}
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Estado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Checkbox
              id="active"
              name="active"
              defaultChecked={initial?.active ?? true}
            />
            <Label htmlFor="active">Plan activo</Label>
          </div>
        </CardContent>
      </Card>
    </AsyncForm>
  );
}