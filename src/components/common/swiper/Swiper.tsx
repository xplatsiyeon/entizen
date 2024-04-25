"use client";

import classes from "./Swiper.module.scss";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import React, { MutableRefObject, useCallback } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import classNames from "classnames";
import { SwiperOptions } from "swiper/types";
import Image from "next/image";

interface SwiperComponentProps {
  slides: string[]; // slider item 배열
  auto?: boolean; // 자동으로 슬라이딩
  image?: "contain" | "cover"; // default: 이미지 전체 보여지게 (비율깨짐), contain: 이미지 전체보이기 (비율유지 사이즈 변경), cover: 이미지 사이즈에 맞춰 자르기 (비율유지)
  swiperRef?: MutableRefObject<SwiperClass | null>; // 참조를 걸어서 이전, 다음 함수 호출에 사용
  options?: SwiperOptions;
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({
  slides,
  auto = false,
  swiperRef = null,
  image,
  options,
}) => {
  const setSwiperInstance = useCallback(
    (swiper: SwiperClass) => {
      if (swiperRef) swiperRef.current = swiper;
    },
    [swiperRef]
  );

  return (
    <Swiper
      className={classes.swiperComp}
      modules={auto ? [Autoplay] : []}
      onSwiper={setSwiperInstance}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      speed={1000}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      {...options}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <Image
            src={slide}
            alt={`swiper_common_${index}`}
            className={classNames(
              image === "contain" && classes.contain,
              image === "cover" && classes.cover
            )}
            loading="lazy"
            fill={true}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
