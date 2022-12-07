import React, { useEffect } from "react";
import "../../styles/AI/AIModelSelect.css";

const VideoModel = () => {
  return (
    <div>
      <img
        src="http://localhost:8000/video"
        alt="Video"
        className="AIModelSelect_real_time_web_cam"
      />
    </div>
  );
};

export default VideoModel;
