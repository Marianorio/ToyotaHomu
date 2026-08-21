"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Car,
  Shield,
  Wrench,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
import { useScrollLock } from "@/lib/hooks/use-scroll-lock";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; icon?: React.ReactNode }[];
};

type NavbarProps = {
  items?: NavItem[];
  businessName?: string;
  whatsappNumber?: string;
  logoUrl?: string | null;
};

const DEFAULT_ITEMS: NavItem[] = [
  {
    label: "Vehículos",
    href: "/vehiculos",
    children: [
      { label: "Autos", href: "/vehiculos?cat=autos", icon: <Car className="size-4" /> },
      { label: "SUVs", href: "/vehiculos?cat=suv", icon: <Car className="size-4" /> },
      { label: "Pick-Ups", href: "/vehiculos?cat=pickup", icon: <Car className="size-4" /> },
      { label: "Comerciales", href: "/vehiculos?cat=comercial", icon: <Car className="size-4" /> },
      { label: "Deportivos", href: "/vehiculos?cat=deportivos", icon: <Car className="size-4" /> },
      { label: "Híbridos", href: "/vehiculos?cat=hibridos", icon: <Shield className="size-4" /> },
    ],
  },
  { label: "Promociones", href: "/promociones" },
  { label: "Financiación", href: "/financiacion" },
  { label: "Comparador", href: "/comparador" },
  { label: "Usados", href: "/usados" },
  { label: "Postventa", href: "/postventa" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Sustentabilidad", href: "/sustentabilidad" },
];

const MOBILE_EXTRA_ITEMS = [
  { label: "Contacto", href: "/contacto", icon: <Phone className="size-4" /> },
  { label: "Servicios", href: "/servicios", icon: <Wrench className="size-4" /> },
  { label: "Sustentabilidad", href: "/sustentabilidad", icon: <Shield className="size-4" /> },
];

/**
 * Header premium y responsive (Design System).
 * Sticky con transición al scroll + drawer mobile con overlay + mega-menu prep.
 */
export function Navbar({
  items = DEFAULT_ITEMS,
  businessName = "Toyota Formosa",
  whatsappNumber,
  logoUrl,
}: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
  const { lock, unlock } = useScrollLock();
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);

  // Scroll detection
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile open/close
  const openMobile = React.useCallback(() => {
    setMobileOpen(true);
    lock();
  }, [lock]);

  const closeMobile = React.useCallback(() => {
    setMobileOpen(false);
    setOpenSubmenu(null);
    unlock();
  }, [unlock]);

  // Escape key closes mobile
  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  // Focus trap: focus first link when mobile opens
  React.useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      const first = mobileMenuRef.current.querySelector<HTMLElement>("a, button");
      first?.focus();
    }
  }, [mobileOpen]);

  const whatsappHref = generateWhatsAppUrl(
    "Hola, tengo una consulta.",
    whatsappNumber,
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full border-b transition-all duration-300",
          scrolled
            ? "border-border bg-background/95 shadow-sm backdrop-blur-md"
            : "border-transparent bg-background/60 backdrop-blur-sm",
        )}
        role="banner"
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-lg font-semibold tracking-tight text-foreground"
            aria-label="Ir al inicio"
          >
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt={businessName}
                className="h-8 w-auto"
                width={120}
                height={32}
              />
            ) : (
              <span>{businessName}</span>
            )}
          </Link>

          {/* Nav desktop */}
          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {items.map((item) =>
              item.children ? (
                <div key={item.href} className="relative group">
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {item.label}
                    <ChevronDown className="size-3.5" aria-hidden="true" />
                  </button>
                  {/* Dropdown mega-menu prep */}
                  <div className="invisible absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border bg-card p-2 shadow-xl opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {child.icon}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Acciones desktop */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/cotizar"
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              Cotizá tu Toyota
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-1.5 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:text-emerald-500 dark:hover:bg-emerald-950",
              )}
              aria-label="Escribinos por WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Toggle mobile */}
          <button
            type="button"
            onClick={mobileOpen ? closeMobile : openMobile}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            {mobileOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </Container>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={closeMobile}
            aria-hidden="true"
          />
          {/* Panel */}
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="fixed inset-y-0 right-0 z-[60] flex w-[min(85vw,360px)] flex-col bg-background shadow-2xl transition-transform duration-300 ease-out lg:hidden"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b px-5 py-4">
              <span className="text-sm font-semibold text-foreground">
                {businessName}
              </span>
              <button
                type="button"
                onClick={closeMobile}
                aria-label="Cerrar menú"
                className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            {/* Navigation */}
            <nav aria-label="Menú mobile" className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.href}>
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenSubmenu((v) =>
                              v === item.label ? null : item.label,
                            )
                          }
                          aria-expanded={openSubmenu === item.label}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "size-4 text-muted-foreground transition-transform",
                              openSubmenu === item.label && "rotate-180",
                            )}
                            aria-hidden="true"
                          />
                        </button>
                        {openSubmenu === item.label && (
                          <ul className="ml-3 mt-1 space-y-0.5 border-l-2 border-border pl-3">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={closeMobile}
                                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                >
                                  {child.icon}
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                href={item.href}
                                onClick={closeMobile}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                              >
                                Ver todos
                                <ChevronRight className="size-3.5" aria-hidden="true" />
                              </Link>
                            </li>
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        {item.label}
                        <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
                      </Link>
                    )}
                  </li>
                ))}
                {/* Extra items mobile */}
                {MOBILE_EXTRA_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Drawer footer: CTAs */}
            <div className="border-t px-5 py-4 space-y-2">
              <Link
                href="/cotizar"
                onClick={closeMobile}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full justify-center",
                )}
              >
                Cotizá tu Toyota
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full justify-center gap-2 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:text-emerald-500 dark:hover:bg-emerald-950",
                )}
              >
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </>
      )}

      {/* Spacer para compensar header fixed */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
