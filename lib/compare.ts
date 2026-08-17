/**
 * Estado del comparador de vehículos (persistido en localStorage del navegador).
 * Solo se usa desde Client Components; estas funciones no se ejecutan en el servidor.
 */

export type CompareItem = {
  slug: string;
  model: string;
  mainImage?: string | null;
};

export const COMPARE_KEY = "toyota:compare";
export const COMPARE_MAX = 3;

/** Mini-store para que los componentes reaccionen a cambios del comparador. */
const compareListeners = new Set<() => void>();

function emit(): void {
  compareListeners.forEach((l) => l());
}

export function subscribeCompare(listener: () => void): () => void {
  compareListeners.add(listener);
  try {
    window.addEventListener("storage", listener);
  } catch {
    // sin acceso a window (SSR) — solo se suscribe en el cliente
  }
  return () => {
    compareListeners.delete(listener);
    try {
      window.removeEventListener("storage", listener);
    } catch {
      // ignorar
    }
  };
}

/** Snapshot estable de los ítems (misma referencia si no cambió el contenido). */
let cachedSnapshot: CompareItem[] = [];

export function getCompareSnapshot(): CompareItem[] {
  const current = readCompare();
  if (
    cachedSnapshot.length !== current.length ||
    cachedSnapshot.some((item, i) => item.slug !== current[i]?.slug)
  ) {
    cachedSnapshot = current;
  }
  return cachedSnapshot;
}

export function readCompare(): CompareItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(COMPARE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, COMPARE_MAX) as CompareItem[];
  } catch {
    return [];
  }
}

function persist(items: CompareItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      COMPARE_KEY,
      JSON.stringify(items.slice(0, COMPARE_MAX)),
    );
    emit();
  } catch {
    // almacenamiento no disponible (modo privado) — se ignora
  }
}

/** Alterna un vehículo en el comparador. Si está lleno, reemplaza el más antiguo. */
export function toggleCompare(item: CompareItem): CompareItem[] {
  const items = readCompare();
  const exists = items.some((i) => i.slug === item.slug);
  let next: CompareItem[];
  if (exists) {
    next = items.filter((i) => i.slug !== item.slug);
  } else if (items.length >= COMPARE_MAX) {
    next = [...items.slice(1), item];
  } else {
    next = [...items, item];
  }
  persist(next);
  return next;
}

export function removeCompare(slug: string): CompareItem[] {
  const next = readCompare().filter((i) => i.slug !== slug);
  persist(next);
  return next;
}

export function clearCompare(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(COMPARE_KEY);
    emit();
  } catch {
    // ignorar
  }
}
