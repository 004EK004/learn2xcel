"use client";

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
  type ReactNode,
} from "react";
import type { Models } from "appwrite";
import {
  getCurrentUser,
  login as appwriteLogin,
  appwriteReady,
  loginWithProvider,
  logout as appwriteLogout,
  register as appwriteRegister,
} from "@/lib/appwrite";

type AuthContextValue = {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  loginOauth: (provider: "google" | "github") => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    if (!appwriteReady) {
      setLoading(false);
      return;
    }
    const current = await getCurrentUser();
    setUser(current);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Initial session hydration; safe to call setState once on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
  }, [refresh]);

  const login = async (email: string, password: string) => {
    await appwriteLogin(email, password);
    await refresh();
  };

  const register = async (email: string, password: string, name?: string) => {
    await appwriteRegister(email, password, name);
    await appwriteLogin(email, password);
    await refresh();
  };

  const logout = async () => {
    if (!appwriteReady) {
      setUser(null);
      return;
    }
    await appwriteLogout();
    setUser(null);
  };

  const loginOauth = async (provider: "google" | "github") => {
    await loginWithProvider(provider);
  };

  const value: AuthContextValue = {
    user,
    loading,
    login,
    register,
    logout,
    loginOauth,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
