import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import LeftImg from 'public/Landing/ThirdLeft.png';
import RightImg from 'public/Landing/ThirdRight.png';

const LandingThird = () => {
  return (
    <Wrapper>
      <LeftBox>
        <TextBox>
          <MainText>
            어려운 충전기를 <br />
            알기 쉽게,
            <br />
            엔티즌 도서관
          </MainText>
          <SubText>
            핵심만 쏙쏙 뽑아둔 가이드를 통해서,
            <br />
            나에게 딱 맞는 충전기와 보조금을 확인해 보세요.
          </SubText>
        </TextBox>
        <Image src={LeftImg} />
      </LeftBox>
      <RightBox>
        <Image src={RightImg} />
      </RightBox>
    </Wrapper>
  );
};

export default LandingThird;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 201.75pt 0;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const RightBox = styled.div``;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
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
