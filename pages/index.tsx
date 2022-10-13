import { NextPage } from 'next';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import MainPage from 'components/Main';
import Main from '../components/Main/mainWeb';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import CompanyMainPage from 'components/Main/companyMain';

type Props = {};

const Home: NextPage = () => {
  const { selectedType } = useSelector((state: RootState) => state.selectType);

  console.log(selectedType);
  return (
    <>
      {(selectedType === 'user' || selectedType === '') && (
        <>
          <WebWrap>
            <Main />
          </WebWrap>
          <MobWrap>
            <MainPage />
          </MobWrap>
        </>
      )}
      {selectedType === 'company' && <CompanyMainPage />}
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
