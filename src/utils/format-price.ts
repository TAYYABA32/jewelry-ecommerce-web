import type { Prisma } from "@/generated/prisma";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPrice(value: number | string | Prisma.Decimal) {
  const amount = typeof value === "number" ? value : Number(value.toString());
  return formatter.format(amount);
}
