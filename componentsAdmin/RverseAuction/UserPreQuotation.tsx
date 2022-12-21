import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import colors from 'styles/colors';
import { DatePicker } from 'rsuite';

import { CustomProvider } from 'rsuite';
import koKR from 'rsuite/locales/ko_KR';

const UserPreQuotation = () => {
  // 달력 날짜 변경 함수
  const handleDateChange = () => {};
  return (
    <Background>
      <TitleBox>
        <QuotationTitle>일반회원 간편견적서</QuotationTitle>
        <TwoBtn>
          <Btn>수정</Btn>
          <Btn>삭제</Btn>
        </TwoBtn>
      </TitleBox>
      <DetailBox>
        <FlexList>
          <DetailText type={'left'}>작성자</DetailText>
          <DetailText type={'right'}>entizen1</DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>이름</DetailText>
          <DetailText type={'right'}>홍길동</DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>전화번호</DetailText>
          <DetailText type={'right'}>010-1111-1111</DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>견적신청일</DetailText>
          <DetailText type={'right'}>2022.12.13</DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>견적마감일</DetailText>
          <CustomProvider locale={koKR}>
            <DatePicker size={'sm'} onChange={handleDateChange} />
          </CustomProvider>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>견적제목</DetailText>
          <DetailText type={'right'} border={true}>
            LS용산주유소
          </DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>구독상품</DetailText>
          <DetailText type={'right'}>부분구독</DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>구독기간</DetailText>
          <DetailText type={'right'}>36개월</DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>수익지분</DetailText>
          <DetailText type={'right'}>70%</DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>충전기종류 및 수량</DetailText>
          <DetailText type={'right'}>
            7KW 충전기(공용): 벽걸이, 싱글, 2대
          </DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>충전기설치위치</DetailText>
          <DetailText type={'right'}>건물밖</DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>충전기설치목적</DetailText>
          <DetailText type={'right'}>모객효과</DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>기타요청사항</DetailText>
          <DetailText type={'right'} border={true}>
            없음
          </DetailText>
        </FlexList>
      </DetailBox>
    </Background>
  );
};

export default UserPreQuotation;

const DivFlex = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = css`
  font-family: 'Spoqa Han Sans Neo';
  color: black;
  font-style: normal;
  font-size: 14px;
`;

const Background = styled.div`
  background-color: ${colors.lightWhite};
`;

const TitleBox = styled.div`
  ${DivFlex}
  padding-bottom: 15px;
  min-width: 964px;
`;

const QuotationTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.dark2};
  text-align: left;
`;

const TwoBtn = styled.div`
  ${DivFlex}
  gap: 11px;
`;

const Btn = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  color: #747780;
  line-height: 150%;
  font-size: 14px;
  font-style: normal;
  text-align: center;
  border: 1px solid #747780;
  background-color: #e2e5ed;
  border-radius: 4px;
  width: 64px;
  height: 26px;
  padding-top: 2px;
  cursor: pointer;
`;

const DetailBox = styled.div`
  border: 2px solid #e7e7e7;
  /* padding: 28px 510px 28px 14px; */
  padding: 28px 0 28px 14px;
  border-radius: 4px;
  min-width: 1200px;
`;

const FlexList = styled.div`
  &:not(:last-of-type) {
    padding-bottom: 23px;
  }
  display: flex;
  align-items: center;
`;

const DetailText = styled.div<{ type: string; border?: boolean }>`
  ${Text}
  width: ${({ type }) => type === 'left' && '128px'};
  border: ${({ border }) => border === true && '1px solid #E2E5ED'};
  padding: ${({ border }) => border === true && '5px 10px 5px 10px'};
  border-radius: ${({ border }) => border === true && '5px'};
`;
