import React from 'react';
import styled from '@emotion/styled';

interface Props {
  handleOnClick?: () => void;
}

const CancelButton = ({ handleOnClick }: Props) => {
  return (
    <Wrapper>
      <BtnBox onClick={handleOnClick}>견적 취소</BtnBox>
    </Wrapper>
  );
};

export default CancelButton;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 21pt;
`;

const BtnBox = styled.div`
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    color: #747780;
    letter-spacing: -0.02em;
    padding: 6pt 11.75pt;
    width: 47.5pt;
    height: 16pt;
    border: 0.75pt solid #e2e5ed;
    border-radius: 6pt;
    cursor: pointer;
  }

  @media (max-width: 899.25pt) {
    display: none;
  }
`;
