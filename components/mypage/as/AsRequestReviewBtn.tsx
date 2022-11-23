import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
import colors from 'styles/colors';

type Props = {};

const AsRequestReviewBtn = (props: Props) => {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push('/mypage/as/1-7');
  };
  return (
    <BtnBox>
      <ReviewCheck onClick={handleBtnClick}>A/S 리뷰하기</ReviewCheck>
    </BtnBox>
  );
};

const BtnBox = styled.div`
  position: relative;
  padding-left: 15pt;
  padding-right: 15pt;
  margin-bottom: 36pt;
`;
const ReviewCheck = styled.button`
  width: 100%;
  padding-top: 15pt;
  padding-bottom: 15pt;
  background-color: ${colors.main};
  color: #ffffff;
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
`;
export default AsRequestReviewBtn;
