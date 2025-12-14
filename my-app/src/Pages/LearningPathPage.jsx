import TrackContext from "../Context/TrackContext";
import { useNavigate } from "react-router";
import "../index.css";
import Arrow from "../Assets/right-arrow.png";
import { useContext, useEffect, useState } from "react";
export default function LearningPathPage() {
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
  return (
    <div className="d-flex flex-column gap-5">
      <div className="LearningPath">
        <span className="SectionHead">
          {" "}
          {TrackData.data.BasicInfo.TrackName} RoadMap:
        </span>
        <div className="roadMap">
          {TrackData.data.learning_roadmap.levels.map((level) => {
            return (
              <div className="level">
                <h3 className="LevelName">{level.level}...</h3>
                <div className="LearnSteps">
                  {level.steps.map((step) => {
                    return (
                      <div className="step">
                        <span>{step.step}</span>
                        <div className="Head">
                          <h5>{step.title}</h5>
                          <p>{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="Tools_Techs">
        <span className="SectionHead">Common Mistakes:</span>
        <div className="Tools">
          {TrackData.data.common_mistakes_to_avoid.map((mistake, index) => {
            return (
              <div className="tool">
                <span className="index">{index + 1}.</span>

                <div className="info">
                  <h5 className="toolName">{mistake.mistake}</h5>
                </div>

                <div className="toolDesc">
                  <p className="desc">
                    <span>HowToAvoid :- </span>
                    {mistake.HowToAvoid}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="Tools_Techs">
        <span className="SectionHead">Learning Methods:</span>
        <div className="Tools">
          {TrackData.data.recommended_learning_methods.map((method, index) => {
            return (
              <div
                className="tool"
                style={{
                  boxShadow: "none",
                }}
              >
                <div className="info">
                  <h5 className="toolName">{method}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
