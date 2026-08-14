import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

/* ------------------------------------------------------------------ */
/*  Section — wrapper principal de secciones de la Home / páginas      */
/* ------------------------------------------------------------------ */

type SectionBg = "default" | "muted" | "dark" | "accent" | "primary";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Variante de fondo. */
  bg?: SectionBg;
  /** Padding vertical: sm, md (default), lg. */
  padding?: "sm" | "md" | "lg";
  /** Si es true, el section no tiene padding vertical (para heroes). */
  noPadding?: boolean;
  as?: React.ElementType;
}

const bgClasses: Record<SectionBg, string> = {
  default: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  dark: "bg-zinc-900 text-white",
  accent: "bg-primary/5 text-foreground",
  primary: "bg-primary text-primary-foreground",
};

const paddingClasses = {
  sm: "py-8 sm:py-10",
  md: "py-14 sm:py-16 lg:py-20",
  lg: "py-20 sm:py-24 lg:py-28",
};

export function Section({
  bg = "default",
  padding = "md",
  noPadding = false,
  as: Tag = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        bgClasses[bg],
        !noPadding && paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionHeader — título + descripción de sección                    */
/* ------------------------------------------------------------------ */

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Alineación del texto. */
  align?: "left" | "center";
  /** Acción opcional (botón/link). */
  action?: { label: string; href: string };
  className?: string;
  /** Para dark backgrounds: cambia colores del texto. */
  dark?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-eyebrow",
            dark ? "text-red-400" : "text-primary",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-2 text-h2",
          dark ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-body-lead",
            dark ? "text-zinc-300" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
      {action && (
        <div className={cn("mt-5", align === "center" && "flex justify-center")}>
          <a href={action.href} className={cn(
            dark
              ? "text-sm font-medium text-white underline-offset-4 hover:underline"
              : "text-sm font-medium text-primary underline-offset-4 hover:underline",
          )}>
            {action.label} →
          </a>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionContainer — Container interno para contenido de sección     */
/* ------------------------------------------------------------------ */

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ancho máximo del container. */
  size?: "default" | "narrow" | "wide";
}

const sizeClasses = {
  default: "",
  narrow: "max-w-4xl mx-auto",
  wide: "max-w-7xl mx-auto",
};

export function SectionContainer({
  size = "default",
  className,
  children,
  ...props
}: SectionContainerProps) {
  return (
    <Container className={cn(sizeClasses[size], className)} {...props}>
      {children}
    </Container>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionDivider — divisor visual entre secciones                    */
/* ------------------------------------------------------------------ */

interface SectionDividerProps {
  /** Variante del divisor. */
  variant?: "line" | "gradient" | "none";
  className?: string;
}

export function SectionDivider({
  variant = "line",
  className,
}: SectionDividerProps) {
  if (variant === "none") return null;

  return (
    <div className={cn("w-full", className)} aria-hidden="true">
      {variant === "line" && (
        <div className="mx-auto h-px w-full max-w-7xl bg-border" />
      )}
      {variant === "gradient" && (
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      )}
    </div>
  );
}
