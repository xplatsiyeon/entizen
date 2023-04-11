import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { isTokenDeleteApi } from 'api';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';
import colors from 'styles/colors';

type Props = {
  handleRightBtn: () => void;
  handleLeftBtn: () => void;
};

const TwoBtn = ({ handleRightBtn, handleLeftBtn }: Props) => {
  return (
    <Wrapper>
      <Blur />
      <BtnBox>
        <LeftBtn onClick={handleRightBtn}>삭제하기</LeftBtn>
        <RightBtn onClick={handleLeftBtn}>정보 수정하기</RightBtn>
      </BtnBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.lightWhite};
  z-index: 10;
  bottom: 0;
  left: 0;
  padding-bottom: 30pt;
  width: 100%;
  @media (max-width: 899.25pt) {
    /* position: abo; */
    margin-top: 51pt;
  }

  @media (min-width: 900pt) {
    position: relative;
    margin-top: 45pt;
    padding-bottom: 0;
  }
`;
const BtnBox = styled.div`
  margin: 0 15pt;
  display: flex;
  gap: 9pt;
`;
const LeftBtn = styled.button`
  padding: 15pt 16.75pt;
  z-index: 15;
  width: 33%;
  border: 0.75pt solid #e2e5ed;
  color: #a6a9b0;
  background-color: ${colors.lightWhite};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  cursor: pointer;
`;
const RightBtn = styled.button`
  padding: 15pt 32.5pt;
  z-index: 15;
  width: 72%;
  background-color: ${colors.main};
  color: ${colors.lightWhite};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  cursor: pointer;
`;
// Blur 효과
const Blur = styled.div`
  position: absolute;
  width: 100%;
  bottom: 22.5pt;
  left: 0;
  background: #ffffff;
  filter: blur(7.5pt);
  height: 67.5pt;
`;
export default TwoBtn;
