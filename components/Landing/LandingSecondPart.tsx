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
      <MainImgBox>
        <Image src={SecondMainImg} />
      </MainImgBox>
      <Black>
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
  padding-top: 600px;

  background-color: white;
`;

const Black = styled.div`
  /* height: ${100 / (2 / 3)}; */
  height: 886px;
  width: 100%;

  background-color: #000000;
`;

const SeperatedeView = styled.div`
  position: relative;
`;

const ImgBox = styled.div`
  padding-top: 75pt;
`;

const MainImgBox = styled.div`
  position: absolute;
  z-index: 50;
  padding: 0 126px;
  top: 1650px;
`;

const TextBox = styled.div`
  padding-top: 555px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MainText = styled.span<{ color: string }>`
  font-family: ' Apple SD Gothic Neo';
  font-size: 36px;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: -0.02em;
  text-align: center;
  white-space: pre;
  color: ${({ color }) => color && color};
`;
