import type { Recipe } from "@/types";
import { formatPrice } from "@/utils/formatters";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks";

interface RecipeListProps {
  recipes: Recipe[];
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: number) => void;
}

function RecipeList({ recipes, onEdit, onDelete }: RecipeListProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">
          No recipes found. Create your first recipe above.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Sale Price</TableHead>
            <TableHead>Ingredients</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={recipe.id}>
              <TableCell className="font-medium">{recipe.name}</TableCell>
              <TableCell className="max-w-xs truncate">{recipe.description}</TableCell>
              <TableCell>{formatPrice(recipe.salePrice)}</TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm">
                  {recipe.ingredients.map((ing) => (
                    <li key={ing.productId} className="text-muted-foreground">
                      {ing.productName} ({ing.amount} {ing.unit})
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => onEdit(recipe)}
                    variant="ghost"
                    size="sm"
                    disabled={!isAdmin}
                    title={isAdmin ? "Edit Recipe" : "Only ADMIN can edit recipes"}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => onDelete(recipe.id)}
                    variant="ghost"
                    size="sm"
                    disabled={!isAdmin}
                    title={isAdmin ? "Delete Recipe" : "Only ADMIN can delete recipes"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RecipeList;
