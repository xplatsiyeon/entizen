import styled from '@emotion/styled';
import colors from 'styles/colors';
import Slider from 'components/slider';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import MaskImg1 from 'public/images/Mask_group.png';
import MaskImg2 from 'public/images/Mask_group2.png';
import MaskImg3 from 'public/images/Mask_group3.png';
const start = () => {
  return (
    <>
      <SliderWrapper>
        <Swiper modules={[Pagination]} pagination={true} loop={true}>
          <SwiperSlide>
            <Slider
              img={MaskImg1}
              text1="어려운 충전기를 알기쉽게,"
              text2="엔티즌 도서관"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slider
              img={MaskImg2}
              text1="미리 알아보는 내 충전기"
              text2="비용과 수익"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slider
              img={MaskImg3}
              text1="한 눈에 비교하는"
              text2="나만의 역경매"
            />
          </SwiperSlide>
        </Swiper>
      </SliderWrapper>
      <Btn>시작하기</Btn>
    </>
  );
};

export default start;

const Btn = styled.div`
  position: fixed;
  bottom: 0;
  background-color: ${colors.main};
  color: ${colors.white};
  width: 100%;
  padding: 15pt 0 39pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 33pt;
`;
const SliderWrapper = styled.div`
  .swiper-pagination-bullet-active {
    background-color: #5a2dc9;
    width: 18pt;
    height: 6pt;
    border-radius: 3pt;
  }
`;
