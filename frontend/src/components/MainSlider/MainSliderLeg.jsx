import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "swiper/css";

function MainSliderList({
  VIDEO_THUMBNAIL,
  VIDEO_TITLE,
  VIDEO_CATEGORY
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={
        () => {
          navigate(`/detail?exec=${VIDEO_TITLE}`)
        }
      }
    >
      <img
        src={VIDEO_THUMBNAIL}
        alt="undefined"
      />
      <div className='MainSlider_title_text'>
        {VIDEO_TITLE}
      </div>
      <div className='MainSlider_ctgr_text'>
        #  {VIDEO_CATEGORY}
      </div>
    </div>
  )
}

export default MainSliderList;