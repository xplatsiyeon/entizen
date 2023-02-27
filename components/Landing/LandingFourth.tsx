import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import mainImg from 'public/Landing/FourthImg.png';

const LandingFourth = () => {
  return (
    <Wrapper>
      <TextBox>
        <MainText>
          미리 알아보는 <br />
          내 충전기 비용과 수익
          <br />
          엔티즌 도서관
        </MainText>
        <SubText>
          전기차 충전기를 충전용으로만 생각하셨나요?
          <br />
          에너지 시대의 새로운 재테크, 엔티즌에서 시작하세요.
        </SubText>
      </TextBox>
      <Image src={mainImg} />
    </Wrapper>
  );
};

export default LandingFourth;

const Wrapper = styled.div`
  position: relative;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  top: 10%;
  right: 25%;
`;

const MainText = styled.span`
  font-family: 'Apple SD Gothic Neo';
  font-size: 37.5pt;
  font-weight: 700;
  line-height: 52.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  white-space: pre;
  color: #222222;
`;

const SubText = styled.span`
  padding-top: 30pt;
  font-family: 'Apple SD Gothic Neo';
  font-size: 15pt;
  font-weight: 500;
  line-height: 25.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  white-space: pre;
  color: #828282;
`;
