import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/AI/ModelSelect.css";
import squatIMG from "../../static/images/KCJ/squat1.jpg";
import LoadingSpinner from "../Loading/LoadingSpinner";
import VideoModel from "./VideoModel";
import queryString from "query-string";

const ModelSelect = () => {
  const [counter, setCounter] = useState(0);
  const [squat, setSquat] = useState(null);
  const location = useLocation().search;
  const execiseCategories = queryString.parse(location).exec;
  /** 렌더링되는동안 로딩창 실행, 렌더링이 중첩되서 영상이 너무 느려짐 */
  // const VideoModel = React.lazy(() => import("./VideoModel"));

  let intervalFlag = true;

  /** 컴포넌트 접속 시 카운터 초기화 */
  useEffect(() => {
    axios
      .post("http://localhost:8000/execcategories", {
        exec: execiseCategories,
      })
      .then((res) => {
        console.log(res);
      });
    axios.get("http://localhost:8000/initialization").then((res) => {
      setCounter(res.data);
      console.log("initial:", counter);
    });
  }, []);
  /** setInterval, clearInterval에 담기 위한 콜백 함수 */
  const counterfunc = async () => {
    axios
      .get("http://localhost:8000/videocount")
      .then((res) => {
        var countlist = res.data.count;
        setCounter(countlist[countlist.length - 1]);
        var squatFeedback = res.data.squatFeedback;
        setSquat(squatFeedback[squatFeedback.length - 1]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  /** 0.5초마다 카운트,스쿼트 계산 */
  let interval = setInterval(counterfunc, 500);

  /** intervalFalg가 true면 setInterval실행, false면 Interval 중지 */
  if (intervalFlag === true) {
    interval = setInterval(counterfunc, 500);
  } else {
    interval = clearInterval(interval);
  }

  return (
    <div className="model">
      <div className="guide_img_div">
        <img src={squatIMG} className="guide_img" alt='undefined' />
      </div>
      <div className="counter_div">{counter}</div>
      <div className="feedback_div">
        <p>{squat}</p>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <VideoModel />
      </Suspense>
      <br />
      <br />
      <br />
      <a type="button" href="http://localhost:3000">
        Back To Main
      </a>
      <a href="/fitnessresult?id=kcj">결과봐라</a>
      {/* <input type="button" onClick={goHome} value="집에가라" />
      <input type="button" onClick={goResult} value="결과봐라" /> */}
    </div>
  );
};

export default ModelSelect;
