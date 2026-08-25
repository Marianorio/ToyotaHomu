"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { testEmailAction } from "@/actions/email";

export function EmailTestForm({ defaultTo }: { defaultTo?: string | null }) {
  const [result, setResult] = React.useState<{ success: boolean; msg: string } | null>(null);
  const [pending, setPending] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setResult(null);
    const fd = new FormData(e.currentTarget);
    const res = await testEmailAction(fd);
    setPending(false);
    if (res.success) {
      setResult({
        success: true,
        msg: (res as { mocked?: boolean }).mocked
          ? "DEMO_MODE activo — email logueado en consola (no enviado real)"
          : `Enviado correctamente${(res as { id?: string }).id ? ` (id: ${(res as { id?: string }).id})` : ""}`,
      });
    } else {
      setResult({ success: false, msg: res.error });
    }
  }

  return (
    <div className="mt-8 rounded-xl border bg-card p-6">
      <h3 className="font-heading text-base font-semibold">Probar envío de email (Resend)</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Envía un email de prueba para verificar <code className="rounded bg-muted px-1 py-0.5 text-xs">RESEND_API_KEY</code>,{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">EMAIL_FROM</code> y{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">EMAIL_TO</code>. En{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">DEMO_MODE=true</code> solo se loguea.
      </p>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Label htmlFor="email-test-to">Destinatario</Label>
          <Input
            id="email-test-to"
            name="to"
            type="email"
            required
            placeholder="tu@email.com"
            defaultValue={defaultTo ?? ""}
            className="mt-1"
          />
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Enviando…" : "Enviar prueba"}
        </Button>
      </form>
      {result && (
        <p
          className={
            result.success ? "mt-3 text-sm text-emerald-700" : "mt-3 text-sm text-destructive"
          }
        >
          {result.msg}
        </p>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        El remitente debe estar verificado en Resend. Para pruebas usa{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">onboarding@resend.dev</code> como{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">EMAIL_FROM</code> si aún no verificaste dominio.
      </p>
    </div>
  );
}
