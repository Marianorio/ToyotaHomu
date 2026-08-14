"use client";

import * as React from "react";
import { Inbox, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface FeedbackAction {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
}

type FeedbackProps = {
  title: string;
  description?: string;
  action?: FeedbackAction;
  className?: string;
};

/** Estado vacío reutilizable (sin resultados, sin datos). */
export function EmptyState({
  title,
  description,
  action,
  className,
}: FeedbackProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Inbox className="size-6" aria-hidden="true" />
      </div>
      <h3 className="text-h3">{title}</h3>
      {description && (
        <p className="max-w-sm text-muted-foreground">{description}</p>
      )}
      {action &&
        (action.href ? (
          <a
            href={action.href}
            className={cn(buttonVariants({ variant: action.variant ?? "outline" }))}
          >
            {action.label}
          </a>
        ) : (
          <button
            type="button"
            onClick={action.onClick}
            className={cn(buttonVariants({ variant: action.variant ?? "outline" }))}
          >
            {action.label}
          </button>
        ))}
    </div>
  );
}

/** Estado de error reutilizable (mensaje + reintentar/volver). */
export function ErrorState({
  title = "Ocurrió un error",
  description,
  action,
  className,
}: FeedbackProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" aria-hidden="true" />
      </div>
      <h3 className="text-h3">{title}</h3>
      {description && (
        <p className="max-w-sm text-muted-foreground">{description}</p>
      )}
      {action &&
        (action.href ? (
          <a
            href={action.href}
            className={cn(buttonVariants({ variant: action.variant ?? "outline" }))}
          >
            {action.label}
          </a>
        ) : (
          <button
            type="button"
            onClick={action.onClick}
            className={cn(buttonVariants({ variant: action.variant ?? "outline" }))}
          >
            {action.label}
          </button>
        ))}
    </div>
  );
}

/** Estado de éxito para confirmaciones de envío. */
export function SuccessState({
  title,
  description,
  action,
  className,
}: FeedbackProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="size-6" aria-hidden="true" />
      </div>
      <h3 className="text-h3">{title}</h3>
      {description && (
        <p className="max-w-sm text-muted-foreground">{description}</p>
      )}
      {action &&
        (action.href ? (
          <a
            href={action.href}
            className={cn(buttonVariants({ variant: action.variant ?? "default" }))}
          >
            {action.label}
          </a>
        ) : (
          <button
            type="button"
            onClick={action.onClick}
            className={cn(buttonVariants({ variant: action.variant ?? "default" }))}
          >
            {action.label}
          </button>
        ))}
    </div>
  );
}
