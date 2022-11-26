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
  const [keyValue, setKeyValue] = useState("");
  const location = useLocation().search;
  const execiseCategories = queryString.parse(location).exec;
  const navigate = useNavigate();
  const goRef = useRef();

  /** 컴포넌트 접속 시 카운터 초기화 */
  useEffect(() => {
    axios.post("http://localhost:8000/execcategories", {
      exec: execiseCategories,
    });
    axios.get("http://localhost:8000/initialization").then((res) => {
      setCounter(res.data);
      console.log("initial:", counter);
    });
  }, []);

  // useEffect(() => {
  //   goRef.current.focus();
  // }, [])

  /** setInterval, clearInterval에 담기 위한 콜백 함수 */
  const counterfunc = async () => {
    /** 카운트 및 피드백을 파이썬에서 받아옴 */
    axios
      .get("http://localhost:8000/videocount")
      .then((res) => {
        var countlist = res.data.count;
        setCounter(countlist[countlist.length - 1]);
        var squatFeedback = res.data.squatFeedback;
        setSquat(squatFeedback[squatFeedback.length - 1]);
        var pushupFeedback = res.data.pushUpFeedback;
        setPushup(pushupFeedback[pushupFeedback.length - 1]);
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

  const url = `/fitnessresult?exec=${execiseCategories}`;

  if (counter === 10) {
    setKeyValue("q");
    if (keyValue === "q") {
      clearInterval(interval);
      setCounter(0);
      navigate(url);
    }
  }

  // const handleKeyDown = (keyValue) => {
  //   if (keyValue === "q") {
  //     clearInterval(interval)
  //     navigate(url);
  //   }
  // };

  return (
    <div className="model">
      <input type="text" ref={goRef} onChange={counter} />
      <div className="guide_img_div">
        <img
          src={require(`../../static/images/KCJ/${execiseCategories}1.jpg`)}
          className="guide_img"
          alt="undefined"
        />
      </div>
      <div className="counter_div">{counter}</div>
      <div className="feedback_div">
        <p>{feedbackClass()}</p>
      </div>
      <VideoModel />
      <br />
      <br />
      <br />
      <a href="http://localhost:3000">Back To Main</a>
      <a href={url}>결과봐라</a>
      {/* <input type="button" onClick={goHome} value="집에가라" />
      <input type="button" onClick={goResult} value="결과봐라" /> */}
    </div>
  );
};

export default ModelSelect;
