import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Crea la instancia de PrismaClient usando el driver adapter adecuado
 * según el proveedor de base de datos (SQLite en dev, PostgreSQL en prod).
 * Ambos adapters se importan; se elige por la URL. Mantiene el código
 * neutral a la base para migrar sin reescritura.
 */
function createPrismaClient() {
  const url = process.env.DATABASE_URL ?? "";

  if (url.startsWith("postgres") || url.startsWith("postgresql")) {
    const adapter = new PrismaPg({ connectionString: url });
    return new PrismaClient({ adapter });
  }

  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
