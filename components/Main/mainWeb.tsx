import Carousel from 'components/Main/Carousel';
import SalesProjection from 'components/Main/SalesProjection';
import React, { useEffect, useState } from 'react';
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
import Modal from 'components/Modal/Modal';
import { useQuery } from 'react-query';
import { Count } from '.';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import UserRightMenu from 'components/UserRightMenu';
import MainSlider from 'components/MainSlider';
import { adminPageNumberAction } from 'storeAdmin/adminPageNumberSlice';
import userAddressHooks from 'hooks/userAddressHooks';
import colors from 'styles/colors';
import googleIcon from 'public/images/googlePlay.svg';
import appStore from 'public/images/appStore.svg';
import mainIcon from 'public/images/mainIcon5.svg';

const Main = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const ACCESS_TOKEN = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const [isModal, setIsModal] = useState(false);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [keyword, setKeyword, results] = userAddressHooks();

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

  // 검색 클릭
  const handleOnClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSearchBar((prev) => !prev);
    if (keyword.length === 0) {
      setIsModal(true);
    }
  };

  // admin 페이지 리셋
  useEffect(() => {
    dispatch(adminPageNumberAction.reset());
  }, []);

  useEffect(() => {
    if (!keyword) {
      setIsSearchBar(false);
    }
  }, [keyword, isSearchBar]);

  if (quotationIsLoading || projectIsLoading) {
    return <Loader />;
  }
  if (quotationIsError || projectIsError) {
    // console.log('에러 발생');
  }

  return (
    <Wrapper>
      {isModal && (
        <Modal
          text="검색 키워드를 입력해주세요"
          click={() => setIsModal(false)}
        />
      )}
      <WebHeader />
      <UserRightMenu />
      {/* 배너 */}
      {/* <CarouselWrap>
        <Carousel />
      </CarouselWrap> */}
      <Carousel />
      {/* 기능 부분 */}
      <ContentWrap>
        {/*예상 매출 검색 */}
        <SalesFormWrap>
          <SalesForm onSubmit={handleOnClick} className="salesForm">
            <SalesProjection
              keyword={keyword}
              setKeyword={setKeyword}
              isScroll={isScroll}
              setIsScroll={setIsScroll}
              isSearchBar={isSearchBar}
              setIsSearchBar={setIsSearchBar}
              results={results}
            />

            <ButtonWrap>
              <Button type="submit" isSearchBar={isSearchBar}>
                검색
              </Button>
            </ButtonWrap>
          </SalesForm>
        </SalesFormWrap>
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
        <div className="box">
          <span className="title">앱 다운로드</span>
          <span className="text">내일의 충전생활, 그 일상을 오늘로.</span>

          <div className="iconWrap">
            <a
              className="appleIcon"
              href="https://apps.apple.com/kr/app/%EC%97%94%ED%8B%B0%EC%A6%8C-%EC%A0%84%EA%B8%B0%EC%B0%A8-%EC%B6%A9%EC%A0%84%EA%B8%B0-%EB%B9%84%EA%B5%90%EB%B6%80%ED%84%B0-%EC%84%A4%EC%B9%98-%EC%9A%B4%EC%98%81%EA%B9%8C%EC%A7%80/id6444201801"
            >
              <Image src={appStore} alt="appStore" />
            </a>
            <a
              className="googleIcon"
              href="https://play.google.com/store/apps/details?id=com.entizen"
            >
              <Image src={googleIcon} alt="googleIcon" />
            </a>
          </div>
          <span className="imgIcon">
            <Image src={mainIcon} alt="mainIcon" />
          </span>
        </div>
        {/* <Image src={main2} alt="main image" /> */}
      </ImageWrap>
      {/* 왜 엔티즌인가 */}
      <WhyEntizenWeb />
      {/* 알아보기 */}
      <LearnAbout borders={12} />
      {/* 엔티즌 도서관 */}
      <EntizenLibrary fontSize={19.5} smallfont={13.5} />
      <section>
        <Image src={mainBanner1} alt="사진" priority placeholder="blur" />
        <Image src={mainBanner2} alt="사진" priority placeholder="blur" />
        <Image src={mainBanner3} alt="사진" priority placeholder="blur" />
        <Image src={main6} alt="사진" priority placeholder="blur" />
        {/* 전기차 슬라이드 */}
        {/* <MainSlider /> */}
        <MainSlider />
        <Image src={main8} alt="사진" priority placeholder="blur" />
        <Wrap onClick={() => router.push('/signUp/Terms')}>
          <Image src={main9} alt="사진" priority placeholder="blur" />
        </Wrap>
      </section>
      <WebFooter />
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  @media (min-width: 900pt) {
    height: 100vh;
    overflow: scroll;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      display: initial;
      width: 7.5pt;
    }
    ::-webkit-scrollbar-track {
      // 뒷배경
    }
    ::-webkit-scrollbar-thumb {
      // 막대
      background-color: ${colors.lightGray6};
      border-radius: 6pt;
      height: 15%;
    }
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

const SalesFormWrap = styled.div`
  border: 1.5pt solid #e2e5ed;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  margin-right: 22.5pt;
  border-radius: 12pt;
  padding: 5px 6pt 5px;
`;

const SalesForm = styled.form`
  display: flex;
  flex-direction: column;
  /* margin-right: 22.5pt; */
  /* border: 1.5pt solid #e2e5ed;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2); */
  /* border-radius: 12pt; */
  font-family: 'Spoqa Han Sans Neo';
  max-height: 352.5pt;
  max-width: 594.22px;
  width: 594.22px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: initial;
    width: 6px;
  }
  ::-webkit-scrollbar-track {
  }
  ::-webkit-scrollbar-thumb {
    background: #caccd1;
    border-radius: 100px;
    height: 80px;
  }
`;

const ButtonWrap = styled.div`
  padding-left: 56.25pt;
  padding-right: 56.25pt;
`;

const Button = styled.button<{ isSearchBar: boolean }>`
  display: ${({ isSearchBar }) => (isSearchBar === true ? 'none' : 'flex')};
  min-width: 324pt;
  width: 100%;
  height: 45pt;
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
  margin-top: 6pt;
  box-sizing: border-box;
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
  height: 320px;
  background-color: #f4f0ff;
  .box {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .title {
    margin-top: 70px;
    color: var(--main-2, #222);
    font-family: Spoqa Han Sans Neo;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 100% */
    letter-spacing: -0.4px;
  }
  .text {
    margin-top: 8px;
    color: var(--main-2, #222);
    font-family: Spoqa Han Sans Neo;
    font-size: 34px;
    font-style: normal;
    font-weight: 700;
    line-height: 56px; /* 164.706% */
    letter-spacing: -0.68px;
  }
  .iconWrap {
    display: flex;
    align-items: center;
    margin-top: 40px;
  }
  .appleIcon {
    margin-right: 20px;
    cursor: pointer;
  }
  .googleIcon {
    cursor: pointer;
  }
  .imgIcon {
    position: absolute;
    right: 0;
    top: 25px;
  }
`;

const Wrap = styled.div`
  width: 900pt;
  margin: 60pt auto 90pt;
  @media (max-width: 899.25pt) {
    width: 100%;
  }
`;
