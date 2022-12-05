import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import axios from 'axios';
import ReactPlayer from 'react-player';
import '../../styles/UserPage/UserPage.css'
import { useNavigate } from 'react-router-dom';

function MainSliderCenter({ CENTER_ID }) {
  const navigate = useNavigate();
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
        slidesPerView={2}
        spaceBetween={0}
        modules={[Autoplay]}
        loop={true}
        slidesPerGroup={2}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={2500}
        className="mySwiper"
      >
        {
          centerVideo.list
            .map((items) => (
              <SwiperSlide key={items.CT_VIDEO_TITLE}>
                <div className='UserMain_centerVideoSlider'>
                  <ReactPlayer
                    className="UserMain_centerVideoItem"
                    url={items.CT_VIDEO_ADDRESS}
                    controls
                    width={'100%'}
                    height={'auto'}
                    onStart={() => { navigate(`/centerdetail?exec=${items.CT_VIDEO_TITLE}`) }}
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