import styled from '@emotion/styled';
import React, { useState } from 'react';
import Carousel from './Carousel';
import EntizenLibrary from './EntizenLibrary';
import Footer from './Footer';
import LearnAbout from './LearnAbout';
import MyEstimateProject from './MyEstimateProject';
import SalesProjection from './SalesProjection';
import SubscribeRequest from './SubscribeRequest';
import WhyEntizen from './WhyEntizen';
import Logos from 'public/images/entizenLogo.png';
import Ring from 'public/images/guide-bell.svg';
import Hamburger from 'public/images/list-bar.svg';
import colors from 'styles/colors';
import xBtn from 'public/images/X.png';
import whiteRight from 'public/images/whiteRight20.png';
import simpleEstimate from 'public/images/simpleEstimate.png';
import Image from 'next/image';
import { Divider, Drawer } from '@mui/material';
import { useRouter } from 'next/router';
import BottomNavigation from 'components/BottomNavigation';

type Props = {};

const MainPage = (props: Props) => {
  const router = useRouter();
  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  const list = (anchor: string) => (
    <WholeBox
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListBox>
        <XBtnWrapper>
          <Image src={xBtn} alt="xBtn" />
        </XBtnWrapper>
        <WhetherLogin>
          <span>로그인 해주세요</span>
          <span>
            <Image src={whiteRight} alt="arrow" />
          </span>
        </WhetherLogin>
        <WhiteArea>
          <WhiteAreaMenus>
            <span>
              <Image src={simpleEstimate} alt="간편견적" />
            </span>
            <span>간편견적</span>
          </WhiteAreaMenus>
        </WhiteArea>
      </ListBox>
    </WholeBox>
  );

  return (
    <>
      <Container>
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
            <FirstIconBox onClick={() => router.push('/alarm')}>
              <Image src={Ring} alt="alarmIcon" />
            </FirstIconBox>

            {(['right'] as const).map((anchor) => (
              <React.Fragment key={anchor}>
                <HamburgerOn onClick={toggleDrawer(anchor, true)}>
                  <IconBox>
                    <Image src={Hamburger} alt="listIcon" />
                  </IconBox>
                </HamburgerOn>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  // PaperProps={{ style: { borderRadius: '20pt 20pt 0 0' } }}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </IconWrapper>
        </HeadWrapper>
        {/* <Header /> */}
        <Carousel />
        <SalesProjection />
        <MyEstimateProject />
        <SubscribeRequest />
        <WhyEntizen />
        <LearnAbout />
        <EntizenLibrary />
      </Container>
      <Box>
        <Footer />
      </Box>
      <BottomNavigation />
    </>
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
const FirstIconBox = styled.div`
  margin-top: 9pt;
  margin-bottom: 9pt;

  margin-right: 9pt;
`;
const IconBox = styled.div`
  margin-top: 9pt;
  margin-bottom: 9pt;
`;
const IconWrapper = styled.div`
  display: flex;
`;

const Container = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
`;
const Box = styled.div`
  width: 100%;
`;

const WholeBox = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
  /* height: 100vh; */
`;

const ListBox = styled.div`
  position: relative;
  width: 179pt;
  height: 100vh;

  background-color: ${colors.main};
`;
const XBtnWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 44.25pt;
  padding-left: 24pt;
  padding-right: 24pt;
`;

const WhetherLogin = styled.div`
  display: flex;
  align-items: center;
  margin-top: 27.75pt;
  padding-left: 24pt;
  padding-right: 24pt;
  & span {
  }
  & span:first-of-type {
    font-family: Spoqa Han Sans Neo;
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #ffffff;
    margin-right: 6pt;
  }
  & span {
  }
`;

const WhiteArea = styled.div`
  position: absolute;
  width: 100%;
  border-radius: 15pt 15pt 0 0;
  padding: 27pt 24pt 34.5pt 24pt;
  top: 127.5pt;
  background-color: #ffffff;
`;

const HamburgerOn = styled.div``;

const WhiteAreaMenus = styled.div`
  display: flex;
  align-items: center;
  & span:first-of-type {
    margin-right: 6pt;
  }
`;

export default MainPage;
