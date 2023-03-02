import React from 'react';
import MouseArrowIcon from 'public/Landing/MouseArrowIcon.svg';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import SecondMainImg from 'public/Landing/SecondLanding.png';

const LandingSecondPart = () => {
  return (
    <Wrapper>
      <ImgBox>
        <Image src={MouseArrowIcon} />
      </ImgBox>

      <White />
      <Black>
        <MainImgBox>
          <Image src={SecondMainImg} />
          {/* <img src="Landing/SecondLanding.png" /> */}
        </MainImgBox>
        <TextBox>
          <MainText color={'#838383'}>
            복잡하고 생소한 충전기 설치,
            <br />
          </MainText>
          <MainText color={'white'}>
            엔티즌에서 쉽게 알아보고
            <br /> 한눈에 비교하세요.
          </MainText>
        </TextBox>
      </Black>
    </Wrapper>
  );
};

export default LandingSecondPart;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const White = styled.div`
  /* height: ${100 / (1 / 3)}vh; */
  width: 100%;

  /* padding-top: 450pt; */
  padding-top: 33.3%;
  background-color: white;
  @media (max-width: 600pt) {
    /* padding-top: 280pt; */
    /* padding-top: 50%; */
    padding-top: 33.3%;
  }
`;

const Black = styled.div`
  /* height: ${100 / (2 / 3)}; */
  /* height: 664.5pt; */
  /* height: 66.6%; */
  width: 100%;
  background-color: #000000;
  padding-bottom: 98.25pt;
  @media (max-width: 600pt) {
    /* height: 207.75pt; */
    height: 66.6%;
    padding-bottom: 38.25pt;
  }
`;

const ImgBox = styled.div`
  padding-top: 75pt;
  padding-bottom: 200pt;
  @media (max-width: 600pt) {
    padding-top: 0;
  }
`;

// 1669;
// 869;
const MainImgBox = styled.div`
  left: 0;
  z-index: 50;
  padding: 0 94.5pt;
  transform: translate(0, -55%);
  @media (max-width: 600pt) {
    padding: 0 24.75pt;
  }
`;

const TextBox = styled.div`
  /* padding-top: 350.25pt; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: -15%;
  @media (max-width: 600pt) {
    /* padding-top: 100pt; */
    margin-top: -15%;
  }
`;

const MainText = styled.span<{ color: string }>`
  font-family: ' Apple SD Gothic Neo';
  font-size: 27pt;
  font-weight: 700;
  line-height: 45pt;
  letter-spacing: -0.02em;
  text-align: center;
  white-space: pre;
  color: ${({ color }) => color && color};
  @media (max-width: 600pt) {
    font-size: 15pt;
    font-weight: 700;
    line-height: 24pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;
