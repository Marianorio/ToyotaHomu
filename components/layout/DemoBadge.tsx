import { DEMO_LABEL, isDemoMode } from "@/lib/demo";

/**
 * Insignia discreta "DEMO / Portfolio" visible sólo cuando el modo demo está
 * activo. Diseñada para no romper la estética premium.
 */
export function DemoBadge() {
  if (!isDemoMode) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[100] flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
      <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
      {DEMO_LABEL}
    </div>
  );
}
