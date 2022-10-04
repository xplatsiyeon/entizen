import Header from 'components/Main/Header';
import Carousel from 'components/Main/Carousel';
import Footer from 'components/Main/Footer';
import SalesProjection from 'components/Main/SalesProjection';
import React from 'react';
import WebFooter from 'web-components/WebFooter';
import WebHeader from 'web-components/WebHeader';
import MainPage from 'components/Main';
import LearnAbout from 'components/Main/LearnAbout';
import MyEstimateProject from 'components/Main/MyEstimateProject';
import SubscribeRequest from 'components/Main/SubscribeRequest';
import WhyEntizen from 'components/Main/WhyEntizen';
import EntizenLibrary from 'components/Main/EntizenLibrary';
import Image from 'next/image';
import styled from '@emotion/styled';
import main2 from 'public/images/main2.png';
import main3 from 'public/images/main3.png';
import main4 from 'public/images/main4.png';
import main5 from 'public/images/main5.png';
import main6 from 'public/images/main6.png';
import main7 from 'public/images/main7.png';
import main8 from 'public/images/main8.png';
import main9 from 'public/images/main9.png';
import { useRouter } from 'next/router';


const Main = () => {
  const router = useRouter();
  return (
    <>
      <WebHeader />
      <CarouselWrap>
        <Carousel />
      </CarouselWrap>
      <ContentWrap>
        <SalesWrap>
          <SalesProjection />
          <Button>검색</Button>
        </SalesWrap>
        <ProjectWrap>
          <MyEstimateProject />
          <SubscribeRequest />
        </ProjectWrap>
      </ContentWrap>
      <ImageWrap>
        <Image src={main2} alt="main image" />
      </ImageWrap>
      <WhyEntizen />
      <LearnAbout />
      <EntizenLibrary />
      <ImageWrap2>
        <Image src={main3} />
        <Image src={main4} />
        <Image src={main5} />
        <Image src={main6} />
        <Image src={main7} />
        <Image src={main8} />
        <Wrap onClick={()=>router.push('/signin')}>
          <Image src={main9} />
        </Wrap>
      </ImageWrap2>
      <WebFooter />
    </>
  );
};

export default Main;

const CarouselWrap = styled.section`
  width: 100%;
  height: 360pt;
  background: #5a2dc9;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100%;
  }
`;

const ContentWrap = styled.section`
  display: flex;
  width: 900pt;
  margin: 0 auto;
  margin-top: 60pt;

  @media (max-width: 899pt) {
    width: 100%;
    display: block;
    margin: 0 auto;
  }
`;

const SalesWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 322pt;
  padding: 0 56.25pt;
  margin-right: 22.5pt;
  border: 1.5pt solid #e2e5ed;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 16px;
`;

const Button = styled.button`
  width: 100%;
  height: 45pt;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #5a2dc9;
  color: #ffff;
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-bottom: 69pt;
`;

const ProjectWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageWrap = styled.section`
  margin: 90pt 0;
`;

const ImageWrap2 = styled.section``;

const Wrap = styled.div`
  width: 900pt;
  margin: 60pt auto 90pt;

  @media (max-width: 899pt) {
    width: 100%;
  }
`;
