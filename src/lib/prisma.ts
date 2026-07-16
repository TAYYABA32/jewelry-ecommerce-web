import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "@/generated/prisma";

declare global {
  var prismaGlobal: PrismaClient | undefined;
  var prismaPoolGlobal: Pool | undefined;
}

function createPrismaClient() {
  const pool =
    globalThis.prismaPoolGlobal ??
    new Pool({ connectionString: process.env.DATABASE_URL });

  if (process.env.NODE_ENV !== "production") {
    globalThis.prismaPoolGlobal = pool;
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalThis.prismaGlobal ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
