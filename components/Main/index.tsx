import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
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
import mypageIcon from 'public/images/mypageIcon.png';
import guide from 'public/images/guide.png';
import conversation from 'public/images/conversation.png';
import grayInsta from 'public/images/grayCircleInsta.png';
import grayNaver from 'public/images/grayCircleNaver.png';
import Image from 'next/image';
import { Divider, Drawer } from '@mui/material';
import { useRouter } from 'next/router';
import BottomNavigation from 'components/BottomNavigation';
import { quotationAction } from 'store/quotationSlice';
import { useDispatch } from 'react-redux';
import Nut from 'public/images/Nut.png';
import Bell from 'public/images/mobBell.png';
import { subsidyGuideAction } from 'store/subsidyGuideSlice';
import { locationAction } from 'store/locationSlice';
import useProfile from 'hooks/useProfile';
import { useQueries, useQuery } from 'react-query';
import { isTokenApi, isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import HamburgerBar from 'componentsWeb/HamburgerBar';
import BellNormal from 'public/images/BellNormal.svg';

type Props = {};

export interface Count {
  isSuccess: boolean;
  data: {
    count: number;
  };
}
const TAP = 'components/Main/index.tsx';
const MainPage = (props: Props) => {
  console.log(TAP + ' -> 메인 컴포넌트 시작');
  const router = useRouter();
  const dispatch = useDispatch();
  const userID = sessionStorage.getItem('USER_ID');
  const ACCESS_TOKEN = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const { profile, invalidate, isLoading } = useProfile(ACCESS_TOKEN);
  const [isLogin, setIsLogin] = useState(false);
  const [test, setTest] = useState(false);
  const [state, setState] = useState({
    right: false,
  });
  const {
    data: quotationData,
    isLoading: quotationIsLoading,
    isError: quotationIsError,
  } = useQuery<Count>(
    'quotation-count',
    () => isTokenGetApi('/quotations/request/count'),
    {
      enabled: ACCESS_TOKEN ? true : false,
    },
  );
  const {
    data: projectData,
    isLoading: projectIsLoading,
    isError: projectIsError,
  } = useQuery<Count>('project-count', () => isTokenGetApi('/projects/count'), {
    enabled: ACCESS_TOKEN ? true : false,
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

  useEffect(() => {
    userID ? setIsLogin(true) : setIsLogin(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  // 초기화
  useEffect(() => {
    sessionStorage.removeItem('key');
    dispatch(quotationAction.init());
    dispatch(subsidyGuideAction.reset());
    dispatch(locationAction.reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (quotationIsLoading || projectIsLoading) {
    return <Loader />;
  }
  if (quotationIsError || projectIsError) {
    console.log('에러 발생');
  }

  function testEntizen(id: string) {
    setTest(true);
    // alert('안드로이드 테스트 엔티즌 아이디 확인 --> ' + id);
    return <div>ios 테스트중입니다.</div>;
  }

  // testEntizen('123');
  return (
    <>
      {test && testEntizen('11')}
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
              {userID ? (
                <Image src={Ring} alt="alarmIcon" />
              ) : (
                <Image src={BellNormal} alt="alarmIcon" />
              )}
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
                  <HamburgerBar
                    anchor={anchor}
                    toggleDrawer={toggleDrawer}
                    setState={setState}
                    state={state}
                  />
                </Drawer>
              </React.Fragment>
            ))}
          </IconWrapper>
        </HeadWrapper>
        {/* <Header /> */}
        <Carousel />
        <SalesProjection />
        <MyEstimateProject
          quotationData={quotationData!}
          projectData={projectData!}
        />
        <SubscribeRequest />
        <WhyEntizen />
        {/* <WhyEntizenWeb /> */}

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
  padding-left: 24pt;
  padding-right: 24pt;
  height: 100vh;

  background-color: ${colors.main};
`;
const XBtnWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 44.25pt;
`;

const WhetherLogin = styled.div`
  display: flex;
  align-items: center;
  margin-top: 27.75pt;
  & span {
  }
  & span:first-of-type {
    font-family: 'Spoqa Han Sans Neo';
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
  .label {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
  .arrow-img {
    position: relative;
    width: 15pt;
    height: 15pt;
  }
`;
const WhetherLoginComplete = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 9.75pt;
  position: relative;
  & span:first-of-type {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #ffffff;
    margin-right: 6pt;
    display: flex;
    flex-direction: column;
    gap: 6pt;
  }
  .label {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
  .arrow-img {
    position: relative;
    width: 15pt;
    height: 15pt;
  }
`;

const WhiteArea = styled.div`
  position: absolute;
  width: 100%;
  border-radius: 15pt 15pt 0 0;
  width: 179pt;
  padding: 15pt 24pt 34.5pt 24pt;
  left: 0;
  top: 127.5pt;
  background-color: #ffffff;
`;

const HamburgerOn = styled.div``;

const WhiteAreaMenus = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12pt;
  padding-bottom: 12pt;

  & span:first-of-type {
    margin-right: 6pt;
  }
`;
const WhiteAreaBottomMenus = styled.div`
  display: flex;
  align-items: center;
  z-index: 10000;
  margin-top: 51pt;
  & span:first-of-type {
    margin-right: 15pt;
  }
`;
const WhiteAreaBottomText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15pt;
  & span {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #a6a9b0;
  }
  & span:first-of-type {
  }
`;

const Imagewrap = styled.div`
  width: 18pt;
  height: 18pt;
  margin-right: 9pt;
  &:nth-last-of-type(1) {
    margin-right: 0;
  }
`;

export default MainPage;
