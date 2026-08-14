"use client";

import * as React from "react";

/**
 * Bloquea el scroll del body. Guarda y restaura la posición al desbloquear.
 * Respeta prefers-reduced-motion (no fuerza transiciones).
 */
export function useScrollLock() {
  const locked = React.useRef(false);
  const savedY = React.useRef(0);

  const lock = React.useCallback(() => {
    if (locked.current) return;
    savedY.current = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedY.current}px`;
    document.body.style.width = "100%";
    locked.current = true;
  }, []);

  const unlock = React.useCallback(() => {
    if (!locked.current) return;
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, savedY.current);
    locked.current = false;
  }, []);

  React.useEffect(() => {
    return () => {
      if (locked.current) {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
      }
    };
  }, []);

  return { lock, unlock };
}
