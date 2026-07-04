import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

function getDirectUrl(url: string | undefined): string {
  if (!url) return "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable";
  if (url.startsWith("prisma+postgres://")) {
    try {
      const urlObj = new URL(url);
      const apiKey = urlObj.searchParams.get("api_key");
      if (apiKey) {
        const decoded = JSON.parse(Buffer.from(apiKey, "base64").toString("utf-8"));
        if (decoded.databaseUrl) return decoded.databaseUrl;
      }
    } catch (e) {
      console.warn("Failed to decode prisma+postgres url api_key, falling back to localhost:51214");
    }
    return "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable";
  }
  return url;
}

const connectionString = getDirectUrl(process.env.DATABASE_URL);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

const pool = globalForPrisma.pool ?? new Pool({ connectionString });
if (process.env.NODE_ENV !== "production") globalForPrisma.pool = pool;

const adapter = new PrismaPg(pool);
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
