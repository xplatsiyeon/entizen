import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import MainImg from 'public/Landing/LandingNinth.png';
import Arrow from 'public/Landing/NinthArrow.svg';
import MobileArrow from 'public/Landing/akar-icons_arrow-down.svg';
import { useMediaQuery } from 'react-responsive';

const LandingNinth = () => {
  const mobile = useMediaQuery({
    query: '(max-width:600pt)',
  });
  // 이메일 주소 복사하는 함수
  const handleCopyEmail = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (error) {}
  };
  const [mailOn, setMailOn] = useState<boolean>(false);

  return (
    <Wrapper>
      {mobile ? (
        <>
          <Title>Our Partners</Title>
          <UnderLeftText>
            엔티즌과 함께 일상을 바꾸실
            <br />
            파트너분들을 찾습니다.
          </UnderLeftText>
          <RightBox
            onClick={() => {
              setMailOn(true);
              setTimeout(function () {
                setMailOn(false);
              }, 2000);
              handleCopyEmail('entizen@entizen.kr');
            }}
          >
            <Image src={MobileArrow} />
            <UnderRightText>제휴 문의</UnderRightText>
          </RightBox>
          {mailOn && (
            <MailCopyBtn mailOn={mailOn}>
              문의 이메일 주소가 복사 되었습니다.
            </MailCopyBtn>
          )}
          <MobileImgBox>
            <Image src={MainImg} objectFit="cover" layout="fill" />
          </MobileImgBox>
        </>
      ) : (
        <>
          <WebTopContainer>
            <WebUnderBox>
              <Title>Our Partners</Title>
              <div></div>
            </WebUnderBox>
          </WebTopContainer>
          <WebUnderContainer>
            <WebUnderBox>
              <UnderLeftText>
                엔티즌과 함께 일상을 바꾸실
                <br />
                파트너분들을 찾습니다.
              </UnderLeftText>
              <RightBox
                onClick={() => {
                  setMailOn(true);
                  setTimeout(function () {
                    setMailOn(false);
                  }, 2000);
                  handleCopyEmail('entizen@entizen.kr');
                }}
              >
                <Image src={Arrow} />
                <UnderRightText>제휴 문의</UnderRightText>
              </RightBox>
            </WebUnderBox>
          </WebUnderContainer>
          {mailOn && (
            <MailCopyBtn mailOn={mailOn}>
              문의 이메일 주소가 복사 되었습니다.
            </MailCopyBtn>
          )}
          <Image src={MainImg} />
        </>
      )}
    </Wrapper>
  );
};

export default LandingNinth;

const Wrapper = styled.div`
  position: relative;
`;

const Title = styled.span`
  z-index: 10;
  /* font-family: 'Haan YHead B'; */
  /* font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif; */
  font-family: 'Apple SD Gothic Neo', 'Spoqa Han Sans Neo';
  font-size: 19.5pt;
  /* font-weight: 400; */
  font-weight: 700;
  line-height: 19.5pt;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
  opacity: 0.4;
  top: 57.75pt;
  left: 195pt;
  @media (max-width: 600pt) {
    position: absolute;
    font-size: 10.5pt;
    line-height: 10.5pt;
    top: 20%;
    /* left: 24pt; */
    left: 24pt;
  }
`;

const UnderLeftText = styled.span`
  /* position: absolute; */
  z-index: 10;
  /* top: 202.5pt; */
  bottom: 45pt;
  left: 195pt;
  /* font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif; */
  font-family: 'Apple SD Gothic Neo', 'Spoqa Han Sans Neo';
  font-size: 19.5pt;
  font-weight: 800;
  line-height: 30pt;
  letter-spacing: -0.02em;
  text-align: left;
  white-space: pre;
  color: #ffffff;
  @media (max-width: 600pt) {
    position: absolute;
    font-size: 15pt;
    font-weight: 700;
    line-height: 24pt;
    letter-spacing: -0.02em;
    text-align: left;
    /* top: 147pt; */
    bottom: 45pt;
    /* left: 4%; */
    left: 24pt;
  }
`;

const RightBox = styled.div`
  /* position: absolute; */
  z-index: 10;
  bottom: 45pt;
  right: 195pt;
  display: flex;
  align-items: center;
  gap: 9pt;
  cursor: pointer;
  @media (max-width: 600pt) {
    position: absolute;
    /* top: 204pt; */
    bottom: 27pt;
    /* left: 4%; */
    left: 24pt;
    gap: 6pt;
  }
`;

const UnderRightText = styled.span`
  /* font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif; */
  font-family: 'Apple SD Gothic Neo', 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 600;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #ffffff;
  @media (max-width: 600pt) {
    font-size: 9pt;
    font-weight: 600;
    line-height: 9pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const MailCopyBtn = styled.div<{ mailOn: boolean }>`
  position: absolute;
  width: 345pt;
  height: 48pt;
  /* top: 140pt; */
  top: 30%;
  left: 34%;
  z-index: 100;
  padding: 16pt 49.5pt;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  background-color: #464646;
  color: #ffffff;
  border-radius: 8pt;
  @media (max-width: 600pt) {
    padding: 16pt 30pt;
    top: 80pt;
    width: 250pt;
    left: 6%;
  }
`;

const MobileImgBox = styled.div`
  height: 240pt;
`;

const WebUnderContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  /* top: 200pt; */
  bottom: 45pt;
`;

const WebTopContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  top: 50pt;
`;

const WebUnderBox = styled.div`
  width: 895.5pt;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
