import styled from '@emotion/styled';
import React from 'react';
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
          //navigation={true}
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
  width: 900pt;
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
    justify-content: center;
    @media (max-width: 899pt) {
      justify-content: unset;
    }
  }
  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal {
    bottom: 15pt;
    left: 15pt;
  }

  @media (max-width: 899pt) {
    width: 100%;
    margin-top: 12pt;
  }
`;

const WithImage = styled.div`
  display: none;
  position: absolute;
  right: 10pt;

  @media (max-width: 899pt) {
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Top = styled.div`
  top: 16.5pt;
  left: 15pt;
  padding-bottom: 15pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 21pt;
  line-height: 25.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: rgba(255, 255, 255, 0.5);

  @media (max-width: 899pt) {
    position: absolute;
    font-size: 10.5pt;
    line-height: 12pt;
    padding-bottom: 0;
  }
`;

const Center = styled.div`
  top: 46.5pt;
  left: 15pt;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 60px;
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
  text-align: left;
  color: #fbfcff;
  @media (max-width: 899pt) {
    position: absolute;
    top: 31.5pt;
    font-size: 15pt;
    line-height: 21pt;
  }
`;

const SliderContent = styled.div`
  width: 100%;
  height: 360pt;
  background-color: ${colors.main};
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8pt;

  @media (max-width: 899pt) {
    height: 99pt;
    justify-content: unset;
  }
`;

export default Carousel;
