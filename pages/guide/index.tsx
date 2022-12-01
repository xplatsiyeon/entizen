import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import bell from 'public/images/guide-bell.svg';
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
import { Divider, Drawer } from '@mui/material';
import { useRouter } from 'next/router';
import conversation from 'public/images/conversation.png';
import grayInsta from 'public/images/grayCircleInsta.png';
import grayNaver from 'public/images/grayCircleNaver.png';
import BottomNavigation from 'components/BottomNavigation';
import simpleEstimate from 'public/images/simpleEstimate.png';
import xBtn from 'public/images/X.png';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import arrowR from 'public/images/arrowR.png';
import guideIndex1 from 'public/guide/guideIndex1.png';
import guideIndex2 from 'public/guide/guideIndex2.png';
import BingGuideBanner from 'public/guide/Big-guide-banner.png';
import UserRightMenu from 'components/UserRightMenu';

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
              <div className="bell-img" onClick={() => pageHandler('/alarm')}>
                <Image src={bell} alt="bell" />
              </div>
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
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
          </Header>
          <Wrap>
            <Platform onClick={() => pageHandler('/guide/1-1')}>
              <p>플랫폼 가이드</p>
              <h3>
                충전의 정석
                <br />
                엔티즌
                <br /> 사용설명서
              </h3>
              <div className="banner">
                <Image src={BingGuideBanner} alt="platform" layout="fill" />
              </div>
            </Platform>

            <SubsidyBox>
              <Subsidy
                onClick={() => {
                  isLogin ? pageHandler('/guide/1-2') : pageHandler('/signin');
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
              <Fee onClick={() => pageHandler('/guide/1-3')}>
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
          <EntizenLibrary>
            <Btn onClick={() => router.push('/library')}>
              보러가기
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
  background: #fcfcfc;
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
  padding: 0 20pt;
  padding-bottom: 30pt;

  @media (max-width: 899.25pt) {
    height: 100%;
    background-color: #fafcff;
  }
`;
const Header = styled(Box)`
  display: none;
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
    align-items: center;
    gap: 9.75pt;
  }
  .bell-img {
    cursor: pointer;
  }
  @media (max-width: 899.25pt) {
    display: flex;
  }
`;

const Wrap = styled.div`
  display: flex;
  position: relative;
  @media (max-width: 899.25pt) {
    display: block;
  }
`;

const Platform = styled.button`
  position: relative;
  padding: 0;
  flex: 2.2;
  margin-right: 7pt; //나중에 수정할 수도.
  background-color: ${colors.main1};
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  width: 100%;
  height: 210pt;
  cursor: pointer;
  .banner {
    position: absolute;
    bottom: 6pt;
    right: 8.25pt;
    width: 258.06pt;
    height: 167.7375pt;
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
const SubsidyBox = styled(Box)`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  gap: 14.625pt;
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
  border-radius: 8px;
  width: 100%;
  text-align: left;
  .text {
    width: 70%;
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
const Fee = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  height: 100%;
  padding: 37.5pt 15pt 24pt 21pt;
  background: #fff1d5;
  border-radius: 8px;
  width: 100%;
  text-align: left;
  .text {
    width: 50%;
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
const Btn = styled.button`
  background-color: ${colors.lightWhite};
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
  cursor: pointer;
  gap: 3pt;
  color: ${colors.main2};
  .img {
    position: relative;
    width: 9pt;
    height: 9pt;
  }
  ::before {
    content: '앤티즌 도서관';
    color: ${colors.main1};
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
  cursor: pointer;
  margin-top: 9pt;
  margin-bottom: 9pt;
`;
