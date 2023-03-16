import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import LeftImg from 'public/Landing/ThirdLeft.png';
import RightImg from 'public/Landing/ThirdRight.png';
import { useMediaQuery } from 'react-responsive';

const LandingThird = () => {
  const mobile = useMediaQuery({
    query: '(max-width:600pt)',
  });
  return (
    <Wrapper>
      {mobile ? (
        <MobileWrapper>
          <MobileTextWrapper>
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
          </MobileTextWrapper>
          <MobileImgContainer>
            <MobileScroll>
              <ImgBox>
                <Image src={LeftImg} />
              </ImgBox>
              <RightBox>
                <Image src={RightImg} />
              </RightBox>
            </MobileScroll>
          </MobileImgContainer>
        </MobileWrapper>
      ) : (
        <>
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
            <ImgBox>
              <Image src={LeftImg} />
            </ImgBox>
          </LeftBox>
          <RightBox>
            <Image src={RightImg} />
          </RightBox>
        </>
      )}
    </Wrapper>
  );
};

export default LandingThird;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 201.75pt 0;
  @media (max-width: 600pt) {
    /* padding: 80px 0; */
    padding-top: 60pt;
    overflow-x: hidden;
    padding-bottom: 0;
    /* width: 100vw; */
    width: 100%;
    /* width: 800px; */
  }
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 600pt) {
    padding-left: 42.75pt;
    width: 262.5pt;
  }
`;

const ImgBox = styled.div`
  @media (max-width: 600pt) {
    width: 300pt;
  }
`;

const RightBox = styled.div`
  @media (max-width: 600pt) {
    width: 300pt;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
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
  /* font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif; */
  /* font-family: 'AppleGothicNeo'; */
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

const MobileImgContainer = styled.div`
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: flex-start; */
  overflow-x: scroll;

  width: 100vw;
`;

const MobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 100vw; */
`;

const MobileScroll = styled.div`
  @media (max-width: 600pt) {
    width: 675pt;
    display: flex;
    justify-content: flex-start;
    gap: 12pt;
  }
`;
