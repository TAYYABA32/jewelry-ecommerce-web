import { z } from "zod";

export const storeDetailsSchema = z.object({
  storeName: z.string().min(2, "Please enter a store name.").max(100),
  supportEmail: z.string().email("Please enter a valid email address."),
  supportWhatsapp: z.string().optional(),
  currency: z.enum(["PKR", "USD"]),
});

export const shippingSettingsSchema = z.object({
  standardShippingRate: z.number().nonnegative("Must be 0 or greater."),
  freeShippingThreshold: z.number().nonnegative("Must be 0 or greater."),
  estimatedDeliveryDays: z
    .string()
    .min(1, "Please enter an estimate.")
    .max(50),
});

export const paymentSettingsSchema = z.object({
  codEnabled: z.boolean(),
  bankName: z.string().optional(),
  bankAccountTitle: z.string().optional(),
  bankIban: z.string().optional(),
});

export const notificationSettingsSchema = z.object({
  orderEmailNotifications: z.boolean(),
});

export const adminPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type StoreDetailsValues = z.infer<typeof storeDetailsSchema>;
export type ShippingSettingsValues = z.infer<typeof shippingSettingsSchema>;
export type PaymentSettingsValues = z.infer<typeof paymentSettingsSchema>;
export type NotificationSettingsValues = z.infer<
  typeof notificationSettingsSchema
>;
export type AdminPasswordValues = z.infer<typeof adminPasswordSchema>;

export const CURRENCIES = [
  { value: "PKR", label: "PKR — Pakistani Rupee" },
  { value: "USD", label: "USD — US Dollar" },
] as const;
