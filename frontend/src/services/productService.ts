import api from "./api";
import type { Product } from "@/types";

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/products");
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const response = await api.post<Product>("/products", product);
  return response.data;
};

export const updateProduct = async (
  id: number,
  product: Omit<Product, "id">
): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};

export const updateStock = async (
  id: number,
  quantity: number
): Promise<Product> => {
  const response = await api.put<Product>(
    `/products/${id}/stock?quantity=${quantity}`
  );
  return response.data;
};
