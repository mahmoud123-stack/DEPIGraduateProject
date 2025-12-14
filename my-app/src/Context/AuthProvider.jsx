import { useState, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  const key = "updatable";
  const CheckLoggedIn = async () => {
    try {
      await api.get("/api/auth/check", {
        withCredentials: true,
      });
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLoggedIn(false);
    }
  };

  const LogOut = async () => {
    const response = await api.post("/api/auth/logout", {
      withCredentials: true,
    });
    setIsLoading(false);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    CheckLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, LogOut, isLoading, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
