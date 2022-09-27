import { NextPage } from 'next';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import MainPage from 'components/Main';
import Start from './start';

type Props = {};

const Home: NextPage = () => {
  return <Start />;
};

export default Home;

const ItemWrapper = styled.div`
  max-width: 90%;
  height: 90%;
  margin: 7.5% auto;
  overflow: auto;
  background-color: #eeeeee;
`;
