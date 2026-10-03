import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on first load
  useEffect(() => {
    const token = localStorage.getItem("studyflow_token");
    if (!token) return setLoading(false);
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem("studyflow_token"))
      .finally(() => setLoading(false));
  }, []);

  const handleAuth = (data) => {
    localStorage.setItem("studyflow_token", data.token);
    setUser(data.user);
  };

  const login = async (email, password) =>
    handleAuth((await api.post("/auth/login", { email, password })).data);

  const register = async (name, email, password) =>
    handleAuth((await api.post("/auth/register", { name, email, password })).data);

  const logout = () => {
    localStorage.removeItem("studyflow_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
