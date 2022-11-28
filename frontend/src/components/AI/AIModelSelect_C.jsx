import VideoModelC from "./AIVideoModelC";
import queryString from "query-string";
import React, { Suspense, useRef } from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/AI/AIRenderTime.css";
import "../../styles/AI/AIModelSelect_C.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import AIRenderTime from "./AIRenderTime";
import AIFirstRenderTime from "./AIFirstRenderTime";

const AIModelSelect_C = () => {
  const [counter, setCounter] = useState(0);
  const [secondRender, SetSecondRender] = useState(true);
  const [renderPlay, setRenderPlay] = useState(false);
  const location = useLocation();
  const execiseCategories_C = queryString.parse(location.search).exec;

  /** 컴포넌트 접속 시 카운터 초기화 */
  useEffect(() => {
    axios.post("http://localhost:8000/execcategories", {
      exec: execiseCategories_C,
    });
    axios.get("http://localhost:8000/initialization").then((res) => {
      setCounter(res.data.countlist_c[0]);
      console.log("initial:", counter);
    });
  }, []);

  const counterfunc = async () => {
    /** 카운트 및 피드백을 파이썬에서 받아옴 */
    axios
      .get("http://localhost:8000/videocount")
      .then((res) => {
        var countlist = res.data.count_c;
        setCounter(countlist[countlist.length - 1]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  /** 0.5초마다 카운트,스쿼트 계산 */
  const interval = setInterval(counterfunc, 500);
  return (
    <div className="modelC">
      {secondRender === true ? (
        <div className="timerWrapper">
          <CountdownCircleTimer
            isPlaying
            duration={5}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            onComplete={() => {
              SetSecondRender(false);
              setRenderPlay(true);
            }}
          >
            {AIFirstRenderTime}
          </CountdownCircleTimer>
        </div>
      ) : (
        <div>
          <div className="timerWrapper">
            <svg className="svgColor">
              <defs>
                <linearGradient id="testid" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="5%" stopColor="gold" />
                  <stop offset="95%" stopColor="red" />
                </linearGradient>
              </defs>
            </svg>
            <CountdownCircleTimer isPlaying duration={20} colors="url(#testid)">
              {AIRenderTime}
            </CountdownCircleTimer>
          </div>
          <div>{counter}</div>
        </div>
      )}
      <VideoModelC />
    </div>
  );
};

export default AIModelSelect_C;
