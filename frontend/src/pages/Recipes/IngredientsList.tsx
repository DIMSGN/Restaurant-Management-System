import type { Product } from "@/types";
import type { Ingredient } from "./useRecipes";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface IngredientsListProps {
  ingredients: Ingredient[];
  getProductById: (id: number) => Product | undefined;
  onRemove: (productId: number) => void;
}

function IngredientsList({ ingredients, getProductById, onRemove }: IngredientsListProps) {
  if (ingredients.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-2">
      <h4 className="text-sm font-medium">Selected Ingredients:</h4>
      <div className="space-y-2">
        {ingredients.map((ing) => {
          const product = getProductById(ing.productId);
          return (
            <div
              key={ing.productId}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <span className="text-sm">
                {product?.name || "Unknown"} - {ing.amount} {product?.unit || ""}
              </span>
              <Button
                type="button"
                onClick={() => onRemove(ing.productId)}
                variant="ghost"
                size="sm"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IngredientsList;
