import React from "react";
import "../../styles/Loading/Loading_spinner.css";

const LoadingSpinner = () => {
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
