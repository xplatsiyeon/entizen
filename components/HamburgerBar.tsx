import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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

import { Divider, Drawer } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const HambuguerBar = (anchor: string) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [state, setState] = useState({
    right: false,
  });
  const { accessToken, refreshToken, userId } = useSelector(
    (state: RootState) => state.originUserData,
  );
  const userID = sessionStorage.getItem('USER_ID');
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
  return (
    <>
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
              <span> 로그인 해주세요</span>
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
            <WhiteAreaMenus
              onClick={() => {
                router.push('/chatting');
              }}
            >
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
            <WhiteAreaMenus onClick={() => router.push('/notice')}>
              <span>공지사항</span>
            </WhiteAreaMenus>
            <WhiteAreaMenus onClick={() => router.push('/setting/ring')}>
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
            <WhiteAreaMenus
              onClick={() => alert('2차 작업 범위 페이지입니다.')}
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
              <span
                onClick={() =>
                  window.open(
                    'https://instagram.com/entizen.ev/',
                    'entizen_Instagram',
                  )
                }
              >
                post.naver.com/entizen_ev
                <Image src={grayInsta} alt="인스타"></Image>
              </span>
              <span
                onClick={() =>
                  window.open(
                    'https://post.naver.com/entizen_ev',
                    'entizen_post',
                  )
                }
              >
                <Image src={grayNaver} alt="네이버"></Image>
              </span>
            </WhiteAreaBottomMenus>
            <WhiteAreaBottomText>
              <span>고객센터 | 1544-6811</span>
              <span onClick={() => router.push('/setting')}>설정</span>
            </WhiteAreaBottomText>
          </WhiteArea>
        </ListBox>
      </WholeBox>
    </>
  );
};

export default HambuguerBar;

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
  //justify-content: end;
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
`;
