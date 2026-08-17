import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { UserForm } from "@/components/admin/user-form";
import { requireAdminPage } from "@/lib/session";

export default async function NewUserPage() {
  await requireAdminPage();
  return (
    <div>
      <AdminPageHeader
        title="Nuevo asesor"
        description="Creá un usuario para acceder al panel"
      />
      <UserForm />
    </div>
  );
}