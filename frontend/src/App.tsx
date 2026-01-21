import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthProvider";
import { ConfirmDialogProvider } from "@/components/ConfirmDialog";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { PageLoadingFallback } from "@/components/PageLoadingFallback";
import { lazyLoad } from "@/utils/routeLoader";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const Products = lazyLoad(() => import("@/pages/Products"));
const Recipes = lazyLoad(() => import("@/pages/Recipes"));
const Users = lazyLoad(() => import("@/pages/Users"));

function App() {
  return (
    <AuthProvider>
      <ConfirmDialogProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/login" replace />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<ProtectedRoute />}>
                <Route
                  path="/products"
                  element={
                    <Suspense fallback={<PageLoadingFallback />}>
                      <Products />
                    </Suspense>
                  }
                />
                <Route
                  path="/recipes"
                  element={
                    <Suspense fallback={<PageLoadingFallback />}>
                      <Recipes />
                    </Suspense>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <Suspense fallback={<PageLoadingFallback />}>
                      <Users />
                    </Suspense>
                  }
                />
              </Route>

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </ConfirmDialogProvider>
    </AuthProvider>
  );
}

export default App;
