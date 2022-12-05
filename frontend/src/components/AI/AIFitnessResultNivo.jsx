import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { useEffect, useState } from "react";
import produce from "immer";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

const FitnessResultNivo = () => {
  const [exerciseName, setExerciseName] = useState([]);
  const [exerciseCount, setExerciseCount] = useState([]);
  const [exerciseDate, setExerciseDate] = useState([]);
  const [nickname, setNickname] = useState();

  /** modelSelect에서 보낸 exec=운동정보 를 그대로 받아옴 */
  const location = useLocation();
  const execiseCategories = queryString.parse(location.search).exec;
  const userNickname = location.state.nickname;

  useEffect(() => {
    axios
      .post("http://localhost:8008/fitnessresult", {
        execiseCategories: execiseCategories,
        userNickname: userNickname,
      })
      .then((res) => {
        res.data.map((exerciseData) => {
          /** 불변성 유지를 위해 immer 라이브러리 사용 */
          setExerciseName(
            produce((draft) => {
              draft.push(exerciseData.EXCERCISE_NAME);
            })
          );
          setExerciseCount(
            produce((draft) => {
              draft.push(exerciseData.EXCERCISE_COUNT);
            })
          );
          setExerciseDate(
            produce((draft) => {
              draft.push(exerciseData.EXCERCISE_DATE);
            })
          );
        });
      });
  }, []);

  return (
    // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
    <div style={{ width: "25rem", height: "30rem", margin: "0 auto" }}>
      <ResponsiveBar
        /**
         * chart에 사용될 데이터
         */
        data={[
          { bottle: exerciseDate[0], 횟수: exerciseCount[0] },
          { bottle: exerciseDate[1], 횟수: exerciseCount[1] },
          { bottle: exerciseDate[2], 횟수: exerciseCount[2] },
          { bottle: exerciseDate[3], 횟수: exerciseCount[3] },
          { bottle: exerciseDate[4], 횟수: exerciseCount[4] },
        ]}
        /**
         * chart에 보여질 데이터 key (측정되는 값)
         */
        keys={["횟수"]}
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
        // axisBottom={{
        //   tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
        //   tickPadding: 5, // tick padding
        //   tickRotation: 0, // tick 기울기
        //   legend: "날짜별 운동",
        //   legendPosition: "middle", // 글씨 위치
        //   legendOffset: 40, // 글씨와 chart간 간격
        // }}
        axisBottom={null}
        /**
         * axis left 설정
         */
        axisLeft={{
          tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
          tickPadding: 5, // tick padding
          tickRotation: 0, // tick 기울기
          tickValues: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20,
          ],
          legend: "COUNT", // left 글씨
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

export default FitnessResultNivo;
