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

  return (
    <>
      <Wrap>
        <HeaderBox>
          <div className="backImg" onClick={() => router.back()}>
            <Image src={BackImg} alt="btn" />
          </div>
          <span className="text">{text}</span>
          {colorselect ? (
            <RightText colorselect={colorselect}></RightText>
          ) : (
            <RightText></RightText>
          )}
        </HeaderBox>
      </Wrap>
      {/* 포지션 fixed로 빈 구역 늘려주기 */}
      <MarginBottom />
    </>
  );
};

const Wrap = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: white;
  z-index: 9999;
`;
const MarginBottom = styled.div`
  margin-bottom: 36pt;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
  .backImg {
    position: absolute;
    top: auto;
    left: 15pt;
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
