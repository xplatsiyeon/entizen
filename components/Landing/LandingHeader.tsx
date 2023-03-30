import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useMediaQuery } from 'react-responsive';

const LandingHeader = () => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const [mailOn, setMailOn] = useState<boolean>(false);
  // 이메일 주소 복사하는 함수
  const handleCopyEmail = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (error) {}
  };
  return (
    <HeaderWrapper>
      {mailOn && (
        <MailCopyBtn mailOn={mailOn}>
          문의 이메일 주소가 복사 되었습니다.
        </MailCopyBtn>
      )}
      <Box>
        <ImgTag src="Landing/EntizenLogo.svg" alt="EntizenLogo" />
        <Button
          onClick={() => {
            setMailOn(true);
            setTimeout(function () {
              setMailOn(false);
            }, 2000);
            handleCopyEmail('entizen@entizen.kr');
          }}
        >
          <span className="text">무엇이든 물어보세요</span>
          {!mobile && <ImgTag src="Landing/RightWhiteArrow.svg" />}
        </Button>
      </Box>
    </HeaderWrapper>
  );
};

export default LandingHeader;

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 25.5pt 272.25pt; */
  height: 66pt;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  width: 100vw;
  border-bottom: 0.75pt solid #e9eaee;
  box-sizing: border-box;

  @media (max-width: 899.25pt) {
    display: flex;
    align-items: center;
    height: 36pt;
  }
`;

const ImgTag = styled.img``;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6pt;
  padding: 7pt 15pt 9pt;
  /* padding: 9pt 15pt; */
  background-color: #222222;
  border-radius: 21.75pt;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    padding: 6pt 9pt;
    height: 21pt;
    gap: 0;
  }
  .text {
    /* font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif; */
    /* font-family: AppleGothicNeo; */
    font-family: 'Apple SD Gothic Neo', 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 800;
    /* line-height: 13.5pt; */
    padding-top: 2pt;
    line-height: 10.5pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: white;

    @media (max-width: 899.25pt) {
      font-size: 9pt;
      font-weight: 800;
      line-height: 9pt;
      letter-spacing: -0.02em;
      text-align: left;
      padding-top: 1pt;
    }
  }
`;

const Box = styled.div`
  width: 895.5pt;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  @media (max-width: 600pt) {
    padding: 7.5pt 15pt;
    height: 36pt;
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

const MailCopyBtn = styled.div<{ mailOn: boolean }>`
  position: absolute;
  width: 345pt;
  height: 48pt;
  /* top: 140pt; */

  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 500px;
  z-index: 100;
  padding: 16pt 49.5pt;
  /* font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif; */
  /* font-family: AppleGothicNeo; */
  font-family: 'Apple SD Gothic Neo', 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  background-color: #464646;
  color: #ffffff;
  border-radius: 8pt;
  @media (max-width: 600pt) {
    margin-top: 200px;
    padding: 16pt 30pt;
    /* top: 30%; */
    width: 250pt;
  }
`;
