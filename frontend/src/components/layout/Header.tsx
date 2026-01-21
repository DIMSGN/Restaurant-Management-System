import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, Package, ChefHat, Users, Shield } from "lucide-react";

const Header = () => {
  const { isAuthenticated, user, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {isAuthenticated ? (
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🍽️ Restaurant Management
            </div>
          ) : (
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all">
              🍽️ Restaurant Management
            </Link>
          )}

          <nav className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/products"
                  className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Package className="h-4 w-4" />
                  Products
                </Link>
                <Link
                  to="/recipes"
                  className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  <ChefHat className="h-4 w-4" />
                  Recipes
                </Link>
                {isAdmin && (
                  <Link
                    to="/users"
                    className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    <Users className="h-4 w-4" />
                    Users
                  </Link>
                )}
                <div className="flex items-center gap-3 ml-4 pl-4 border-l">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{user?.username}</span>
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        isAdmin
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      <Shield className="h-3 w-3" />
                      {user?.role}
                    </span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
