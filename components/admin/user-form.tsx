"use client";

import { AsyncForm } from "@/components/admin/async-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createUser, updateUser } from "@/actions/settings";

type UserData = {
  id?: string;
  name: string;
  email: string;
  role?: string;
  phone?: string | null;
  photo?: string | null;
  isActive?: boolean;
};

type UserFormProps = {
  initial?: UserData;
  submitLabel?: string;
  passwordHelper?: string;
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

const ROLES = [
  { value: "ADMIN", label: "Administrador" },
  { value: "SELLER", label: "Asesor de ventas" },
  { value: "SERVICE", label: "Servicio técnico" },
];

export function UserForm({ initial, submitLabel, passwordHelper }: UserFormProps) {
  return (
    <AsyncForm
      action={initial?.id ? updateUser.bind(null, initial.id) : createUser}
      submitLabel={submitLabel ?? "Guardar asesor"}
    >
      <Card>
        <CardHeader>
          <CardTitle>{initial ? "Editar asesor" : "Nuevo asesor"}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Nombre y apellido" htmlFor="name">
            <Input id="name" name="name" defaultValue={initial?.name} required />
          </Field>
          <Field label="Email" htmlFor="email">
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={initial?.email}
              required
            />
          </Field>
          <Field label="Rol" htmlFor="role">
            <Select
              name="role"
              defaultValue={initial?.role ?? "SELLER"}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Teléfono" htmlFor="phone">
            <Input id="phone" name="phone" defaultValue={initial?.phone ?? ""} />
          </Field>
          <Field label="Foto (URL)" htmlFor="photo">
            <Input id="photo" name="photo" defaultValue={initial?.photo ?? ""} />
          </Field>
          <Field
            label={initial ? "Nueva contraseña (opcional)" : "Contraseña"}
            htmlFor="password"
          >
            <Input
              id="password"
              name="password"
              type="password"
              required={!initial}
              placeholder={passwordHelper ?? ""}
            />
          </Field>
          {initial ? (
            <div className="flex items-center gap-2 sm:col-span-2">
              <Checkbox
                id="isActive"
                name="isActive"
                defaultChecked={initial.isActive ?? true}
              />
              <Label htmlFor="isActive">Cuenta activa</Label>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </AsyncForm>
  );
}