import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useState } from 'react';
import colors from 'styles/colors';

import Arrow from 'public/guide/Arrow.svg';

const Third = () => {
  const [tabNumber, setTabNumber] = useState(-1);
  const [isMessage, setIsMessage] = useState(false);
  const subscribeType: string[] = ['24개월', '36개월', '48개월', '60개월'];
  return (
    <Wrraper>
      {/* 선택불가 메세지 */}
      {isMessage && (
        <ImpossibleMessage>
          <Contents>
            홈 충전기(부분구독)은 <br />
            구독기간과 무관한 상품입니다.
          </Contents>
        </ImpossibleMessage>
      )}
      <Title>구독기간을 선택해주세요</Title>
      <SubTitle>구독기간 선택</SubTitle>
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
      <ChargeGuide>
        <span className="text">구독 가이드</span>
        <div className="arrow-icon">
          <Image src={Arrow} alt="arrow_icon" />
        </div>
      </ChargeGuide>
    </Wrraper>
  );
};

export default Third;

const Wrraper = styled.div`
  position: relative;
  padding-bottom: 96pt;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
const ChargeGuide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
  margin-top: 139pt;
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
// 부분구독 선택 시 불가 화면
const ImpossibleMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(34, 34, 34, 0.4);
`;
const Contents = styled.p`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 16.5pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
`;
