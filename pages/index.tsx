import { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import MainPage from 'components/Main';
import Main from '../components/Main/mainWeb';
import CompanyMainPage from 'components/Main/companyMain';

const TAB = '/index';

interface Props {
  userAgent: string;
  header: any;
}
const Home = ({ userAgent, header }: Props) => {
  console.log('index page', userAgent);
  const arrAgent = userAgent?.split(' ');
  const ANGENT = arrAgent![arrAgent?.length - 1];
  // const [messageFromAndroid, setMessageFromAndroid] = useState(
  //   'Hello Vite + React!',
  // );

  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

  useEffect(() => {
    // const eventFromAndroid = async (event: any) => {
    //   setMessageFromAndroid(event.detail.data);
    // };
    // window.addEventListener('javascriptFunction', eventFromAndroid);

    if ('Android_App' === ANGENT || 'iOS_App' === ANGENT) {
      sessionStorage.setItem('ANGENT', JSON.stringify(ANGENT));
    }

    console.log('ANGENT 값 확인 --->   ' + ANGENT);
    if ((window as any).entizen!) {
      if (ANGENT === 'Android_App') {
        (window as any).entizen!.test('Hello Native Callback');
      } else if (ANGENT === 'iOS_App') {
        (window as any).webkit.messageHandlers.test.postMessage(
          'Hello Native Callback' + ANGENT,
        );
      }
      // (window as any).entizen!.callJavaScriptFunction();
    }
    // return () => {
    //   window.removeEventListener('javascriptFunction', eventFromAndroid);
    // };
  }, []);

  function testEntizen(id: string) {
    alert('안드로이드 테스트 엔티즌 아이디 확인 --> ' + id);
  }
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

const ItemWrapper = styled.div`
  max-width: 90%;
  height: 90%;
  margin: 7.5% auto;
  overflow: auto;
  background-color: #eeeeee;
  /* border: #eeeeee; */
`;
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

export const getServerSideProps = ({ req }: any) => {
  const userAgent = req.headers['user-agent'];
  return { props: { userAgent, header: req.headers } };
};
