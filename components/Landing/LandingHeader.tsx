import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useMediaQuery } from 'react-responsive';
import colors from 'styles/colors';
import Image from 'next/image';
import landing_Inquiry_icon from 'public/Landing/landing_Inquiry_icon.svg';
import landing_arrow_icon from 'public/Landing/landing_arrow_icon.svg';
import { useRouter } from 'next/router';

const LandingHeader = () => {
  const router = useRouter();
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
  // 문의하기
  const onClickEmail = () => {
    setMailOn(true);
    setTimeout(function () {
      setMailOn(false);
    }, 2000);
    handleCopyEmail('help@entizen.kr');
  };

  // 엔티즌 바로가기
  const onClickRouter = () => {
    router.push('https://entizen.kr/');
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
        <ButtonWrap>
          {/* <span className="text">무엇이든 물어보세요</span>
          {!mobile && <ImgTag src="Landing/RightWhiteArrow.svg" />} */}
          <button className="inquiryBtn" onClick={onClickEmail}>
            <span className="inquiryText">문의하기</span>
            <span className="inquiryImg">
              <Image
                src={landing_Inquiry_icon}
                alt="landing_Inquiry_icon"
                layout="fill"
              />
            </span>
          </button>
          {!mobile && (
            <button className="shortcutBtn" onClick={onClickRouter}>
              <span className="shortcutText">엔티즌 바로가기</span>
              <span className="shortcutImg">
                <Image
                  src={landing_arrow_icon}
                  alt="landing_arrow_icon"
                  layout="fill"
                />
              </span>
            </button>
          )}
        </ButtonWrap>
        {/* 하단 버튼 */}
        <ButtonBanner onClick={onClickRouter}>
          <span className="text">{'엔티즌\n 바로가기'}</span>
          <span className="img">
            <Image
              src={landing_arrow_icon}
              alt="landing_arrow_icon"
              layout="fill"
            />
          </span>
        </ButtonBanner>
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
  position: fixed;
  top: 0;
  z-index: 99999;
  background-color: ${colors.lightWhite};
  @media (max-width: 899.25pt) {
    display: flex;
    align-items: center;
    height: 36pt;
  }
`;

const ImgTag = styled.img``;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* display: flex;
  align-items: center;
  justify-content: center;
  gap: 6pt;
  padding: 7pt 15pt 9pt;
  background-color: #222222;
  border-radius: 21.75pt;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    padding: 6pt 9pt;
    height: 21pt;
    gap: 0;
  }
  .text {
    font-family: 'Apple SD Gothic Neo', 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 800;
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
  } */
  .inquiryBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24pt;
    background-color: ${colors.lightWhite};
    @media (max-width: 899.25pt) {
      margin-right: 0;
    }
  }
  .inquiryText {
    font-family: 'Apple SD Gothic Neo';
    font-style: normal;
    font-weight: 800;
    font-size: 10.5pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    margin-right: 3pt;
    padding-top: 1.5pt;
  }
  .inquiryImg {
    position: relative;
    width: 12pt;
    height: 12pt;
  }
  .shortcutBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.lightWhite};
    background: #ffffff;
    padding: 9pt 15pt;
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    border-radius: 29px;
  }
  .shortcutText {
    font-family: 'Apple SD Gothic Neo';
    font-style: normal;
    font-weight: 800;
    font-size: 10.5pt;
    line-height: 13.5pt;
    letter-spacing: -0.02em;
    color: ${colors.main1};
    margin-right: 1.5pt;
  }
  .shortcutImg {
    position: relative;
    width: 13.5pt;
    height: 13.5pt;
  }
`;

const ButtonBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  white-space: pre;
  text-align: center;
  position: fixed;
  right: 45pt;
  top: 678pt;
  width: 90pt;
  height: 90pt;
  border-radius: 50%;
  cursor: pointer;
  background: linear-gradient(
    70.87deg,
    #5221cb 24.29%,
    rgba(82, 33, 203, 0) 212.16%
  );
  /* shadow */

  filter: drop-shadow(0px 0px 10px rgba(137, 163, 201, 0.2));

  .img {
    position: relative;
    width: 21pt;
    height: 21pt;
  }
  .text {
    font-family: 'Apple SD Gothic Neo';
    font-style: normal;
    font-weight: 800;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.02em;
    /* Sub3 */
    color: #ffffff;
    margin-bottom: 5pt;
  }

  @media (max-width: 899.25pt) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    white-space: nowrap;
    padding: 9pt 15pt;
    position: fixed;
    right: 15pt;
    bottom: 26.25pt;
    top: auto;
    border-radius: 29px;
    z-index: 99999;
    width: auto;
    height: auto;
    background: linear-gradient(
      70.87deg,
      #5221cb 24.29%,
      rgba(82, 33, 203, 0) 212.16%
    );
    /* shadow */

    filter: drop-shadow(0px 0px 10px rgba(137, 163, 201, 0.2));
    .img {
      position: relative;
      width: 13.5pt;
      height: 13.5pt;
    }
    .text {
      font-family: 'Apple SD Gothic Neo';
      font-style: normal;
      font-weight: 800;
      font-size: 14px;
      line-height: 18px;
      letter-spacing: -0.02em;
      /* Sub3 */
      color: #ffffff;
      margin-right: 1.5pt;
      margin-bottom: 0;
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
