import VideoModelC from "./AIVideoModelC";
import queryString from "query-string";
import React, { Suspense, useRef } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [challengeResist, setChallengeResist] = useState(false);
  const [nickname, setNickname] = useState();
  const navigator = useNavigate();
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
    axios
      .post("http://localhost:8008/fitnessresultusernickname", {
        userNickname: window.sessionStorage.getItem("userID"),
      })
      .then((res) => {
        setNickname(res.data[0].USER_NICKNAME);
        console.log(nickname);
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

  const challengeResisterFunc = () => {
    if (execiseCategories_C === "squat") {
      alert("챌린지 등록 성공!");
      axios
        .post("http://localhost:8008/squatchallenge", {
          USER_NICKNAME: nickname,
          USER_SCORE: counter,
        })
        .then((res) => {
          navigator('/challengerank');
        })
    }
    if (execiseCategories_C === "pullup") {
      alert("챌린지 등록 성공!");
      axios
        .post("http://localhost:8008/pullupchallenge", {
          USER_NICKNAME: nickname,
          USER_SCORE: counter,
        })
        .then((res) => {
          navigator('/challengerank');
        })
    }
    if (execiseCategories_C === "pushup") {
      alert("챌린지 등록 성공!");
      axios
        .post("http://localhost:8008/pushupchallenge", {
          USER_NICKNAME: nickname,
          USER_SCORE: counter,
        })
        .then((res) => {
          navigator('/challengerank');
        })
    }
    if (execiseCategories_C === "situp") {
      alert("챌린지 등록 성공!");
      axios
        .post("http://localhost:8008/situpchallenge", {
          USER_NICKNAME: nickname,
          USER_SCORE: counter,
        })
        .then((res) => {
          navigator('/challengerank');
        })
    }
    if (execiseCategories_C === "curl") {
      alert("챌린지 등록 성공!");
      axios
        .post("http://localhost:8008/curlchallenge", {
          USER_NICKNAME: nickname,
          USER_SCORE: counter,
        })
        .then((res) => {
          navigator('/challengerank');
        })
    }
  };

  const goToDetail = () => {
    navigator(`/detail${location.search}`);
    window.location.reload();
  };

  return (
    <div className="modelC">
      {secondRender === true ? (
        <div className="timerWrapper">
          <CountdownCircleTimer
            isPlaying
            duration={5}
            colors={["#0070d6", "#0f8cff", "#4da9ff", "#a3d3ff"]}
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
                  <stop offset="5%" stopColor="#3DA2FF" />
                  <stop offset="95%" stopColor="#94ccff" />
                </linearGradient>
              </defs>
            </svg>
            <CountdownCircleTimer
              isPlaying
              duration={10}
              colors="url(#testid)"
              onComplete={() => {
                axios.get("http://localhost:8000/camerachallengeshutdown");
                setChallengeResist(true);
              }}
            >
              {AIRenderTime}
            </CountdownCircleTimer>
          </div>
          <div className="AIModelSelect_C_counter_div">
            <div className="AIModelSelect_C_counter_text_div">COUNT</div>
            <div className="AIModelSelect_C_counting_div">{counter}</div>
          </div>
        </div>
      )}
      <div className="AIModelSelect_C_video_model">
        <VideoModelC />
      </div>
      <div className="AIModelSelect_C_challenge">
        {challengeResist === true ? (
          <div className="AIModelSelect_C_challenge_top_div">
            <div className="AIModelSelect_C_text">
              챌린지에 등록하시겠습니까?
            </div>
            <div className="AIModelSelect_C_challenge_bottom_div">
              <div className="AIModelSelect_C_challenge_no" onClick={goToDetail}>
                아니요
              </div>
              <div
                className="AIModelSelect_C_challenge_yes"
                onClick={challengeResisterFunc}
              >
                예
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default AIModelSelect_C;
