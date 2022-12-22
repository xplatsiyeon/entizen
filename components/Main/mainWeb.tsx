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
import mainBanner1 from 'public/images/mainBanner1.png';
import mainBanner2 from 'public/images/mainBanner2.png';
import mainBanner3 from 'public/images/mainBanner3.png';

import main2 from 'public/images/main2.png';
import main6 from 'public/images/main6.png';
import main8 from 'public/images/main8.png';
import main9 from 'public/images/main9.png';
import { useRouter } from 'next/router';
import WhyEntizenWeb from './WhyEntizenWeb';
import { useDispatch } from 'react-redux';
import { locationAction } from 'store/locationSlice';
import Modal from 'components/Modal/Modal';
import { useQuery } from 'react-query';
import { Count } from '.';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import UserRightMenu from 'components/UserRightMenu';
import MainSlider from 'components/MainSlider';

const Main = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const ACCESS_TOKEN = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const [text, setText] = useState('');
  const [isModal, setIsModal] = useState(false);

  const {
    data: quotationData,
    isLoading: quotationIsLoading,
    isError: quotationIsError,
  } = useQuery<Count>(
    'quotation-count',
    () => isTokenGetApi('/quotations/request/count'),
    {
      enabled: ACCESS_TOKEN ? true : false,
    },
  );
  const {
    data: projectData,
    isLoading: projectIsLoading,
    isError: projectIsError,
  } = useQuery<Count>('project-count', () => isTokenGetApi('/projects/count'), {
    enabled: ACCESS_TOKEN ? true : false,
  });

  const handleOnClick = (evnet: React.FormEvent<HTMLFormElement>) => {
    evnet.preventDefault();
    if (text.length >= 1) {
      dispatch(locationAction.addKeyword(text));
      router.push('/chargerMap');
    } else {
      setIsModal(true);
    }
  };

  if (quotationIsLoading || projectIsLoading) {
    return <Loader />;
  }
  if (quotationIsError || projectIsError) {
    console.log('에러 발생');
  }

  function testEntizen(id: string) {
    alert('안드로이드 테스트 엔티즌 아이디 확인 --> ' + id);
  }
  return (
    <>
      {isModal && (
        <Modal
          text="검색 키워드를 입력해주세요"
          click={() => setIsModal(false)}
        />
      )}
      <WebHeader />
      <UserRightMenu />
      {/* 배너 */}
      <CarouselWrap>
        <Carousel />
      </CarouselWrap>
      {/* 기능 부분 */}
      <ContentWrap>
        {/*예상 매출 검색 */}
        <SalesForm onSubmit={handleOnClick}>
          <SalesProjection text={text} setText={setText} />
          <Button type="submit">검색</Button>
        </SalesForm>
        {/* 내 견적서, 내 프로젝트 수량 */}
        <ProjectWrap>
          <MyEstimateProject
            borders={12}
            quotationData={quotationData!}
            projectData={projectData!}
          />
          <SubscribeRequest borders={12} />
        </ProjectWrap>
      </ContentWrap>
      <ImageWrap>
        <Image src={main2} alt="main image" />
      </ImageWrap>
      {/* 왜 엔티즌인가 */}
      <WhyEntizenWeb />
      {/* 알아보기 */}
      <LearnAbout borders={12} />
      {/* 엔티즌 도서관 */}
      <EntizenLibrary fontSize={19.5} smallfont={13.5} />
      <ImageWrap2>
        <Image src={mainBanner1} alt="사진" />
        <Image src={mainBanner2} alt="사진" />
        <Image src={mainBanner3} alt="사진" />
        <Image src={main6} alt="사진" />
        {/* 전기차 슬라이드 */}
        {/* <MainSlider /> */}
        <MainSlider />
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

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100%;
  }
`;

const ContentWrap = styled.section`
  display: flex;
  width: 900pt;
  margin: 0 auto;
  margin-top: 60pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    display: block;
    margin: 0 auto;
  }
`;

// const SalesWrap = styled.div`
const SalesForm = styled.form`
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

  @media (max-width: 899.25pt) {
    width: 100%;
  }
`;
