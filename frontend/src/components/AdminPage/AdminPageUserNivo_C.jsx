import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import "../../styles/AdminPage/AdminPageUser.css";
import axios from "axios";

const AdminPageUserNivo_C = () => {
  const [centerRegist, setCenterRegist] = useState();
  const [centerNotRegist, setCenterNotRegist] = useState();
  useEffect(() => {
    axios.post("http://localhost:8008/adminusercenter1").then((res) => {
      setCenterRegist(res.data[0].ACCESS);
    });
    axios.post("http://localhost:8008/adminusercenter2").then((res) => {
      setCenterNotRegist(res.data[0].ACCESS);
    });
  });
  return (
    <div className="AdminPageUserNivo_center">
      <ResponsivePie
        data={[
          {
            id: "등록회원",
            label: "등록회원",
            value: centerRegist,
            color: "#cfddfb",
          },
          {
            id: "미등록회원",
            label: "미등록회원",
            value: centerNotRegist,
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

export default AdminPageUserNivo_C;
