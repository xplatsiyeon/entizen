import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useMediaQuery } from 'react-responsive';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

type Img = {
  id: number;
  url: string;
};

const SubImg: Img[] = [
  { id: 0, url: 'Landing/LandingIcon_1.svg' },
  { id: 1, url: 'Landing/LandingIcon_2.svg' },
  { id: 2, url: 'Landing/LandingIcon_3.svg' },
  { id: 3, url: 'Landing/LandingIcon_4.svg' },
  { id: 4, url: 'Landing/LandingIcon_5.svg' },
  { id: 5, url: 'Landing/LandingIcon_6.svg' },
  { id: 6, url: 'Landing/LandingIcon_7.svg' },
];

const LandingFirstSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const [transition, setTransition] = useState(0.2);
  const mobile = useMediaQuery({
    query: '(max-width:600pt)',
  });

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    // variableWidth: true,
    // centerMode: true,
    // centerPadding: '0px',
  };

  return (
    <Wrapper>
      <TextBox>
        <MainTitle>
          내일의 충전생활,
          <br />그 일상을 오늘로.
        </MainTitle>
        <SubTitle>
          생활 반경 속 나를 위한 충전기,
          <br />더 쉽게 누릴 수 있도록 엔티즌이 함께 합니다.
        </SubTitle>
      </TextBox>
      <ImgContainer>
        <MainImgBox>
          <ImgTag src="Landing/IPHONEMainSvg.svg" />
        </MainImgBox>
        <RollingImgBox ref={slideRef}></RollingImgBox>
      </ImgContainer>

      <SliderBox {...settings}>
        {SubImg.map((item, index) => (
          <img
            width={mobile ? 64 : 160}
            height={mobile ? 64 : 160}
            src={item.url}
            key={index}
          />
        ))}
      </SliderBox>
    </Wrapper>
  );
};

export default LandingFirstSlider;

const SliderBox = styled(Slider)`
  width: 772.5pt;
  @media (max-width: 600pt) {
    width: 280pt;
  }
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 94.5pt;
  overflow: hidden;
  background-color: white;
  padding-bottom: 225pt;
  @media (max-width: 600pt) {
    padding-bottom: 175pt;
  }
`;
const Box = styled.div`
  margin-top: 94.5pt;
`;

const MainTitle = styled.span`
  /* font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif; */
  font-family: 'Apple SD Gothic Neo', 'Spoqa Han Sans Neo';
  font-size: 60pt;
  font-weight: 800;
  line-height: 82.5pt;
  letter-spacing: -0.02em;
  text-align: center;
  white-space: pre;
  color: #222222;
  @media (max-width: 600pt) {
    font-size: 24pt;
    font-weight: 800;
    line-height: 34.5pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;

const SubTitle = styled.span`
  padding-top: 30pt;
  font-family: 'Apple SD Gothic Neo', 'Spoqa Han Sans Neo';
  /* font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif; */
  /* font-family: 'Apple SD Gothic Neo'; */
  /* font-family: 'AppleGothicNeo'; */
  font-size: 21pt;
  font-weight: 600;
  line-height: 36pt;
  letter-spacing: -0.02em;
  text-align: center;
  white-space: pre;
  color: #222222;
  @media (max-width: 600pt) {
    padding-top: 12pt;
    font-size: 10.5pt;
    font-weight: 600;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;

const RollingImgBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 15pt;
  padding-top: 210pt;
  width: 960pt;
  justify-content: center;
  overflow: hidden;
  @media (max-width: 600pt) {
    gap: 6pt;
    padding-top: 150pt;
    width: 400pt;
  }
`;

const MainImgBox = styled.div`
  position: absolute;
  z-index: 10;
  height: 112.5pt;
`;

const ImgContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const ImgTag = styled.img`
  @media (max-width: 600pt) {
    width: 300pt;
  }
`;

const RollingmgTag = styled.img<{ slideIndex: number; transition: number }>`
  ${({ slideIndex }) =>
    slideIndex &&
    css`
      transition: 0.3s all ease-in;
    `}
  transform: ${({ slideIndex }) => `translateX(${slideIndex * 135}pt)`};
  @media (max-width: 600pt) {
    width: 48pt;
    height: 48pt;
    transform: ${({ slideIndex }) => `translateX(${slideIndex * 54}pt)`};
  }
`;
