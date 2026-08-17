"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

type ConfirmDeleteProps = {
  action: () => Promise<{ success: boolean; error?: string; message?: string }>;
  label?: string;
  icon?: boolean;
};

/** Botón de borrado que ejecuta la acción y refresca la lista. */
export function ConfirmDelete({
  action,
  label = "Eliminar",
  icon = false,
}: ConfirmDeleteProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!window.confirm("¿Confirmás eliminar este registro?")) return;
    startTransition(async () => {
      const res = await action();
      if (res.success) {
        toast.success(res.message ?? "Eliminado");
        router.refresh();
      } else {
        toast.error(res.error ?? "No se pudo eliminar");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        variant="destructive"
        size="sm"
        disabled={pending}
      >
        {pending ? (
          <Loader2 className="animate-spin" />
        ) : icon ? (
          <Trash2 />
        ) : null}
        {!icon && (pending ? "…" : label)}
      </Button>
    </form>
  );
}