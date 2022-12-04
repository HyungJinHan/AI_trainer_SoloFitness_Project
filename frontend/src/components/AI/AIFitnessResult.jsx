import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/AI/AIFitnessResult.css";
import FitnessResultNivo from "./AIFitnessResultNivo";
import AIFitnessExecNivo from "./AIFitnessExecNivo";
import queryString from "query-string";
import axios from "axios";

const FitnessResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userNickname = location.state.nickname;
  const goToMain = () => {
    navigate("/usermain");
  };

  return (
    <div className="fitness_result_top_div">
      <div className="AIFitnessResult_intro">
        <span className="AIFitnessResult_nickname">{userNickname}</span>
        <span>님의</span>
        <p>운동결과</p>
      </div>
      <div className="AIFitnessResult_nivo">
        <FitnessResultNivo />
      </div>
      <div className="AIFitnessExec_nivo">
        <p>지금까지 한 운동을 확인해 보세요</p>
        <AIFitnessExecNivo />
      </div>
      <div className="AIFitnessResult_go_to_main" onClick={goToMain}>
        메인으로 이동
      </div>
    </div>
  );
};

export default FitnessResult;
