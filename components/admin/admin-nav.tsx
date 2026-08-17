"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Car,
  CarFront,
  Tag,
  Calculator,
  Users,
  CalendarCheck,
  UserRound,
  Settings,
  Home,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  adminOnly?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/vehiculos", label: "Vehículos 0 km", icon: Car },
  { href: "/admin/usados", label: "Usados", icon: CarFront },
  { href: "/admin/promociones", label: "Promociones", icon: Tag },
  { href: "/admin/financiacion", label: "Financiación", icon: Calculator },
  { href: "/admin/leads", label: "Leads (CRM)", icon: Users },
  { href: "/admin/test-drives", label: "Test drives", icon: CalendarCheck },
  { href: "/admin/asesores", label: "Asesores", icon: UserRound, adminOnly: true },
  { href: "/admin/contenido-home", label: "Contenido Home", icon: Home, adminOnly: true },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings, adminOnly: true },
];

export function AdminNav({ role }: { role?: string }) {
  const pathname = usePathname();
  const items = NAV_ITEMS.filter(
    (item) => !item.adminOnly || role === "ADMIN",
  );

  return (
    <nav className="flex flex-col gap-1 p-3">
      <p className="px-2 pb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Gestión
      </p>
      {items.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}