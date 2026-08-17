"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NAV_ITEMS } from "./admin-nav";

/** Menú desplegable mobile con las rutas del panel. */
export function AdminMobileNav({ role }: { role?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = NAV_ITEMS.filter(
    (item) => !item.adminOnly || role === "ADMIN",
  );

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        aria-label="Abrir menú"
        onClick={() => setOpen((v) => !v)}
      >
        <Menu />
      </Button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-56 rounded-lg border border-border bg-popover p-1 shadow-lg">
          {items.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}