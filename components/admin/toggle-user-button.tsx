"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type ToggleUserButtonProps = {
  label: string;
  action: () => Promise<{ success: boolean; error?: string; message?: string }>;
};

/** Botón que ejecuta activar/desactivar un asesor y refresca la lista. */
export function ToggleUserButton({ label, action }: ToggleUserButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const res = await action();
      if (res.success) {
        toast.success(res.message ?? "Listo");
        router.refresh();
      } else {
        toast.error(res.error ?? "No se pudo completar la acción");
      }
    });
  }

  return (
    <Button variant="outline" size="sm" onClick={handleClick} disabled={pending}>
      {pending ? "…" : label}
    </Button>
  );
}