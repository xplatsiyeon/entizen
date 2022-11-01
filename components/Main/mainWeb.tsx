
import Carousel from 'components/Main/Carousel';
import SalesProjection from 'components/Main/SalesProjection';
import React, { useState } from 'react';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import LearnAbout from 'components/Main/LearnAbout';
import MyEstimateProject from 'components/Main/MyEstimateProject';
import SubscribeRequest from 'components/Main/SubscribeRequest';
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
import WhyEntizenWeb from './WhyEntizenWeb';
import { useDispatch } from 'react-redux';
import { locationAction } from 'store/locationSlice';
import Modal from 'components/Modal/Modal';

const Main = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [isModal, setIsModal] = useState(false);

  const handleOnClick = () => {
    if (text.length >= 1) {
      dispatch(locationAction.addKeyword(text));
      router.push('/chargerMap');
    } else {
      setIsModal(true);
    }
  };
  return (
    <>
      {isModal && (
        <Modal
          text="검색 키워드를 입력해주세요"
          click={() => setIsModal(false)}
        />
      )}
      <WebHeader />
      <CarouselWrap>
        <Carousel />
      </CarouselWrap>
      <ContentWrap>
        <SalesWrap>
          <SalesProjection text={text} setText={setText} />
          <Button onClick={handleOnClick}>검색</Button>
        </SalesWrap>
        <ProjectWrap>
          <MyEstimateProject borders={12} />
          <SubscribeRequest borders={12} />
        </ProjectWrap>
      </ContentWrap>
      <ImageWrap>
        <Image src={main2} alt="main image" />
      </ImageWrap>
      <WhyEntizenWeb />
      <LearnAbout borders={12} />
      <EntizenLibrary fontSize={19.5} smallfont={13.5} />
      <ImageWrap2>
        <Image src={main3} alt="사진" />
        <Image src={main4} alt="사진" />
        <Image src={main5} alt="사진" />
        <Image src={main6} alt="사진" />
        <Image src={main7} alt="사진" />
        <Image src={main8} alt="사진" />
        <Wrap onClick={() => router.push('/signUp/Terms')}>
          <Image src={main9} alt="사진" />
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
  font-family: 'Spoqa Han Sans Neo';
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
  cursor: pointer;
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
