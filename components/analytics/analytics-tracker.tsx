"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getVehicleSlug(path: string): string | null {
  const m = path.match(/^\/(vehiculos|usados)\/([^/?#]+)/);
  return m ? m[2] : null;
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    // Evita doble envío por StrictMode / re-render idéntico
    if (lastSent.current === pathname) return;
    lastSent.current = pathname;

    const payload = JSON.stringify({
      path: pathname,
      vehicleSlug: getVehicleSlug(pathname),
      referrer: document.referrer ? document.referrer.slice(0, 500) : null,
    });

    const url = "/api/analytics/track";

    // sendBeacon es ideal: no bloquea navegación y funciona al cerrar pestaña
    if (navigator.sendBeacon) {
      try {
        const blob = new Blob([payload], { type: "application/json" });
        const sent = navigator.sendBeacon(url, blob);
        if (sent) return;
      } catch {
        // fallback a fetch
      }
    }

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {
      // silencia errores de red
    });
  }, [pathname]);

  return null;
}
