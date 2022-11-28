import React from "react";
import "../../styles/AI/AIFirstRenderTime.css";

const AIFirstRenderTime = ({ remainingTime }) => {
  return (
    <div className="timer">
      <div className="text">챌린지 시작까지</div>
      <div className="value">{remainingTime}</div>
      <div className="text">초</div>
    </div>
  );
};

export default AIFirstRenderTime;
