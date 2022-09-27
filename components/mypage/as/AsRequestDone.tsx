import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import colors from 'styles/colors';

type Props = {};

const AsRequestDone = (props: Props) => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push('/mypage/as');
  };
  return (
    <BtnBox>
      <Btn onClick={handleOnClick}>A/S 완료하기</Btn>
    </BtnBox>
  );
};

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Btn = styled.button`
  width: 100%;
  background: ${colors.main};
  color: ${colors.lightWhite};
  margin-top: 46.5pt;
  padding-top: 15pt;
  padding-bottom: 39pt;
`;

export default AsRequestDone;
