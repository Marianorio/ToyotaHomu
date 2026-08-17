import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { SettingsForm } from "@/components/admin/settings-form";
import { prisma } from "@/lib/db";
import { requireAdminPage } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminConfiguracionPage() {
  await requireAdminPage();
  const settings = await prisma.siteSettings.findUnique({ where: { id: "single" } });

  return (
    <div>
      <AdminPageHeader
        title="Configuración del sitio"
        description="Datos de contacto, identidad y marca que se muestran en todo el sitio"
      />
      <SettingsForm
        initial={
          settings
            ? {
                businessName: settings.businessName,
                legalName: settings.legalName,
                logoUrl: settings.logoUrl,
                faviconUrl: settings.faviconUrl,
                phone: settings.phone,
                whatsapp: settings.whatsapp,
                email: settings.email,
                address: settings.address,
                hours: settings.hours,
                instagram: settings.instagram,
                facebook: settings.facebook,
                tiktok: settings.tiktok,
                mapsUrl: settings.mapsUrl,
                primaryColor: settings.primaryColor,
                secondaryColor: settings.secondaryColor,
                legalText: settings.legalText,
              }
            : undefined
        }
      />
    </div>
  );
}