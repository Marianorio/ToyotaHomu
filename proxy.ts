import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

/**
 * Proxy de autenticación para la zona admin (Next 16 reemplaza middleware por proxy).
 * Edge-safe: decodifica el JWT de sesión de Auth.js sin depender de Prisma/bcrypt.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminArea = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  if (!isAdminArea || isLoginPage) {
    return NextResponse.next();
  }

  const cookieName = "__Secure-authjs.session-token";
  const fallbackName = "authjs.session-token";
  let token = request.cookies.get(cookieName)?.value;
  if (!token) {
    token = request.cookies.get(fallbackName)?.value;
  }

  if (!token) {
    const url = new URL("/admin/login", request.url);
    return NextResponse.redirect(url);
  }

  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  let role: string | undefined;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      { algorithms: ["HS256"] },
    );
    role = payload.role as string | undefined;
  } catch {
    const url = new URL("/admin/login", request.url);
    return NextResponse.redirect(url);
  }

  // Rutas restringidas a admin
  const adminOnly = [
    "/admin/ase", // asesores
    "/admin/configuracion",
    "/admin/contenido-home",
  ];
  const requiresAdmin = adminOnly.some((p) => pathname.startsWith(p));

  if (requiresAdmin && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
