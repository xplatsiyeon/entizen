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
import Image from 'next/image';
import { Drawer } from '@mui/material';
import { useRouter } from 'next/router';
import BottomNavigation from 'components/BottomNavigation';
import { quotationAction } from 'store/quotationSlice';
import { useDispatch } from 'react-redux';
import { subsidyGuideAction } from 'store/subsidyGuideSlice';
import { locationAction } from 'store/locationSlice';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import HamburgerBar from 'componentsWeb/HamburgerBar';
import BellNormal from 'public/images/BellNormal.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

type Props = {};

export interface Count {
  isSuccess: boolean;
  data: {
    count: number;
  };
}
const TAP = 'components/Main/index.tsx';
const MainPage = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userID = sessionStorage.getItem('USER_ID');
  const ACCESS_TOKEN = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const { userAgent } = useSelector((state: RootState) => state.userAgent);
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

  // ------------------브릿지-------------------
  // 웹 -> 앱
  // useEffect(() => {
  //   if (window.entizen!) {
  //     if (userAgent === 'Android_App') {
  //       window.entizen!.test('Hello Native Callback');
  //     } else if (userAgent === 'iOS_App') {
  //       window.webkit.messageHandlers.test.postMessage(
  //         'Hello Native Callback' + userAgent,
  //       );
  //     }
  //   }
  // }, []);

  // 휴대폰에 데이터 저장되어 있으면, 웹 세션 스토리지에 저장;
  useEffect(() => {
    if (window.entizen!) {
      if (userAgent === 'Android_App') {
        const getUserInfo = window.entizen!.getUserInfo();

        if (getUserInfo.length > 1) {
          const jsonGetUserInfo = JSON.parse(getUserInfo);
          sessionStorage.setItem(
            'SNS_MEMBER',
            JSON.stringify(jsonGetUserInfo.userInfo.SNS_MEMBER),
          );
          sessionStorage.setItem(
            'MEMBER_TYPE',
            JSON.stringify(jsonGetUserInfo.userInfo.MEMBER_TYPE),
          );
          sessionStorage.setItem(
            'ACCESS_TOKEN',
            JSON.stringify(jsonGetUserInfo.userInfo.ACCESS_TOKEN),
          );
          sessionStorage.setItem(
            'REFRESH_TOKEN',
            JSON.stringify(jsonGetUserInfo.userInfo.REFRESH_TOKEN),
          );
          sessionStorage.setItem('USER_ID', jsonGetUserInfo.userInfo.USER_ID);
        }
      } else if (userAgent === 'iOS_App') {
        window.webkit.messageHandlers.getUserInfo.postMessage();
        // const getUserInfo = window.entizen!.getUserInfo();
        // const jsonGetUserInfo = JSON.parse(getUserInfo);
        // if (jsonGetUserInfo.length > 1) {
        //   sessionStorage.setItem(
        //     'SNS_MEMBER',
        //     JSON.stringify(jsonGetUserInfo.userInfo.SNS_MEMBER),
        //   );
        //   sessionStorage.setItem(
        //     'MEMBER_TYPE',
        //     JSON.stringify(jsonGetUserInfo.userInfo.MEMBER_TYPE),
        //   );
        //   sessionStorage.setItem(
        //     'ACCESS_TOKEN',
        //     JSON.stringify(jsonGetUserInfo.userInfo.ACCESS_TOKEN),
        //   );
        //   sessionStorage.setItem(
        //     'REFRESH_TOKEN',
        //     JSON.stringify(jsonGetUserInfo.userInfo.REFRESH_TOKEN),
        //   );
        //   sessionStorage.setItem('USER_ID', jsonGetUserInfo.userInfo.USER_ID);
        // }
      }
    }
  }, []);
  // 앱 -> 웹
  useEffect(() => {
    // 안드로이드 호출 테스트
    if (userAgent === 'Android_App') {
      window.test = () => {
        alert('안드로이드 테스트 중..');
      };
      // 아이폰 호출 테스트
    } else if (userAgent === 'iOS_App') {
      window.testEntizen = {
        testtest: () => {
          alert('iOS 테스트 중..');
        },
      };
    }
  }, []);
  // ----------------브릿지---------------------------
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

const HamburgerOn = styled.div``;

export default MainPage;
