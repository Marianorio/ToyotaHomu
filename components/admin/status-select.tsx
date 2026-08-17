"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StatusSelectProps = {
  value: string;
  action: (value: string) => Promise<{
    success: boolean;
    error?: string;
    message?: string;
  }>;
  options: { value: string; label: string }[];
  className?: string;
};

/** Select de estado que ejecuta una Server Action al cambiar y refresca. */
export function StatusSelect({
  value,
  action,
  options,
  className,
}: StatusSelectProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

function handleChange(next: string | null) {
    const changed = next ?? "";
    if (changed === value) return;
    startTransition(async () => {
      const res = await action(changed);
      if (res.success) {
        toast.success(res.message ?? "Estado actualizado");
        router.refresh();
      } else {
        toast.error(res.error ?? "No se pudo actualizar");
      }
    });
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger size="sm" className={className} disabled={pending}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}