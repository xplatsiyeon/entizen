import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import styled from '@emotion/styled';
import MainSliderImg1 from 'public/images/main-slider-1.png';
import MainSliderImg2 from 'public/images/main-slider-2.png';
import Image from 'next/image';

const LandingSeventh = () => {
  return (
    <SlideWrap>
      <div className="wrapper">
        <P>{`전기차 충전기,\n이렇게\n활용해 보세요`}</P>

        <SwiperWrapper
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
          grabCursor={true}
          className="mySwiper"
        >
          <SwiperSlide>
            <Image src={MainSliderImg1} alt="MainSliderImg1" layout="fill" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={MainSliderImg2} alt="MainSliderImg2" layout="fill" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={MainSliderImg1} alt="MainSliderImg1" layout="fill" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={MainSliderImg2} alt="MainSliderImg2" layout="fill" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={MainSliderImg1} alt="MainSliderImg1" layout="fill" />
          </SwiperSlide>
        </SwiperWrapper>
      </div>
    </SlideWrap>
  );
};

export default LandingSeventh;

const SlideWrap = styled.div`
  width: 100%;
  position: relative;
  padding-top: 120pt;

  .wrapper {
    position: relative;
    height: 405pt;
    display: flex;
    align-content: center;
  }
`;
const P = styled.p`
  margin-left: 10%;
  white-space: pre-wrap;
  font-family: 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 37.5pt;
  line-height: 52.5pt;
  letter-spacing: -0.02em;
  color: #222222;
`;
const SwiperWrapper = styled(Swiper)`
  position: absolute;
  left: 45%;
  height: 305pt;
  width: 800pt;
  overflow: hidden;

  .swiper-wrapper {
    justify-content: center !important;
    align-items: center;
    object-fit: cover;
    margin-left: 2%;
  }
`;

const ImgWrapper = styled.div``;
