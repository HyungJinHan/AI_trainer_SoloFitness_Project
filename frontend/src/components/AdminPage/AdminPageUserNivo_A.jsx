import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { useEffect, useState } from "react";
const AdminPageUserNivo_A = () => {
  return (
    <div style={{ width: "25rem", height: "30rem", margin: "0 auto" }}>
      <ResponsiveBar
        /**
         * chart에 사용될 데이터
         */
        data={[
          { bottle: "19세 미만", User: "" },
          { bottle: "20대", User: "" },
          { bottle: "30대", User: "" },
          { bottle: "40대", User: "" },
          { bottle: "50대 이상", User: "" },
        ]}
        /**
         * chart에 보여질 데이터 key (측정되는 값)
         */
        keys={["User"]}
        /**
         * keys들을 그룹화하는 index key (분류하는 값)
         */
        indexBy="bottle"
        /**
         * chart margin
         */
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        /**
         * chart padding (bar간 간격)
         */
        padding={0.3}
        /**
         * chart 색상
         */
        colors={["rgb(61, 162, 255)"]} // 커스터하여 사용할 때
        // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
        /**
         * color 적용 방식
         */
        colorBy="id" // 색상을 keys 요소들에 각각 적용
        // colorBy="indexValue" // indexBy로 묵인 인덱스별로 각각 적용
        // maxValue={100}
        groupMode="grouped"
        theme={{
          /**
           * label style (bar에 표현되는 글씨)
           */
          labels: {
            text: {
              fontSize: 14,
              fill: "#000000",
            },
          },
          /**
           * legend style (default로 우측 하단에 있는 색상별 key 표시)
           */
          legends: {
            text: {
              fontSize: 12,
              fill: "#000000",
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
              },
            },
            /**
             * axis ticks style (bottom, left에 있는 값)
             */
            ticks: {
              text: {
                fontSize: 16,
                fill: "#000000",
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
          legend: "나이 분포",
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
          legend: "USERS", // left 글씨
          legendPosition: "middle", // 글씨 위치
          legendOffset: -50, // 글씨와 chart간 간격
        }}
        enableGridY={false}
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

export default AdminPageUserNivo_A;
