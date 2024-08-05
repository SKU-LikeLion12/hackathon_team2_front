import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 페이지가 로드될 때 로컬 스토리지에서 토큰을 읽어와 사용자 정보를 설정합니다.
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    if (token && userName) {
      setUser({ name: userName, token });
    }
  }, []);

  const login = (id, userInfo) => {
    setUser(userInfo);
    localStorage.setItem("token", userInfo.token);
    localStorage.setItem("userName", userInfo.nickName); // 사용자 이름도 로컬 스토리지에 저장합니다.
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userName"); // 사용자 이름도 로컬 스토리지에서 삭제합니다.
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
