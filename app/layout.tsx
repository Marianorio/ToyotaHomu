import type { Metadata, Viewport } from "next";
import { Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const roundedSans = Nunito({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const roundedMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
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
 * Layout raíz compartido por todo el sitio (público y admin).
 * Solo infraestructura global: HTML, fuentes, providers y toasts.
 * El crome público (Navbar/Footer) vive en (site)/layout.tsx
 * y el shell del panel (sidebar) en (admin)/layout.tsx.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${roundedSans.variable} ${roundedMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}