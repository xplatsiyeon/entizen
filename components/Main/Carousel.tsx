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
import SwipeCore, { Pagination, Navigation } from 'swiper';
import RightNext from 'public/images/RightNextEllipse.svg';
import LeftNext from 'public/images/LeftNextEllipse.svg';
import Image from 'next/image';
import colors from 'styles/colors';
import { useQuery } from 'react-query';
import { getApi, isTokenGetApi } from 'api';

export type BannerList = {
  isSuccess: boolean;

  data: {
    banners: {
      bannerIdx: number;
      title: string;
      isVisible: boolean;
      url: string;
      createdAt: string;
      bannerImages: {
        bannerImageIdx: number;
        isMainImage: boolean;
        originalName: string;
        url: string;
        size: number;
      }[];
    }[];
  };
};

const Carousel = () => {
  // 멤버타입 조회
  const accessToken = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

  // /banners?tartgetMemberType=USER
  // 배너 조회
  const {
    data: bannerList,
    isLoading: bannerListLoading,
    isError: bannerListError,
    refetch: bannerListRefetch,
  } = useQuery<BannerList>(
    'banner-list',
    () => getApi(`/banners?targetMemberType=USER`),
    {
      enabled: accessToken === null || accessToken === 'USER' ? true : false,
    },
  );

  const {
    data: companyBannerList,
    isLoading: companyBannerLoading,
    isError: companyBannerError,
    refetch: companyBannerRefetch,
  } = useQuery<BannerList>(
    'banner-list-company',
    () => getApi(`/banners?targetMemberType=COMPANY`),
    {
      enabled: accessToken === 'COMPANY' ? true : false,
    },
  );

  SwipeCore.use([Navigation]);

  // <SliderContent>
  //   <Top></Top>
  //   <Center>
  //     엔티즌 회원
  //     <br />
  //     전기차 충전 시 50 % 할인
  //   </Center>
  //   <WithImage>
  //     <Image src={el?.url} alt="money" />
  //   </WithImage>
  // </SliderContent>

  // <SwiperSlide>
  //   <SliderContent key={idx}>
  //     <Top></Top>

  //     <WithImage>
  //       <Image src={el?.url} alt="money" />
  //       <link href={el?.url} />
  //     </WithImage>
  //   </SliderContent>
  // </SwiperSlide>
  return (
    <>
      <Wrapper
        spaceBetween={0}
        // pagination={{
        //   clickable: true,
        // }}
        pagination={{
          type: 'fraction',
        }}
        // navigation={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        // modules={[Pagination, Navigation]}
        modules={[Pagination]}
        className="mySwiper"
        // loop={false}
      >
        {/* {bannerList?.data?.banners
          ?.filter((item) => item.isVisible === true)
          .map((el, idx) => (
            <Slider key={idx}>
              <Top></Top>
                    <Center>{el?.title}</Center>
              <Center>제발 뭐라도 좀 나와라</Center>
              <SliderImg src={el?.url} alt={'이미지'} />
              <link href={el?.url} />
              <a href={el?.url}>
                {el?.bannerImages?.map((img) => (
                  <SliderImg
                    key={img?.bannerImageIdx}
                    src={img?.url}
                    alt={img?.originalName}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </a>
            </Slider>
          ))} */}

        {accessToken === 'COMPANY'
          ? companyBannerList?.data?.banners
              ?.filter((item) => item.isVisible === true)
              .map((el, idx) => (
                <Slider key={idx}>
                  {/* <Top></Top>
                    <Center>{el?.title}</Center> */}
                  {/* <Center>제발 뭐라도 좀 나와라</Center> */}
                  {/* <SliderImg src={el?.url} alt={'이미지'} /> */}
                  <a href={el?.url}>
                    {el?.bannerImages?.map((img) => (
                      <SliderImg
                        key={img?.bannerImageIdx}
                        src={img?.url}
                        alt={img?.originalName}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </a>
                </Slider>
              ))
          : bannerList?.data?.banners
              ?.filter((item) => item.isVisible === true)
              .map((el, idx) => (
                <Slider key={idx}>
                  {/* <Top></Top>
                        <Center>{el?.title}</Center> */}
                  {/* <Center>제발 뭐라도 좀 나와라</Center> */}
                  {/* <SliderImg src={el?.url} alt={'이미지'} /> */}
                  {/* <link href={el?.url} /> */}
                  <a href={el?.url}>
                    {el?.bannerImages?.map((img) => (
                      <SliderImg
                        key={img?.bannerImageIdx}
                        src={img?.url}
                        alt={img?.originalName}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </a>
                </Slider>
              ))}

        {/* </SwiperSlide> */}
        {/* <SliderContent>
          <Top></Top>
          <Center>
            엔티즌 회원
            <br />
            전기차 충전 시 50 % 할인
          </Center>
          <WithImage><Image src={el?.url} alt="money" /></WithImage>
        </SliderContent> */}
        <div className="swiper-button-prev">
          <Image src={LeftNext} alt={LeftNext} layout="fill" />
        </div>
        <div className="swiper-button-next">
          <Image src={RightNext} alt={RightNext} layout="fill" />
        </div>
      </Wrapper>
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
  /* height: 360pt; */

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

const Slider = styled(SwiperSlide)`
  .imgBox {
    width: 100%;
    /* width: 627px; */
    height: 360pt;
    /* 16:9 적용 */
    /* padding-top: calc(100% / 16 * 9); */
    /* padding-top: 627px; */
    margin: auto;
    overflow: hidden;
    @media (max-width: 899.25pt) {
      height: 91.5pt;
    }
  }
`;

const SliderImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Wrapper = styled(Swiper)`
  /* height: 100%; */
  height: 360pt;
  @media (max-width: 899.25pt) {
    height: 99pt;
    border-radius: 6pt;
  }
  .swiper-pagination {
    width: fit-content;
    right: 9.75pt;
    left: auto;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 7.5pt;
    line-height: 9pt;
    letter-spacing: -0.02em;
    color: #ffffff;

    padding: 1.5pt 4.5pt;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 7.5pt;
  }

  .swiper-wrapper {
    width: 0;
  }

  .swiper-button-next {
    background-size: 50% auto;
    background-position: center;
    position: absolute;
    width: 21pt;
    height: 21pt;
    @media (max-width: 899.25pt) {
      display: none;
    }
  }

  .swiper-button-prev {
    width: 21pt;
    height: 21pt;
    position: absolute;
    @media (max-width: 899.25pt) {
      display: none;
    }
  }
  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }
`;

export default Carousel;
