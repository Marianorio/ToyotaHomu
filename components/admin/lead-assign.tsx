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
import { assignLead } from "@/actions/leads";

type LeadAssignProps = {
  id: string;
  users: { id: string; name: string }[];
  value?: string | null;
};

/** Select para asignar un lead a un asesor. */
export function LeadAssign({ id, users, value }: LeadAssignProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleChange(next: string | null) {
    const idValue = next ?? "";
    startTransition(async () => {
      const res = await assignLead(id, idValue);
      if (res.success) {
        toast.success("Asesor asignado");
        router.refresh();
      } else {
        toast.error(res.error ?? "No se pudo asignar");
      }
    });
  }

  return (
    <Select value={value ?? ""} onValueChange={handleChange}>
      <SelectTrigger size="sm" disabled={pending}>
        <SelectValue placeholder="Sin asignar" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">Sin asignar</SelectItem>
        {users.map((u) => (
          <SelectItem key={u.id} value={u.id}>
            {u.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}