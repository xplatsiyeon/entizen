import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { isTokenGetApi } from 'api';
import { useQuery, useQueryClient } from 'react-query';
import useDebounce from 'hooks/useDebounce';
import Logos from 'public/images/entizenLogo.png';
import Ring from 'public/images/guide-bell.svg';
import Hamburger from 'public/images/list-bar.svg';
import { Box, Divider, Drawer } from '@mui/material';
import colors from 'styles/colors';
import xBtn from 'public/images/X.png';
import whiteRight from 'public/images/whiteRight20.png';
import simpleEstimate from 'public/images/simpleEstimate.png';
import mypageIcon from 'public/images/mypageIcon.png';
import guide from 'public/images/guide.png';
import grayInsta from 'public/images/grayCircleInsta.png';
import grayNaver from 'public/images/grayCircleNaver.png';
import Nut from 'public/images/Nut.png';
import Bell from 'public/images/mobBell.png';
import myProduct from 'public/images/myProductList.png';
import hamburgerAs from 'public/images/hamburgerAs.png';
import BottomNavigation from 'components/BottomNavigation';
import { useDispatch } from 'react-redux';
import { myEstimateAction } from 'storeCompany/myQuotation';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import { ChattingListResponse } from 'components/Chatting/ChattingLists';
import HamburgerChat from 'public/images/HamburgerChat.svg';
import useProfile from 'hooks/useProfile';
import BellNormal from 'public/images/BellNormal.svg';
import { openExternalBrowser } from 'bridge/appToWeb';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

type Props = {
  anchor: string;
  toggleDrawer: (
    anchor: string,
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  setState: React.Dispatch<
    React.SetStateAction<{
      right: boolean;
    }>
  >;
  state: {
    right: boolean;
  };
};

const HamburgerBar = ({ anchor, toggleDrawer, setState, state }: Props) => {
  const router = useRouter();
  const userID = JSON.parse(sessionStorage.getItem('USER_ID')!);
  const dispatch = useDispatch();
  const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const [tabNumber, setTabNumber] = useState<number>(-1);
  const [componentId, setComponentId] = useState<number>();
  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState(false);

  // 제휴문의 채팅방 보내기
  const { data, isLoading, isError, refetch } = useQuery<ChattingListResponse>(
    'chatting-list',
    () => isTokenGetApi(`/chatting?searchKeyword&filter=all`),
    {
      enabled: userID !== null ? true : false,
    },
  );

  const chattingRoomIdx =
    data?.data?.chattingRooms?.entizenChattingRoom?.chattingRoomIdx;

  // 기업인지 판매자인지
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

  // 이름 가져오기
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const {
    profile: profileData,
    isLoading: profileIsLoading,
    invalidate: profileInvalidate,
  } = useProfile(accessToken);

  // 라우팅 함수 내 견적 vs 간편견적
  const estimateRouting = () => {
    if (userID && memberType === 'COMPANY') {
      router.push('/company/quotation');
    } else if (userID && memberType !== 'COMPANY') {
      router.push('/quotation/request');
    } else if (userID!) {
      router.push('/signin');
    }
  };

  // 라우팅 함수 기업채팅 vs 내채팅
  const chattingRouting = () => {
    if (userID && memberType === 'COMPANY') {
      router.push('/company/chatting');
    } else if (userID && memberType !== 'COMPANY') {
      router.push('/guide');
    } else if (userID!) {
      router.push('/signin');
    }
  };

  // 라우팅 함수 기업as vs 유저as
  const asRouting = () => {
    if (userID && memberType === 'COMPANY') {
      router.push('/company/as');
    } else if (userID && memberType !== 'COMPANY') {
      router.push('/chatting');
    } else if (userID!) {
      router.push('/signin');
    }
  };

  // 라우팅 함수 기업project vs 유저project
  const projectRouting = () => {
    if (userID && memberType === 'COMPANY') {
      router.push('/company/mypage?id=0');
    } else if (userID && memberType !== 'COMPANY') {
      router.push('/mypage');
    } else if (userID!) {
      router.push('/signin');
    }
  };

  useEffect(() => {
    dispatch(myEstimateAction.reset());
    sessionStorage.removeItem('key');
  }, []);
  useEffect(() => {
    if (sessionStorage.getItem('USER_ID')) {
      console.log('login check!');
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);
  return (
    <WholeBox
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListBox>
        <XBtnWrapper>
          <Imagewrap
            onClick={() =>
              userID ? router.push('/alarm') : router.push('/signin')
            }
          >
            {userID ? (
              <Image src={Bell} alt="bellBtn" />
            ) : (
              <Image src={BellNormal} alt="BellNormal" />
            )}
          </Imagewrap>
          <Imagewrap
            onClick={() =>
              userID ? router.push('/setting') : router.push('/signin')
            }
          >
            <Image src={Nut} alt="NutBtn" />
          </Imagewrap>
          <Imagewrap onClick={toggleDrawer(anchor, false)}>
            <Image src={xBtn} alt="xBtn" />
          </Imagewrap>
        </XBtnWrapper>
        {isLogin ? (
          <WhetherLoginComplete
            onClick={() =>
              memberType === 'COMPANY'
                ? router.push('/company/profile')
                : router.push('/profile/editing')
            }
          >
            <span
              onClick={() =>
                memberType === 'COMPANY'
                  ? router.push('/company/profile')
                  : router.push('/profile/editing')
              }
            >
              {memberType === 'COMPANY' ? (
                <label className="label">기업회원</label>
              ) : (
                <label className="label">일반회원</label>
              )}
              {`${profileData?.name} 님`}
            </span>
            <span
              className="arrow-img"
              onClick={() =>
                memberType === 'COMPANY'
                  ? router.push('/company/profile')
                  : router.push('/profile/editing')
              }
            >
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
          <WhiteAreaMenus onClick={estimateRouting}>
            <span>
              <Image src={simpleEstimate} alt="내 견적" />
            </span>
            {memberType === 'COMPANY' ? (
              <span>내 견적</span>
            ) : (
              <span>간편견적</span>
            )}
          </WhiteAreaMenus>
          <WhiteAreaMenus onClick={chattingRouting}>
            {memberType === 'COMPANY' ? (
              <>
                <span>
                  <Image src={HamburgerChat} alt="소통하기" />
                </span>
                <span>소통하기</span>
              </>
            ) : (
              <>
                <span>
                  <Image src={guide} alt="가이드" />
                </span>
                <span>가이드</span>
              </>
            )}
          </WhiteAreaMenus>
          <WhiteAreaMenus onClick={asRouting}>
            {memberType === 'COMPANY' ? (
              <>
                <span>
                  <Image src={hamburgerAs} alt="A/S" />
                </span>
                <span>A/S</span>
              </>
            ) : (
              <>
                <span>
                  <Image src={HamburgerChat} alt="소통하기" />
                </span>
                <span>소통하기</span>
              </>
            )}
          </WhiteAreaMenus>
          <WhiteAreaMenus onClick={projectRouting}>
            {memberType === 'COMPANY' ? (
              <>
                <span>
                  <Image src={mypageIcon} alt="내 프로젝트" />
                </span>
                <span>내프로젝트</span>
              </>
            ) : (
              <>
                <span>
                  <Image src={mypageIcon} alt="내 프로젝트" />
                </span>
                <span>마이 페이지</span>
              </>
            )}
          </WhiteAreaMenus>
          {memberType === 'COMPANY' && (
            <WhiteAreaMenus
              onClick={() =>
                userID
                  ? router.push('/company/myProductList')
                  : router.push('/signin')
              }
            >
              <span>
                <Image src={myProduct} alt="내 제품" />
              </span>
              <span>내 제품 리스트</span>
            </WhiteAreaMenus>
          )}
          <Divider
            sx={{
              width: '100%',
              marginTop: '15pt',
              marginBottom: '3pt',
              borderTop: '1px solid #E2E5ED',
            }}
          />
          <WhiteAreaMenus onClick={() => router.push('/alarm?id=1')}>
            <span>공지사항</span>
          </WhiteAreaMenus>
          <WhiteAreaMenus
            onClick={() =>
              userID ? router.push('/setting?id=1') : router.push('/signin')
            }
          >
            <span>알림 설정</span>
          </WhiteAreaMenus>
          <WhiteAreaMenus
            onClick={() =>
              userID ? router.push('/setting?id=2') : router.push('/signin')
            }
          >
            <span>1:1 문의</span>
          </WhiteAreaMenus>
          <WhiteAreaMenus
            onClick={() =>
              memberType === 'COMPANY'
                ? router.push('/company/faq')
                : router.push('/faq')
            }
          >
            <span>자주 묻는 질문</span>
          </WhiteAreaMenus>
          <WhiteAreaMenus
            onClick={() =>
              userID ? router.push('setting?id=2') : router.push('/signin')
            }
          >
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
            {/* 인스타 그램 임시로 막기 */}
            {/* <span
              onClick={() =>
                window.open(
                  'https://instagram.com/entizen.ev/',
                  'entizen_Instagram',
                )
              }
            >
              <Image src={grayInsta} alt="인스타"></Image>
            </span> */}
            <span
              // onClick={() =>
              //   window.open('http://post.naver.com/entizen_ev', 'entizen_post')
              // }
              onClick={() =>
                openExternalBrowser(
                  userAgent,
                  'http://post.naver.com/entizen_ev',
                )
              }
            >
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
};

export default HamburgerBar;

const Container = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  @media (min-width: 900pt) {
    padding-left: 0;
    padding-right: 0;
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
  margin-bottom: 12.015pt;
  display: flex;
  align-items: center;
  position: relative;
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
