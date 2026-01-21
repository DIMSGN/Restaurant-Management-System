import { createContext } from "react";
import type { LoginRequest, RegisterRequest, UserRole } from "@/types";

interface AuthUser {
  username: string;
  email?: string;
  role: UserRole;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  loginUser: (credentials: LoginRequest) => Promise<void>;
  registerUser: (userData: RegisterRequest) => Promise<void>;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
