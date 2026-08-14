"use client";

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type GalleryImage = {
  id: string;
  url: string;
  alt: string;
};

type VehicleGalleryProps = {
  images: GalleryImage[];
  mainImage?: string | null;
  vehicleName: string;
};

export function VehicleGallery({
  images,
  mainImage,
  vehicleName,
}: VehicleGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // Build gallery array: main image first, then others
  const galleryImages: GalleryImage[] = React.useMemo(() => {
    const result: GalleryImage[] = [];
    if (mainImage) {
      result.push({
        id: "main",
        url: mainImage,
        alt: `${vehicleName} - Imagen principal`,
      });
    }
    result.push(...images);
    return result;
  }, [mainImage, images, vehicleName]);

  const currentImage = galleryImages[selectedIndex] || galleryImages[0];

  const goNext = React.useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const goPrev = React.useCallback(() => {
    setSelectedIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  }, [galleryImages.length]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, goNext, goPrev]);

  // Lock body scroll when fullscreen
  React.useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  if (!currentImage) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded-lg border bg-muted">
        <p className="text-muted-foreground">Sin imágenes</p>
      </div>
    );
  }

  return (
    <>
      {/* Main image */}
      <div className="relative overflow-hidden rounded-lg border bg-muted">
        <div className="aspect-[16/9] relative">
          <Image
            src={currentImage.url}
            alt={currentImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
            priority={selectedIndex === 0}
          />
        </div>

        {/* Navigation arrows */}
        {galleryImages.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={goPrev}
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={goNext}
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="size-5" />
            </Button>
          </>
        )}

        {/* Zoom button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsFullscreen(true)}
          aria-label="Ver en pantalla completa"
        >
          <ZoomIn className="size-5" />
        </Button>

        {/* Counter */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-4 left-4 rounded-full bg-background/80 px-3 py-1 text-sm backdrop-blur-sm">
            {selectedIndex + 1} / {galleryImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {galleryImages.map((img, index) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative size-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
                index === selectedIndex
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-foreground"
              )}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-white hover:bg-white/10"
            onClick={() => setIsFullscreen(false)}
            aria-label="Cerrar"
          >
            <X className="size-6" />
          </Button>

          {/* Fullscreen image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage.url}
              alt={currentImage.alt}
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto object-contain"
              priority
            />

            {/* Navigation */}
            {galleryImages.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80"
                  onClick={goPrev}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="size-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80"
                  onClick={goNext}
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="size-6" />
                </Button>
              </>
            )}
          </div>

          {/* Counter */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
