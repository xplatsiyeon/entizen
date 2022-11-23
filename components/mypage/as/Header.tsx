import styled from '@emotion/styled';
import React from 'react';
import BackImg from 'public/images/back-btn.svg';
import Image from 'next/image';
import colors from 'styles/colors';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

type Props = {
  text: string;
  colorselect: boolean;
};

const Header = (props: Props) => {
  const router = useRouter();
  const { text, colorselect } = props;
  console.log(colorselect);
  return (
    <HeaderBox>
      <div className="back-img" onClick={() => router.back()}>
        <Image src={BackImg} alt="btn" />
      </div>
      <span className="text">{text}</span>
      {colorselect ? (
        <RightText colorselect={colorselect}></RightText>
      ) : (
        <RightText></RightText>
      )}
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
    font-family: 'Spoqa Han Sans Neo';
  }
`;

const RightText = styled(Typography)<{ colorselect?: boolean }>`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  line-height: 18pt;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: ${({ colorselect }) => (colorselect ? `${colors.main}` : '#747780')};
  text-align: right;
`;

export default Header;
