import { useState, useEffect, useCallback } from "react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
} from "@/services/productService";
import type { Product } from "@/types";
import type { ProductFormData } from "@/schemas";
import type { ApiError } from "@/services/api";
import { toast } from "sonner";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err: unknown) {
      const apiError = err as ApiError;
      toast.error("Failed to load products", {
        description: apiError.message || "Please try again later",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSubmit = useCallback(async (data: ProductFormData) => {
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, data);
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? updated : p));
        toast.success("Product updated successfully", {
          description: `${data.name} has been updated`,
        });
      } else {
        const created = await createProduct(data);
        setProducts(prev => [...prev, created]);
        toast.success("Product created successfully", {
          description: `${data.name} has been added to inventory`,
        });
      }
      setEditingProduct(null);
    } catch (err: unknown) {
      const apiError = err as ApiError;
      toast.error("Failed to save product", {
        description: apiError.message || "Please try again",
      });
      console.error(err);
      throw err; // Re-throw so form knows about the error
    }
  }, [editingProduct]);

  const handleDelete = useCallback(async (id: number) => {
    const productToDelete = products.find(p => p.id === id);
    const previousProducts = products;
    
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.loading("Deleting product...");

    try {
      await deleteProduct(id);
      toast.success("Product deleted", {
        description: productToDelete ? `${productToDelete.name} has been removed` : undefined,
      });
    } catch (err: unknown) {
      setProducts(previousProducts);
      const apiError = err as ApiError;
      toast.error("Failed to delete product", {
        description: apiError.message || "Please try again",
      });
      console.error(err);
    }
  }, [products]);

  const handleEdit = useCallback((product: Product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingProduct(null);
  }, []);

  const handleUpdateStock = useCallback(async (productId: number, quantity: number) => {
    const previousProducts = products;
    
    try {
      const updated = await updateStock(productId, quantity);
      setProducts(prev => prev.map(p => p.id === productId ? updated : p));
      toast.success("Stock updated", {
        description: `New stock: ${updated.stock} ${updated.unit}`,
      });
    } catch (err: unknown) {
      setProducts(previousProducts);
      const apiError = err as ApiError;
      toast.error("Failed to update stock", {
        description: apiError.message || "Please try again",
      });
      console.error(err);
      throw err;
    }
  }, [products]);

  return {
    products,
    loading,
    editingProduct,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancelEdit,
    handleUpdateStock,
  };
}
