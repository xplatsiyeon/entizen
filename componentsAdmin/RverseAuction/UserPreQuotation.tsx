import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import colors from 'styles/colors';

const UserPreQuotation = () => {
  return (
    <Background>
      <TitleBox>
        <QuotationTitle>일반회원 간편견적서</QuotationTitle>
        <TwoBtn>
          <Btn>수정</Btn>
          <Btn>삭제</Btn>
        </TwoBtn>
      </TitleBox>
    </Background>
  );
};

export default UserPreQuotation;

const DivFlex = css`
  display: flex;
  justify-content: space-between;
`;

const Background = styled.div`
  background-color: ${colors.lightWhite};
`;

const QuotationTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.dark2};
  text-align: left;
`;

const TitleBox = styled.div`
  ${DivFlex}
  align-items: center;
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
  font-weight: 400;
  text-align: center;
  border: 1px solid #747780;
  background-color: #e2e5ed;
  border-radius: 4px;
  width: 64px;
  height: 26px;
  padding-top: 2px;
`;
