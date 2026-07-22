"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { CONTACT_EMAIL, SITE_NAME } from "@/constants/site";
import {
  type AdminPasswordValues,
  type NotificationSettingsValues,
  type PaymentSettingsValues,
  type ShippingSettingsValues,
  type StoreDetailsValues,
  adminPasswordSchema,
  notificationSettingsSchema,
  paymentSettingsSchema,
  shippingSettingsSchema,
  storeDetailsSchema,
} from "@/features/admin/settings/schema";
import { SETTINGS_ID } from "@/services/admin/settings-service";

const DEFAULT_SETTINGS = { storeName: SITE_NAME, supportEmail: CONTACT_EMAIL };

type FieldErrors<T> = Partial<Record<keyof T, string[]>>;

function fieldErrors<T>(error: {
  flatten: () => { fieldErrors: FieldErrors<T> };
}) {
  return error.flatten().fieldErrors;
}

export async function updateStoreDetails(input: unknown) {
  await requireAdmin();

  const parsed = storeDetailsSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      error: fieldErrors<StoreDetailsValues>(parsed.error),
    };
  }

  await prisma.storeSettings.upsert({
    where: { id: SETTINGS_ID },
    update: parsed.data,
    create: { id: SETTINGS_ID, ...parsed.data },
  });

  revalidatePath("/admin/settings");
  return { success: true as const };
}

export async function updateShippingSettings(input: unknown) {
  await requireAdmin();

  const parsed = shippingSettingsSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      error: fieldErrors<ShippingSettingsValues>(parsed.error),
    };
  }

  await prisma.storeSettings.upsert({
    where: { id: SETTINGS_ID },
    update: parsed.data,
    create: { id: SETTINGS_ID, ...DEFAULT_SETTINGS, ...parsed.data },
  });

  revalidatePath("/admin/settings");
  return { success: true as const };
}

export async function updatePaymentSettings(input: unknown) {
  await requireAdmin();

  const parsed = paymentSettingsSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      error: fieldErrors<PaymentSettingsValues>(parsed.error),
    };
  }

  await prisma.storeSettings.upsert({
    where: { id: SETTINGS_ID },
    update: parsed.data,
    create: { id: SETTINGS_ID, ...DEFAULT_SETTINGS, ...parsed.data },
  });

  revalidatePath("/admin/settings");
  return { success: true as const };
}

export async function updateNotificationSettings(input: unknown) {
  await requireAdmin();

  const parsed = notificationSettingsSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      error: fieldErrors<NotificationSettingsValues>(parsed.error),
    };
  }

  await prisma.storeSettings.upsert({
    where: { id: SETTINGS_ID },
    update: parsed.data,
    create: { id: SETTINGS_ID, ...DEFAULT_SETTINGS, ...parsed.data },
  });

  revalidatePath("/admin/settings");
  return { success: true as const };
}

export async function updateAdminPassword(input: unknown) {
  const admin = await requireAdmin();

  const parsed = adminPasswordSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      error: fieldErrors<AdminPasswordValues>(parsed.error),
    };
  }

  const client = await clerkClient();
  await client.users.updateUser(admin.clerkId, {
    password: parsed.data.newPassword,
  });

  return { success: true as const };
}
