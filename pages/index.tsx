import { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import MainPage from 'components/Main';
import Main from '../components/Main/mainWeb';
import CompanyMainPage from 'components/Main/companyMain';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

interface Props {
  userAgent: string;
}
const Home: NextPage<Props> = ({}: Props) => {
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);

  // // 웹 -> 앱
  // useEffect(() => {
  //   if (userAgent === 'Android_App' || userAgent === 'iOS_App') {
  //   }
  //   if ((window as any).entizen!) {
  //     if (userAgent === 'Android_App') {
  //       (window as any).entizen!.test('Hello Native Callback');
  //     } else if (userAgent === 'iOS_App') {
  //       (window as any).webkit.messageHandlers.test.postMessage(
  //         'Hello Native Callback' + userAgent,
  //       );
  //     }
  //   }
  // }, []);

  // // 앱 -> 웹
  // useEffect(() => {
  //   // 안드로이드 호출 테스트
  //   if (userAgent === 'Android_App') {
  //     (window as any).test = () => {
  //       alert('안드로이드 테스트 중..');
  //     };
  //     // 아이폰 호출 테스트
  //   } else if (userAgent === 'iOS_App') {
  //     window.testEntizen = {
  //       testtest: () => {
  //         alert('iOS 테스트 중..');
  //       },
  //     };
  //   }
  // }, []);

  return (
    <>
      {memberType === 'COMPANY' ? (
        <CompanyMainPage />
      ) : (
        <>
          {/* 브라우저 너비에 따라 웹 메인 페이지, 모바일 메인페이지로 갈린다. */}
          <WebWrap>
            <Main />
          </WebWrap>
          <MobWrap>
            <MainPage />
          </MobWrap>
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
