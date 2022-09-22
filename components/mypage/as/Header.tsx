import styled from '@emotion/styled';
import React from 'react';
import BackImg from 'public/images/back-btn.svg';
import Home from 'public/images/home.svg';
import Image from 'next/image';
import colors from 'styles/colors';
import { Typography } from '@mui/material';

type Props = {
  text: string;
  colorSelect: boolean;
};

const Header = (props: Props) => {
  const { text, colorSelect } = props;
  return (
    <HeaderBox>
      <div className="back-img">
        <Image src={BackImg} alt="btn" />
      </div>
      <span className="text">{text}</span>
      <RightText colorSelect={colorSelect}>완료</RightText>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 9pt;
  padding-bottom: 9pt;
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    font-family: Spoqa Han Sans Neo;
  }
`;

const RightText = styled(Typography)<{ colorSelect: boolean }>`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  line-height: 18pt;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: ${({ colorSelect }) => (colorSelect ? `${colors.main}` : '#747780')};
  text-align: right;
`;

export default Header;
