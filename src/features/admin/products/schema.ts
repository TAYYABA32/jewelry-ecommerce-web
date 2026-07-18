import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(2, "Please enter a product name.").max(200),
  price: z.number().positive("Price must be greater than 0."),
  categoryId: z.string().uuid("Please select a category."),
  occasion: z.string().optional(),
  material: z.string().min(2, "Please enter the material.").max(100),
  description: z
    .string()
    .min(10, "Please enter a longer description.")
    .max(5000),
  imageUrl: z.string().url("Please enter a valid image URL."),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
