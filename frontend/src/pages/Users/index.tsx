import { useState, useEffect } from "react";
import { userService } from "@/services/userService";
import type { User, PermissionsResponse } from "@/services/userService";
import { useAuth } from "@/hooks";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Trash2, Info } from "lucide-react";
import { useConfirmDialog } from "@/components/ConfirmDialog";

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const { confirm } = useConfirmDialog();
  const [users, setUsers] = useState<User[]>([]);
  const [permissions, setPermissions] = useState<PermissionsResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadUsers();
    if (currentUser) {
      loadPermissions(currentUser.role);
    }
  }, [currentUser]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err: any) {
      console.error("Failed to load users:", err);
      setError(err.response?.data?.message || "Αποτυχία φόρτωσης χρηστών");
    } finally {
      setLoading(false);
    }
  };

  const loadPermissions = async (role: string) => {
    try {
      const data = await userService.getPermissions(role);
      setPermissions(data);
    } catch (err) {
      console.error("Failed to load permissions:", err);
    }
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      setError("");
      await userService.updateUserRole(userId, newRole);
      await loadUsers(); // Reload to see changes
    } catch (err: any) {
      console.error("Failed to update role:", err);
      setError(
        err.response?.data?.description ||
          err.response?.data?.message ||
          "Αποτυχία ενημέρωσης ρόλου"
      );
    }
  };

  const handleDelete = async (userId: number, username: string) => {
    const confirmed = await confirm({
      title: "Διαγραφή Χρήστη",
      message: `Είσαι σίγουρος ότι θέλεις να διαγράψεις τον χρήστη "${username}"; Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.`,
      confirmText: "Διαγραφή",
      cancelText: "Άκυρο",
      variant: "danger",
    });

    if (!confirmed) return;

    try {
      setError("");
      await userService.deleteUser(userId);
      await loadUsers();
    } catch (err: any) {
      console.error("Failed to delete user:", err);
      setError(
        err.response?.data?.description ||
          err.response?.data?.message ||
          "Αποτυχία διαγραφής χρήστη"
      );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-foreground">Φόρτωση χρηστών...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-3xl font-bold text-foreground">
            Διαχείριση Χρηστών
          </h1>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-red-900 dark:text-red-200 font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <Users className="w-5 h-5 text-muted-foreground" />
              Όλοι οι Χρήστες ({users.length})
            </h2>

            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {user.username}
                      {user.username === currentUser?.username && (
                        <span className="ml-2 text-xs text-blue-800 dark:text-blue-400">
                          (Εσύ)
                        </span>
                      )}
                    </p>
                    {user.email && (
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      disabled={user.username === currentUser?.username}
                      className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="ADMIN" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">ADMIN</option>
                      <option value="WAITER" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">WAITER</option>
                    </select>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      }`}
                    >
                      {user.role}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(user.id, user.username)}
                      disabled={user.username === currentUser?.username}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <Shield className="w-5 h-5 text-muted-foreground" />
              Τα Δικαιώματά σου
            </h2>

            {permissions && (
              <div className="space-y-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-md">
                  <p className="text-sm font-medium text-foreground">
                    Ρόλος: <span className="font-bold">{permissions.role}</span>
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Μπορείς να:
                  </p>
                  <ul className="space-y-2">
                    {permissions.permissions.map((permission, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>{permission}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-foreground">
                  <p className="font-semibold mb-1">Σημείωση:</p>
                  <p>
                    Δεν μπορείς να αλλάξεις τον δικό σου ρόλο ή να διαγράψεις
                    τον λογαριασμό σου.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
