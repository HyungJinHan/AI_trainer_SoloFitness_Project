import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";

function MainSliderList({
  VIDEO_THUMBNAIL,
  VIDEO_TITLE,
  VIDEO_CATEGORY,
  VIDEO_BODY_PART,
}) {
  const navigate = useNavigate();
  const imageSRC = "http://localhost:8008/uploads/slider/" + VIDEO_THUMBNAIL;
  return (
    <div
      onClick={() => {
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
