import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { HomeContentForm } from "@/components/admin/home-content-form";
import { prisma } from "@/lib/db";
import { requireAdminPage } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminContenidoHomePage() {
  await requireAdminPage();
  const home = await prisma.homePage.findUnique({ where: { id: "single" } });

  return (
    <div>
      <AdminPageHeader
        title="Contenido de la home"
        description="Editá el hero y la selección de contenido de la portada"
      />
      <HomeContentForm
        initial={
          home
            ? {
                heroTitle: home.heroTitle,
                heroSubtitle: home.heroSubtitle,
                heroCtaText: home.heroCtaText,
                heroImage: home.heroImage,
                heroVideo: home.heroVideo,
                featuredVehicleIds: home.featuredVehicleIds,
                trendingVehicleIds: home.trendingVehicleIds,
                featuredPromotionIds: home.featuredPromotionIds,
                bannerIds: home.bannerIds,
                social: home.social,
              }
            : undefined
        }
      />
    </div>
  );
}