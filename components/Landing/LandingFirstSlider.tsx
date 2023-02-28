import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import { isServerRuntime } from 'next/dist/server/config-shared';

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

let slides = setSlides();

function setSlides() {
  let addedFront = [];
  let addedLast = [];
  let index = 0;
  while (index < 7) {
    addedLast.push(SubImg[index % SubImg.length]);
    addedFront.unshift(SubImg[SubImg.length - 1 - (index % SubImg.length)]);
    index++;
  }
  return [...addedFront, ...SubImg, ...addedLast];
}

const LandingFirstSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const [transition, setTransition] = useState(0.2);

  useEffect(() => {
    const timer = setInterval(
      () => {
        if (slideIndex !== SubImg.length) {
          setSlideIndex(slideIndex + 1);
        } else if (slideIndex === SubImg.length) {
          setSlideIndex(0);
        }
      },
      slideIndex === 7 ? 500 : 2000,
    );
    return () => clearInterval(timer);
  }, [slideIndex]);

  return (
    <Wrapper>
      <MainTitle>
        내일의 충전생활,
        <br />그 일상을 오늘로.
      </MainTitle>
      <SubTitle>
        생활 반경 속 나를 위한 충전기,
        <br />더 쉽게 누릴 수 있도록 엔티즌이 함께 합니다.
      </SubTitle>

      <ImgContainer>
        <MainImgBox>
          <ImgTag src="Landing/IPHONEMainSvg.svg" />
        </MainImgBox>
        <RollingImgBox ref={slideRef}>
          {slides.map((item, index) => (
            <RollingmgTag
              src={item.url}
              key={index}
              slideIndex={slideIndex}
              transition={transition}
            />
          ))}
        </RollingImgBox>
      </ImgContainer>
    </Wrapper>
  );
};

export default LandingFirstSlider;

const Wrapper = styled.div`
  /* width: 100vw; */
  /* height: 100vh; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 94.5pt;
  /* padding-top: 94.5pt; */
  overflow: hidden;
  background-color: white;
  padding-bottom: 225pt;
`;
const Box = styled.div`
  margin-top: 94.5pt;
`;

const MainTitle = styled.span`
  font-family: 'Apple SD Gothic Neo';
  font-size: 60pt;
  font-weight: 800;
  line-height: 82.5pt;
  letter-spacing: -0.02em;
  text-align: center;
  white-space: pre;
  color: #222222;
  @media (max-width: 899.25pt) {
    font-size: 24pt;
    font-weight: 800;
    line-height: 34.5pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;

const SubTitle = styled.span`
  padding-top: 30pt;
  font-family: 'Apple SD Gothic Neo';
  font-size: 21;
  font-weight: 600;
  line-height: 36pt;
  letter-spacing: -0.02em;
  text-align: center;
  white-space: pre;
  color: #222222;
  @media (max-width: 899.25pt) {
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

  /* padding-top: 221.25pt; */
  padding-top: 210pt;
  width: 960pt;
  justify-content: center;
  overflow: hidden;
`;

const MainImgBox = styled.div`
  position: absolute;
  z-index: 10;
  height: auto;
  height: 112.5pt;
`;
const ImgContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const ImgTag = styled.img``;

const RollingmgTag = styled.img<{ slideIndex: number; transition: number }>`
  ${({ slideIndex }) =>
    slideIndex !== 7 &&
    css`
      transition: 0.3s all ease-in;
    `}
  transform: ${({ slideIndex }) => `translateX(${slideIndex * 135}pt)`};
`;
