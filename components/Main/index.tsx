import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
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
import { requestPermissionCheck } from 'bridge/appToWeb';

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
    if (userAgent.length > 1) {
      if (userAgent === 'Android_App') {
        window.entizen!.getUserInfo();
      } else if (userAgent === 'iOS_App') {
        window.webkit.messageHandlers.getUserInfo.postMessage();
      }
    }
  }, []);
  // 앱 -> 웹
  useEffect(() => {
    // 안드로이드 호출 테스트
    if (userAgent.length > 1) {
      if (userAgent === 'Android_App') {
        window.returnUserInfo = (getUserInfo) => {
          if (getUserInfo && getUserInfo.length > 1) {
            const jsonGetUserInfo = JSON.parse(getUserInfo);
            sessionStorage.setItem(
              'SNS_MEMBER',
              JSON.stringify(jsonGetUserInfo.SNS_MEMBER),
            );
            sessionStorage.setItem(
              'MEMBER_TYPE',
              JSON.stringify(jsonGetUserInfo.MEMBER_TYPE),
            );
            sessionStorage.setItem(
              'ACCESS_TOKEN',
              JSON.stringify(jsonGetUserInfo.ACCESS_TOKEN),
            );
            sessionStorage.setItem(
              'REFRESH_TOKEN',
              JSON.stringify(jsonGetUserInfo.REFRESH_TOKEN),
            );
            sessionStorage.setItem('USER_ID', jsonGetUserInfo.USER_ID);
          }
        };

        // 아이폰 호출 테스트
      } else if (userAgent === 'iOS_App') {
        window.returnUserInfo = (getUserInfo) => {
          if (getUserInfo && getUserInfo.length > 1) {
            const jsonGetUserInfo = JSON.parse(getUserInfo);
            sessionStorage.setItem(
              'SNS_MEMBER',
              JSON.stringify(jsonGetUserInfo.SNS_MEMBER),
            );
            sessionStorage.setItem(
              'MEMBER_TYPE',
              JSON.stringify(jsonGetUserInfo.MEMBER_TYPE),
            );
            sessionStorage.setItem(
              'ACCESS_TOKEN',
              JSON.stringify(jsonGetUserInfo.ACCESS_TOKEN),
            );
            sessionStorage.setItem(
              'REFRESH_TOKEN',
              JSON.stringify(jsonGetUserInfo.REFRESH_TOKEN),
            );
            sessionStorage.setItem('USER_ID', jsonGetUserInfo.USER_ID);
          }
        };
        // window.testEntizen = {
        //   testtest: () => {
        //     alert('iOS 테스트 중..');
        //   },
        // };
      }
    }
  }, []);
  // ----------------브릿지---------------------------

  const imgRef = useRef<any>(null);
  const fileRef = useRef<any>(null);
  // 사진 온클릭
  const imgHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userAgent === '') {
      imgRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'photo');
    }
  };

  //파일 온클릭
  const handleFileClick = () => {
    if (userAgent === '') {
      fileRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'file');
    }
  };

  // 앱에서 이미지 or 파일 온클릭 (앱->웹)
  useEffect(() => {
    if (userAgent === 'Android_App') {
      window.openGallery = () => {
        imgRef?.current?.click();
      };
      window.openFileUpload = () => {
        fileRef?.current?.click();
      };
    } else if (userAgent === 'iOS_App') {
      window.openGallery = () => {
        imgRef?.current?.click();
      };
      window.openFileUpload = () => {
        fileRef?.current?.click();
      };
    }
  }, []);

  // ---------------------브릿지-------------------------
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
        <Test>
          <input
            style={{ display: 'none' }}
            ref={imgRef}
            type="file"
            accept="image/*"
            multiple
            capture={true}
          />
          <button onClick={imgHandler}>사진 업로드</button>
          <input
            style={{ display: 'none' }}
            ref={fileRef}
            type="file"
            accept=".xlsx,.pdf,.pptx,.ppt,.ppt,.xls,.doc,.docm,.docx,.txt,.hwp"
            multiple
          />
          <button onClick={handleFileClick}>파일 업로드</button>
        </Test>
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

const Test = styled.div`
  width: 100%;
  /* height: 300px; */
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export default MainPage;
