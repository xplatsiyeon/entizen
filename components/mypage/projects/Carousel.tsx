import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper';
import SwipeCore, { Navigation } from 'swiper';
import Image from 'next/image';
import { ProjectCompletionFiles } from 'QueryComponents/CompanyQuery';
import { useEffect, useRef, useState } from 'react';
import RightNext from 'public/images/RightNextEllipse.svg';
import LeftNext from 'public/images/LeftNextEllipse.svg';
import { set } from 'immer/dist/internal';

interface Props {
  file?: ProjectCompletionFiles[];
}
const Carousel = ({ file }: Props) => {
  const [swiper, setSwiper] = useState(null);
  const [fileArr, setFileArr] = useState<ProjectCompletionFiles[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  useEffect(() => {
    console.log('캐러쉘', file);
    if (file) {
      const copy = [...file!].reverse();
      setFileArr(copy);
      console.log('new', copy);
    }
  }, []);
  SwipeCore.use([Navigation]);
  // const swiperParams = {
  //   navigation: true,
  //   onSwiper: setSwiper,
  //   onSlideChange: (e)=> set(e.activeIndex)
  // }

  return (
    <Wrapper
      pagination={{
        type: 'fraction',
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {fileArr?.map((el) => {
        return (
          <Slider key={el?.projectCompletionFileIdx}>
            <div className="imgBox">
              {/* <Image
              src={el?.url}
              alt={el?.originalName}
              layout="fill"
              priority={true}
              unoptimized={true}
            /> */}
              <SliderImg src={el?.url} alt={el?.originalName} />
            </div>
          </Slider>
        );
      })}
      <div className="swiper-button-prev">
        <Image src={LeftNext} alt={LeftNext} layout="fill" />
      </div>
      <div className="swiper-button-next">
        <Image src={RightNext} alt={RightNext} layout="fill" />
      </div>
    </Wrapper>
  );
};

export default Carousel;

const Wrapper = styled(Swiper)`
  /* height: 100%; */

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
const Slider = styled(SwiperSlide)`
  .imgBox {
    width: 100%;
    /* width: 627px; */
    height: 206.25pt;
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
  object-fit: contain;
`;

const FlexWrap = styled.div`
  /* width: 100%; */
  width: 492pt;
  /* padding: 0 21.75pt 0 21.75pt; */
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 100;
  bottom: 120pt;
  @media (max-width: 900pt) {
    display: none;
  }
`;

const PrevButton = styled.div`
  width: 21pt;
  height: 21pt;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 21.75pt;
  z-index: 200;
  position: relative;
`;

const NextButton = styled.div`
  width: 21pt;
  height: 21pt;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 21.75pt;
  z-index: 200;
  position: relative;
`;
