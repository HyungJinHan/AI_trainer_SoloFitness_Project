import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import axios from 'axios';
import ReactPlayer from 'react-player';
import '../../styles/UserPage/UserPage.css'

function MainSliderCenter({ CENTER_ID }) {
  const [centerVideo, setCenterVideo] = useState({
    list: []
  });

  useEffect(() => {
    axios
      .post("http://localhost:8008/registcentervideo", {
        CENTER_ID: CENTER_ID,
      })
      .then((res) => {
        const { data } = res;
        setCenterVideo({
          list: data
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [CENTER_ID]);

  console.log(centerVideo[0])

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={5}
        modules={[Autoplay]}
        loop={true}
        slidesPerGroup={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1800}
        className="mySwiper"
      >
        {
          centerVideo.list
            .map((items) => (
              <SwiperSlide key={items.CT_VIDEO_TITLE}>
                <div className='UserMain_centerVideoSlider'>
                  <ReactPlayer
                    url={items.CT_VIDEO_ADDRESS}
                    controls
                    width={'100%'}
                    height={'250px'}
                  />
                </div>
              </SwiperSlide>
            ))
        }
      </Swiper>
    </div >
  );
}

export default MainSliderCenter;