import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface IngredientSelectorProps {
  products: Product[];
  selectedProductId: number;
  amount: number;
  onProductSelect: (id: number) => void;
  onAmountChange: (amount: number) => void;
  onAdd: () => void;
}

export function IngredientSelector({
  products,
  selectedProductId,
  amount,
  onProductSelect,
  onAmountChange,
  onAdd,
}: IngredientSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <select
        value={selectedProductId}
        onChange={(e) => onProductSelect(parseInt(e.target.value))}
        className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <option value={0}>Select product...</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} ({p.unit})
          </option>
        ))}
      </select>

      <Input
        type="number"
        min="0.01"
        step="0.01"
        value={amount}
        onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)}
        placeholder="Amount"
        className="w-full sm:w-32"
      />

      <Button
        type="button"
        onClick={onAdd}
        variant="secondary"
        className="w-full sm:w-auto"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </div>
  );
}
