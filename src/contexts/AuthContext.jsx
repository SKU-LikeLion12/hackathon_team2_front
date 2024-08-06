import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider mounted");
    return () => {
      console.log("AuthProvider unmounted");
    };
  }, []);

  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("token");
      const nickName = localStorage.getItem("nickName");

      console.log("LocalStorage data:", { token, nickName });

      if (token && nickName) {
        setUser({ nickName, token });
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);

  const login = (id, userInfo) => {
    console.log("Login called with:", userInfo);
    setUser(userInfo);
    localStorage.setItem("token", userInfo.token);
    localStorage.setItem("nickName", userInfo.nickName);
  };

  const logout = () => {
    console.log("Logout called");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("nickName");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
