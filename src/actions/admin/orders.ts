"use server";

import { revalidatePath } from "next/cache";

import { ADMIN_ORDER_STATUSES } from "@/constants/admin";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ADMIN_ORDER_STATUSES.map((s) => s.value);

export async function updateOrderStatus(orderId: string, status: string) {
  await requireAdmin();

  if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
    return { success: false as const };
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as (typeof VALID_STATUSES)[number] },
  });

  revalidatePath("/admin/orders");
  return { success: true as const };
}
