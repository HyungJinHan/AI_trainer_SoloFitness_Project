import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MainSliderList from './MainSliderLeg';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import '../../styles/MainSlider/MainSlider.css';


function MainSliderTheme(props) {
  const [legThemeList, setLegThemeList] = useState({
    list: []
  });

  useEffect(() => {
    axios
      .post('http://localhost:8008/legtheme', {
        VIDEO_CATEGORY: '하체'
      })
      .then((res) => {
        const { data } = res;
        setLegThemeList({
          list: data
        });
      })
      .catch((e) => {
        console.error(e);
      })
  }, [])

  return (
    <div>
      <div className='MainSlider_themeWhite'>
        일어나... 하체해야지...
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={0}
        modules={[Autoplay]}
        loop={true}
        slidesPerGroup={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={2500}
        className="mySwiper"
      >
        {
          legThemeList.list
            .map((list) => (
              <SwiperSlide key={list.VIDEO_THUMBNAIL}>
                <MainSliderList
                  VIDEO_THUMBNAIL={list.VIDEO_THUMBNAIL}
                  VIDEO_TITLE={list.VIDEO_TITLE}
                  VIDEO_CATEGORY={list.VIDEO_CATEGORY}
                />
              </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  );
}

export default MainSliderTheme;