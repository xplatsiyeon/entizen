import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Logos from 'public/images/entizenLogo.png';
import Ring from 'public/images/guide-bell.svg';
import Hamburger from 'public/images/list-bar.svg';
import { Box, Divider, Drawer } from '@mui/material';
import colors from 'styles/colors';
import Carousel from '../Carousel';
import QuotationCenter from './QuotationCenter';
import Footer from '../Footer';
import BottomNavigation from 'components/BottomNavigation';
import CheckQuotationBtn from './CheckQuotationBtn';
import { useDispatch } from 'react-redux';
import { myEstimateAction } from 'storeCompany/myQuotation';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import MainImageWrap from './MainImageWrap';
import WebFooter from 'componentsWeb/WebFooter';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import HamburgerBar from 'componentsWeb/HamburgerBar';
import { useMediaQuery } from 'react-responsive';
import { alarmNumberSliceAction } from 'store/alarmNumberSlice';
import BellOn from 'public/images/BellOnSvg.svg';
import BellOff from 'public/images/BellOffSvg.svg';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import { GetUnread } from '..';
import { Alerts, AlertsResponse } from 'types/alerts';
import { AxiosError } from 'axios';

type Props = { num?: number; now?: string };

const CompanyMainPage = ({ num, now }: Props) => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const router = useRouter();
  const userID = JSON.parse(sessionStorage?.getItem('USER_ID')!);
  const dispatch = useDispatch();
  const [tabNumber, setTabNumber] = useState<number>(-1);
  const [componentId, setComponentId] = useState<number>();
  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState(false);
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

  // 알람 조회
  // /v1/alerts/unread-points
  const {
    data: historyUnread,
    isLoading: historyIsLoading,
    isError: historyIIsError,
    refetch: historyIsRefetch,
  } = useQuery<AlertsResponse, AxiosError, Alerts>(
    'historyUnread',
    () => isTokenGetApi(`/v1/alerts/unread-points`),
    {
      enabled: userID !== null ? true : false,
      select(res) {
        return res.data;
      },
    },
  );

  // const allAlert = historyUnread?.data;

  useEffect(() => {
    dispatch(myEstimateAction.reset());
    sessionStorage.removeItem('key');
  }, []);
  useEffect(() => {
    if (sessionStorage?.getItem('USER_ID')) {
      // console.log('login check!');
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  return (
    <Wrapper>
      <Container>
        <WebBuyerHeader
          setTabNumber={setTabNumber}
          tabNumber={tabNumber}
          componentId={componentId}
          num={num}
          now={now}
          openSubLink={openSubLink}
          setOpenSubLink={setOpenSubLink}
        />
        <CompanyRightMenu />
        <HeadWrapper>
          <LogoBox>
            <Image
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              src={Logos}
              alt="logo"
            />
          </LogoBox>
          <IconWrapper>
            {/* <FirstIconBox onClick={() => router.push('/alarm')}>
              <Image src={Ring} alt="alarmIcon" />
            </FirstIconBox> */}
            {!userID && (
              <FirstIconBox
                onClick={() => {
                  router.push('/signin');
                }}
              >
                <Image src={BellOff} alt="alarmIcon" />
              </FirstIconBox>
            )}
            {userID && historyUnread?.wasReadAlert === true && (
              <FirstIconBox
                onClick={() => {
                  router.push('/alarm');
                  dispatch(alarmNumberSliceAction.setalarmNumberSlice(0));
                }}
              >
                <Image src={BellOff} alt="alarmIcon" />
              </FirstIconBox>
            )}
            {userID && historyUnread?.wasReadAlert === false && (
              <FirstIconBox
                onClick={() => {
                  router.push('/alarm');
                  dispatch(alarmNumberSliceAction.setalarmNumberSlice(0));
                }}
              >
                <Image src={BellOn} alt="alarmIcon" />
              </FirstIconBox>
            )}
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

        <Carousel />

        {/* 메인 페이지 컴포넌트*/}
        <QuotationCenter />
        {/* 메인 페이지 버튼*/}
        <CheckQuotationBtn />
        {/* 메인 이미지 칼럼 */}
        <MainImageWrap />
      </Container>
      <WebFooter />
      <MobileNone>
        <Footer />
      </MobileNone>
      <BottomNavigation />
    </Wrapper>
  );
};

const Container = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  @media (min-width: 900pt) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Wrapper = styled.div`
  @media (min-width: 900pt) {
    height: 100vh;
    overflow: scroll;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      display: initial;
      width: 7.5pt;
    }
    ::-webkit-scrollbar-track {
      // 뒷배경
      background: rgba(33, 122, 244, 0.1);
    }
    ::-webkit-scrollbar-thumb {
      // 막대
      /* background: #217af4; */
      background-color: #5a2dc9;

      box-shadow: inset 0 0 4.5pt rgba(0, 0, 0, 0.3);
      border-radius: 7.5pt;
      height: 15%;
    }
  }
`;

const HeadWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (min-width: 900pt) {
    display: none;
  }
`;
const LogoBox = styled.div`
  margin-top: 12pt;
  margin-bottom: 17.25pt;
  display: flex;
  align-items: center;
  position: relative;
`;
const FirstIconBox = styled.div`
  margin-top: 12pt;
  margin-bottom: 17.25pt;

  margin-right: 15pt;
`;
const IconBox = styled.div`
  margin-top: 12pt;
  margin-bottom: 9pt;
`;
const IconWrapper = styled.div`
  display: flex;
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
  justify-content: flex-end;
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

const CarouselWrap = styled.section`
  @media (min-width: 900pt) {
    width: 100%;
    height: 360pt;
    background: #5a2dc9;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100%;
  }
`;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  @media (max-height: 350pt) {
    height: 100%;
    display: block;
  }
`;

const WebContainer = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }

  @media (min-width: 900pt) {
    margin-top: 54pt;
    padding-top: 0;
  }
`;

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    width: 900pt;
    display: flex;
    justify-content: space-between;
  }
`;
const MobileNone = styled.div`
  @media (min-width: 900pt) {
    display: none;
  }
`;
export default CompanyMainPage;
