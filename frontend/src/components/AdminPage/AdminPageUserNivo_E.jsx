import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { useEffect, useState } from "react";
// import '../../styles/AdminPage/AdminPageUser.css';

const AdminPageUserNivo_E = () => {
  const [exec1, setExec1] = useState();
  const [exec2, setExec2] = useState();
  const [exec3, setExec3] = useState();
  const [exec4, setExec4] = useState();
  const [exec5, setExec5] = useState();
  const [totalExec, setTotalExec] = useState(0);

  useEffect(() => {
    axios.post("http://localhost:8008/adminuserexec1").then((res) => {
      setExec1(res.data[0].EXEC1);
    });
    axios.post("http://localhost:8008/adminuserexec2").then((res) => {
      setExec2(res.data[0].EXEC2);
    });
    axios.post("http://localhost:8008/adminuserexec3").then((res) => {
      setExec3(res.data[0].EXEC3);
    });
    axios.post("http://localhost:8008/adminuserexec4").then((res) => {
      setExec4(res.data[0].EXEC4);
    });
    axios.post("http://localhost:8008/adminuserexec5").then((res) => {
      setExec5(res.data[0].EXEC5);
    });
    axios.post("http://localhost:8008/adminusertotal").then((res) => {
      setTotalExec(res.data[0].TOTALEXEC);
    });
  });

  return (
    <div className="AdminPageUserNivo_excercise">
      <ResponsiveBar
        /**
         * chart에 사용될 데이터
         */
        data={[
          { bottle: "푸쉬업", 유저: exec2 },
          { bottle: "윗몸일으키기", 유저: exec4 },
          { bottle: "덤벨컬", 유저: exec5 },
          { bottle: "풀업", 유저: exec3 },          
          { bottle: "스쿼트", 유저: exec1 },
        ]}
        /**
         * chart에 보여질 데이터 key (측정되는 값)
         */
        keys={["유저"]}
        /**
         * keys들을 그룹화하는 index key (분류하는 값)
         */
        indexBy="bottle"
        /**
         * chart margin
         */
        margin={{ top: 30, right: 100, bottom: 50, left: 110 }}
        /**
         * chart padding (bar간 간격)
         */
        padding={0.3}
        /**
         * chart 색상
         */
        colors={"rgb(166, 206, 227)"} // 커스터하여 사용할 때
        // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
        /**
         * color 적용 방식
         */
        colorBy="id" // 색상을 keys 요소들에 각각 적용
        // colorBy="indexValue" // indexBy로 묵인 인덱스별로 각각 적용
        // maxValue={1}
        groupMode="grouped"
        layout="horizontal"
        theme={{
          /**
           * label style (bar에 표현되는 글씨)
           */
          labels: {
            text: {
              fontSize: 14,
              fill: "#000000",
              fontFamily: "GmarketSansMedium",
            },
          },
          /**
           * legend style (default로 우측 하단에 있는 색상별 key 표시)
           */
          legends: {
            text: {
              fontSize: 12,
              fill: "#000000",
              fontFamily: "GmarketSansMedium",
            },
          },
          axis: {
            /**
             * axis legend style (bottom, left에 있는 글씨)
             */
            legend: {
              text: {
                fontSize: 20,
                fill: "#000000",
                fontFamily: "GmarketSansMedium",
              },
            },
            /**
             * axis ticks style (bottom, left에 있는 값)
             */
            ticks: {
              text: {
                fontSize: 16,
                fill: "#000000",
                fontFamily: "GmarketSansMedium",
              },
            },
          },
        }}
        /**
         * axis bottom 설정
         */
        axisBottom={{
          tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
          tickPadding: 5, // tick padding
          tickRotation: 0, // tick 기울기
          legend: "",
          legendPosition: "middle", // 글씨 위치
          legendOffset: 40, // 글씨와 chart간 간격
        }}
        /**
         * axis left 설정
         */
        axisLeft={{
          tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
          tickPadding: 5, // tick padding
          tickRotation: 0, // tick 기울기
          // legend: "회원 수", // left 글씨
          legendPosition: "middle", // 글씨 위치
          legendOffset: -50, // 글씨와 chart간 간격
        }}
        // axisLeft={null}
        enableGridY={false}
        /** label에 %붙이기(d.value는 exec1~5의 값들이고, d.id는 '유저') */
        // label={d => ((`${d.value}`/`${totalExec}`)*100).toFixed(1)+"%"}
        label = {(d) => {
          const point = [exec1,exec2,exec3,exec4,exec5]
          const x = 680*(`${d.value}`/Math.max(...point))
          console.log("x: ",x)
          return <tspan x={x}>{((`${d.value}`/`${totalExec}`)*100).toFixed(1)+"%"}</tspan>
        }}
        /**
         * label 안보이게 할 기준 width
         */
        labelSkipWidth={36}
        /**
         * label 안보이게 할 기준 height
         */
        labelSkipHeight={12}
        /**
         * bar 클릭 이벤트
         */
        /**
         * legend 설정 (default로 우측 하단에 있는 색상별 key 표시)
         */
        legends={[
          {
            dataFrom: "keys", // 보일 데이터 형태
            anchor: "bottom-right", // 위치
            direction: "column", // item 그려지는 방향
            justify: false, // 글씨, 색상간 간격 justify 적용 여부
            translateX: 250, // chart와 X 간격
            translateY: -400, // chart와 Y 간격
            itemsSpacing: 2, // item간 간격
            itemWidth: 180, // item width
            itemHeight: 20, // item height
            itemDirection: "left-to-right", // item 내부에 그려지는 방향
            itemOpacity: 0.85, // item opacity
            symbolSize: 20, // symbol (색상 표기) 크기
            effects: [
              {
                // 추가 효과 설정 (hover하면 item opacity 1로 변경)
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default AdminPageUserNivo_E;
