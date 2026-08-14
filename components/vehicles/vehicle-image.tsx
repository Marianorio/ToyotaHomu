import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Silueta de vehículo (SVG) usada como placeholder DEMO cuando no hay
 * fotos con derechos disponibles. Prefiere no usar imágenes de terceros.
 */
function VehicleSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 160"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
      fill="none"
    >
      <g fill="currentColor" opacity="0.9">
        <path d="M60 70h70V40a8 8 0 0 1 8-8h34l22 22 12-22h36a8 8 0 0 1 8 8v30h88l-16-30h26l16 30h20v26h-18a23 23 0 0 1-45 0h-70a23 23 0 0 1-45 0H60v-26z" />
      </g>
      {/* ventanas */}
      <path d="M126 46h28l18 18h-40a6 6 0 0 1-6-6v-12z" fill="#fff" opacity="0.85" />
      <path d="M186 64l-16-18h30v18z" fill="#fff" opacity="0.85" />
      <path d="M246 46h30l-16 18h-14V46z" fill="#fff" opacity="0.85" />
      <path d="M290 64l-12-18h28z" fill="#fff" opacity="0.85" />
    </svg>
  );
}

type VehicleImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/** Imagen de vehículo; si no hay fuente, muestra una silueta premium (demo). */
export function VehicleImage({
  src,
  alt,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, 400px",
}: VehicleImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "flex items-end justify-center bg-gradient-to-b from-zinc-100 via-zinc-100 to-zinc-200 text-zinc-400 dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-900 dark:text-zinc-500",
        className,
      )}
    >
      <div className="w-[85%] pb-2">
        <VehicleSilhouette />
      </div>
    </div>
  );
}
