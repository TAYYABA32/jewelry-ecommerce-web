"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { type AddressFormValues, addressSchema } from "@/features/addresses/schema";

type AddressFieldErrors = Partial<Record<keyof AddressFormValues, string[]>> & {
  _root?: string[];
};

async function requireLocalUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  const email = clerkUser?.primaryEmailAddress?.emailAddress;
  if (!email) return null;

  return prisma.user.upsert({
    where: { clerkId: userId },
    update: {},
    create: {
      clerkId: userId,
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
    },
  });
}

export async function createAddress(input: unknown) {
  const parsed = addressSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.flatten().fieldErrors as AddressFieldErrors,
    };
  }

  const user = await requireLocalUser();
  if (!user) {
    return {
      success: false as const,
      error: { _root: ["You must be signed in to save an address."] } as AddressFieldErrors,
    };
  }

  await prisma.address.create({
    data: { userId: user.id, ...parsed.data },
  });

  revalidatePath("/addresses");
  return { success: true as const };
}

export async function updateAddress(addressId: string, input: unknown) {
  const parsed = addressSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.flatten().fieldErrors as AddressFieldErrors,
    };
  }

  const user = await requireLocalUser();
  if (!user) {
    return {
      success: false as const,
      error: { _root: ["You must be signed in to update an address."] } as AddressFieldErrors,
    };
  }

  const existing = await prisma.address.findFirst({
    where: { id: addressId, userId: user.id, deletedAt: null },
  });
  if (!existing) {
    return {
      success: false as const,
      error: { _root: ["This address could not be found."] } as AddressFieldErrors,
    };
  }

  await prisma.address.update({
    where: { id: addressId },
    data: parsed.data,
  });

  revalidatePath("/addresses");
  return { success: true as const };
}

export async function deleteAddress(addressId: string) {
  const user = await requireLocalUser();
  if (!user) return { success: false as const };

  const existing = await prisma.address.findFirst({
    where: { id: addressId, userId: user.id, deletedAt: null },
  });
  if (!existing) return { success: false as const };

  await prisma.address.update({
    where: { id: addressId },
    data: { deletedAt: new Date() },
  });

  revalidatePath("/addresses");
  return { success: true as const };
}
