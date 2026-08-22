"use client";

import Link from "next/link";
import { Car, FileText, TestTube, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion";

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
      className="relative -mt-8 z-20"
      aria-label="Accesos rápidos"
    >
      <Container>
        <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
              <div className="flex flex-col items-center gap-2.5 rounded-xl border bg-card p-5 text-center shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/20">
                <div className={`flex size-11 items-center justify-center rounded-full ${action.color}`}>
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </div>
            );

            const wrapper = action.external ? (
              <a
                key={action.label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            ) : (
              <Link key={action.label} href={href}>
                {content}
              </Link>
            );

            return <StaggerItem key={action.label}>{wrapper}</StaggerItem>;
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
