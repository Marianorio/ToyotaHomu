import Link from "next/link";
import { Car, FileText, TestTube, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { generateWhatsAppUrl } from "@/lib/whatsapp";

const actions = [
  {
    label: "Vehículos",
    href: "/vehiculos",
    icon: Car,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Cotizar",
    href: "/cotizar",
    icon: FileText,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Test Drive",
    href: "/test-drive",
    icon: TestTube,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "WhatsApp",
    href: null,
    icon: MessageCircle,
    color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    external: true,
  },
];

type QuickActionsProps = {
  whatsappNumber?: string;
};

export function QuickActions({ whatsappNumber }: QuickActionsProps) {
  return (
    <section
      id="quick-actions"
      className="relative z-20 bg-background"
      aria-label="Accesos rápidos"
    >
      <Container className="-mt-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pb-8">
          {actions.map((action) => {
            const Icon = action.icon;
            const href =
              action.external
                ? generateWhatsAppUrl(
                    "Hola, tengo una consulta.",
                    whatsappNumber,
                  )
                : action.href!;

            const content = (
              <div className="flex flex-col items-center gap-2.5 rounded-xl border bg-card p-5 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className={`flex size-11 items-center justify-center rounded-full ${action.color}`}>
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </div>
            );

            if (action.external) {
              return (
                <a
                  key={action.label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={action.label} href={href}>
                {content}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
