"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Action = (
  formData: FormData,
) => Promise<{ success: boolean; error?: string; message?: string }>;

type AsyncFormProps = {
  action: Action;
  children: React.ReactNode;
  submitLabel?: string;
  pendingLabel?: string;
  className?: string;
};

/**
 * Formulario admin que ejecuta una Server Action, muestra toasts
 * de éxito/error y mantiene estado de pendiente en el botón.
 */
export function AsyncForm({
  action,
  children,
  submitLabel = "Guardar",
  pendingLabel = "Guardando…",
  className,
}: AsyncFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => await action(formData),
    null,
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message ?? "Guardado");
    } else {
      toast.error(state.error ?? "Error al guardar");
    }
  }, [state]);

  return (
    <form action={formAction} className={className}>
      {children}
      <Button type="submit" disabled={pending}>
        {pending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}