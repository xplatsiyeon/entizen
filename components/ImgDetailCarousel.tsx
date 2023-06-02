import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper';
import SwipeCore, { Navigation } from 'swiper';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';
import RightNext from 'public/images/RightNextEllipse.svg';
import LeftNext from 'public/images/LeftNextEllipse.svg';
import ExitBtn from 'public/images/ImgModalX.svg';
import { useMediaQuery } from 'react-responsive';

export interface ImgType {
  preQuotationChargerIdx?: number;
  preQuotationFileIdx?: number;
  finalQuotationChargerFileIdx?: number;
  finalQuotationChargerIdx?: number;
  productFileType?: string;
  url: string;
  size?: number;
  createdAt?: string;
  originalName?: string;
}

// 인자로 사진 array, 모달창 닫는 set, 어떤 사진 클릭해서 왔는지 ref
interface Props {
  file?: ImgType[];
  setOpenImgModal: React.Dispatch<React.SetStateAction<boolean>>;
  idxRef: React.MutableRefObject<number>;
}
const ImgDetailCarousel = ({ file, setOpenImgModal, idxRef }: Props) => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  const [fileArr, setFileArr] = useState<ImgType[]>([]);

  useEffect(() => {
    if (file) {
      const copy = [...file!].reverse();
      setFileArr(copy);
    }
  }, []);
  SwipeCore.use([Navigation]);

  // 앱 -> 웹
  // useLayoutEffect(() => {
  //   // 안드로이드 호출
  //   const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  //   if (userAgent === 'Android_App') {
  //     window.onClickBackButton = () => setOpenImgModal(false);
  //   }
  // }, []);

  return (
    <TopWrapper>
      {!mobile && (
        <BackGround
          onClick={() => {
            setOpenImgModal(false);
          }}
        />
      )}
      <Wrapper
        pagination={{
          type: 'fraction',
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        initialSlide={idxRef.current}
        modules={[Pagination]}
        className="mySwiper"
      >
        <Exit
          onClick={() => {
            setOpenImgModal(false);
          }}
        >
          <Image src={ExitBtn} alt="exit" layout="fill" />
        </Exit>
        {fileArr?.map((el, idx) => {
          return (
            <Slider key={idx}>
              <div className="imgBox">
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
    </TopWrapper>
  );
};

export default ImgDetailCarousel;

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(34, 34, 34, 0.4);
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000;
`;

const Wrapper = styled(Swiper)`
  /* height: 100%; */
  border-radius: 12pt;
  width: 580.5pt;
  height: 477pt;
  background-color: #ffffff;
  z-index: 1200;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  /* border: 1px solid red; */
  @media (max-width: 899.25pt) {
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: 0;
    touch-action: none;
    z-index: 99999;
  }

  .swiper-pagination {
    width: fit-content;
    right: 278.625pt;
    top: 35.25pt;
    left: auto;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: #000000;
    border: transparent;
    @media (max-width: 899.25pt) {
      font-size: 12pt;
      font-weight: 700;
      line-height: 18pt;
      letter-spacing: -0.02em;
      text-align: center;
      left: 50%;
      top: 9pt;
      background-color: transparent;
      display: flex;
      justify-content: center;
    }
  }

  .swiper-pagination-fraction {
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
    right: 46.5pt;
    top: 270pt;
    @media (max-width: 899.25pt) {
      display: none;
    }
  }

  .swiper-button-prev {
    width: 21pt;
    height: 21pt;
    left: 46.5pt;
    top: 270pt;
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
  @media (min-width: 900pt) {
    padding: 0 28.5pt;
  }

  .imgBox {
    width: 100%;
    /* width: 627px; */
    /* height: 206.25pt; */
    height: 345pt;

    /* 16:9 적용 */
    /* padding-top: calc(100% / 16 * 9); */
    /* padding-top: 627px; */
    margin: 90pt auto 0;
    overflow: hidden;

    @media (max-width: 899.25pt) {
      /* height: 91.5pt; */
      display: flex;
      justify-content: center;
    }
  }
`;

const SliderImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  @media (max-width: 899.25pt) {
  }
`;

const FlexWrap = styled.div`
  /* width: 100%; */
  width: 492pt;
  /* padding: 0 21.75pt 0 21.75pt; */
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 1000;
  bottom: 120pt;
  @media (max-width: 900pt) {
    display: none;
  }
`;

const Exit = styled.div`
  position: absolute;
  z-index: 1001;
  right: 25.5pt;
  top: 33pt;
  cursor: pointer;
  width: 20pt;
  height: 20pt;
  @media (max-width: 899.25pt) {
    width: 15pt;
    height: 15pt;
    top: 10.5pt;
    right: 18.75pt;
  }
`;

const TopWrapper = styled.div``;
