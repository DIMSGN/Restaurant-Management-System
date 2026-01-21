import { useState, useEffect, useCallback, useMemo } from "react";
import {
  getAllRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "@/services/recipeService";
import { getAllProducts } from "@/services/productService";
import type { Recipe, Product } from "@/types";
import type { ApiError } from "@/services/api";
import { toast } from "sonner";

export interface Ingredient {
  productId: number;
  amount: number;
}

export interface RecipeFormData {
  name: string;
  description: string;
  salePrice: number;
  ingredients: Ingredient[];
}

const initialFormData: RecipeFormData = {
  name: "",
  description: "",
  salePrice: 0,
  ingredients: [],
};

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<RecipeFormData>(initialFormData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [ingredientAmount, setIngredientAmount] = useState(1);

  const productMap = useMemo(() => 
    new Map(products.map(p => [p.id, p])), 
    [products]
  );

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [recipesData, productsData] = await Promise.all([
        getAllRecipes(),
        getAllProducts(),
      ]);
      setRecipes(recipesData);
      setProducts(productsData);
      setError("");
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const message = apiError.message || "Failed to load data";
      setError(message);
      toast.error(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.ingredients.length === 0) {
      const message = "Please add at least one ingredient";
      setError(message);
      toast.error(message);
      return;
    }

    try {
      if (editingId) {
        const updated = await updateRecipe(editingId, formData);
        setRecipes(prev => prev.map(r => r.id === editingId ? updated : r));
        toast.success("Recipe updated successfully");
      } else {
        const created = await createRecipe(formData);
        setRecipes(prev => [...prev, created]);
        toast.success("Recipe created successfully");
      }
      resetForm();
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const message = apiError.message || "Failed to save recipe";
      setError(message);
      toast.error(message);
      console.error(err);
    }
  }, [editingId, formData]);

  const handleDelete = useCallback(async (id: number) => {
    const previousRecipes = recipes;
    
    setRecipes(prev => prev.filter(r => r.id !== id));
    toast.success("Recipe deleted");

    try {
      await deleteRecipe(id);
    } catch (err: unknown) {
      setRecipes(previousRecipes);
      const apiError = err as ApiError;
      const message = apiError.message || "Failed to delete recipe";
      setError(message);
      toast.error(message);
      console.error(err);
    }
  }, [recipes]);

  const handleEdit = useCallback((recipe: Recipe) => {
    setEditingId(recipe.id);
    setFormData({
      name: recipe.name,
      description: recipe.description,
      salePrice: recipe.salePrice,
      ingredients: recipe.ingredients.map((ing) => ({
        productId: ing.productId,
        amount: ing.amount,
      })),
    });
    setError("");
    toast.info("Editing recipe");
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setEditingId(null);
    setSelectedProductId(0);
    setIngredientAmount(1);
    setError("");
  }, []);

  const updateField = useCallback((field: keyof RecipeFormData, value: string | number | Ingredient[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const addIngredient = useCallback(() => {
    if (selectedProductId === 0) {
      toast.error("Please select a product");
      return;
    }

    const alreadyAdded = formData.ingredients.some(
      (i) => i.productId === selectedProductId
    );
    if (alreadyAdded) {
      const message = "This ingredient is already added";
      setError(message);
      toast.error(message);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { productId: selectedProductId, amount: ingredientAmount },
      ],
    }));

    setSelectedProductId(0);
    setIngredientAmount(1);
    setError("");
    toast.success("Ingredient added");
  }, [selectedProductId, ingredientAmount, formData.ingredients]);

  const removeIngredient = useCallback((productId: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((i) => i.productId !== productId),
    }));
    toast.success("Ingredient removed");
  }, []);

  const getProductById = useCallback((productId: number): Product | undefined => {
    return productMap.get(productId);
  }, [productMap]);

  return {
    recipes,
    products,
    loading,
    error,
    formData,
    editingId,
    selectedProductId,
    ingredientAmount,
    setSelectedProductId,
    setIngredientAmount,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    updateField,
    addIngredient,
    removeIngredient,
    getProductById,
  };
}
