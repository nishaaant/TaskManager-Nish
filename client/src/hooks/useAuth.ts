import { useState } from "react";

interface AuthContextType {
  user: { id: string; email: string } | null;
  token: string | null;
  login: (user: { id: string; email: string }, token: string) => void;
  logout: () => void;
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const login = (user: { id: string; email: string }, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return { user, token, login, logout };
};
