import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/AI/AIModelSelect.css";
import VideoModel from "./AIVideoModel";
import queryString from "query-string";

const ModelSelect = () => {
  const [counter, setCounter] = useState(0);
  const [squat, setSquat] = useState(null);
  const [pushup, setPushup] = useState(null);
  const [pullup, setPullup] = useState(null);
  const [situp, setSitup] = useState(null);
  const [curl, setCurl] = useState(null);
  const [nickname, setNickname] = useState();
  const [greatFeedback, setGreatFeedback] = useState(false);
  const [squatKneeFeedback, setSquatKneeFeedback] = useState(null);
  const [squatShoulderFeedback, setSquatShoulderFeedback] = useState(null);

  const location = useLocation();
  const execiseCategories = queryString.parse(location.search).exec;

  const navigate = useNavigate();

  const goRef = useRef();

  /** 컴포넌트 접속 시 카운터 초기화 */
  useEffect(() => {
    axios.post("http://localhost:8000/execcategories", {
      exec: execiseCategories,
    });
    axios.get("http://localhost:8000/initialization").then((res) => {
      setCounter(res.data.countlist[0]);
      console.log("initial:", counter);
    });
    axios
      .post("http://localhost:8008/fitnessresultusernickname", {
        userNickname: window.sessionStorage.getItem("userID"),
      })
      .then((res) => {
        setNickname(res.data[0].USER_NICKNAME);
      });
  }, []);

  // useEffect(() => {
  //   goRef.current.focus();
  // }, [])

  /** setInterval, clearInterval에 담기 위한 콜백 함수 */
  const counterfunc = async () => {
    /** 카운트 및 피드백을 파이썬에서 받아옴 */
    await axios
      .get("http://localhost:8000/videocount")
      .then((res) => {
        var countlist = res.data.count;
        setCounter(countlist[countlist.length - 1]);
        var squatFeedback = res.data.squatFeedback;
        setSquat(squatFeedback[squatFeedback.length - 1]);
        var pushupFeedback = res.data.pushUpFeedback;
        setPushup(pushupFeedback[pushupFeedback.length - 1]);
        var squatKnee = res.data.squatKneeFeedback;
        setSquatKneeFeedback(squatKnee[squatKnee.length - 1]);
        var squatShoulder = res.data.squatShoulderFeedback;
        setSquatShoulderFeedback(squatShoulder[squatShoulder.length - 1]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  /** 0.5초마다 카운트,스쿼트 계산 */
  const interval = setInterval(counterfunc, 500);

  // setInterval(counterfunc, 500);

  const feedbackClass = () => {
    if (execiseCategories === "squat") {
      return squat;
    } else if (execiseCategories === "pushup") {
      return pushup;
    }
  };

  const squatFeedbackFunc = () => {
    if (execiseCategories === "squat") {
      return squatKneeFeedback;
    }
  };
  const squatFeedbackFunc2 = () => {
    if (execiseCategories === "squat") {
      return squatShoulderFeedback;
    }
  };

  // const url = `/fitnessresult?exec=${execiseCategories}&nickname=${nickname}`;
  const url = `/loading?exec=${execiseCategories}`;

  /** 유저가 지정한 카운트만큼 운동을 하면 결과창 이동 및 db에 정보 저장 */
  if (counter === parseInt(location.state.inputCount)) {
    axios.post("http://localhost:8008/fitnessresultinfoinsert", {
      userNickname: nickname,
      excerciseName: execiseCategories,
      excerciseCount: counter,
    });
    navigate(url, { state: { nickname: nickname } });
  }

  console.log(location.state.inputCount, execiseCategories);
  console.log("great", greatFeedback);
  return (
    <div className="AIModelSelect_top_div">
      {/* <input type="text" ref={goRef} onChange={counter} /> */}
      <div className="AIModelSelect_guide_img_div">
        <img
          src={require(`../../static/images/KCJ/${execiseCategories}1.jpg`)}
          className="AIModelSelect_guide_img"
          alt="undefined"
        />
      </div>
      <div className="AIModelSelect_counter_div">
        <div className="AIModelSelect_counter_text_div">COUNT</div>
        <div className="AIModelSelect_counting_div">{counter}</div>
      </div>
      <div className="AIModelSelect_goal_count">
        <div className="AIModelSelect_counter_text_div">목표</div>
        <div className="AIModelSelect_counting_div">
          {location.state.inputCount}
        </div>
      </div>
      <div className="AIModelSelect_feedback_div">
        <p
          className={`AIModelSelect_feedback ${
            squat === "Great!" ? "great_feedback" : "not_great_feedback"
          }`}
        >
          <div>{feedbackClass()}</div>
          <div className="AIModelSelect_knee">{squatFeedbackFunc()}</div>
          <div className="AIModelSelect_shoulder">{squatFeedbackFunc2()}</div>
        </p>
      </div>
      <div className="AIModelSelect_real_time_web_cam">
        <VideoModel />
      </div>
      <br />
      <br />
    </div>
  );
};

export default ModelSelect;
