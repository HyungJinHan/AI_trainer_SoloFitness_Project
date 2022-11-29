import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/AI/AIFitnessResult.css";
import FitnessResultNivo from "./AIFitnessResultNivo";
import queryString from "query-string";
import axios from "axios";

const FitnessResult = () => {
  const location = useLocation();

  return (
    <div className="fitness_result_top_div">
      <FitnessResultNivo />
    </div>
  );
};

export default FitnessResult;
