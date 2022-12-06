import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/AI/AIFitnessResult.css";
import FitnessResultNivo from "./AIFitnessResultNivo";
import AIFitnessExecNivo from "./AIFitnessExecNivo";
import queryString from "query-string";
import axios from "axios";

const FitnessResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [exec, setExec] = useState();
  const userNickname = location.state.nickname;
  var execiseCategories = queryString.parse(location.search).exec;
  const goToMain = () => {
    navigate("/usermain");
    window.location.reload();
  };

  return (
    <div className="fitness_result_top_div">
      <div className="AIFitnessResult_intro">
        <span className="AIFitnessResult_nickname">{userNickname}</span>
        <span> 님의 </span>
        <span className="AIFitnessResult_exec">{exec} </span>
        <span>운동결과</span>
      </div>
      <div className="AIFitnessResult_nivo">
        <FitnessResultNivo />
      </div>
      <div className="AIFitnessExec_nivo">
        {/* <p>지금까지 한 운동을 확인해 보세요</p> */}
        <AIFitnessExecNivo />
      </div>
      <div className="AIFitnessResult_go_to_main" onClick={goToMain}>
        메인으로 이동
      </div>
    </div>
  );
};

export default FitnessResult;
