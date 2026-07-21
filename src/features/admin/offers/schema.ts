import { z } from "zod";

export const couponFormSchema = z
  .object({
    code: z
      .string()
      .min(3, "Code must be at least 3 characters.")
      .max(32),
    type: z.enum(["PERCENTAGE", "FIXED"]),
    value: z.number().positive("Value must be greater than 0."),
    minPurchase: z.number().nonnegative().optional(),
    maxDiscount: z.number().positive().optional(),
    usageLimit: z.number().int().positive().optional(),
    startsAt: z.string().min(1, "Start date is required."),
    expiresAt: z.string().min(1, "Expiry date is required."),
  })
  .refine((data) => new Date(data.expiresAt) > new Date(data.startsAt), {
    message: "Expiry date must be after the start date.",
    path: ["expiresAt"],
  })
  .refine(
    (data) => data.type !== "PERCENTAGE" || data.value <= 100,
    { message: "Percentage discounts cannot exceed 100.", path: ["value"] },
  );

export type CouponFormValues = z.infer<typeof couponFormSchema>;
