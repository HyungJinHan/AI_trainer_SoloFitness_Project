import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AI/ModelSelect.css";
import squatIMG from "../../static/images/kcj/squat1.jpg";
import Loading_spinner from "../Loading/LoadingSpinner";
import VideoModel from "./VideoModel";

const ModelSelect = () => {
  const [counter, setCounter] = useState(0);
  const [squat, setSquat] = useState(null);
  // const VideoModel = React.lazy(() => import("./VideoModel"));
  /** 컴포넌트 접속 시 카운터 초기화 */
  useEffect(() => {
    axios.get("http://localhost:8000/initialization").then((res) => {
      setCounter(res.data);
      console.log("initial:", counter);
    });
  }, []);
  /** 0.5초마다 카운트,스쿼트 계산 */
  setInterval(() => {
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
  }, 500);

  return (
    <div className="model">
      <div className="guide_img_div">
        <img src={squatIMG} className="guide_img" />
      </div>
      <div className="counter_div">{counter}</div>
      <div className="feedback_div">
        <p>{squat}</p>
      </div>
      <Suspense fallback={<Loading_spinner />}>
        <VideoModel />
      </Suspense>
      <br />
      <br />
      <br />
      <a type="button" href="http://localhost:3000">
        Back To Main
      </a>
    </div>
  );
};

export default ModelSelect;
