import { PrismaClient } from '@prisma/client';

// This prevents multiple instances of Prisma Client in development due to hot reloading.
// In production, this will always be a new instance.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

console.log("[server/db.ts] Initializing Prisma Client...");
console.log("[server/db.ts] DATABASE_URL from process.env:", process.env.DATABASE_URL ? "SET" : "NOT SET or undefined");
if (process.env.DATABASE_URL) {
  console.log("[server/db.ts] DATABASE_URL value (first 10 chars):", process.env.DATABASE_URL.substring(0,10) + "...");
} else {
  console.error("[server/db.ts] CRITICAL: DATABASE_URL is not available in process.env at the point of PrismaClient instantiation!");
}

const prisma = global.prisma || new PrismaClient({
  // Optional: Uncomment to log Prisma queries
  // log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma; 