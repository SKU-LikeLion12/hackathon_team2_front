import React, { createContext, useContext, useState } from "react";

// Create the context
const UserContext = createContext();

// Hook to use the user context
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: "test_id",
    password: "test_pwd",
    nickName: "test_nickname",
    eleMail: "test_eMail",
    token: "string",
    isOwner: 0
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
