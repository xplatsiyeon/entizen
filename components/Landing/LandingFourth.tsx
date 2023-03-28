import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import mainImg from 'public/Landing/FourthImg.png';
import mainImg2 from 'public/Landing/LandingMapImg.png';
import mainImgMobile from 'public/Landing/LandingFourthMobileImg.png';
import Left from 'public/Landing/LandingFourthLeftWeb.png';
import Right from 'public/Landing/LandingFourthRightWeb.png';
import Back from 'public/Landing/LandingFourthWebBack.png';

const LandingFourth = () => {
  const mobile = useMediaQuery({
    query: '(max-width:600pt)',
  });
  return (
    <>
      {mobile ? (
        <Wrapper>
          <TextBox>
            <MainText>
              미리 알아보는 <br />내 충전기 비용과 수익
            </MainText>
            <SubText>
              전기차 충전기를 충전용으로만 생각하셨나요?
              <br />
              에너지 시대의 새로운 재테크, 엔티즌에서 시작하세요.
            </SubText>
          </TextBox>
          <MobileImgBox>
            <MobileScroll>
              <Image src={mainImgMobile} />
            </MobileScroll>
          </MobileImgBox>
        </Wrapper>
      ) : (
        <WebWrapper>
          <BackImg>
            <Image src={Back} />
          </BackImg>
          <WebInner>
            <TextBox>
              <MainText>
                미리 알아보는 <br />내 충전기 비용과 수익
              </MainText>
              <SubText>
                전기차 충전기를 충전용으로만 생각하셨나요?
                <br />
                에너지 시대의 새로운 재테크, 엔티즌에서 시작하세요.
              </SubText>
            </TextBox>
            <WebeftImgBox>
              <Image src={Left} />
            </WebeftImgBox>
            <WebRightImgBox>
              <Image src={Right} />
            </WebRightImgBox>
          </WebInner>
        </WebWrapper>
      )}
    </>
  );
};

export default LandingFourth;

const Wrapper = styled.div`
  position: relative;
  background-color: #f8f8f8;
  @media (max-width: 600pt) {
    background-color: #f8f8f8;
    min-height: 718.5pt;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 76.5pt;
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 10;
    right: 0;
  }
  @media (max-width: 600pt) {
    display: flex;
    position: static;
    padding-top: 60pt;
    padding-bottom: 54px;
    justify-content: flex-start;
    /* align-items: flex-start; */
    align-items: center;
    /* padding-left: 42.75pt; */
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

const MobileImgBox = styled.div`
  @media (max-width: 600pt) {
    display: block;
    overflow-x: scroll;
    width: 100vw;
  }
`;

const MobileScroll = styled.div`
  @media (max-width: 600pt) {
    width: 900pt;
    margin-left: -180pt;
    /* width: 675pt; */
    /* width: 100vw; */
    display: flex;
    justify-content: flex-start;
    gap: 12pt;
  }
`;

const WebWrapper = styled.div`
  position: relative;
  background-color: #f8f8f8;
  width: 100vw;
  padding: 269px 0 175px 0;
`;

const WebInner = styled.div`
  position: relative;
  max-width: 1193px;
  height: 1343px;
  margin: 0 auto;
`;

const WebeftImgBox = styled.div`
  position: absolute;
  width: 630px;
  left: -95px;
  top: -5px;
  z-index: 100;
`;

const WebRightImgBox = styled.div`
  position: absolute;
  width: 630px;
  right: -110px;
  top: 312px;
  z-index: 100;
`;

const BackImg = styled.div`
  position: absolute;
  z-index: 10;
  left: 7%;
  width: 100vw;
  bottom: 52px;
`;
