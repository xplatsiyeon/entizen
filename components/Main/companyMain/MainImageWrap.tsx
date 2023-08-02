import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import main2 from '../../../public/companyMain/2_EntizenLibrary.png';
import main3 from '../../../public/companyMain/3_Charging.png';
import main4 from '../../../public/companyMain/4_Auction.png';
import main5 from '../../../public/companyMain/5_Entizen100.png';
import main7 from '../../../public/companyMain/7_WithEntizen.png';
import MainSlider from 'components/MainSlider';
import googleIcon from 'public/images/googlePlay.svg';
import appStore from 'public/images/appStore.svg';
import mainIcon from 'public/images/mainIcon5.svg';

const MainImageWrap = () => {
  return (
    <ImageWrap>
      <StoreBanner>
        <div className="box">
          <span className="title">앱 다운로드</span>
          <span className="text">내일의 충전생활, 그 일상을 오늘로.</span>

          <div className="iconWrap">
            <a
              className="appleIcon"
              href="https://apps.apple.com/kr/app/%EC%97%94%ED%8B%B0%EC%A6%8C-%EC%A0%84%EA%B8%B0%EC%B0%A8-%EC%B6%A9%EC%A0%84%EA%B8%B0-%EB%B9%84%EA%B5%90%EB%B6%80%ED%84%B0-%EC%84%A4%EC%B9%98-%EC%9A%B4%EC%98%81%EA%B9%8C%EC%A7%80/id6444201801"
            >
              <Image src={appStore} alt="appStore" />
            </a>
            <a
              className="googleIcon"
              href="https://play.google.com/store/apps/details?id=com.entizen"
            >
              <Image src={googleIcon} alt="googleIcon" />
            </a>
          </div>
          <span className="imgIcon">
            <Image src={mainIcon} alt="mainIcon" />
          </span>
        </div>
      </StoreBanner>
      <Image src={main2} alt="사진" />
      <Image src={main3} alt="사진" />
      <Image src={main4} alt="사진" />
      <Image src={main5} alt="사진" />
      <MainSlider />
      <ImageWrap2>
        <Image src={main7} alt="사진" />
      </ImageWrap2>
    </ImageWrap>
  );
};

export default MainImageWrap;

const ImageWrap = styled.section`
  @media (min-width: 900pt) {
    margin: 0 auto;
    margin-top: 90pt;
  }
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const ImageWrap2 = styled.section`
  background-color: #f8f8f8;
  padding: 120pt 225pt;
`;

const StoreBanner = styled.section`
  margin: 90pt 0;
  height: 320px;
  background-color: #f4f0ff;
  .box {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .title {
    margin-top: 70px;
    color: var(--main-2, #222);
    font-family: Spoqa Han Sans Neo;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 100% */
    letter-spacing: -0.4px;
  }
  .text {
    margin-top: 8px;
    color: var(--main-2, #222);
    font-family: Spoqa Han Sans Neo;
    font-size: 34px;
    font-style: normal;
    font-weight: 700;
    line-height: 56px; /* 164.706% */
    letter-spacing: -0.68px;
  }
  .iconWrap {
    display: flex;
    align-items: center;
    margin-top: 40px;
  }
  .appleIcon {
    margin-right: 20px;
    cursor: pointer;
  }
  .googleIcon {
    cursor: pointer;
  }
  .imgIcon {
    position: absolute;
    right: 0;
    top: 25px;
  }
`;
