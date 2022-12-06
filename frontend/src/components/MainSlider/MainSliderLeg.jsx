import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";

function MainSliderList({ VIDEO_THUMBNAIL, VIDEO_TITLE, VIDEO_CATEGORY }) {
  const navigate = useNavigate();
  const imageSRC = "http://localhost:8008/uploads/slider/" + VIDEO_THUMBNAIL;
  return (
    <div
      onClick={() => {
        if (VIDEO_TITLE === "스쿼트") {
          VIDEO_TITLE = "squat";
        }
        if (VIDEO_TITLE === "푸쉬업") {
          VIDEO_TITLE = "pushup";
        }
        if (VIDEO_TITLE === "윗몸일으키기") {
          VIDEO_TITLE = "situp";
        }
        navigate(`/detail?exec=${VIDEO_TITLE}`);
      }}
    >
      <img src={imageSRC} alt="undefined" />
      <div className="MainSlider_title_text">{VIDEO_TITLE}</div>
      <div className="MainSlider_ctgr_text"># {VIDEO_CATEGORY}</div>
    </div>
  );
}

export default MainSliderList;
