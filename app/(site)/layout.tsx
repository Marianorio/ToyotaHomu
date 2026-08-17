import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DemoBadge } from "@/components/layout/DemoBadge";
import { MobileBottomActions } from "@/components/layout/mobile-bottom-actions";
import { prisma } from "@/lib/db";

/**
 * Layout del sitio público (route group (site)).
 * Shell: Navbar → Main (children) → Footer.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "single" },
  });

  return (
    <div className="flex min-h-full flex-col">
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
    </div>
  );
}