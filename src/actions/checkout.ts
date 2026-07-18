"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";
import {
  type CheckoutInput,
  checkoutInputSchema,
} from "@/features/checkout/schema";
import { getProductsByIds } from "@/services/product-service";

type CheckoutFieldErrors = Partial<Record<keyof CheckoutInput, string[]>> & {
  _root?: string[];
};

export async function submitCheckout(input: unknown) {
  const parsed = checkoutInputSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.flatten().fieldErrors as CheckoutFieldErrors,
    };
  }

  const { userId } = await auth();
  if (!userId) {
    return {
      success: false as const,
      error: {
        _root: ["You must be signed in to place an order."],
      } as CheckoutFieldErrors,
    };
  }

  const clerkUser = await currentUser();
  const email = clerkUser?.primaryEmailAddress?.emailAddress;
  if (!email) {
    return {
      success: false as const,
      error: {
        _root: ["Could not verify your account email."],
      } as CheckoutFieldErrors,
    };
  }

  const {
    items,
    paymentMethod,
    fullName,
    phone,
    addressLine1,
    city,
    state,
    postalCode,
    country,
  } = parsed.data;

  const products = await getProductsByIds(items.map((item) => item.productId));

  const orderItemsData = items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return [];
    const price = product.discountPrice ?? product.price;
    return [
      {
        productId: product.id,
        productName: product.name,
        productImage: product.images[0]?.url ?? null,
        price,
        quantity: item.quantity,
      },
    ];
  });

  if (orderItemsData.length === 0) {
    return {
      success: false as const,
      error: {
        _root: ["Your cart items are no longer available."],
      } as CheckoutFieldErrors,
    };
  }

  const subtotal = orderItemsData.reduce(
    (sum, item) => sum + Number(item.price.toString()) * item.quantity,
    0,
  );

  const user = await prisma.user.upsert({
    where: { clerkId: userId },
    update: {},
    create: {
      clerkId: userId,
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
    },
  });

  const address = await prisma.address.create({
    data: {
      userId: user.id,
      fullName,
      phone,
      line1: addressLine1,
      city,
      state,
      postalCode,
      country,
    },
  });

  const orderNumber = `AUR-${Date.now().toString(36).toUpperCase()}${Math.floor(
    Math.random() * 900 + 100,
  )}`;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId: user.id,
      shippingAddressId: address.id,
      subtotal,
      totalAmount: subtotal,
      paymentMethod,
      items: { create: orderItemsData },
    },
  });

  return { success: true as const, orderNumber: order.orderNumber };
}
