import React, { useEffect } from "react";
import "../../styles/AI/AIModelSelect.css";

const VideoModel = () => {
  return (
    <div>
      <img
        src="http://localhost:8000/video"
        alt="Video"
        className="videoModel"
      />
    </div>
  );
};

export default VideoModel;