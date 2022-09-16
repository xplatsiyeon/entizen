import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination } from 'swiper';

const Carousel = () => {
  return (
    <>
      <SliderWrapper>
        <Swiper
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          loop={true}
          //   className="mySwiper"
        >
          <SwiperSlide>
            <SliderContent>Slide 1</SliderContent>
          </SwiperSlide>
          <SwiperSlide>
            <SliderContent>Slide 2</SliderContent>
          </SwiperSlide>
          <SwiperSlide>
            <SliderContent>Slide 3</SliderContent>
          </SwiperSlide>
          <SwiperSlide>
            <SliderContent>Slide 4</SliderContent>
          </SwiperSlide>
          <SwiperSlide>
            <SliderContent>Slide 5</SliderContent>
          </SwiperSlide>
        </Swiper>
      </SliderWrapper>
    </>
  );
};

const SliderWrapper = styled.div`
  margin-top: 12pt;
  position: relative;
  .swiper {
    border-radius: 8pt;
  }
  .swiper-pagination-bullet {
    position: relative;
  }
  .swiper-pagination-bullet-active {
    background-color: #5a2dc9;
    width: 15pt;
    height: 5pt;
    border-radius: 3pt;
  }
  .swiper-pagination {
    position: absolute;
    display: flex;
    flex-direction: row;
  }
  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal {
    bottom: 15pt;
    left: 15pt;
  }
`;

const SliderContent = styled.div`
  width: 100%;
  height: 99pt;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8pt;
`;

export default Carousel;
