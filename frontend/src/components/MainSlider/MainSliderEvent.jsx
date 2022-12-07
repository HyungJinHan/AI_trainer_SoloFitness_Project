import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "../../styles/MainSlider/MainSlider.css";
import EventWanted from "../../static/images/HHJ/Event/EventWanted.svg";
import WF from "../../static/images/HHJ/Event/WF.svg";
import Event from "../../static/images/HHJ/Event/Event1.jpg";
import EventBody from "../../static/images/KCJ/anastase.jpg";
import UnderArmor from "../../static/images/KCJ/underarmor.jpg";
import Brand from "../../static/images/KCJ/brand.jpg";

function MainSliderEvent(props) {
  return (
    <div>
      <div className="MainSlider_themeGray">피트니스 센터 이벤트🥳</div>
      <Swiper
        slidesPerView={2}
        spaceBetween={100}
        modules={[Autoplay]}
        loop={true}
        slidesPerGroup={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={4000}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={WF} alt="undefined" />
          <div className="MainSlider_themeEvent">Wanted 보조 제품 할인</div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Event} alt="undefined" />
          <div className="MainSlider_themeEvent">슈퍼맨 헬스장 세일 중!</div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={EventBody} alt="undefined" />
          <div className="MainSlider_themeEvent">바디프로필 가격 할인 중</div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={UnderArmor} alt="undefined" />
          <div className="MainSlider_themeEvent">언더아머 단속반 모집</div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Brand} alt="undefined" />
          <div className="MainSlider_themeEvent">스포츠 브랜드 확인하기</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default MainSliderEvent;
