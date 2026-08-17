"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { setLeadNotes } from "@/actions/leads";
import { StickyNote } from "lucide-react";

export function LeadNotes({ id, initial }: { id: string; initial?: string | null }) {
  const [value, setValue] = useState(initial ?? "");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      const res = await setLeadNotes(id, value);
      if (res.success) {
        toast.success("Notas guardadas");
        router.refresh();
      } else {
        toast.error(res.error ?? "No se pudieron guardar");
      }
    });
  }

  return (
    <details className="group">
      <summary className="flex cursor-pointer items-center gap-1.5 py-1 text-xs font-medium text-muted-foreground select-none hover:text-foreground">
        <StickyNote className="size-3.5" />
        Notas
      </summary>
      <div className="mt-2 grid gap-2 border-t border-border pt-2">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Agregá una nota interna del seguimiento…"
          className="min-h-16 text-xs"
        />
        <Button size="sm" onClick={save} disabled={pending}>
          {pending ? "Guardando…" : "Guardar notas"}
        </Button>
      </div>
    </details>
  );
}