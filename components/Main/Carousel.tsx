import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import MoneyPhoto from 'public/images/MainMoney.png';

// import required modules
import { Pagination } from 'swiper';
import Image from 'next/image';
import colors from 'styles/colors';

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
            <SliderContent>
              <Top>블라블라</Top>
              <Center>
                엔티즌 회원
                <br />
                전기차 충전 시 50 % 할인
              </Center>
              <WithImage>
                <Image src={MoneyPhoto} alt="money" />
              </WithImage>
            </SliderContent>
          </SwiperSlide>
          <SwiperSlide>
            <SliderContent>
              <Top>블라블라</Top>
              <Center>
                엔티즌 회원
                <br />
                전기차 충전 시 50 % 할인
              </Center>
              <WithImage>
                <Image src={MoneyPhoto} alt="money" />
              </WithImage>
            </SliderContent>
          </SwiperSlide>
          <SwiperSlide>
            <SliderContent>
              <Top>블라블라</Top>
              <Center>
                엔티즌 회원
                <br />
                전기차 충전 시 50 % 할인
              </Center>
              <WithImage>
                <Image src={MoneyPhoto} alt="money" />
              </WithImage>
            </SliderContent>
          </SwiperSlide>
          <SwiperSlide>
            <SliderContent>
              <Top>블라블라</Top>
              <Center>
                엔티즌 회원
                <br />
                전기차 충전 시 50 % 할인
              </Center>
              <WithImage>
                <Image src={MoneyPhoto} alt="money" />
              </WithImage>
            </SliderContent>
          </SwiperSlide>
          <SwiperSlide>
            <SliderContent>
              <Top>블라블라</Top>
              <Center>
                엔티즌 회원
                <br />
                전기차 충전 시 50 % 할인
              </Center>
              <WithImage>
                <Image src={MoneyPhoto} alt="money" />
              </WithImage>
            </SliderContent>
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
    /* background-color: #eeeeee; */
  }
  .swiper-pagination-bullet-active {
    background-color: #eeeeee;
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

const WithImage = styled.div`
  position: absolute;
  right: 10pt;
`;

const Top = styled.div`
  position: absolute;
  top: 16.5pt;
  left: 15pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: rgba(255, 255, 255, 0.5); ;
`;

const Center = styled.div`
  position: absolute;
  top: 31.5pt;
  left: 15pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 15pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #fbfcff;
`;

const SliderContent = styled.div`
  width: 100%;
  height: 99pt;
  background-color: ${colors.main};
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8pt;
`;

export default Carousel;
