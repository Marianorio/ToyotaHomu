"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { Skeleton } from "@/components/ui/skeleton";

/** Spinner accesible (aria-hidden + label). */
export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4 animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

/**
 * Botón con estado de carga. Mantiene la jerarquía visual del Design System
 * con spinner + label "Procesando…" y evita doble envío.
 */
export function LoadingButton({
  className,
  loading = false,
  children,
  disabled,
  variant = "default",
  size = "default",
  ...props
}: LoadingButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      data-loading={loading ? "true" : undefined}
      {...props}
    >
      {loading && <Spinner />}
      {loading ? (
        <span aria-live="polite">Procesando…</span>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}

/** Pantalla de carga para páginas completas (evita pantallas en blanco). */
export function PageLoading({
  label = "Cargando",
}: {
  label?: string;
}) {
  return (
    <div
      role="status"
      aria-label={label}
      className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24"
    >
      <Skeleton className="h-8 w-64 max-w-full" />
      <Skeleton className="h-4 w-48 max-w-full" />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner />
        <span>{label}…</span>
      </div>
    </div>
  );
}
