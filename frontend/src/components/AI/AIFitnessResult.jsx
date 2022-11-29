import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/AI/AIFitnessResult.css";
import FitnessResultNivo from "./AIFitnessResultNivo";
import queryString from "query-string";
import axios from "axios";

const FitnessResult = () => {
  const location = useLocation();
  const userNickname = location.state.nickname;

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
      <div className="AIFitnessResult_go_to_main">메인으로 이동</div>
    </div>
  );
};

export default FitnessResult;
