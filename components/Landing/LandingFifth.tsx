import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import LeftImg from 'public/Landing/FifthLeft.png';
import RightImg from 'public/Landing/FifthRight.png';
import { useMediaQuery } from 'react-responsive';
import MobileImg from 'public/Landing/LandingMobileFifth.png';

const LandingFifth = () => {
  const mobile = useMediaQuery({
    query: '(max-width:600pt)',
  });
  return (
    <Wrapper>
      <Inner>
        {mobile ? (
          <MobileWrapper>
            <TextBox>
              <MainText>
                한 눈에 비교하는 <br />
                나만의 역경매
              </MainText>
              <SubText>
                다양한 견적을 한 눈에 비교해보고, <br />
                나에게 딱 맞는 상품을 선택하세요.
              </SubText>
            </TextBox>
            <Image src={MobileImg} />
          </MobileWrapper>
        ) : (
          <>
            <LeftBox>
              <TextBox>
                <MainText>
                  한 눈에 비교하는 <br />
                  나만의 역경매
                </MainText>
                <SubText>
                  다양한 견적을 한 눈에 비교해보고, <br />
                  나에게 딱 맞는 상품을 선택하세요.
                </SubText>
              </TextBox>
              <Image src={LeftImg} />
            </LeftBox>
            <RightBox>
              <Image src={RightImg} />
            </RightBox>
          </>
        )}
      </Inner>
    </Wrapper>
  );
};

export default LandingFifth;

const Wrapper = styled.div`
  padding-top: 201.75pt;
  /* padding-left: 256px;
  padding-right: 256px; */
  padding-bottom: 162pt;
  @media (max-width: 600pt) {
    padding-top: 60pt;
    padding-bottom: 37.5pt;
  }
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 215.25pt;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 192pt;
`;

const RightBox = styled.div``;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 76.5pt;
  @media (max-width: 600pt) {
    padding-bottom: 0;
  }
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
  @media (max-width: 600pt) {
    font-size: 19.5pt;
    font-weight: 700;
    line-height: 30pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
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
  @media (max-width: 600pt) {
    font-size: 10.5pt;
    font-weight: 500;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;

const MobileWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
