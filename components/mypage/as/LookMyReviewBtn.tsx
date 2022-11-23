import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
import colors from 'styles/colors';

type Props = {
  handleClick: (x: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
};

const LookMyReview = ({ handleClick, text }: Props) => {
  return (
    <BtnBox>
      <ReviewCheck onClick={handleClick}>{text}</ReviewCheck>
    </BtnBox>
  );
};

const BtnBox = styled.div`
  position: relative;
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 25pt;
  margin-bottom: 15pt;

  @media (max-width: 899.25pt) {
    margin-top: 45pt;
    margin-bottom: 36pt;
  }
`;
const ReviewCheck = styled.button`
  width: 100%;
  padding-top: 15pt;
  padding-bottom: 15pt;
  color: #a6a9b0;
  border-radius: 6pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

export default LookMyReview;
