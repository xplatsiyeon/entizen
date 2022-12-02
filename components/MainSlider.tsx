import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import styled from '@emotion/styled';
import MainSliderImg1 from 'public/images/main-slider-1.png';
import MainSliderImg2 from 'public/images/main-slider-2.png';
import Image from 'next/image';
import colors from 'styles/colors';

const MainSlider = () => {
  return (
    <Wrapper>
      <Notice>
        <span className="text">
          전기차 충전기,
          <br />
          이렇게
          <br />
          활용해보세요
        </span>
      </Notice>
      <SwiperWrapper
        slidesPerView={5}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        pagination={
          {
            // clickable: true,
          }
        }
        // modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src={MainSliderImg1} alt="MainSliderImg1" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={MainSliderImg2} alt="MainSliderImg2" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={MainSliderImg1} alt="MainSliderImg1" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={MainSliderImg2} alt="MainSliderImg2" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={MainSliderImg1} alt="MainSliderImg1" />
        </SwiperSlide>
      </SwiperWrapper>
    </Wrapper>
  );
};

export default MainSlider;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  /* overflow-x: scroll; */
  height: 860px;
`;

const Notice = styled.div`
  /* width: 500px; */
  font-family: 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 70px;
  letter-spacing: -0.02em;
  color: #222222;
  padding-left: 272.25pt;
  z-index: 9999;
  height: 100%;
  background-color: ${colors.lightWhite};
`;

const SwiperWrapper = styled(Swiper)`
  position: absolute;
  width: 100%;
  /* padding-top: 120pt; */
  /* padding-bottom: 120pt; */
`;

const Div = styled.div`
  border-radius: 15pt;
`;
