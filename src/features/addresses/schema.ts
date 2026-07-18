import { z } from "zod";

export const addressSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter a full name.")
    .max(100, "Name is too long."),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number.")
    .max(20, "Phone number is too long."),
  line1: z
    .string()
    .min(5, "Please enter your street address.")
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
});

export type AddressFormValues = z.infer<typeof addressSchema>;
