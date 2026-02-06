import { api } from "@/services/api";
import { authService } from "@/services/auth";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("@ExpenseTracker:token");
    const storedUser = localStorage.getItem("@ExpenseTracker:user");

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      // Configura o cabeçalho de todas as chamadas API com o token encontrado
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  async function login({ email, password }) {
    const { token, user: userData } = await authService.login(email, password);

    localStorage.setItem("@ExpenseTracker:token", token);
    localStorage.setItem("@ExpenseTracker:user", JSON.stringify(userData));

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  }

  async function signUp({ name, email, password }) {
    const { token, user: userData } = await authService.signUp({
      name,
      email,
      password,
    });

    localStorage.setItem("@ExpenseTracker:token", token);
    localStorage.setItem("@ExpenseTracker:user", JSON.stringify(userData));

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("@ExpenseTracker:token");
    localStorage.removeItem("@ExpenseTracker:user");
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  }

  return (
    <AuthContext.Provider
      value={{ user, login, signUp, logout, authenticated: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
