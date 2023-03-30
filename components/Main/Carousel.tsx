import styled from '@emotion/styled';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SwipeCore, { Pagination, Navigation, Autoplay } from 'swiper';
import RightNext from 'public/images/RightNextEllipse.svg';
import LeftNext from 'public/images/LeftNextEllipse.svg';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { getApi } from 'api';
import { useMediaQuery } from 'react-responsive';
import { AxiosError } from 'axios';

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
        imageSizeType: string;
        // isMainImage: boolean;
        originalName: string;
        url: string;
        size: number;
      }[];
    }[];
  };
};

interface SelectData {
  bannerImageIdx: number;
  imageSizeType: string;
  // isMainImage: boolean;
  originalName: string;
  url: string;
  size: number;
}

const Carousel = () => {
  const mobileSize = useMediaQuery({
    query: '(max-width:324pt)',
  });

  const pcSize = useMediaQuery({
    query: '(min-width:900pt)',
  });

  // 멤버타입 조회
  const accessToken = JSON.parse(localStorage.getItem('MEMBER_TYPE')!);
  // 배너 조회
  const {
    data: bannerList,
    isLoading: bannerListLoading,
    isError: bannerListError,
    refetch: bannerListRefetch,
  } = useQuery<SelectData, AxiosError, BannerList>(
    'banner-list',
    () => getApi(`/banners?targetMemberType=USER`),
    {
      enabled: accessToken === null || accessToken === 'USER' ? true : false,
      // onSettled(data, error) {
      //   data?.data?.banners?.map((item) =>
      //     item?.bannerImages.filter((el) => {
      //       if (pcSize) {
      //         return el.imageSizeType === 'PC';
      //       } else if (mobileSize) {
      //         return el.imageSizeType === 'MOBILE';
      //       } else {
      //         el.imageSizeType === 'TABLET';
      //       }
      //     }),
      //   );
      // },
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

  return (
    <>
      <SwiperMain
        spaceBetween={0}
        pagination={{
          type: 'bullets',
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={3000}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {accessToken === 'COMPANY'
          ? companyBannerList?.data?.banners
              ?.filter((item) => item.isVisible === true)
              .map((el, idx) => (
                <Slider key={idx}>
                  <a href={el?.url}>
                    {el?.bannerImages
                      ?.filter((item) => {
                        if (pcSize) {
                          return item.imageSizeType === 'PC';
                        } else if (mobileSize) {
                          return item.imageSizeType === 'MOBILE';
                        } else {
                          return item.imageSizeType === 'TABLET';
                        }
                      })
                      .map((img) => (
                        <Image
                          key={img?.bannerImageIdx}
                          src={img?.url}
                          alt={img?.originalName}
                          style={{ cursor: 'pointer' }}
                          layout="fill"
                          priority={true}
                          unoptimized={true}
                          objectFit="cover"
                        />
                      ))}
                  </a>
                </Slider>
              ))
          : bannerList?.data?.banners
              ?.filter((item) => item.isVisible === true)
              .map((el, idx) => (
                <Slider key={idx}>
                  <a href={el?.url}>
                    {el?.bannerImages
                      ?.filter((item) => {
                        if (pcSize) {
                          return item.imageSizeType === 'PC';
                        } else if (mobileSize) {
                          return item.imageSizeType === 'MOBILE';
                        } else {
                          return item.imageSizeType === 'TABLET';
                        }
                      })
                      .map((img) => (
                        <Image
                          key={img?.bannerImageIdx}
                          src={img?.url}
                          alt={img?.originalName}
                          style={{ cursor: 'pointer' }}
                          layout="fill"
                          priority={true}
                          unoptimized={true}
                          objectFit="cover"
                        />
                        // <SliderImg
                        //   key={img?.bannerImageIdx}
                        //   src={img?.url}
                        //   alt={img?.originalName}
                        //   style={{ cursor: 'pointer' }}
                        // />
                      ))}
                    {/* {el?.bannerImages?.map((img) => (
                      <SliderImg
                        key={img?.bannerImageIdx}
                        src={img?.url}
                        alt={img?.originalName}
                        style={{ cursor: 'pointer' }}
                      />
                    ))} */}
                  </a>
                </Slider>
              ))}
        <div className="swiper-button-prev">
          <Image src={LeftNext} alt={LeftNext} layout="fill" />
        </div>
        <div className="swiper-button-next">
          <Image src={RightNext} alt={RightNext} layout="fill" />
        </div>
      </SwiperMain>
    </>
  );
};

const Slider = styled(SwiperSlide)`
  .imgBox {
    width: 100%;
    height: 360pt;
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

const SwiperMain = styled(Swiper)`
  height: 360pt;
  @media (max-width: 899.25pt) {
    height: 99pt;
    border-radius: 6pt;
  }
  .swiper-pagination {
    /* width: fit-content; */
    /* right: 9.75pt;
    left: auto; */
    text-align: center;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 7.5pt;
    line-height: 9pt;
    letter-spacing: -0.02em;
    color: #ffffff;
    padding: 1.5pt 10pt;
    /* background: rgba(0, 0, 0, 0.3); */
    border-radius: 7.5pt;
    @media (max-width: 899.25pt) {
      text-align: left;
    }
  }

  .swiper-wrapper {
    width: 0;
  }

  .swiper-pagination-bullet {
    background-color: white;
    margin: 0 3pt !important;
    cursor: pointer;
  }
  .swiper-pagination-bullet-active {
    width: 18pt;
    height: 6pt;
    border-radius: 12pt;
    cursor: pointer;
  }

  .swiper-button-next {
    background-size: 50% auto;
    background-position: center;
    position: absolute;
    width: 21pt;
    height: 21pt;
    margin-right: 170pt;
    @media (max-width: 899.25pt) {
      display: none;
    }
  }

  .swiper-button-prev {
    width: 21pt;
    height: 21pt;
    position: absolute;
    margin-left: 170pt;
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
