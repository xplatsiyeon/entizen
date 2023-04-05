import { NextPage } from 'next';
import React, { useLayoutEffect, useState } from 'react';
import styled from '@emotion/styled';
import MainPage from 'components/Main';
import Main from '../components/Main/mainWeb';
import CompanyMainPage from 'components/Main/companyMain';
import Landing from './landing';

interface Props {
  userAgent: string;
}
const Home: NextPage<Props> = ({}: Props) => {
  const landingPage = window.location.href === 'https://entizen.kr/';

  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  const [loginChecking, setLoginChecking] = useState(false);
  const memberType = JSON.parse(sessionStorage?.getItem('MEMBER_TYPE')!);

  //  ------------------브릿지-------------------
  // 휴대폰에 데이터 저장되어 있으면, 웹 세션 스토리지에 저장;
  useLayoutEffect(() => {
    if (userAgent === 'Android_App') {
      alert('푸쉬알림 테스트 중 : getUserIfno');
      setLoginChecking(true);
      window.entizen!.getUserInfo();
    } else if (userAgent === 'iOS_App') {
      setLoginChecking(true);
      window.webkit.messageHandlers.getUserInfo.postMessage('');
    }
  }, []);

  // 앱 -> 웹
  useLayoutEffect(() => {
    // 안드로이드 호출
    if (userAgent === 'Android_App') {
      // alert('푸쉬알림 테스트 중 : returnUserInfo');
      window.returnUserInfo = (userInfo) => {
        if (userInfo.length > 1) {
          const jsonGetUserInfo = JSON.parse(userInfo);
          alert(jsonGetUserInfo);
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
  }, []);

  // if (loginChecking) {
  // return <Loader />;
  // }

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
