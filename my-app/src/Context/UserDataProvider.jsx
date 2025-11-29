import { useState } from "react";
import userDataContext from "./UserDataContext";
import { useEffect } from "react";
import axios from "axios";
function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/me", {
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
