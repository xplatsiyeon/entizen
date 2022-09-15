import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import Logos from 'public/images/entizenLogo.png';
import Ring from 'public/images/guide-bell.svg';
import Hamburger from 'public/images/list-bar.svg';
import Image from 'next/image';

type Props = {};

const Header = (props: Props) => {
  return (
    <HeadWrapper>
      <LogoBox>
        <Image
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          layout="intrinsic"
          src={Logos}
          alt="logo"
        />
      </LogoBox>
      <IconWrapper>
        <IconBox>
          <Image src={Ring} alt="alarmIcon" />
        </IconBox>
        <IconBox>
          <Image src={Hamburger} alt="listIcon" />
        </IconBox>
      </IconWrapper>
    </HeadWrapper>
  );
};

const HeadWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const LogoBox = styled.div`
  margin-top: 12pt;
  margin-bottom: 12.015pt;
  display: flex;
  align-items: center;
`;
const IconBox = styled.div`
  margin-top: 9pt;
  margin-bottom: 9pt;
  :first-child {
    margin-right: 9pt;
  }
`;
const IconWrapper = styled.div`
  display: flex;
`;

export default Header;
