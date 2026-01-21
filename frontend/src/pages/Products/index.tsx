import { useState } from "react";
import { useProducts } from "./useProducts";
import { useConfirmDialog } from "@/components/ConfirmDialog";
import { useAuth } from "@/hooks";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import { TableSkeleton } from "@/components/ui/loading-skeletons";
import { StockUpdateDialog } from "@/components/StockUpdateDialog";
import { Info } from "lucide-react";
import type { Product } from "@/types";

function Products() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const {
    products,
    loading,
    editingProduct,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancelEdit,
    handleUpdateStock,
  } = useProducts();

  const [stockProduct, setStockProduct] = useState<Product | null>(null);

  const { confirm } = useConfirmDialog();

  const onDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Delete Product",
      message: "Are you sure you want to delete this product? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
    });
    
    if (confirmed) {
      handleDelete(id);
    }
  };

  const defaultValues = editingProduct ? {
    name: editingProduct.name,
    category: editingProduct.category,
    unit: editingProduct.unit as "kg" | "liters" | "pieces" | "grams" | "ml",
    stock: editingProduct.stock,
    purchasePrice: editingProduct.purchasePrice,
    salePrice: editingProduct.salePrice,
  } : undefined;

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Products Management
        </h1>
        <p className="text-gray-600">Manage your restaurant inventory</p>
      </div>

      {!isAdmin && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-700 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1" style={{ color: '#000' }}>View-Only Mode</p>
              <p style={{ color: '#000' }}>
                Μπορείς να δεις τα προϊόντα αλλά όχι να τα επεξεργαστείς. Μόνο οι χρήστες με ρόλο <strong>ADMIN</strong> μπορούν να δημιουργήσουν, επεξεργαστούν ή διαγράψουν προϊόντα. Επικοινώνησε με τον διαχειριστή για δικαιώματα.
              </p>
            </div>
          </div>
        </div>
      )}

      {isAdmin && (
        <ProductForm
          defaultValues={defaultValues}
          editingId={editingProduct?.id || null}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
        />
      )}

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Products List</h2>
          <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </span>
        </div>

        {loading ? (
          <TableSkeleton rows={5} cols={6} />
        ) : (
          <ProductList
            products={products}
            onEdit={handleEdit}
            onDelete={onDelete}
            onUpdateStock={setStockProduct}
          />
        )}
      </div>

      <StockUpdateDialog
        product={stockProduct}
        open={!!stockProduct}
        onClose={() => setStockProduct(null)}
        onUpdate={handleUpdateStock}
      />
    </div>
  );
}

export default Products;
