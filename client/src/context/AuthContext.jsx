import { createContext, useEffect, useState } from "react";
import { registerUser, loginUser, logoutUser, getMe } from "../lib/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await getMe();
      setUser(res.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []); 

  const register = async (email, password) => {
    const res = await registerUser(email, password);
    setUser(res.user);
  };

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    setUser(res.user);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };