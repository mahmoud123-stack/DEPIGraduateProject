import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
axios.defaults.withCredentials = true;

export default function dashboardPage() {
  const [userData, setUserData] = useState("initial");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me")
      .then((data) => {
        setUserData(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <h1>welcome</h1>;
}
