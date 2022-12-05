import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/AI/AIFitnessResult.css";

const AIFitnessExecNivo = () => {
  const [squat, setSquat] = useState();
  const [pushup, setPushup] = useState();
  const [pullup, setPullup] = useState();
  const [situp, setSitup] = useState();
  const [curl, setCurl] = useState();
  const location = useLocation();
  const userNickname = location.state.nickname;
  console.log(userNickname);
  useEffect(() => {
    axios
      .post("http://localhost:8008/nivoexec1", {
        nickname: userNickname,
      })
      .then((res) => {
        setSquat(res.data[0].EXECCOUNT);
      });
    axios
      .post("http://localhost:8008/nivoexec2", {
        nickname: userNickname,
      })
      .then((res) => {
        setPushup(res.data[0].EXECCOUNT);
      });
    axios
      .post("http://localhost:8008/nivoexec3", {
        nickname: userNickname,
      })
      .then((res) => {
        setPullup(res.data[0].EXECCOUNT);
      });
    axios
      .post("http://localhost:8008/nivoexec4", {
        nickname: userNickname,
      })
      .then((res) => {
        setSitup(res.data[0].EXECCOUNT);
      });
    axios
      .post("http://localhost:8008/nivoexec5", {
        nickname: userNickname,
      })
      .then((res) => {
        setCurl(res.data[0].EXECCOUNT);
      });
  });
  return (
    <div style={{ width: "25rem", height: "20rem", margin: "0 auto" }}>
      <ResponsivePie
        data={[
          {
            id: "스쿼트",
            value: squat,
          },
          {
            id: "푸쉬업",
            value: pushup,
          },
          {
            id: "풀업",
            value: pullup,
          },
          {
            id: "싯업",
            value: situp,
          },
          {
            id: "덤벨컬",
            value: curl,
          },
        ]}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "blues" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        theme={{
          fontSize: "15px",
        }}
      />
    </div>
  );
};

export default AIFitnessExecNivo;
