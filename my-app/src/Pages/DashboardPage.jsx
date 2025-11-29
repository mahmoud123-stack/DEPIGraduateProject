import TrackContext from "../Context/TrackContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import "../Components/DashboardMainPage.css";
import {
  Empty,
  message,
  notification,
  Spin,
  Button,
  Form,
  Modal,
  Input,
} from "antd";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  SettingsIcon,
  BellIcon,
  MoonIcon,
  User2Icon,
  ChevronsUpDown,
  BarChart2Icon,
  LogOut,
  PowerOffIcon,
  PowerIcon,
  ChartPie,
  SquaresIntersect,
  Atom,
} from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { TrackData, Trackloading, Status, chooseTrack, UpdateTrack } =
    useContext(TrackContext);
  const { isLoggedIn, LogOut, isLoading, setIsLoggedIn } =
    useContext(AuthContext);

  const logoutMe = async () => {
    const response = await LogOut();
    console.log(response);
    navigate("/LogIn");
  };

  useEffect(() => {
    if (!Trackloading) {
      if (TrackData) {
        console.log(TrackData);
      } else {
        navigate("/trackChoosing");
      }
    }
  }, [Trackloading, TrackData, navigate]);

  if (Trackloading) return <div className="p-6">Loading...</div>;

  return (
    <div className="DashBoardMainSection mt-4 d-flex flex-column gap-4">
      <div className="trackTitle">
        <h4 className="m-0">{TrackData.data.BasicInfo.TrackName}</h4>
        <span>{TrackData.data.BasicInfo.TrackClassification}</span>
      </div>

      <div className="Description">
        <p>{TrackData.data.BasicInfo.track_overview}</p>
        <div className="Tags">
          {TrackData.data.BasicInfo.TrackTags.map((tag) => {
            return <span>{tag}</span>;
          })}
        </div>
      </div>

      <div className="Tools_Techs">
        <span className="SectionHead">Job Roles:</span>
        <div className="Tools">
          {TrackData.data.JobRoles.map((role, index) => {
            return (
              <div className="tool">
                <span className="index">{index + 1}.</span>

                <div className="info">
                  <h5 className="toolName">{role.role}</h5>
                </div>

                <div className="toolDesc">
                  <p className="desc">
                    <span>Brief :- </span>
                    {role.roleBrief}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="Tools_Techs">
        <span className="SectionHead">Salary Range</span>
        <div className="Tools">
          {TrackData.data.salary_range.map((range) => {
            return (
              <div
                className="tool"
                style={{
                  padding: "20px auto",
                }}
              >
                <div className="info">
                  <h5 className="toolName">{range.level}</h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {range.regional.map((regional) => {
                    return (
                      <div
                        className="toolDesc"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <p
                          className="desc"
                          style={{
                            margin: "0",
                          }}
                        >
                          {regional.salary_range}
                        </p>
                        <span
                          style={{
                            fontSize: "18px",
                            width: "fit-content",
                          }}
                          className="toolClass"
                        >
                          {regional.region}
                        </span>
                      </div>
                    );
                  })}

                  <div
                    className="toolDesc"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <p
                      className="desc"
                      style={{
                        margin: "0",
                      }}
                    >
                      {range.global.range}
                    </p>
                    <span
                      style={{
                        fontSize: "18px",
                        width: "fit-content",
                      }}
                      className="toolClass"
                    >
                      Global Range
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="Tools_Techs">
        <span className="SectionHead">Tools:</span>
        <div className="Tools">
          {TrackData.data.tools.map((tool, index) => {
            return (
              <div className="tool">
                <span className="index">{index + 1}.</span>

                <div className="info">
                  <h5 className="toolName">{tool.tool_Name}</h5>
                  <span className="toolClass">{tool.toolClassification}</span>
                </div>

                <div className="toolDesc">
                  <p className="desc">
                    <span>Brief :- </span>
                    {tool.Learn_Reason}
                  </p>
                  <p className="way">
                    <span>how to learn :- </span>
                    {tool.bestWayToLearn}
                  </p>
                </div>
              </div>
            );
          })}

          {/* <BarChart width={600} height={350} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis dataKey="" />
            <Tooltip />
            <Legend />
            <Bar dataKey="min" stackId="Min" />
            <Bar dataKey="max" stackId="Max" />
          </BarChart> */}
        </div>
      </div>

      <div className="Tools_Techs">
        <span className="SectionHead">Time To Master</span>
        <div className="Tools">
          {TrackData.data.estimated_time_to_master.map((time, index) => {
            return (
              <div className="tool">
                <div className="info">
                  <h5 className="toolName">{time.level}</h5>
                  <span
                    style={{
                      fontSize: "18px",
                    }}
                    className="toolClass"
                  >
                    {time.Time}
                  </span>
                </div>

                <div className="toolDesc">
                  <p className="desc">
                    <span>Ability :- </span>
                    {time.Ability}
                  </p>
                  <p className="way">
                    <span>Topics :- </span>
                    {time.ShouldLearn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="FeatureTrends">
        <span className="SectionHead">Future Trends:</span>
        <div className="Trends">
          {TrackData.data.future_trends.map((trend, index) => {
            return (
              <div className="TrendDetails">
                <span className="index">{index + 1}.</span>
                <div className="trend">{trend.trend}</div>
                <div className="Brief">Brief :- {trend.TrendBrief}</div>
                <div className="aboutTrend">{trend.BriefAboutIt}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
