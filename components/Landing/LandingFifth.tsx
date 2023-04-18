import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import LeftImg from 'public/Landing/FifthLeft.png';
import RightImg from 'public/Landing/FifthRight.png';
import { useMediaQuery } from 'react-responsive';
import MobileImg from 'public/Landing/LandingMobileFifth.png';
import WebMain from 'public/Landing/LandingMyReverseAuction.png';

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
            <Image src={MobileImg} priority />
          </MobileWrapper>
        ) : (
          <WebWrapper>
            <WebInner>
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
              <WebLeftImgBox>
                <Image src={LeftImg} priority />
              </WebLeftImgBox>
              <WebRightImgBox>
                <Image src={RightImg} priority />
              </WebRightImgBox>
            </WebInner>
          </WebWrapper>
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
  @media (min-width: 900pt) {
    position: relative;
    background-color: #ffffff;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 215.25pt;
  @media (min-width: 900pt) {
    display: block;
    gap: 0;
  }
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  /* padding-left: 192pt; */
  padding-left: 256px;
`;

const RightBox = styled.div`
  @media (min-width: 900pt) {
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 76.5pt;
  @media (max-width: 600pt) {
    padding-bottom: 0;
  }

  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 10;
  }
`;

const MainText = styled.span`
  /* font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif; */
  font-family: 'Apple SD Gothic Neo', 'Spoqa Han Sans Neo';
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
  /* font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif; */
  font-family: 'Apple SD Gothic Neo', 'Spoqa Han Sans Neo';
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

const MobileImgBox = styled.div`
  @media (min-width: 900pt) {
    width: 100vw;
    margin-left: 100px;
  }
  @media (max-width: 600pt) {
    display: block;
    overflow-x: scroll;
    width: 100vw;
    /* padding-left: -30pt; */
  }
`;

const MobileScroll = styled.div`
  @media (min-width: 900pt) {
    padding-top: 173px;
    padding-bottom: 269px;
    padding-left: 200px;
    padding-right: 256px;
  }
  @media (max-width: 600pt) {
    padding-top: 0;
    /* width: 750pt; */
    /* margin-left: -90pt; */
    width: 500pt;
    display: flex;
    justify-content: flex-start;
    gap: 12pt;
    /* margin-left: -50pt; */
  }
`;

const WebWrapper = styled.div`
  position: relative;
  background-color: #ffffff;
  width: 100vw;
  padding: 269px 0;
`;

const WebInner = styled.div`
  position: relative;
  max-width: 1193px;
  height: 1278px;
  margin: 0 auto;
`;

const WebLeftImgBox = styled.div`
  position: absolute;
  width: 375px;
  left: 0;
  top: 350px;
`;

const WebRightImgBox = styled.div`
  position: absolute;
  width: 630px;
  right: -100px;
  top: -88px;
`;
