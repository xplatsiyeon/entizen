import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import arrow from 'public/images/right-arrow.svg';
import fee_icon from 'public/guide/fee-icon.svg';
import subsidy_icon from 'public/guide/subsidy-icon.svg';
import charger_icon from 'public/guide/charger_icon.png';
import subscribe_icon from 'public/guide/subscribe_icon.png';
import Hamburger from 'public/images/list-bar.svg';
import arrow_small from 'public/images/arrow.svg';
import { Drawer } from '@mui/material';
import { useRouter } from 'next/router';
import BottomNavigation from 'components/BottomNavigation';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import arrowR from 'public/images/arrowR.png';
import guideIndex1 from 'public/guide/guideIndex1.png';
import guideIndex2 from 'public/guide/guideIndex2.png';
import BingGuideBanner from 'public/guide/EntizenGuidePng.png';
import useProfile from 'hooks/useProfile';
import BellOn from 'public/images/BellOnSvg.svg';
import BellOff from 'public/images/BellOffSvg.svg';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import { GetUnread } from 'components/Main';
import HamburgerBar from 'componentsWeb/HamburgerBar';
import { useMediaQuery } from 'react-responsive';
import { alarmNumberSliceAction } from 'store/alarmNumberSlice';
import { useDispatch } from 'react-redux';
import { Alerts, AlertsResponse } from 'types/alerts';
import { AxiosError } from 'axios';

const Guide1 = () => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const userID = sessionStorage.getItem('USER_ID');
  const dispatch = useDispatch();
  // 알람 조회
  // v1/alerts/unread-points
  const {
    data: historyUnread,
    isLoading: historyIsLoading,
    isError: historyIIsError,
    refetch: historyIsRefetch,
  } = useQuery<AlertsResponse, AxiosError, Alerts>(
    'historyUnread',
    () => isTokenGetApi(`v1/alerts/unread-points`),
    {
      enabled: userID !== null ? true : false,
      select(res) {
        return res.data;
      },
    },
  );

  // const allAlert = historyUnread?.data;

  const { accessToken, refreshToken, userId } = useSelector(
    (state: RootState) => state.originUserData,
  );
  const [state, setState] = useState({
    right: false,
  });

  // 필요한 인자 값 받아와서 페이지 이동
  const pageHandler = (page: string) => {
    router.push(`${page}`);
  };

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
    if (sessionStorage.getItem('USER_ID')) {
      // console.log('login check !');
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // 이름 가져오기
  const _accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const {
    profile: profileData,
    isLoading: profileIsLoading,
    invalidate: profileInvalidate,
  } = useProfile(_accessToken);

  return (
    <Body>
      <WebHeader sub="guide" />
      <Inner>
        <Wrapper>
          <Header>
            <span className="left">가이드</span>
            <div className="right">
              {!userID && (
                <div
                  className="bell-img"
                  onClick={() => {
                    router.push('/signin');
                  }}
                >
                  <Image src={BellOff} alt="alarmIcon" />
                </div>
              )}
              {userID && historyUnread?.wasReadAlert === true && (
                <div
                  className="bell-img"
                  onClick={() => {
                    router.push('/alarm');
                    dispatch(alarmNumberSliceAction.setalarmNumberSlice(0));
                  }}
                >
                  <Image src={BellOff} alt="alarmIcon" />
                </div>
              )}
              {userID && historyUnread?.wasReadAlert === false && (
                <div
                  className="bell-img"
                  onClick={() => {
                    router.push('/alarm');
                    dispatch(alarmNumberSliceAction.setalarmNumberSlice(0));
                  }}
                >
                  <Image src={BellOn} alt="alarmIcon" />
                </div>
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
            </div>
          </Header>
          <Container>
            <Wrap>
              <Platform onClick={() => pageHandler('/guide/platform')}>
                <p>플랫폼 가이드</p>
                <h3>
                  충전의 정석
                  <br />
                  엔티즌
                  <br /> 사용설명서
                </h3>
                <div className="banner">
                  <Image
                    src={BingGuideBanner}
                    alt="platform"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </Platform>

              <SubsidyBox>
                <Subsidy
                  onClick={() => {
                    isLogin
                      ? pageHandler('/guide/subsidy')
                      : pageHandler('/signin');
                  }}
                >
                  <span className="mobIcon">
                    <Image src={subsidy_icon} alt="subsidy_icon" />
                  </span>
                  <span className="webIcon">
                    <Image src={guideIndex1} alt="subsidy_icon" />
                  </span>
                  <FlexWrap>
                    <span className="text">보조금 가이드</span>
                    <IconWrap>
                      <Image src={arrowR} alt="보조금" />
                    </IconWrap>
                  </FlexWrap>
                </Subsidy>
                <Fee onClick={() => pageHandler('/guide/rateInfo')}>
                  <span className="mobIcon">
                    <Image src={fee_icon} alt="fee_icon" />
                  </span>
                  <span className="webIcon">
                    <Image src={guideIndex2} alt="subsidy_icon" />
                  </span>
                  <FlexWrap>
                    <span className="text">요금 정보</span>
                    <IconWrap>
                      <Image src={arrowR} alt="요금정보" />
                    </IconWrap>
                  </FlexWrap>
                </Fee>
              </SubsidyBox>
            </Wrap>
            <Wrap>
              <GuideBox onClick={() => pageHandler('/guide/subscribe')}>
                <span>
                  <div className="name_box">
                    <h2 className="name">구독 가이드</h2>
                    <Image src={arrow} alt="img" />
                  </div>
                  <p className="text">
                    구독에 대한
                    <br />
                    모든 것을 한 눈에!
                  </p>
                </span>
                <div className="img-box">
                  <Image src={charger_icon} alt="charger_icon" />
                </div>
              </GuideBox>
              <GuideBox onClick={() => pageHandler('/guide/charger')}>
                <span>
                  <div className="name_box">
                    <h2 className="name">충전기 가이드</h2>
                    <Image src={arrow} alt="img" />
                  </div>
                  <p className="text">
                    나에게 딱 맞는
                    <br />
                    충전기는?
                  </p>
                </span>
                <div className="img-box">
                  <Image src={subscribe_icon} alt="subscribe_icon" />
                </div>
              </GuideBox>
            </Wrap>
            <EntizenLibrary>
              <Btn onClick={() => router.push('/library')}>
                엔티즌 도서관 보러가기
                <div className="img">
                  <Image src={arrow_small} alt="arrow_small" layout="fill" />
                </div>
              </Btn>
            </EntizenLibrary>
            {mobile && <BottomNavigation />}
          </Container>
        </Wrapper>
      </Inner>
      <WebFooter />
    </Body>
  );
};

export default Guide1;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  @media (min-width: 900pt) {
    background-color: white;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 900pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
  }
`;

const Wrapper = styled.div`
  padding: 0 15pt;
  padding-bottom: 30pt;

  @media (max-width: 899.25pt) {
    background-color: #fafcff;
    padding-bottom: 150pt;
  }
`;
const Header = styled(Box)`
  width: 100%;
  display: none;
  justify-content: space-between;
  position: fixed;
  z-index: 1000;
  background-color: white;
  left: 0;
  top: 0;
  padding: 0 15pt;
  .left {
    font-weight: 700;
    font-size: 21pt;
    line-height: 21pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    margin-top: 12pt;
  }
  .right {
    display: flex;
  }
  .bell-img {
    cursor: pointer;
    margin-top: 15pt;
    margin-right: 15pt;
  }
  @media (max-width: 899.25pt) {
    display: flex;
  }
`;

const Wrap = styled.div`
  display: flex;
  position: relative;
  width: 895.5pt;
  @media (max-width: 899.25pt) {
    display: block;
    width: 100%;
  }
`;

const Platform = styled.button`
  position: relative;
  padding: 0;
  flex: 2.2;
  margin-right: 22.5pt; //나중에 수정할 수도.
  background-color: ${colors.main1};
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  width: 100%;
  height: 210pt;
  cursor: pointer;
  .banner {
    position: absolute;
    /* bottom: 6pt; */
    bottom: 10pt;
    /* right: 8.25pt; */
    left: 60pt;
    width: 258.06pt;
    height: 167.7375pt;
    @media (min-width: 900pt) {
      left: 300pt;
    }
  }
  & > p {
    font-weight: 700;
    font-size: 13.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 33pt;
    left: 28.5pt;
    z-index: 1;
  }
  & > h3 {
    font-weight: 700;
    font-size: 19.5pt;
    line-height: 28.5pt;
    letter-spacing: -0.02em;
    color: ${colors.lightWhite};
    position: absolute;
    text-align: left;
    z-index: 1;
    left: 28.5pt;
    bottom: 23.25pt;
  }
  @media (max-width: 899.25pt) {
    height: 159pt;
    margin-right: 0;
    .banner {
      width: 195pt;
      height: 126.75pt;
    }
    & > p {
      font-size: 10.5pt;
      line-height: 21pt;
      left: 15pt;
      top: 15pt;
    }
    & > h3 {
      font-weight: 700;
      font-size: 15pt;
      line-height: 21pt;
      left: 15pt;
      bottom: 15pt;
    }
  }
`;
const Imagewrap = styled.div`
  width: 18pt;
  height: 18pt;
  /* margin-right: 9pt; */
  margin-right: 22.5pt;
`;
const SubsidyBox = styled(Box)`
  display: flex;
  flex: 1;
  align-items: center;
  width: calc(100% - 600pt);
  .text {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 19.5pt;
    font-weight: 700;
    line-height: 28.5pt;
    letter-spacing: -0.02em;
    color: rgb(34, 34, 34);
  }
  @media (max-width: 899.25pt) {
    width: auto;
    flex: none;
    padding-top: 15pt;
    .text {
      font-size: 10.5pt;
      line-height: 12pt;
    }
  }
  .mobIcon {
    @media (max-width: 899.25pt) {
      width: 15pt;
      height: 15pt;
    }
  }
  .webIcon {
    @media (max-width: 899.25pt) {
      width: 15pt;
      height: 15pt;
    }
  }
`;
const Subsidy = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  height: 100%;
  padding: 37.5pt 15pt 24pt 21pt;
  background: #e8e3f8;
  border-radius: 12pt;
  width: 100%;
  text-align: left;
  margin-right: 22.5pt;
  .text {
    width: 94.5pt;
    padding: 0 30pt 0 0;
  }
  .mobIcon {
    display: none;
  }
  .webIcon {
    width: 43.5pt;
    height: 43.5pt;
  }
  @media (max-width: 899.25pt) {
    height: 36pt;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    padding: 0pt 15pt 0pt 10.125pt;
    margin-right: 14.6pt;

    .text {
      width: auto;
      padding: 0 0 0 0;
    }
    .mobIcon {
      display: block;
    }
    .webIcon {
      display: none;
    }
  }
`;
const Fee = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  height: 100%;
  padding: 37.5pt 15pt 24pt 21pt;
  background: #fff1d5;
  border-radius: 12pt;
  width: 100%;
  text-align: left;
  .text {
    width: 94.5pt;
    padding: 0 50pt 0 0;
    @media (max-width: 899.25pt) {
      padding: 0 0 0 0;
    }
  }
  .mobIcon {
    display: none;
  }
  .webIcon {
    width: 43.5pt;
    height: 43.5pt;
  }
  @media (max-width: 899.25pt) {
    height: 36pt;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    padding: 0pt 15pt 0pt 10.125pt;
    .text {
      width: auto;
    }
    .mobIcon {
      display: block;
    }
    .webIcon {
      display: none;
    }
  }
`;
const FlexWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const IconWrap = styled.div`
  width: 15pt;
  height: 15pt;
  position: absolute;
  bottom: 3pt;
  right: 0;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const GuideBox = styled.button`
  display: flex;
  //height:이미지 높이 만큼 줘야함.
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  position: relative;
  cursor: pointer;
  width: 100%;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  margin-top: 22.5pt;
  padding: 33pt 28.5pt 27.5pt;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 19.5pt;
  line-height: 21pt;

  &:nth-of-type(1) {
    margin-right: 22.5pt;
  }
  .name_box {
    display: flex;
    align-items: center;
  }
  .name {
    font-weight: 700;
    font-size: 15pt;
    line-height: 21pt;
    letter-spacing: -0.02em;
    margin-right: 6pt;
    color: ${colors.main2};
  }
  .text {
    font-weight: 400;
    font-size: 13.5pt;
    line-height: 21pt;
    letter-spacing: -0.02em;
    padding-top: 41.75pt;
    color: ${colors.lightGray2};
    text-align: start;
  }
  .img-box {
    position: absolute;
    bottom: 19.5pt;
    right: 22.5pt;
    width: 102pt;
    height: 102pt;
  }
  @media (max-width: 899.25pt) {
    margin-top: 15pt;
    padding: 14.25pt 15pt;

    .text {
      padding-top: 7.5pt;
      font-style: normal;
      font-weight: 400;
      font-size: 12pt;
      line-height: 16.5pt;
    }
    .name {
      font-style: normal;
      font-weight: 700;
      font-size: 15pt;
      line-height: 21pt;
    }
    .img-box {
      position: absolute;
      bottom: 19.5pt;
      right: 15.75pt;
      width: 45pt;
      height: 45pt;
    }
  }
`;
const EntizenLibrary = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Spoqa Han Sans Neo';
`;
const Btn = styled.button`
  background-color: ${colors.lightWhite};
  border: 0.75pt solid ${colors.gray};
  border-radius: 21.75pt;
  margin-top: 45pt;
  padding: 12pt 120pt;
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: #5221cb;
  align-items: center;
  .img {
    position: relative;
    width: 9pt;
    height: 9pt;
    margin-left: 3pt;
  }

  @media (max-width: 899.25pt) {
    margin-top: 30pt;
    padding: 6pt 9pt;
  }
`;

const HamburgerOn = styled.div``;

const IconBox = styled.div`
  cursor: pointer;
  margin-top: 12pt;
  margin-bottom: 14.25pt;
`;

const Container = styled.div`
  @media (max-width: 899.25pt) {
    padding-top: 60pt;
  }
`;
