import { NextPage } from 'next';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import MainPage from 'components/Main';
import Main from '../components/Main/mainWeb';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import CompanyMainPage from 'components/Main/companyMain';
const TAB = '/index';
const Home: NextPage = () => {
  const memberType = JSON.parse(localStorage.getItem('MEMBER_TYPE')!);
  console.log(TAB + '멤버타입-> ' + memberType);
  return (
    <>
      {memberType === null ||
        (memberType === 'USER' && (
          <>
            <WebWrap>
              <Main />
            </WebWrap>
            <MobWrap>
              <MainPage />
            </MobWrap>
          </>
        ))}
      {memberType === 'COMPANY' && <CompanyMainPage />}
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
  @media (max-width: 899pt) {
    display: none;
  }
`;
const MobWrap = styled.div`
  display: none;
  @media (max-width: 899pt) {
    display: block;
  }
`;
