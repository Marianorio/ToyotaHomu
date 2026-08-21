import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { isDemoMode } from "@/lib/demo";

type FooterColumn = {
  title: string;
  items: { label: string; href: string }[];
};

const NAV_COLUMNS: FooterColumn[] = [
  {
    title: "Vehículos",
    items: [
      { label: "Autos", href: "/vehiculos?cat=autos" },
      { label: "SUVs", href: "/vehiculos?cat=suv" },
      { label: "Pick-Ups", href: "/vehiculos?cat=pickup" },
      { label: "Híbridos", href: "/vehiculos?cat=hibridos" },
      { label: "Usados", href: "/usados" },
    ],
  },
  {
    title: "Servicios",
    items: [
      { label: "Postventa", href: "/postventa" },
      { label: "Financiación", href: "/financiacion" },
      { label: "Promociones", href: "/promociones" },
      { label: "Test Drive", href: "/test-drive" },
    ],
  },
  {
    title: "Concesionaria",
    items: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Sustentabilidad", href: "/sustentabilidad" },
      { label: "Contacto", href: "/contacto" },
      { label: "Ubicación", href: "/ubicacion" },
      { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
    ],
  },
];

type FooterProps = {
  businessName?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  hours?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  legalText?: string;
};

export function Footer({
  businessName = "Toyota Formosa",
  address,
  phone,
  email,
  hours,
  instagram,
  facebook,
  tiktok,
  legalText,
}: FooterProps) {
  return (
    <footer className="mt-auto border-t bg-zinc-950 text-zinc-300" role="contentinfo">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        {/* Brand + contact */}
        <div className="lg:col-span-2">
          <Image
            src="/img/toyotaLogo.webp"
            alt={businessName}
            width={140}
            height={44}
            className="h-10 w-auto"
          />
          <p className="mt-4 text-lg font-semibold text-white">{businessName}</p>
          <p className="mt-3 max-w-xs text-sm text-zinc-400">
            Concesionaria automotriz en Formosa, Argentina. Vehículos 0 km,
            financiación, postventa y atención personalizada.
          </p>

          <dl className="mt-5 space-y-2 text-sm text-zinc-400">
            {address && (
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-zinc-500" aria-hidden="true" />
                <dd>{address}</dd>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-zinc-500" aria-hidden="true" />
                <dd>
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:text-white transition-colors">
                    {phone}
                  </a>
                </dd>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-zinc-500" aria-hidden="true" />
                <dd>
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                    {email}
                  </a>
                </dd>
              </div>
            )}
            {hours && (
              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-zinc-500" aria-hidden="true" />
                <dd>{hours}</dd>
              </div>
            )}
          </dl>

          {/* Social */}
          {(instagram || facebook || tiktok) && (
            <div className="mt-5 flex items-center gap-3">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex size-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex size-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {tiktok && (
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex size-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 10.86 4.46V13a8.28 8.28 0 0 0 5.58 2.15v-3.44a4.85 4.85 0 0 1-5.58-2.73V6.69h.58z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Nav columns */}
        {NAV_COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <Container className="flex flex-col gap-3 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p>
              © {new Date().getFullYear()} {businessName}.
              {isDemoMode && (
                <span className="ml-1 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
                  DEMO
                </span>
              )}
            </p>
            <Link href="/privacidad" className="hover:text-zinc-300 transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-zinc-300 transition-colors">
              Términos
            </Link>
          </div>
          {legalText && (
            <p className="max-w-xl text-right">{legalText}</p>
          )}
        </Container>
      </div>
    </footer>
  );
}
