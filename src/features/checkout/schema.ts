import { z } from "zod";

export const PAYMENT_METHODS = [
  { value: "COD", label: "Cash on Delivery (COD)", disabled: false },
  { value: "CARD", label: "Card — coming soon", disabled: true },
] as const;

export const checkoutDetailsSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name.")
    .max(100, "Name is too long."),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number.")
    .max(20, "Phone number is too long."),
  addressLine1: z
    .string()
    .min(5, "Please enter your shipping address.")
    .max(200, "Address is too long."),
  city: z
    .string()
    .min(2, "Please enter your city.")
    .max(100, "City is too long."),
  state: z
    .string()
    .min(2, "Please enter your state or province.")
    .max(100, "State is too long."),
  postalCode: z
    .string()
    .min(3, "Please enter a valid postal code.")
    .max(20, "Postal code is too long."),
  country: z
    .string()
    .min(2, "Please enter your country.")
    .max(100, "Country is too long."),
  paymentMethod: z.enum(["COD", "CARD"]),
});

export type CheckoutDetailsValues = z.infer<typeof checkoutDetailsSchema>;

const cartItemInputSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

export const checkoutInputSchema = checkoutDetailsSchema.extend({
  items: z.array(cartItemInputSchema).min(1, "Your cart is empty."),
});

export type CheckoutInput = z.infer<typeof checkoutInputSchema>;
