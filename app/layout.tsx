import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DemoBadge } from "@/components/layout/DemoBadge";
import { MobileBottomActions } from "@/components/layout/mobile-bottom-actions";
import { Toaster } from "@/components/ui/sonner";
import { prisma } from "@/lib/db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Concesionaria Toyota Formosa",
    template: "%s | Concesionaria Toyota Formosa",
  },
  description:
    "Concesionaria Toyota Formosa: vehículos 0 km, financiación, test drive y postventa. Sitio de demostración para portfolio.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  icons: {
    icon: "/img/toyotaLogo.webp",
    apple: "/img/toyotaLogo.webp",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Concesionaria Toyota Formosa",
    title: "Concesionaria Toyota Formosa",
    description:
      "Vehículos 0 km, financiación, test drive y postventa en Formosa, Argentina.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e4002b",
};

/**
 * Layout global de la aplicación pública.
 * Shell: Navbar → Main (children) → Footer.
 * Los datos de contacto se passan como props a Navbar/Footer
 * cuando se conecten a SiteSettings (FASE 6+).
 */
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "single" },
  });

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar
          businessName={settings?.businessName || "Toyota Formosa"}
          whatsappNumber={settings?.whatsapp ?? undefined}
          logoUrl={settings?.logoUrl ?? "/img/toyotaLogoRojoConTexto.webp"}
        />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer
          businessName={settings?.businessName || "Toyota Formosa"}
          address={settings?.address ?? undefined}
          phone={settings?.phone ?? undefined}
          whatsapp={settings?.whatsapp ?? undefined}
          email={settings?.email ?? undefined}
          hours={settings?.hours ?? undefined}
          instagram={settings?.instagram || undefined}
          facebook={settings?.facebook || undefined}
          tiktok={settings?.tiktok || undefined}
          legalText={settings?.legalText ?? undefined}
        />
        <MobileBottomActions />
        <DemoBadge />
        <Toaster />
      </body>
    </html>
  );
}
