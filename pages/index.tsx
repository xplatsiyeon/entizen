import { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';
import MainPage from 'components/Main';
import Main from '../components/Main/mainWeb';
import CompanyMainPage from 'components/Main/companyMain';

interface Props {
  userAgent: string;
}
const Home: NextPage<Props> = ({}: Props) => {
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

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
