import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy de la zona admin (Next 16 reemplaza middleware por proxy).
 *
 * Estrategia de seguridad en dos capas:
 * - Proxy: capa UX. Si no hay cookie de sesión de Auth.js, redirige a login
 *   sin intentar descifrarla (la sesión es un JWT cifrado JWE y verificarlo
 *   acá sería costoso y frágil).
 * - Verificación real: el layout de (admin) y cada página/Server Action
 *   usan `auth()`/`requireRole` (Node runtime) que autentican y validan rol.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminArea = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  if (!isAdminArea || isLoginPage) {
    return NextResponse.next();
  }

  const cookieName = "__Secure-authjs.session-token";
  const fallbackName = "authjs.session-token";
  const hasCookies =
    request.cookies.has(cookieName) || request.cookies.has(fallbackName);

  if (!hasCookies) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};