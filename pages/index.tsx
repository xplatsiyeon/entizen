import { NextPage, NextPageContext } from 'next';
import React, { useEffect } from 'react';
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
  // console.log('index page', userAgent);
  // const arrAgent = userAgent.split(' ');

  // if (
  //   'Android_App' === arrAgent[arrAgent.length - 1] ||
  //   'iOS_App' === arrAgent[arrAgent.length - 1]
  // ) {
  //   sessionStorage.setItem(
  //     'ANGENT',
  //     JSON.stringify(arrAgent[arrAgent.length - 1]),
  //   );
  // }
  // console.log('header', header);
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

  function testEntizen(id: string) {
    return alert('안드로이드 테스트 엔티즌 아이디 확인 --> ' + id);
  }

  useEffect(() => {
    // testEntizen();
  }, []);

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

// export const getServerSideProps = ({ req }: any) => {
//   const userAgent = req.headers['user-agent'];
//   return { props: { userAgent, header: req.headers } };
// };
