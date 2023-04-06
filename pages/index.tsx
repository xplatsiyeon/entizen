import { NextPage } from 'next';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from '@emotion/styled';
import MainPage from 'components/Main';
import Main from '../components/Main/mainWeb';
import CompanyMainPage from 'components/Main/companyMain';
import Landing from './landing';
import { useCookies } from 'react-cookie';
interface Props {
  userAgent: string;
}
const Home: NextPage<Props> = ({}: Props) => {
  const landingPage = window.location.href === 'https://entizen.kr/';
  const userAgent = JSON.parse(sessionStorage?.getItem('userAgent')!);
  const [loginChecking, setLoginChecking] = useState(false);
  const memberType = JSON.parse(sessionStorage?.getItem('MEMBER_TYPE')!);
  const [cookies, setCookie, removeCookie] = useCookies();

  //  ------------------브릿지-------------------
  // 휴대폰에 데이터 저장되어 있으면, 웹 세션 스토리지에 저장;
  useLayoutEffect(() => {
    if (userAgent === 'Android_App') {
      setLoginChecking(true);
      window.entizen!.getUserInfo();
    } else if (userAgent === 'iOS_App') {
      setLoginChecking(true);
      window.webkit.messageHandlers.getUserInfo.postMessage('');
    }
  }, []);

  // 유저 정보 받아오기
  const returnUserInfo = () => {
    if (userAgent === 'Android_App') {
      window.returnUserInfo = (userInfo) => {
        if (userInfo.length > 1) {
          const jsonGetUserInfo = JSON.parse(userInfo);
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
          sessionStorage.setItem(
            'USER_ID',
            JSON.stringify(jsonGetUserInfo.USER_ID),
          );
        }
        setLoginChecking(false);
      };
      // 아이폰 호출
    } else if (userAgent === 'iOS_App') {
      window.returnUserInfo = (userInfo) => {
        if (typeof userInfo === 'object') {
          alert('returnUserInfo 실행');
          sessionStorage.setItem(
            'SNS_MEMBER',
            JSON.stringify(userInfo.SNS_MEMBER),
          );
          sessionStorage.setItem(
            'MEMBER_TYPE',
            JSON.stringify(userInfo.MEMBER_TYPE),
          );
          sessionStorage.setItem(
            'ACCESS_TOKEN',
            JSON.stringify(userInfo.ACCESS_TOKEN),
          );
          sessionStorage.setItem(
            'REFRESH_TOKEN',
            JSON.stringify(userInfo.REFRESH_TOKEN),
          );
          sessionStorage.setItem('USER_ID', JSON.stringify(userInfo.USER_ID));
        }
        setLoginChecking(false);
      };
    }
  };

  // 앱 -> 웹
  useEffect(() => {
    returnUserInfo();
  }, []);

  // if (loginChecking) {
  // return <Loader />;
  // }

  // 브라우저 종료 시 쿠키 삭제
  useEffect(() => {
    // setCookie('my-cookie', 'my-cookieDeleteTest');
    // window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      // window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = () => {
    // removeCookie('my-cookie');
  };

  return (
    <>
      {landingPage ? (
        <Landing />
      ) : (
        <>
          {memberType === 'COMPANY' ? (
            <CompanyMainPage />
          ) : (
            <>
              {!loginChecking && (
                <>
                  <WebWrap>
                    <Main />
                  </WebWrap>
                  <MobWrap>
                    <MainPage />
                  </MobWrap>
                </>
              )}
              {/* 브라우저 너비에 따라 웹 메인 페이지, 모바일 메인페이지로 갈린다. */}
              {/* <WebWrap>
                <Main />
              </WebWrap>
              <MobWrap>
                <MainPage />
              </MobWrap> */}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;

const WebWrap = styled.div`
  display: block;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const MobWrap = styled.div`
  display: none;
  @media (max-width: 899.25pt) {
    display: block;
  }
`;
