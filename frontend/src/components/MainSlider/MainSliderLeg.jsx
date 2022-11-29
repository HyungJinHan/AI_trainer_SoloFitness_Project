import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "swiper/css";

function MainSliderList({
  VIDEO_THUMBNAIL,
  VIDEO_TITLE
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
      <div className='MainSlider_swiperFont'>
        {VIDEO_TITLE}
      </div>
    </div>
  )
}

export default MainSliderList;