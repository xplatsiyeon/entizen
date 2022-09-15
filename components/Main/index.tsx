import styled from '@emotion/styled';
import React from 'react';
import Carousel from './Carousel';
import Header from './Header';
import SalesProjection from './SalesProjection';

type Props = {};

const MainPage = (props: Props) => {
  return (
    <>
      <Container>
        <Header />
        <Carousel />
        <SalesProjection />
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
`;

export default MainPage;
