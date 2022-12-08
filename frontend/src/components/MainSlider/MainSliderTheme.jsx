import axios from "axios";
import React, { useEffect, useState } from "react";
import MainSliderList from "./MainSliderLeg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "../../styles/MainSlider/MainSlider.css";

function MainSliderTheme(props) {
  const [legThemeList, setLegThemeList] = useState({
    list: [],
  });

  useEffect(() => {
    axios
      .post("http://localhost:8008/legtheme", {
        VIDEO_CATEGORY: "맨몸운동",
      })
      .then((res) => {
        const { data } = res;
        setLegThemeList({
          list: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div>
      <div className="MainSlider_themeWhite">
        초보자들을 위한 기초 맨몸운동🔥
      </div>
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
        {legThemeList.list.map((list) => {
          console.log("fasdasdasd", list);
          return (
            <SwiperSlide key={list.VIDEO_THUMBNAIL}>
              <MainSliderList
                VIDEO_THUMBNAIL={list.VIDEO_THUMBNAIL}
                VIDEO_TITLE={list.VIDEO_TITLE}
                VIDEO_CATEGORY={list.VIDEO_CATEGORY}
                VIDEO_BODY_PART={list.VIDEO_BODY_PART}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default MainSliderTheme;
