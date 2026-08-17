import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type { Role } from "@/lib/generated/prisma/client";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

/**
 * Devuelve el usuario de sesión (con rol) o null si no hay sesión.
 * Para usar en Server Components / Server Actions, no en el cliente.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth();
  const user = session?.user;
  if (!user?.id || !user?.role) return null;
  return {
    id: user.id,
    name: user.name ?? "",
    email: user.email ?? "",
    role: user.role as Role,
  };
}

/**
 * Exige que la sesión tenga uno de los roles indicados.
 * En Server Actions permite cortar la ejecución con un error controlado.
 */
export async function requireRole(
  roles: Role[],
): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("No autorizado. Iniciá sesión para continuar.");
  }
  if (!roles.includes(user.role)) {
    throw new Error("No tenés permisos para realizar esta acción.");
  }
  return user;
}

/** Acciones que solo puede ejecutar un ADMIN (asignar asesores no aplica: todos pueden ver leads). */
export const requireAdmin = () => requireRole(["ADMIN"]);

/**
 * Para páginas de una ruta solo-admin. El layout ya redirige si no hay sesión;
 * acá se asegura el rol y se redirige a /admin/dashboard si no es ADMIN.
 */
export async function requireAdminPage(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  if (user.role !== "ADMIN") redirect("/admin/dashboard");
  return user;
}