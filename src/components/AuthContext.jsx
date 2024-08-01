import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 로그인된 사용자 정보를 저장

  const login = (userInfo) => {
    setUser(userInfo); // 사용자 정보를 저장
  };

  const logout = () => {
    setUser(null); // 사용자 정보를 초기화
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
