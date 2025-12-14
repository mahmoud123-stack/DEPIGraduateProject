import TrackContext from "../Context/TrackContext";
import { useNavigate } from "react-router";
import "../index.css";
import { useContext, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  YAxis,
  ResponsiveContainer,
  XAxis,
  Bar,
} from "recharts";
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
      <div className="chartParent">
        <h4>Tools Usage</h4>
        <div>
          <ResponsiveContainer width={"100%"} height={400}>
            <PieChart>
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
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  function TimeToLearn() {
    const ToolsUsage =
      TrackData.data.insights_for_charts.average_learning_time_months;
    return (
      <div className="chartParent">
        <h4>Months to Learn</h4>
        <div>
          <ResponsiveContainer width={"100%"} height={400}>
            <BarChart data={ToolsUsage} barSize={60}>
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="months_to_learn"
                radius={[10, 10, 0, 0]}
                animationDuration={1200}
              >
                {ToolsUsage.map((tool, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  function JobDemandLast5Years() {
    const ToolsUsage =
      TrackData.data.insights_for_charts.job_demand_last_5_years;
    return (
      <div className="chartParent">
        <h4>Job Demand</h4>
        <div>
          <ResponsiveContainer width={"100%"} height={400}>
            <LineChart data={ToolsUsage} barSize={60}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line
                dataKey="demand"
                radius={[10, 10, 0, 0]}
                animationDuration={1200}
              >
                {ToolsUsage.map((tool, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  function LearningDifficult() {
    const ToolsUsage = TrackData.data.insights_for_charts.learning_difficulty;
    return (
      <div className="chartParent">
        <h4> Learning Difficulty</h4>
        <div>
          <ResponsiveContainer width={"100%"} height={400}>
            <BarChart data={ToolsUsage} barSize={60} layout="horizontal">
              <XAxis type="category" dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="difficulty"
                radius={[10, 10, 0, 0]}
                animationDuration={1200}
              >
                {ToolsUsage.map((tool, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="ChartsContainer">
      <TimeToLearn />
      <LearningDifficult />
      <JobDemandLast5Years />
      <ToolChart />
    </div>
  );
}
