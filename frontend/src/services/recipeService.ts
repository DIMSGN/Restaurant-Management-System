import api from "./api";
import type { Recipe } from "@/types";

export const getAllRecipes = async (): Promise<Recipe[]> => {
  const response = await api.get<Recipe[]>("/recipes");
  return response.data;
};

export const getRecipeById = async (id: number): Promise<Recipe> => {
  const response = await api.get<Recipe>(`/recipes/${id}`);
  return response.data;
};

export const createRecipe = async (recipe: {
  name: string;
  description: string;
  salePrice: number;
  ingredients: { productId: number; amount: number }[];
}): Promise<Recipe> => {
  const response = await api.post<Recipe>("/recipes", recipe);
  return response.data;
};

export const updateRecipe = async (
  id: number,
  recipe: {
    name: string;
    description: string;
    salePrice: number;
    ingredients: { productId: number; amount: number }[];
  }
): Promise<Recipe> => {
  const response = await api.put<Recipe>(`/recipes/${id}`, recipe);
  return response.data;
};

export const deleteRecipe = async (id: number): Promise<void> => {
  await api.delete(`/recipes/${id}`);
};
