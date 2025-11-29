import TrackContext from "../Context/TrackContext";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart } from "recharts";
export default function InsightsPage() {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];
  const navigate = useNavigate();
  const { TrackData, Trackloading, Status, chooseTrack, UpdateTrack } =
    useContext(TrackContext);
  useEffect(() => {
    if (!Trackloading) {
      if (TrackData) {
      } else {
        navigate("/trackChoosing");
      }
    }
  }, [Trackloading, TrackData, navigate]);

  if (Trackloading) return <div className="p-6">Loading...</div>;

  const ToolChart = () => {
    const ToolsUsage = TrackData.data.insights_for_charts.tools_usage;
    return (
      <div>
        <PieChart width={400} height={400}>
          <Pie
            data={ToolsUsage}
            dataKey={"usage_percent"}
            nameKey={"tool"}
            cx="50%"
            cy="50%"
            outerRadius={150}
            innerRadius={80}
            label
          >
            {ToolsUsage.map((tool, index) => {
              return <Cell key={index} fill={COLORS[index]} />;
            })}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    );
  };

  return (
    <div>
      InsightsPage
      <ToolChart />
    </div>
  );
}
