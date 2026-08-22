"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Fade, SlideUp, Reveal, BlurIn } from "@/components/ui/motion";

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  vehicle?: {
    model: string;
    mainImage?: string | null;
  } | null;
};

/**
 * Hero principal — sección visualmente más potente de la Home.
 * Ocupa 80-95vh desktop, 70-85vh mobile.
 */
export function Hero({
  eyebrow = "Concesionaria Toyota Formosa",
  title,
  subtitle,
  ctaText = "Cotizar ahora",
  ctaHref = "/cotizar",
}: HeroProps) {
  return (
    <section
      className="relative flex min-h-[85vh] items-center overflow-hidden bg-zinc-950"
      aria-label="Hero principal"
    >
      {/* Background image con parallax sutil */}
      <BlurIn className="absolute inset-0">
        <Image
          src="/img/ToyotaManubrio.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
          aria-hidden="true"
        />
      </BlurIn>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/80 to-zinc-950" />

      {/* Red accent line con reveal */}
      <Reveal className="absolute left-0 top-1/2 h-32 w-1 -translate-y-1/2 bg-primary" aria-hidden="true" />

      <Container className="relative z-10 py-20">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <Fade>
            <span className="text-eyebrow text-red-400">{eyebrow}</span>
          </Fade>

          {/* Title con reveal premium */}
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-display text-white">{title}</h1>
          </Reveal>

          {/* Subtitle */}
          {subtitle && (
            <SlideUp delay={0.22}>
              <p className="mt-5 max-w-lg text-body-lead text-zinc-300">
                {subtitle}
              </p>
            </SlideUp>
          )}

          {/* CTAs */}
          <SlideUp delay={0.32}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={ctaHref}
                className="btn-cta"
              >
                <span className="btn-cta-inner">{ctaText}</span>
              </Link>
              <Link
                href="/vehiculos"
                className="btn-cta"
                style={{
                  "--btn-cta-gradient": "linear-gradient(32deg, #52525b, #71717a, #52525b, #71717a)",
                  "--btn-cta-inner-bg": "rgba(255, 255, 255, 1)",
                  "--btn-cta-text": "#000",
                  "--btn-cta-hover-text": "white",
                } as React.CSSProperties}
              >
                <span className="btn-cta-inner">Ver vehículos</span>
              </Link>
            </div>
          </SlideUp>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <a
          href="#quick-actions"
          className="flex flex-col items-center gap-1 text-zinc-500 transition-colors hover:text-zinc-300"
          aria-label="Scroll para ver más"
        >
          <span className="text-xs">Descubrí más</span>
          <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
