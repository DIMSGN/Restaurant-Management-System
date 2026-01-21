import Cookies from "js-cookie";

export interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export function setCookie(
  name: string,
  value: string,
  options?: CookieOptions
): void {
  const defaultOptions: CookieOptions = {
    path: "/",
    sameSite: "lax",
    secure: window.location.protocol === "https:",
    expires: 7, // 7 days
  };

  Cookies.set(name, value, { ...defaultOptions, ...options });
}

export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

export function deleteCookie(name: string): void {
  Cookies.remove(name, { path: "/" });
}

export function getAllCookies(): Record<string, string> {
  return Cookies.get();
}
