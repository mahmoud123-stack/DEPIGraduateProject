import { useState } from "react";
import userDataContext from "./UserDataContext";
import { useEffect } from "react";
import axios from "axios";
function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  const getUserData = async () => {
    try {
      const response = await api.get("/api/auth/me", {
        withCredentials: true,
      });
      setUserData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <userDataContext.Provider value={{ userData, isLoading }}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserDataProvider;
