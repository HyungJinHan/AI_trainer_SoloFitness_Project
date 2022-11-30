import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import '../../styles/MainSlider/MainSlider.css';
import EventWanted from '../../static/images/HHJ/Event/EventWanted.svg'
import Event from '../../static/images/HHJ/Event/Event1.jpg'

function MainSliderEvent(props) {
  return (
    <div>
      <div className='MainSlider_themeTitle'>
        피트니스 센터 이벤트
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
        <SwiperSlide>
          <img src={EventWanted} alt="undefined" />
          <div className='MainSlider_themeEvent'>
            Wanted 보조 제품 할인
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Event} alt="undefined" />
          <div className='MainSlider_themeEvent'>
            슈퍼맨 헬스장 세일 중!
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default MainSliderEvent;