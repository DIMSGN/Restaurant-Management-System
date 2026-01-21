import { z } from "zod";

export const productSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100, "Name too long"),
    category: z.string().min(1, "Category is required").max(50, "Category too long"),
    unit: z.enum(["kg", "liters", "pieces", "grams", "ml"], {
      message: "Please select a valid unit",
    }),
    stock: z.number().nonnegative("Stock cannot be negative"),
    purchasePrice: z.number().positive("Purchase price must be greater than 0"),
    salePrice: z.number().positive("Sale price must be greater than 0"),
  })
  .refine((data) => data.salePrice >= data.purchasePrice, {
    message: "Sale price must be greater than or equal to purchase price",
    path: ["salePrice"],
  });

export type ProductFormData = z.infer<typeof productSchema>;
