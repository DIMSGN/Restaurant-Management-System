import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Package } from "lucide-react";
import { useAuth } from "@/hooks";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onUpdateStock: (product: Product) => void;
}

function ProductList({ products, onEdit, onDelete, onUpdateStock }: ProductListProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No products found. Add your first product to get started.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead>Sale Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                {product.stock} {product.unit}
              </TableCell>
              <TableCell>{formatCurrency(product.purchasePrice)}</TableCell>
              <TableCell>{formatCurrency(product.salePrice)}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onUpdateStock(product)}
                  title={isAdmin ? "Update Stock" : "Only ADMIN can update stock"}
                  disabled={!isAdmin}
                >
                  <Package className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(product)}
                  title={isAdmin ? "Edit Product" : "Only ADMIN can edit products"}
                  disabled={!isAdmin}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onDelete(product.id)}
                  title={isAdmin ? "Delete Product" : "Only ADMIN can delete products"}
                  disabled={!isAdmin}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProductList;
