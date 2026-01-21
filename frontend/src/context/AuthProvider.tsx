import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import type { LoginRequest, RegisterRequest, UserRole } from "@/types";
import { login, register } from "@/services/authService";
import { 
  getToken, 
  setToken, 
  removeToken, 
  getStoredUser, 
  setStoredUser,
  setAuthEventHandlers,
  getRefreshToken 
} from "@/services/api";

interface AuthUser {
  username: string;
  email?: string;
  role: UserRole;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const logoutUser = useCallback(() => {
    removeToken();
    setUser(null);
  }, []);

  useEffect(() => {
    const initializeAuth = () => {
      const token = getToken();
      const storedUser = getStoredUser();
      const refreshToken = getRefreshToken();

      if ((token || refreshToken) && storedUser) {
        setUser(storedUser as AuthUser);
      }
      setLoading(false);
    };

    initializeAuth();

    setAuthEventHandlers(
      () => {
        logoutUser();
      },
      (message: string) => {
        console.warn("Forbidden:", message);
      }
    );
  }, [logoutUser]);

  const loginUser = async (credentials: LoginRequest) => {
    const response = await login(credentials);

    const authUser: AuthUser = {
      username: response.username,
      email: response.email,
      role: response.role as UserRole,
    };

    setToken(response.token, response.refreshToken);
    setStoredUser(authUser);
    setUser(authUser);
  };

  const registerUser = async (userData: RegisterRequest) => {
    const response = await register(userData);

    const authUser: AuthUser = {
      username: response.username,
      email: response.email,
      role: response.role as UserRole,
    };

    setToken(response.token, response.refreshToken);
    setStoredUser(authUser);
    setUser(authUser);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loginUser,
        registerUser,
        logoutUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
