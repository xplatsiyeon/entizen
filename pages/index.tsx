import { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import MainPage from 'components/Main';
import Main from '../components/Main/mainWeb';
import CompanyMainPage from 'components/Main/companyMain';

interface Props {
  userAgent: string;
}
const Home: NextPage<Props> = ({ userAgent }: Props) => {
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

  // 안드로이드 && iOS Bridge 연결하기
  const arrAgent = userAgent?.split(' ');
  const ANGENT = arrAgent![arrAgent?.length - 1];

  // 웹 -> 앱으로 호출하는 함수
  useEffect(() => {
    console.log('🔥 ANGENT 값 확인하기 --->' + ANGENT);

    if ('Android_App' === ANGENT || 'iOS_App' === ANGENT) {
      sessionStorage.setItem('ANGENT', JSON.stringify(ANGENT));
    }
    if ((window as any).entizen!) {
      if (ANGENT === 'Android_App') {
        (window as any).entizen!.test('Hello Native Callback');
      } else if (ANGENT === 'iOS_App') {
        (window as any).webkit.messageHandlers.test.postMessage(
          'Hello Native Callback' + ANGENT,
        );
      }
    }
  }, []);

  // 1번째 방법
  // useEffect(() => {
  //   (window as any).sayHello = new CustomEvent('NativeEvent');
  //   const nativeEventCallback = (event: any) => {
  //     alert(`event receive from Native`);
  //   };

  //   window.addEventListener('NativeEvent', nativeEventCallback);

  //   // event listener clean up
  //   return () => {
  //     window.removeEventListener('NativeEvent', nativeEventCallback);
  //   };
  // }, []);

  // 앱 -> 웹으로 호출하는 함수

  useEffect(() => {
    // 안드로이드 호출 테스트
    if (ANGENT === 'Android_App') {
      window.testEntizen = {
        test: () => {
          alert('안드로이드 테스트 중..');
        },
      };
      // 아이폰 호출 테스트
    } else if (ANGENT === 'iOS_App') {
      window.testEntizen = {
        testtest: () => {
          alert('아이폰 테스트 중..');
        },
      };
    } else {
      // 테스트용
      window.testEntizen = {
        test: () => {
          alert('ANGENT 체크 없이 테스트 중..');
        },
      };
    }
  }, []);

  // testtest();
  // const testEntizen = (id: string) => {
  //   console.log('testEntizen 호출');
  //   return alert('안드로이드 테스트 엔티즌 아이디 확인 --> ' + id);
  // };
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
export const getServerSideProps = ({ req }: NextPageContext) => {
  const userAgent = req?.headers['user-agent'];
  return { props: { userAgent, header: req?.headers } };
};
