import { z } from "zod";

export const recipeIngredientSchema = z.object({
  productId: z.number().positive("Please select a product"),
  productName: z.string(),
  amount: z.number().positive("Amount must be greater than 0"),
  unit: z.string().optional(),
});

export const recipeSchema = z.object({
  name: z.string().min(1, "Recipe name is required").max(100, "Name too long"),
  description: z.string().max(500, "Description too long").optional(),
  salePrice: z.number().positive("Sale price must be greater than 0"),
  ingredients: z.array(recipeIngredientSchema).min(1, "At least one ingredient is required"),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;
export type RecipeIngredient = z.infer<typeof recipeIngredientSchema>;
