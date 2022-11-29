import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import "../../styles/Loading/Loading_spinner.css";

const LoadingSpinner = () => {
  const location = useLocation();
  const execiseCategories = queryString.parse(location.search).exec;
  const nickname = location.state.nickname;
  console.log("loading info", execiseCategories, nickname);
  const url = `/fitnessresult?exec=${execiseCategories}`;
  const navigate = useNavigate();

  setTimeout(() => {
    navigate(url, { state: { nickname: nickname } });
  }, 2000);
  return (
    <div className="loader_top_div">
      <div className="loader" id="loader"></div>
      <div className="loader" id="loader2"></div>
      <div className="loader" id="loader3"></div>
      <div className="loader" id="loader4"></div>
      <span id="text">LOADING...</span>
      <br></br>
    </div>
  );
};

export default LoadingSpinner;
