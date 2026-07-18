import { z } from "zod";

export const PAYMENT_METHODS = [
  { value: "COD", label: "Cash on Delivery (COD)", disabled: false },
  { value: "CARD", label: "Credit / Debit Card", disabled: false },
] as const;

function luhnCheck(rawValue: string) {
  const digits = rawValue.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function isValidExpiry(rawValue: string) {
  const match = /^(\d{2})\/(\d{2})$/.exec(rawValue);
  if (!match) return false;

  const month = Number(match[1]);
  const year = Number(match[2]) + 2000;
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const firstOfMonthAfterExpiry = new Date(year, month);
  return firstOfMonthAfterExpiry > now;
}

const baseCheckoutSchema = z.object({
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

// Card fields are validated here for a real client-side check, but are
// intentionally never included in checkoutInputSchema below — raw card
// numbers/CVCs are never sent to the server or persisted anywhere.
export const checkoutDetailsSchema = baseCheckoutSchema
  .extend({
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvc: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod !== "CARD") return;

    if (!luhnCheck(data.cardNumber ?? "")) {
      ctx.addIssue({
        code: "custom",
        path: ["cardNumber"],
        message: "Please enter a valid card number.",
      });
    }
    if (!isValidExpiry(data.cardExpiry ?? "")) {
      ctx.addIssue({
        code: "custom",
        path: ["cardExpiry"],
        message: "Please enter a valid expiration date (MM/YY).",
      });
    }
    if (!/^\d{3,4}$/.test(data.cardCvc ?? "")) {
      ctx.addIssue({
        code: "custom",
        path: ["cardCvc"],
        message: "Please enter a valid CVC.",
      });
    }
  });

export type CheckoutDetailsValues = z.infer<typeof checkoutDetailsSchema>;

const cartItemInputSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

export const checkoutInputSchema = baseCheckoutSchema.extend({
  items: z.array(cartItemInputSchema).min(1, "Your cart is empty."),
});

export type CheckoutInput = z.infer<typeof checkoutInputSchema>;
