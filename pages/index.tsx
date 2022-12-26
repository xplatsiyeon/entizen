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
        // (window as any).webkit.messageHandlers.test.postMessage(
        //   'Hello Native Callback' + ANGENT,
        // );
      }
    }
  }, []);

  // 앱 -> 웹으로 호출하는 함수
  // const testFution = () => {
  //   const iosTest: any = window.document.querySelectorAll('.iosTest');
  //   if (iosTest[0]) {
  //     iosTest[0].style.color = 'red';
  //     // window.document.querySelectorAll('.iosTest')[0]?.style.color = 'red';
  //   }
  // };

  useEffect(() => {
    // 안드로이드 호출 테스트
    if (ANGENT === 'Android_App') {
      (window as any).test = () => {
        alert('안드로이드 테스트 중..');
      };
      // 아이폰 호출 테스트
    } else if (ANGENT === 'iOS_App') {
      (window as any).test = () => {
        alert('ios 테스트중입니다.');
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
