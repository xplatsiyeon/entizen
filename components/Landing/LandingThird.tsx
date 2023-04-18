import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import LeftImg from 'public/Landing/ThirdLeft.png';
import RightImg from 'public/Landing/ThirdRight.png';
import { useMediaQuery } from 'react-responsive';
import LandingLibraryImg from 'public/Landing/LandingLibraryImg.png';
import LandingMobile from 'public/Landing/LandingThirdImgMobile.png';

const LandingThird = () => {
  const mobile = useMediaQuery({
    query: '(max-width:600pt)',
  });
  return (
    <>
      {mobile ? (
        <Wrapper>
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
              나에게 맞는 충전기와 보조금을 확인해보세요.
            </SubText>
          </TextBox>
          <MobileImgBox>
            <MobileScroll>
              <Image src={LandingMobile} priority />
            </MobileScroll>
          </MobileImgBox>
        </Wrapper>
      ) : (
        <WebWrapper>
          <WebInner>
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
                나에게 맞는 충전기와 보조금을 확인해보세요.
              </SubText>
            </TextBox>
            <WebeftImgBox>
              <Image src={LeftImg} priority />
            </WebeftImgBox>
            <WebRightImgBox>
              <Image src={RightImg} priority />
            </WebRightImgBox>
          </WebInner>
        </WebWrapper>
      )}
    </>
  );
};

export default LandingThird;

// const Wrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 201.75pt 0;
//   @media (max-width: 600pt) {
//     /* padding: 80px 0; */
//     padding-top: 60pt;
//     overflow-x: hidden;
//     padding-bottom: 0;
//     /* width: 100vw; */
//     width: 100%;
//     /* width: 800px; */
//   }
// `;

const Wrapper = styled.div`
  position: relative;
  background-color: #ffffff;
  @media (max-width: 600pt) {
    background-color: #ffffff;
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
  }
  @media (max-width: 600pt) {
    display: flex;
    position: static;
    padding-top: 60pt;
    justify-content: flex-start;
    align-items: center;
  }
`;

const MobileTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 42.75pt;
`;

const MainText = styled.span`
  /* font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif; */
  /* font-family: 'AppleGothicNeo'; */
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
    padding-top: 12pt;
  }
`;

const MobileImgBox = styled.div`
  @media (max-width: 600pt) {
    display: block;
    overflow-x: scroll;
    width: 100vw;
    /* padding-left: -30pt; */
  }
`;

const MobileScroll = styled.div`
  @media (max-width: 600pt) {
    padding-top: 0;
    width: 500pt;
    display: flex;
    justify-content: flex-start;
    gap: 12pt;
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
  height: 1453px;
  margin: 0 auto;
`;

const WebeftImgBox = styled.div`
  position: absolute;
  width: 630px;
  left: -110px;
  bottom: 78px;
`;

const WebRightImgBox = styled.div`
  position: absolute;
  width: 630px;
  right: -110px;
  top: -95px;
`;
