import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getCookie, setCookie, deleteCookie } from "@/utils/cookies";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "auth_user";

let accessToken: string | null = null;

type AuthEventHandler = () => void;
let onUnauthorizedCallback: AuthEventHandler | null = null;
let onForbiddenCallback: ((message: string) => void) | null = null;

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: any) => void }> = [];

const processQueue = (token: string | null, error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const setAuthEventHandlers = (
  onUnauthorized: AuthEventHandler,
  onForbidden?: (message: string) => void
) => {
  onUnauthorizedCallback = onUnauthorized;
  onForbiddenCallback = onForbidden || null;
};

export const getToken = (): string | null => {
  return accessToken;
};

export const setToken = (token: string, refreshToken?: string): void => {
  accessToken = token;
  
  if (refreshToken) {
    setCookie(REFRESH_TOKEN_KEY, refreshToken, {
      expires: 7,
      sameSite: "lax",
      secure: window.location.protocol === "https:",
    });
  }
};

export const getRefreshToken = (): string | null => {
  return getCookie(REFRESH_TOKEN_KEY) || null;
};

export const removeToken = (): void => {
  accessToken = null;
  deleteCookie(REFRESH_TOKEN_KEY);
  deleteCookie(USER_KEY);
};

export const getStoredUser = (): { username: string; email?: string; role: string } | null => {
  const userStr = getCookie(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(decodeURIComponent(userStr));
  } catch {
    return null;
  }
};

export const setStoredUser = (user: { username: string; email?: string; role: string }): void => {
  setCookie(USER_KEY, encodeURIComponent(JSON.stringify(user)), {
    expires: 7,
    sameSite: "lax",
    secure: window.location.protocol === "https:",
  });
};

export interface ApiError {
  message: string;
  status: number;
  errors?: string[];
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string; errors?: Record<string, string>; details?: string; token?: string; refreshToken?: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;
    
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const refreshResponse = await axios.post<{ token: string; refreshToken: string }>(
          `${API_BASE_URL}/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        );

        const { token: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;
        setToken(newAccessToken, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(newAccessToken, null);

        return api(originalRequest);
      } catch (refreshError) {
        removeToken();
        processQueue(null, refreshError);
        if (onUnauthorizedCallback) {
          onUnauthorizedCallback();
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    if (status === 403) {
      const message = error.response?.data?.message || "You don't have permission to perform this action";
      if (onForbiddenCallback) {
        onForbiddenCallback(message);
      }
    }
    
    const apiError: ApiError = {
      message: 
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred",
      status: status || 0,
      errors: error.response?.data?.errors 
        ? Object.values(error.response.data.errors) 
        : undefined,
    };
    
    return Promise.reject(apiError);
  }
);

export default api;
