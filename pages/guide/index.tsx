import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import bell from 'public/images/guide-bell.svg';
import banner from 'public/guide/guide-main-banner.png';
import banner2 from 'public/guide/guide0.png';
import arrow from 'public/images/right-arrow.svg';
import fee_icon from 'public/guide/fee-icon.svg';
import subsidy_icon from 'public/guide/subsidy-icon.svg';
import charger_icon from 'public/guide/charger_icon.png';
import subscribe_icon from 'public/guide/subscribe_icon.png';
import whiteRight from 'public/images/whiteRight20.png';
import Hamburger from 'public/images/list-bar.svg';
import arrow_small from 'public/images/arrow.svg';
import guide from 'public/images/guide.png';
import mypageIcon from 'public/images/mypageIcon.png';
import { Button, Divider, Drawer } from '@mui/material';
import { useRouter } from 'next/router';
import conversation from 'public/images/conversation.png';
import grayInsta from 'public/images/grayCircleInsta.png';
import grayNaver from 'public/images/grayCircleNaver.png';
import BottomNavigation from 'components/BottomNavigation';
import simpleEstimate from 'public/images/simpleEstimate.png';
import xBtn from 'public/images/X.png';
import WebHeader from 'web-components/WebHeader';
import WebFooter from 'web-components/WebFooter';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const Guide1 = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const userID = localStorage.getItem('USER_ID');

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
    if (localStorage.getItem('USER_ID')) {
      console.log('login check !');
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

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
        {isLogin ? (
          <WhetherLoginComplete>
            <span>
              <label className="label">일반회원</label>
              {userId}
            </span>
            <span className="arrow-img">
              <Image src={whiteRight} alt="arrow" layout="fill" />
            </span>
          </WhetherLoginComplete>
        ) : (
          <WhetherLogin onClick={() => router.push('/signin')}>
            <span>로그인 해주세요</span>
            <span>
              <Image src={whiteRight} alt="arrow" />
            </span>
          </WhetherLogin>
        )}

        <WhiteArea>
          <WhiteAreaMenus onClick={() => router.push('/quotation/request')}>
            <span>
              <Image src={simpleEstimate} alt="간편견적" />
            </span>
            <span>간편견적</span>
          </WhiteAreaMenus>
          <WhiteAreaMenus onClick={() => router.push('/guide')}>
            <span>
              <Image src={guide} alt="가이드" />
            </span>
            <span>가이드</span>
          </WhiteAreaMenus>
          <WhiteAreaMenus onClick={() => alert('2차 작업 범위 페이지입니다.')}>
            <span>
              <Image src={conversation} alt="소통하기" />
            </span>
            <span>소통하기</span>
          </WhiteAreaMenus>
          <WhiteAreaMenus
            onClick={() =>
              userID ? router.push('/mypage') : router.push('/signin')
            }
          >
            <span>
              <Image src={mypageIcon} alt="마이페이지" />
            </span>
            <span>마이페이지</span>
          </WhiteAreaMenus>

          <Divider
            sx={{
              width: '100%',
              marginTop: '15pt',
              marginBottom: '3pt',
              borderTop: '1px solid #E2E5ED',
            }}
          />
          <WhiteAreaMenus onClick={() => router.push('/alarm')}>
            <span>공지사항</span>
          </WhiteAreaMenus>
          <WhiteAreaMenus onClick={() => router.push('/alarm/1-1')}>
            <span>알림 설정</span>
          </WhiteAreaMenus>
          <WhiteAreaMenus
            onClick={() =>
              userID ? router.push('/faq') : router.push('/signin')
            }
          >
            <span>1:1 문의</span>
          </WhiteAreaMenus>
          <WhiteAreaMenus onClick={() => router.push('/faq')}>
            <span>자주 묻는 질문</span>
          </WhiteAreaMenus>
          <WhiteAreaMenus onClick={() => alert('2차 작업 범위 페이지입니다.')}>
            <span>제휴문의</span>
          </WhiteAreaMenus>
          <Divider
            sx={{
              width: '100%',
              marginTop: '3pt',
              borderTop: '1px solid #E2E5ED',
            }}
          />
          <WhiteAreaBottomMenus>
            <span>
              <Image src={grayInsta} alt="인스타"></Image>
            </span>
            <span>
              <Image src={grayNaver} alt="네이버"></Image>
            </span>
          </WhiteAreaBottomMenus>
          <WhiteAreaBottomText>
            <span>고객센터 | 9818-8856</span>
            <span onClick={() => router.push('/setting')}>설정</span>
          </WhiteAreaBottomText>
        </WhiteArea>
      </ListBox>
    </WholeBox>
  );

  return (
    <Body>
      <WebHeader />
      <Inner>
        <Wrapper>
          <Header>
            <span className="left">가이드</span>
            <div className="right">
              <Image
                onClick={() => pageHandler('/alarm')}
                src={bell}
                alt="bell"
              />
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
            </div>
          </Header>
          <Wrap>
            <Platform onClick={() => pageHandler('/guide/1-1')}>
              <div className="img-box">
                <Image src={banner} alt="platform" layout="fill" />
              </div>
            </Platform>
            <Platform onClick={() => pageHandler('/guide/1-1')}>
              <div className="img-box">
                <Image src={banner2} alt="platform" layout="fill" />
              </div>
            </Platform>
            <SubsidyBox>
              <Subsidy
                onClick={() => {
                  isLogin ? pageHandler('/guide/1-2') : pageHandler('/signin');
                }}
              >
                <span className="text">보조금 가이드</span>
                <Image src={subsidy_icon} alt="subsidy_icon" />
              </Subsidy>
              <Fee onClick={() => pageHandler('/guide/1-3')}>
                <span className="text">요금 정보</span>
                <Image src={fee_icon} alt="fee_icon" />
              </Fee>
            </SubsidyBox>
          </Wrap>
          <Wrap>
            <GuideBox onClick={() => pageHandler('/guide/1-4')}>
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
            <GuideBox onClick={() => pageHandler('/guide/1-5')}>
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
          <EntizenLibrary onClick={() => pageHandler('')}>
            <Btn>
              &nbsp; 보러가기
              <div className="img">
                <Image src={arrow_small} alt="arrow_small" layout="fill" />
              </div>
            </Btn>
          </EntizenLibrary>
          <BottomNavigation />
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
  //height: 810pt;
  background: #fcfcfc;

  /* @media (max-height: 809pt) {
    display: block;
    height: 100%;
  } */
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 900pt;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
  }
  /* @media (max-height: 500pt) {
    height: 100%;
  } */
`;

const Wrapper = styled.div`
  padding: 0 20pt;
  padding-bottom: 30pt;

  @media (max-width: 899pt) {
    height: 100%;
    background-color: #fafcff;
  }
`;
const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 11.25pt;
  .left {
    font-weight: 700;
    font-size: 21pt;
    line-height: 21pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .right {
    display: flex;
    gap: 9.75pt;
  }
`;

const Wrap = styled.div`
  display: flex;
  position: relative;
  @media (max-width: 899pt) {
    display: block;
  }
`;

const Platform = styled(Button)`
  margin-top: 15.75pt;
  padding: 0;
  height: 210pt;
  .img-box {
  }
  &:nth-of-type(1) {
    display: none;
  }

  @media (max-width: 899pt) {
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;
    .img-box {
      width: 251.25pt;
      height: 159pt;
    }
    &:nth-of-type(1) {
      display: block;
    }
    &:nth-of-type(2) {
      display: none;
    }
  }
`;
const SubsidyBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14.625pt;
  padding-top: 15pt;
  width: calc(100% - 600pt);
  .text {
    font-weight: 700;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  @media (max-width: 899pt) {
    width: auto;
  }
`;
const Subsidy = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-left: 15pt;
  padding-right: 10.125pt;
  background: #e8e3f8;
  border-radius: 8px;
  width: 100%;
  @media (max-width: 899pt) {
    height: 36pt;
  }
`;
const Fee = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-right: 15pt;
  padding-left: 10.125pt;
  background: #fff1d5;
  border-radius: 8px;
  width: 100%;
  @media (max-width: 899pt) {
    height: 36pt;
  }
`;
const GuideBox = styled(Button)`
  display: flex;
  //height:이미지 높이 만큼 줘야함.
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  position: relative;
  width: 100%;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  margin-top: 15pt;
  padding: 14.25pt 15pt;
  &:nth-of-type(1) {
    margin-right: 22.5pt;
  }
  .name_box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .name {
    font-weight: 700;
    font-size: 15pt;
    line-height: 21pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .text {
    font-weight: 400;
    font-size: 12pt;
    line-height: 16.5pt;
    letter-spacing: -0.02em;
    padding-top: 7.5pt;
    color: ${colors.lightGray2};
    text-align: start;
  }
  .img-box {
    position: absolute;
    bottom: 16.5pt;
    right: 15.75pt;
    width: 45pt;
    height: 45pt;
  }
`;
const EntizenLibrary = styled.div`
  display: flex;
  justify-content: center;
`;
const Btn = styled(Button)`
  border: 0.75pt solid ${colors.gray};
  border-radius: 29px;
  margin-top: 30pt;
  padding: 6pt 9pt;
  font-weight: 500;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  display: flex;
  justify-content: center;
  gap: 3pt;
  color: ${colors.main2};
  .img {
    position: relative;
    width: 9pt;
    height: 9pt;
  }
  ::before {
    content: '앤티즌 도서관';
    color: ${colors.main};
  }
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
    font-family: Spoqa Han Sans Neo;
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
    font-family: Spoqa Han Sans Neo;
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

const IconBox = styled.div`
  margin-top: 9pt;
  margin-bottom: 9pt;
`;
