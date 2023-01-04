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
import { Pagination, Navigation } from 'swiper';
import Image from 'next/image';
import colors from 'styles/colors';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const Carousel = () => {
  const { userAgent } = useSelector((state: RootState) => state.userAgent);
  // bridge 테스트
  const bridgeTestOnClick = () => {
    if (userAgent === 'Android_App') {
      window.entizen!.openExternalBrowser('https://www.naver.com');
    } else if (userAgent === 'iOS_App') {
      window.open('http://post.naver.com/entizen_ev', 'entizen_post');
      // window.webkit.messageHandlers.openExternalBrowser.postMessage(
      //   'https://www.naver.com',
      // );
    }
  };

  return (
    <>
      <SliderWrapper onClick={bridgeTestOnClick}>
        <Swiper
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          loop={true}
          //className="mySwiper"
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
          {/* <SwiperSlide>
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
          </SwiperSlide> */}
        </Swiper>
      </SliderWrapper>
    </>
  );
};

const SliderWrapper = styled.div`
  max-width: 900pt;
  position: relative;
  .swiper {
    border-radius: 8pt;
  }
  .swiper-button-prev {
    --swiper-navigation-size: 30pt;
    background-image: url(/images/swiper_prev.png);
    background-size: 100%;
    background-repeat: no-repeat;
    width: 30pt;
    &::after {
      display: none;
    }

    @media (max-width: 899.25pt) {
      display: none;
    }
  }
  .swiper-button-next {
    --swiper-navigation-size: 30pt;
    background-image: url(/images/swiper_next.png);
    background-size: 100%;
    background-repeat: no-repeat;
    width: 30pt;
    &::after {
      display: none;
    }
    @media (max-width: 899.25pt) {
      display: none;
    }
  }
  .swiper-pagination-bullet {
    position: relative;
  }
  .swiper-pagination-bullet-active {
    background-color: ${colors.lightWhite};
    width: 15pt;
    height: 5pt;
    border-radius: 3pt;
  }
  .swiper-pagination {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media (max-width: 899.25pt) {
      justify-content: unset;
    }
  }
  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal {
    bottom: 15pt;
    left: 15pt;
  }
  @media (max-width: 899.25pt) {
    margin-top: 12pt;
  }
`;

const WithImage = styled.div`
  display: none;
  position: absolute;
  right: 10pt;

  @media (max-width: 899.25pt) {
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
  color: #fbfcff;

  @media (max-width: 899.25pt) {
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
  @media (max-width: 899.25pt) {
    position: absolute;
    top: 31.5pt;
    font-size: 15pt;
    line-height: 21pt;
  }
`;

const SliderContent = styled.div`
  max-width: 756pt;
  margin: 0 auto;
  height: 360pt;
  background-color: ${colors.main};
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8pt;

  @media (max-width: 899.25pt) {
    max-width: 899.25pt;
    height: 99pt;
    justify-content: unset;
  }
`;

export default Carousel;
