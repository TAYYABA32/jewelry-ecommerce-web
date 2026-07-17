import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Prisma 7 (no-rust-engine): the CLI (migrate, studio, db push) connects
// through this config. We point it at the direct (non-pooled) connection
// since DDL/migrations must bypass Supabase's pgbouncer transaction pool.
// The app's runtime PrismaClient (src/lib/prisma.ts) uses the pooled
// DATABASE_URL instead, via the @prisma/adapter-pg driver adapter.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
