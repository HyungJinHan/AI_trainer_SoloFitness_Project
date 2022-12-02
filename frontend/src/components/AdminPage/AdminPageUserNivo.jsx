import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import "../../styles/AdminPage/AdminPageUser.css";
import axios from "axios";

const AdminPageUserNivo = () => {
  const [genderMale, setGenderMale] = useState();
  const [genderFeMale, setGenderFeMale] = useState();

  useEffect(() => {
    axios.post("http://localhost:8008/adminusergender").then((res) => {
      setGenderMale(res.data[0].MALE);
      console.log("남성 수", genderMale);
      axios.post("http://localhost:8008/adminusergender2").then((res) => {
        setGenderFeMale(res.data[0].FEMALE);
      });
    });
  }, [genderMale, genderFeMale]);

  return (
    <div className="AdminPageUserNivo_gender">
      <ResponsivePie
        data={[
          {
            id: "male",
            label: "male",
            value: genderMale,
            color: "#cfddfb",
          },
          {
            id: "female",
            label: "female",
            value: genderFeMale,
            color: "#fccece",
          },
        ]}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "paired" }}
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
        fill={[
          {
            match: {
              id: "male",
            },
            id: "lines",
          },
          {
            match: {
              id: "female",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default AdminPageUserNivo;
