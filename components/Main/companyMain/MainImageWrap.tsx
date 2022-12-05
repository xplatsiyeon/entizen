import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import main1 from '../../../public/companyMain/1_AppDownload.png';
import main2 from '../../../public/companyMain/2_EntizenLibrary.png';
import main3 from '../../../public/companyMain/3_Charging.png';
import main4 from '../../../public/companyMain/4_Auction.png';
import main5 from '../../../public/companyMain/5_Entizen100.png';
import main6 from '../../../public/companyMain/6_Electric.png';
import main7 from '../../../public/companyMain/7_WithEntizen.png';
import MainSlider from 'components/MainSlider';

const MainImageWrap = () => {
  return (
    <ImageWrap>
      <Image src={main1} alt="사진" />
      <Image src={main2} alt="사진" />
      <Image src={main3} alt="사진" />
      <Image src={main4} alt="사진" />
      <Image src={main5} alt="사진" />
      <MainSlider/>
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
