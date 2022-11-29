import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import "../../styles/Loading/Loading_spinner.css";
import ReactLoading from "react-loading";
import styled from "tachyons-components";

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
    <div className="LoadingSpinner_top_div">
      <div className="LoadingSpinner_bubbles">
        <ReactLoading type="spinningBubbles" color="white" width={"40%"} />
      </div>
      <div className="LoadingSpinner_text">결과를 불러오고 있습니다.</div>
      <br></br>
    </div>
  );
};

export default LoadingSpinner;
