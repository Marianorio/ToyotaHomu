import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { buttonVariants } from "@/components/ui/button";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  cta?: { label: string; href: string; variant?: "default" | "outline" };
  /** Imagen de fondo opcional (hero de página). */
  backgroundImage?: string | null;
  /** Variante visual: light (fondo claro) o dark (fondo oscuro). */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Header reutilizable para páginas.
 * Soporta: eyebrow, H1, descripción, breadcrumb, CTA, imagen de fondo.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  cta,
  backgroundImage,
  variant = "light",
  className,
}: PageHeaderProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        isDark
          ? "bg-zinc-900 text-white"
          : "bg-zinc-50 text-foreground",
        className,
      )}
    >
      {/* Background image with overlay */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden="true"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </>
      )}

      <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs
            items={breadcrumbs}
            className={cn(
              "mb-8",
              isDark ? "text-white" : "text-muted-foreground",
            )}
          />
        )}

        {/* Text content */}
        <div className="relative max-w-3xl">
          {/* Eyebrow */}
          {eyebrow && (
            <span
              className={cn(
                "text-eyebrow tracking-widest",
                isDark ? "text-red-400" : "text-primary",
              )}
            >
              {eyebrow}
            </span>
          )}

          {/* Title */}
          <h1 className={cn(
            "mt-3 font-extrabold tracking-tight leading-[1.05] drop-shadow-lg",
            isDark ? "text-white text-4xl sm:text-5xl lg:text-6xl" : "text-display",
          )}>
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p
              className={cn(
                "mt-5 max-w-xl text-base sm:text-lg font-medium leading-relaxed",
                isDark ? "text-zinc-200/90 drop-shadow" : "text-muted-foreground",
              )}
            >
              {description}
            </p>
          )}
        </div>

        {/* CTA */}
        {cta && (
          <div className="mt-8">
            <Link
              href={cta.href}
              className={buttonVariants({
                variant: cta.variant ?? "default",
                size: "lg",
              })}
            >
              {cta.label}
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
