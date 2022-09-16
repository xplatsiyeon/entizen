import styled from '@emotion/styled';
import React from 'react';
import Carousel from './Carousel';
import EntizenLibrary from './EntizenLibrary';
import Footer from './Footer';
import Header from './Header';
import LearnAbout from './LearnAbout';
import MyEstimateProject from './MyEstimateProject';
import SalesProjection from './SalesProjection';
import SubscribeRequest from './SubscribeRequest';
import WhyEntizen from './WhyEntizen';

type Props = {};

const MainPage = (props: Props) => {
  return (
    <>
      <Container>
        <Header />
        <Carousel />
        <SalesProjection />
        <MyEstimateProject />
        <SubscribeRequest />
        <WhyEntizen />
        <LearnAbout />
        <EntizenLibrary />
      </Container>
      <Box>
        <Footer />
      </Box>
    </>
  );
};

const Container = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
`;
const Box = styled.div`
  width: 100%;
`;

export default MainPage;
