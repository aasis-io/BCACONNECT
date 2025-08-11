// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const saved = localStorage.getItem("authData");
    return saved ? JSON.parse(saved) : { token: null, user: null };
  });

  const [error, setError] = useState(null);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState("");

  useEffect(() => {
    if (authData.token) {
      localStorage.setItem("authData", JSON.stringify(authData));
    } else {
      localStorage.removeItem("authData");
    }
  }, [authData]);

  const login = (token, user) => {
    setAuthData({ token, user });
    setLoginSuccessMessage("Login successful!");
    setError(null);
  };

  const googleLogin = (token, user) => {
    setAuthData({ token, user });
    setLoginSuccessMessage("Google login successful!");
    setError(null);
  };

  const logout = () => {
    setAuthData({ token: null, user: null });
    setError(null);
    setLoginSuccessMessage("");
    localStorage.removeItem("authData");
  };

  return (
    <AuthContext.Provider
      value={{
        token: authData.token,
        user: authData.user,
        error,
        loginSuccessMessage,
        setLoginSuccessMessage,
        setError,
        login,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
