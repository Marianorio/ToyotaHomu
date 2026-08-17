/**
 * Utilidades de formato para moneda ARS y datos de vehículos.
 */

export function formatARS(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "Consultar precio";
  }
  const num =
    typeof value === "number" ? value : Number(String(value));
  if (Number.isNaN(num)) return "Consultar precio";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatKilometers(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "Consultar";
  }
  return new Intl.NumberFormat("es-AR").format(value) + " km";
}
