import React from "react";
import { useLocation } from "react-router-dom";
import "../../styles/AI/AIFitnessResult.css";
import FitnessResultNivo from "./AIFitnessResultNivo";
import queryString from "query-string";

const FitnessResult = () => {
  const location = useLocation();
  const test = queryString.parse(location.search);

  return (
    <div className="fitness_result_top_div">
      <p>굳 ㅋ</p>
      <FitnessResultNivo />
    </div>
  );
};

export default FitnessResult;
