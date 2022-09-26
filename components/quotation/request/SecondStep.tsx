import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useState } from 'react';
import colors from 'styles/colors';
import LinearProgressWithLabel from './progress';
import LinearWithValueLabel from './progress';
import Arrow from 'public/guide/Arrow.svg';
import SliderSizes from './slider';

const SecondStep = () => {
  const [tabNumber, setTabNumber] = useState(-1);
  const subscribeType: string[] = ['전체구독', '부분구독'];
  return (
    <Wrraper>
      <Title>구독상품을 선택해주세요</Title>
      <SubTitle>구독상품 선택</SubTitle>
      <TypeBox>
        {subscribeType.map((type, index) => (
          <Tab
            key={index}
            idx={index.toString()}
            tabNumber={tabNumber.toString()}
            onClick={() => setTabNumber(index)}
          >
            {type}
          </Tab>
        ))}
      </TypeBox>
      <Notice pt={15}>
        전체구독: 충전기 + 운영서비스 구독 <br />
        부분구독: 운영서비스 구독 (충전기는 일시불 구매)
      </Notice>
      <SubTitle>희망하는 수익지분을 선택해주세요.</SubTitle>
      <Notice pt={6}>* 선택하신 수익지분에 따라 구독료가 상승해요.</Notice>

      <SubTitleBox>
        <SubTitle>내 수익/투자</SubTitle>
        <SubTitle>판매자</SubTitle>
      </SubTitleBox>
      {/* slider  */}
      <SliderSizes />
      {/* <Notice pt={15}>* 홈 충전기는 수익지분과 무관한 상품입니다.</Notice> */}
      <ChargeGuide>
        <span className="text">구독 가이드</span>
        <div className="arrow-icon">
          <Image src={Arrow} alt="arrow_icon" />
        </div>
      </ChargeGuide>
    </Wrraper>
  );
};

export default SecondStep;

const Wrraper = styled.div`
  position: relative;
  padding-bottom: 96pt;
  padding: 0 15pt;
`;
const Title = styled.h1`
  padding-top: 24pt;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  text-align: left;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 45pt;
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const TypeBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 11.25pt;
  padding-top: 9pt;
`;
const Tab = styled.span<{ idx: string; tabNumber: string }>`
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
  width: 100%;
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  padding: 13.5pt 0;
  text-align: center;
  ${({ idx, tabNumber }) =>
    idx === tabNumber &&
    css`
      border: 0.75pt solid ${colors.main};
      color: ${colors.main};
    `}
`;

const Notice = styled.p<{ pt: number }>`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  padding-top: ${({ pt }) => pt + 'pt'};
`;
const SubTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
// const ProgressBar = styled.div`
//   border: 1px solid red;
//   padding: 6pt 0;
//   position: relative;
//   .css-187mznn-MuiSlider-root {
//     /* color: red; */
//     color: #e2e5ed;
//     border-radius: 2px;
//   }
//   .css-1gv0vcd-MuiSlider-track {
//     color: ${colors.main};
//   }
//   .css-eg0mwd-MuiSlider-thumb::after {
//     background: #ffffff;
//     box-shadow: 0px 0px 5px rgba(117, 130, 149, 0.6);
//     width: 15pt;
//     height: 15pt;
//   }
//   .css-14pt78w-MuiSlider-rail {
//   }
// `;

const ChargeGuide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
  margin-top: 75pt;
  .text {
    letter-spacing: -0.02em;
    border-bottom: 1px solid ${colors.gray2};
  }
  .arrow-icon {
    position: relative;
    width: 12pt;
    height: 12pt;
  }
`;
