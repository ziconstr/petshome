import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  accessToken?: string;
}

interface AuthContextType {
  user: User | null;
  loginUser: (userData: User, token: string, apiKey: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  function loginUser(userData: User, token: string, apiKey: string) {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("apiKey", apiKey);
    setUser(userData);
  }

  function logoutUser() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("apiKey");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
