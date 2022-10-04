import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Divider,
} from '@mui/material';
import Link from 'next/link';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import MainPage from 'components/Main';
type Props = {};

const Signin = (props: Props) => {
  const [password, setPassword] = useState<string>('');
  const [selectedLoginType, setSelectedLoginType] = useState<number>(0);
  const loginTypeList: string[] = ['일반회원 로그인', '기업회원 로그인'];
  return (
    <>
      <MainPage />
    </>
  );
};

export default Signin;

const BackBtn = styled.img`
  margin: auto 0;
`;

const LoginBtn = styled.button`
  background: #5a2dc9;
  width: 100%;
  color: #fff;
  margin-top: 28.5pt;
  padding: 15pt 0;
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
`;

const BtnSpan = styled.span``;

/* background-color: '{`${colors.gold}`}', */
const IdRegist = styled.button`
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 8px;
  width: 100%;
  padding: 15pt 0;
  font-weight: 700;
  font-size: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: #595757;
`;

const IdRegistBtnSpan = styled.span``;

/*

@media (max-width: 899pt) {
}

*/
