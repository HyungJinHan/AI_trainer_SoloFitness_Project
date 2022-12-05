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
        VIDEO_CATEGORY: "하체",
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
      <div className="MainSlider_themeWhite">일어나... 하체해야지...</div>
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
          if (list.VIDEO_TITLE === "squat") {
            list.VIDEO_TITLE = "스쿼트";
          }
          if (list.VIDEO_TITLE === "pushup") {
            list.VIDEO_TITLE = "푸쉬업";
          }
          if (list.VIDEO_TITLE === "situp") {
            list.VIDEO_TITLE = "윗몸일으키기";
          }
          return (
            <SwiperSlide key={list.VIDEO_THUMBNAIL}>
              <MainSliderList
                VIDEO_THUMBNAIL={list.VIDEO_THUMBNAIL}
                VIDEO_TITLE={list.VIDEO_TITLE}
                VIDEO_CATEGORY={list.VIDEO_CATEGORY}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default MainSliderTheme;
