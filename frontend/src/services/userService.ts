import api from "./api";

export interface User {
  id: number;
  username: string;
  email?: string;
  role: string;
}

export interface UpdateRoleRequest {
  role: string;
}

export interface PermissionsResponse {
  role: string;
  permissions: string[];
}

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/users");
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  updateUserRole: async (
    id: number,
    role: string
  ): Promise<User> => {
    const response = await api.put<User>(`/users/${id}/role`, { role });
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  getPermissions: async (role: string): Promise<PermissionsResponse> => {
    const response = await api.get<PermissionsResponse>(
      `/users/permissions/${role}`
    );
    return response.data;
  },
};
