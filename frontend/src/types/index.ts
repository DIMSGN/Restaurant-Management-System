export interface User {
  id: number;
  username: string;
  email?: string;
  role: "ADMIN" | "WAITER";
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email?: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  username: string;
  email?: string;
  role: "ADMIN" | "WAITER";
  message: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  unit: string;
  stock: number;
  purchasePrice: number;
  salePrice: number;
  createdAt?: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  salePrice: number;
  createdAt?: string;
  ingredients: RecipeIngredient[];
}

export interface RecipeIngredient {
  id?: number;
  productId: number;
  productName: string;
  amount: number;
  unit?: string;
}

export type UserRole = "ADMIN" | "WAITER";
