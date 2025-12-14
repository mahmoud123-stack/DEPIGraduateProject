import { useState, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const key = "updatable";
  const CheckLoggedIn = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/check", {
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
    const response = await axios.post("http://localhost:5000/api/auth/logout", {
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
