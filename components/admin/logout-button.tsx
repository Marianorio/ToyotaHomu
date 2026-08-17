"use client";

import { signOut } from "next-auth/react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await signOut({ redirect: true, callbackUrl: "/admin/login" });
      toast.success("Sesión cerrada");
    });
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} disabled={pending}>
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <LogOut />
      )}
      {!pending && "Salir"}
    </Button>
  );
}