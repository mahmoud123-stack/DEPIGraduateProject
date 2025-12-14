import { useContext, useEffectEvent, useState } from "react";
import TrackContext from "../Context/TrackContext";
import AuthContext from "./AuthContext";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function TrackProvider({ children }) {
  // const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [TrackData, setTrackData] = useState(null);
  const [Trackloading, setTrackLoading] = useState(false);
  const [Status, setStatus] = useState("idle");
  // Mount

  useEffect(() => {
    if (!isLoggedIn) {
      setTrackData(null);
    }

    const api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    const FetchDashboardTrack = async () => {
      setTrackLoading(true);
      try {
        const response = await api.get("/api/dashboard-track");
        setTrackData(response.data);
        setStatus("done");
      } catch (error) {
        console.log(error);
      } finally {
        setTrackLoading(false);
      }
    };
    FetchDashboardTrack();
  }, [isLoggedIn]);

  const chooseTrack = async (TrackName) => {
    setTrackLoading(true);
    setStatus("loading");
    try {
      const response = await api.post("/api/choose", {
        TrackName: TrackName,
      });
      const CreateTrack = response.data;
      setTrackData(CreateTrack);
      setStatus("done");
      // navigate("/dashboard");
      return { ok: true };
    } catch (error) {
      console.log(error);
      setStatus("error");
      return { ok: false, error: error };
    } finally {
      setTrackLoading(false);
    }
  };

  const UpdateTrack = async (newTrackName) => {
    setTrackLoading(true);
    setStatus("loading");

    try {
      const response = await api.put("/api/update-track", {
        newTrackName: newTrackName,
      });

      const Updated = response.data;
      setTrackData(Updated);
      setStatus("done");
      return { TrackData };
    } catch (error) {
      console.log(error);
      setStatus("error");
      return { ok: false, error: error };
    } finally {
      setTrackLoading(false);
    }
  };

  const Value = {
    TrackData,
    Trackloading,
    Status,
    chooseTrack,
    UpdateTrack,
  };
  return (
    <TrackContext.Provider value={Value}>{children}</TrackContext.Provider>
  );
}

export default TrackProvider;
