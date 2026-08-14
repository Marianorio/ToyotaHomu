import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

/**
 * Contenedor global reutilizable (diseño premium automotriz).
 * Centraliza el ancho máximo y los paddings responsive.
 */
export function Container({ as: Tag = "div", className, ...props }: ContainerProps) {
  return <Tag className={cn("container-site", className)} {...props} />;
}
