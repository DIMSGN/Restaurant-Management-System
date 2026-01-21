import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import type { Product } from "@/types";

interface StockUpdateDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (productId: number, quantity: number) => Promise<void>;
}

export function StockUpdateDialog({
  product,
  open,
  onClose,
  onUpdate,
}: StockUpdateDialogProps) {
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !quantity) return;

    const numQuantity = parseFloat(quantity);
    if (isNaN(numQuantity)) return;

    setLoading(true);
    try {
      await onUpdate(product.id, numQuantity);
      setQuantity("");
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setQuantity("");
    onClose();
  };

  if (!open || !product) return null;

  const newStock = quantity
    ? (product.stock + parseFloat(quantity)).toFixed(2)
    : product.stock;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={handleClose}
      />
      
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-white p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Update Stock</h2>
              <p className="text-sm text-gray-500 mt-1">
                Update the stock quantity for {product.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Current Stock</Label>
                <div className="text-2xl font-bold text-gray-700">
                  {product.stock} {product.unit}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity to Add/Remove</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 10 or -5"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  autoFocus
                />
                <p className="text-sm text-gray-500">
                  Use positive numbers to add, negative to remove
                </p>
              </div>

              {quantity && (
                <div className="space-y-2">
                  <Label>New Stock</Label>
                  <div className="text-2xl font-bold text-green-600">
                    {newStock} {product.unit}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!quantity || loading}>
                {loading ? "Updating..." : "Update Stock"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
