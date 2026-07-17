import { z } from "zod";

export const INQUIRY_TYPES = [
  { value: "BRIDAL_CONSULTATION", label: "Bridal Consultation" },
  { value: "CUSTOM_ORDER", label: "Custom Order" },
  { value: "GENERAL", label: "General Inquiry" },
  { value: "PRESS", label: "Press" },
] as const;

export const consultationSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name.")
    .max(100, "Name is too long."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number.")
    .max(20, "Phone number is too long."),
  preferredDate: z.string().optional().or(z.literal("")),
  inquiryType: z.enum([
    "BRIDAL_CONSULTATION",
    "CUSTOM_ORDER",
    "GENERAL",
    "PRESS",
  ]),
  message: z
    .string()
    .min(10, "Please tell us a little more (10 characters minimum).")
    .max(2000, "Message is too long."),
});

export type ConsultationFormValues = z.infer<typeof consultationSchema>;
