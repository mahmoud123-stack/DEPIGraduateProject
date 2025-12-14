import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import TrackContext from "../Context/TrackContext";

import { Spin } from "antd";
export default function EntryGate() {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const { TrackData, Trackloading } = useContext(TrackContext);

  useEffect(() => {
    if (isLoading || Trackloading) {
      console.log("Loading Track and User Dat");
    }
    if (!isLoggedIn) {
      console.log("Loggin Bacause i don't know you");
      navigate("/LogIn", { replace: true });
      return;
    }

    if (!TrackData) {
      console.log("No Track Data :- Choose One");
      navigate("/trackChoosing", { replace: true });
      return;
    }

    console.log("Going To your dashboard");
    navigate("/dashboard", { replace: true });
    return;
  }, [[isLoggedIn, isLoading, TrackData, Trackloading, navigate]]);
}
