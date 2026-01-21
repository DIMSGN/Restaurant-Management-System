import api from "./api";
import type { LoginRequest, RegisterRequest, AuthResponse } from "@/types";

export const login = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", credentials);
  return response.data;
};

export const register = async (
  userData: RegisterRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", userData);
  return response.data;
};
