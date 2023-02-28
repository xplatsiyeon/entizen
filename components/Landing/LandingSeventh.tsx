import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import styled from '@emotion/styled';
import MainSliderImg1 from 'public/images/main-slider-1.png';
import MainSliderImg2 from 'public/images/main-slider-2.png';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';

const LandingSeventh = () => {
  const mobile = useMediaQuery({
    query: '(max-width:600pt)',
  });
  return (
    <SlideWrap>
      <Inner>
        {mobile ? (
          <P>{`전기차 충전기,\n이렇게 활용해 보세요`}</P>
        ) : (
          <P>{`전기차 충전기,\n이렇게\n활용해 보세요`}</P>
        )}
        <SwiperWrapper
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={mobile ? 16 : 30}
          grabCursor={true}
          className="mySwiper"
        >
          <ImgTag style={{ marginLeft: mobile ? '71.25pt' : '292.5pt' }}>
            <Image src={MainSliderImg1} alt="MainSliderImg1" layout="fill" />
          </ImgTag>
          <ImgTag>
            <Image src={MainSliderImg2} alt="MainSliderImg2" layout="fill" />
          </ImgTag>
          <ImgTag>
            <Image src={MainSliderImg1} alt="MainSliderImg1" layout="fill" />
          </ImgTag>
          <ImgTag>
            <Image src={MainSliderImg2} alt="MainSliderImg2" layout="fill" />
          </ImgTag>
          <ImgTag>
            <Image src={MainSliderImg1} alt="MainSliderImg1" layout="fill" />
          </ImgTag>
        </SwiperWrapper>
        {/* <WebBox>
          <WebScroll>
            <ImgTag src="images/main-slider-1.png" />
            <ImgTag src="images/main-slider-2.png" />
            <ImgTag src="images/main-slider-1.png" />
            <ImgTag src="images/main-slider-2.png" />
          </WebScroll>
        </WebBox> */}
      </Inner>
    </SlideWrap>
  );
};

export default LandingSeventh;

const SlideWrap = styled.div`
  width: 100%;
  /* position: relative; */
  padding-top: 120pt;
  padding-bottom: 120pt;
  @media (max-width: 600pt) {
    padding-top: 60pt;
    padding-bottom: 60pt;
  }
`;
const P = styled.p`
  margin-left: 15.5%;
  white-space: pre;
  font-family: 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 37.5pt;
  line-height: 52.5pt;
  letter-spacing: -0.02em;
  color: #222222;
  @media (max-width: 600pt) {
    font-size: 19.5pt;
    font-weight: 700;
    line-height: 28.5pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const SwiperWrapper = styled(Swiper)`
  position: absolute;
  left: 45%;
  height: 405pt;
  /* width: 800pt; */
  width: 775.5pt;
  overflow: hidden;
  @media (max-width: 600pt) {
    width: 257.25pt;
  }
  .swiper-wrapper {
    justify-content: center !important;
    align-items: center;
    object-fit: cover;
    margin-left: 2%;
  }

  @media (max-width: 600pt) {
    top: 87pt;
    left: 6%;
    width: 429.75pt;
    height: 169.5pt;
  }
`;

const Inner = styled.div`
  position: relative;
  height: 405pt;
  display: flex;
  align-content: center;

  @media (max-width: 600pt) {
    display: flex;
    flex-direction: column;
    height: 330pt;
  }
`;

const WebBox = styled.div`
  width: 100vw;
  overflow-x: scroll;
  margin-left: 244px;
`;

const WebScroll = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  width: 1034px;
  justify-content: flex-start;
`;

const ImgBox = styled.div`
  width: 404px;
  height: 540px;
  /* & > span {
    width: 404px;
    height: 540px;
    border-radius: 20px;
  } */
`;

const ImgTag = styled(SwiperSlide)`
  width: 303pt !important;
  height: 405pt !important;
  @media (max-width: 600pt) {
    width: 135pt !important;
    height: 169.5pt !important;
  }
`;
