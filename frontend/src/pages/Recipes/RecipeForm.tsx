import type { FormEvent } from "react";
import type { Product } from "@/types";
import type { RecipeFormData, Ingredient } from "./useRecipes";
import IngredientsList from "./IngredientsList";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleField } from "@/components/FormFields";
import { IngredientSelector } from "@/components/IngredientSelector";

interface RecipeFormProps {
  formData: RecipeFormData;
  editingId: number | null;
  products: Product[];
  selectedProductId: number;
  ingredientAmount: number;
  onProductSelect: (id: number) => void;
  onAmountChange: (amount: number) => void;
  onAddIngredient: () => void;
  onRemoveIngredient: (productId: number) => void;
  getProductById: (id: number) => Product | undefined;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  onFieldChange: (field: keyof RecipeFormData, value: string | number | Ingredient[]) => void;
}

function RecipeForm({
  formData,
  editingId,
  products,
  selectedProductId,
  ingredientAmount,
  onProductSelect,
  onAmountChange,
  onAddIngredient,
  onRemoveIngredient,
  getProductById,
  onSubmit,
  onCancel,
  onFieldChange,
}: RecipeFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingId ? "Edit Recipe" : "Add New Recipe"}</CardTitle>
        <CardDescription>
          {editingId ? "Update recipe details and ingredients" : "Create a new recipe with ingredients"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <SimpleField
              label="Name"
              name="name"
              value={formData.name}
              onChange={(val) => onFieldChange("name", val)}
              required
            />
            <SimpleField
              label="Sale Price (€)"
              name="salePrice"
              type="number"
              step="0.01"
              min="0"
              value={formData.salePrice}
              onChange={(val) => onFieldChange("salePrice", parseFloat(val) || 0)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => onFieldChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add products that make up this recipe
              </p>
            </div>
            
            <IngredientSelector
              products={products}
              selectedProductId={selectedProductId}
              amount={ingredientAmount}
              onProductSelect={onProductSelect}
              onAmountChange={onAmountChange}
              onAdd={onAddIngredient}
            />

            <IngredientsList
              ingredients={formData.ingredients}
              getProductById={getProductById}
              onRemove={onRemoveIngredient}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 sm:flex-none">
              {editingId ? "Update Recipe" : "Create Recipe"}
            </Button>
            {editingId && (
              <Button type="button" onClick={onCancel} variant="outline">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default RecipeForm;
