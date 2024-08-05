import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token")); // Initialize token from localStorage

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (token && storedUser) {
      setUser(storedUser);
    }
  }, [token]);

  const login = (userInfo, token) => {
    setUser(userInfo);
    setToken(token);
    localStorage.setItem("token", token); // Store token in localStorage
    localStorage.setItem("user", JSON.stringify(userInfo)); // Store user info in localStorage
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
