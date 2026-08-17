import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { UserForm } from "@/components/admin/user-form";
import { prisma } from "@/lib/db";
import { requireAdminPage } from "@/lib/session";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireAdminPage();
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) notFound();

  return (
    <div>
      <AdminPageHeader title={`Editar ${user.name}`} description="Modificá los datos del asesor" />
      <UserForm
        initial={{
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          photo: user.photo,
          isActive: user.isActive,
        }}
        submitLabel="Guardar cambios"
        passwordHelper="Dejá vacío para no cambiarla"
      />
    </div>
  );
}