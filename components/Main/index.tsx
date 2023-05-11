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
import Logos from 'public/images/EntizenHeaderLogoSvg.svg';
import Hamburger from 'public/images/list-bar.svg';
import Image from 'next/image';
import { Drawer } from '@mui/material';
import { useRouter } from 'next/router';
import BottomNavigation from 'components/BottomNavigation';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import HamburgerBar from 'componentsWeb/HamburgerBar';
import BellOn from 'public/images/BellOnSvg.svg';
import BellOff from 'public/images/BellOffSvg.svg';
import { googleUnlink } from 'bridge/appToWeb';
import colors from 'styles/colors';
import { useMediaQuery } from 'react-responsive';
import { alarmNumberSliceAction } from 'store/alarmNumberSlice';
import { Alerts, AlertsResponse } from 'types/alerts';
import { AxiosError } from 'axios';

type Props = {};

export type GetUnread = {
  isSuccess: boolean;
  data: {
    wasReadQuotation: boolean;
    wasReadAfterSalesService: boolean;
    wasReadProject: boolean;
    wasReadChatting: boolean;
    wasReadAlert: boolean;
    unreadChatLogsCount: number;
    unreadQuotationRequestsCount: number;
  };
};
export interface Count {
  isSuccess: boolean;
  data: {
    count: number;
  };
}
const MainPage = (props: Props) => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const userID = sessionStorage.getItem('USER_ID');
  const ACCESS_TOKEN = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  const [state, setState] = useState({
    right: false,
  });

  // 알람 조회
  // /v1/alerts/unread-points
  const {
    data: historyUnread,
    isLoading: historyIsLoading,
    isError: historyIIsError,
    refetch: historyIsRefetch,
  } = useQuery<AlertsResponse, AxiosError, Alerts>(
    'v1/alerts',
    () => isTokenGetApi(`/v1/alerts/unread-points`),
    {
      enabled: userID !== null ? true : false,
      select(res) {
        return res.data;
      },
    },
  );

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

  if (quotationIsLoading || projectIsLoading) {
    return <Loader />;
  }
  if (quotationIsError || projectIsError) {
    // console.log('에러 발생');
  }

  // console.log('🔥 historyUnread : ', historyUnread);

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
              {!userID ? (
                <Image
                  src={BellOff}
                  alt="alarmIcon"
                  onClick={() => {
                    router.push('/signin');
                  }}
                />
              ) : historyUnread?.wasReadAlertBell === true ? (
                <Image
                  src={BellOff}
                  alt="alarmIcon"
                  onClick={() => {
                    router.push('/alarm');
                    dispatch(alarmNumberSliceAction.setalarmNumberSlice(0));
                  }}
                />
              ) : (
                <Image
                  src={BellOn}
                  alt="alarmIcon"
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
        {/* 배너 (스와이퍼) */}
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
      {mobile && <BottomNavigation />}
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
