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
// import Logos from 'public/images/entizenLogo.png';
import Logos from 'public/images/EntizenHeaderLogoSvg.svg';
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
// import BellOn from 'public/images/guide-bell.svg';
import BellOn from 'public/images/BellOnSvg.svg';
// import BellNormal from 'public/images/BellNormal.svg';
import BellOff from 'public/images/BellOffSvg.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import {
  fileDownload,
  googleUnlink,
  requestPermissionCheck,
} from 'bridge/appToWeb';
import colors from 'styles/colors';
import { useMediaQuery } from 'react-responsive';
import { alarmNumberSliceAction } from 'store/alarmNumberSlice';

type Props = {};

export type GetUnread = {
  isSuccess: boolean;
  data: {
    wasReadQuotation: boolean;
    wasReadAfterSalesService: boolean;
    wasReadProject: boolean;
    wasReadChatting: boolean;
    wasReadAlert: boolean;
  };
};
export interface Count {
  isSuccess: boolean;
  data: {
    count: number;
  };
}
const TAP = 'components/Main/index.tsx';
const MainPage = (props: Props) => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const userID = sessionStorage.getItem('USER_ID');
  const ACCESS_TOKEN = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  const [state, setState] = useState({
    right: false,
  });

  // 알람 조회
  // alerts/histories/unread
  const {
    data: historyUnread,
    isLoading: historyIsLoading,
    isError: historyIIsError,
    refetch: historyIsRefetch,
  } = useQuery<GetUnread>(
    'historyUnread',
    () => isTokenGetApi(`/alerts/histories/unread`),
    {
      enabled: userID !== null ? true : false,
    },
  );

  const allAlert = historyUnread?.data;

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

  const onClickTest = () => {
    googleUnlink(userAgent);
  };

  // 초기화
  // useEffect(() => {
  //   sessionStorage.removeItem('key');
  //   dispatch(quotationAction.init());
  //   dispatch(subsidyGuideAction.reset());
  //   dispatch(locationAction.reset());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (quotationIsLoading || projectIsLoading) {
    return <Loader />;
  }
  if (quotationIsError || projectIsError) {
    // console.log('에러 발생');
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
            <FirstIconBox
              onClick={() => {
                router.push('/alarm');
                dispatch(alarmNumberSliceAction.setalarmNumberSlice(0));
              }}
            >
              {/* <FirstIconBox onClick={() => router.push('/alarm')}> */}
              {/* {userID ? (
                <Image src={BellOn} alt="alarmIcon" />
              ) : (
                <Image src={BellNormal} alt="alarmIcon" />
              )} */}
              {!userID && (
                <Image
                  src={BellOff}
                  alt="alarmIcon"
                  onClick={() => {
                    router.push('/signin');
                  }}
                />
              )}
              {userID && allAlert?.wasReadAlert === true && (
                <Image
                  src={BellOff}
                  alt="alarmIcon"
                  // onClick={() => {
                  //   router.push('/alarm?id=0');
                  // }}
                  onClick={() => {
                    router.push('/alarm');
                    dispatch(alarmNumberSliceAction.setalarmNumberSlice(0));
                  }}
                />
              )}
              {userID && allAlert?.wasReadAlert === false && (
                <Image
                  src={BellOn}
                  alt="alarmIcon"
                  // onClick={() => {
                  //   router.push('/alarm?id=0');
                  // }}
                  onClick={() => {
                    router.push('/alarm');
                    dispatch(alarmNumberSliceAction.setalarmNumberSlice(0));
                  }}
                />
              )}
            </FirstIconBox>
            {mobile && (
              <>
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
              </>
            )}
          </IconWrapper>
        </HeadWrapper>
        {/* 브릿지 테스트용 코드 */}
        {/* <button onClick={onClickTest}>구글 테스트 버튼</button> */}
        {/* <input
            style={{ display: 'none' }}
            ref={imgRef}
            type="file"
            accept="image/*"
            multiple
            capture={userAgent === 'Android_App' && true}
          />
          <button onClick={imgHandler}>사진 업로드</button>
          <input
            style={{ display: 'none' }}
            ref={fileRef}
            type="file"
            accept=".xlsx,.pdf,.pptx,.ppt,.ppt,.xls,.doc,.docm,.docx,.txt,.hwp"
            multiple
          />
          <button onClick={handleFileClick}>파일 업로드</button> */}
        {/* <FileDownload
    
            onClick={() => {
              fileDownload(
                userAgent,
                '1669886978_cf946488-6122-4d45-8a7e-6e8e1e66f4f0.png',
                'https://test-entizen.s3.ap-northeast-2.amazonaws.com/chargerProduct/1669886978_cf946488-6122-4d45-8a7e-6e8e1e66f4f0.png',
              );
            }}
          >
            FileDownload
          </FileDownload> */}
        <CarouselWrapper>
          <Carousel />
        </CarouselWrapper>
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

const FileDownload = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
  // 글자수 넘어갈때 ... 처리하는거 필수값: width, text-overflow, overflow
  width: 150pt;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const HeadWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 1000;
  background-color: white;
  left: 0;
  top: 0;
  padding: 0 15pt;
`;
const LogoBox = styled.div`
  margin-top: 12pt;
  margin-bottom: 14.5pt;
  display: flex;
  align-items: center;
`;
const FirstIconBox = styled.div`
  margin-top: 15pt;
  /* margin-bottom: 15pt; */

  margin-right: 15pt;
`;
const IconBox = styled.div`
  margin-top: 12pt;
  margin-bottom: 12pt;
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
  display: flex;
  flex-direction: column;
  gap: 15pt;
`;

const CarouselWrapper = styled.div`
  padding-top: 52.5pt;
`;
export default MainPage;
