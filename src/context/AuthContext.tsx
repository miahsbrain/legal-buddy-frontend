import React, { createContext, useState, useEffect, useContext } from "react";
import { apiClient } from "../api/apiClient";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      apiClient
        .get<{ success: boolean; data: User }>("/auth/me")
        .then((data) => setUser(data.data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login method in context
  const login = async (email: string, password: string) => {
    const res = await apiClient.post<{
      success: boolean;
      data: {
        accessToken: string;
        refreshToken: string;
      };
    }>("/auth/login", { email, password });

    const { accessToken, refreshToken } = res.data;
    console.log(res);

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    const me = await apiClient.get<User>("/auth/me");
    setUser(me);
  };

  // Register method in context
  const register = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
  ) => {
    await apiClient.post<{ success: boolean; data: User }>("/auth/signup", {
      first_name,
      last_name,
      email,
      password,
    });
    await login(email, password);
  };

  // Logout method in context
  const logout = async () => {
    localStorage.removeItem("access_token");
    await apiClient.post("auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
