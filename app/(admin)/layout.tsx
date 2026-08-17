import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionUser } from "@/lib/session";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";
import { LogoutButton } from "@/components/admin/logout-button";
import { ExternalLink } from "lucide-react";

/**
 * Shell del panel admin (route group (admin)).
 * Protege todas las rutas /admin/*: sin sesión → /admin/login.
 * Sidebar de navegación + header con usuario.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-full w-full bg-muted/30">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 border-r border-border bg-background p-3 md:block">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 px-2 py-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                TOY
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Panel Toyota</p>
                <p className="text-xs text-muted-foreground">Formosa</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto pt-2">
              <AdminNav role={user.role} />
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="md:hidden">
                <AdminMobileNav role={user.role} />
              </div>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.role === "ADMIN"
                    ? "Administrador"
                    : user.role === "SELLER"
                      ? "Asesor de ventas"
                      : "Servicio técnico"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ExternalLink className="size-3.5" />
                Ver sitio
              </Link>
              <LogoutButton />
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}