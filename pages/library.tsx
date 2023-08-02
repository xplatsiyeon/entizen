import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import Image from 'next/image';
import React from 'react';
import colors from 'styles/colors';
import arrowImg from 'public/images/caretRight.svg';
import { useRouter } from 'next/router';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { openExternalBrowser } from 'bridge/appToWeb';
import { EntizenLibraryResponse } from 'components/Main/EntizenLibrary';
import { isTokenGetApi } from 'api';

const Library = () => {
  const route = useRouter();
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  // const HandleOnClick = () => {
  //   window.open(
  //     'https://post.naver.com/myProfile.naver?memberNo=58867144',
  //     'entizen_post',
  //   );
  // };

  // 도서관 get api
  const { data, isLoading, isError, refetch } =
    useQuery<EntizenLibraryResponse>('entizenLibraryList', () =>
      isTokenGetApi(`/libraries?page=1&limit=10`),
    );

  return (
    <WebBody>
      <WebHeader />
      <Inner>
        <MypageHeader back={true} title={'엔티즌 도서관'} />
        <WebInnerHeader>엔티즌 도서관</WebInnerHeader>
        <Body>
          {data?.data?.map((item, idx) => {
            return (
              <List
                onClick={() => {
                  openExternalBrowser(userAgent, `${item?.link}`);
                }}
              >
                <ProfileImg>
                  <ImgDiv src={`${item?.imageUrl}`} />
                </ProfileImg>
                <div className="text-box">
                  <div>{item?.title}</div>
                  <div className="color-box">
                    <div className="color-text" style={{ cursor: 'pointer' }}>
                      자세히 보기
                    </div>

                    <span className="arrow-img">
                      <Image src={arrowImg} alt="arrow" layout="fill" />
                    </span>
                  </div>
                </div>
              </List>
            );
          })}
        </Body>
      </Inner>
      <WebFooter />
    </WebBody>
  );
};

export default Library;
const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #ffffff;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;
const WebInnerHeader = styled.h1`
  font-weight: 700;
  font-size: 25.5pt;
  line-height: 37.5pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-top: 55.5pt;
  padding-bottom: 45pt;
  text-align: center;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const Body = styled.ul`
  margin-top: 12.75pt;
  padding-right: 10.5pt;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 899.25pt) {
    position: relative;
    padding-right: 0pt;
    box-shadow: 0px 0px 10px 0px #89a3c933;
    border-radius: 6pt;
    display: block;
  }
`;
const Inner = styled.div`
  display: block;
  position: relative;
  width: 900pt;
  height: 100%;
  border-radius: 12pt;
  margin-top: 0;
  margin: 0 auto 45.75pt auto;
  @media (max-width: 899.25pt) {
    width: 100%;
    position: relative;
    margin: 0 auto;
    padding: 0;
    background: none;
  }
`;
const List = styled.li`
  display: flex;
  gap: 15pt;
  width: 436.5pt;
  height: 120pt;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 16px;
  align-items: center;
  margin-bottom: 22.5pt;

  .badge-img {
    position: relative;
    width: 50%;
    height: 50%;
    margin-left: 22.5pt;
    border-radius: 50%;
    background: ${colors.lightWhite};
    border: 1px solid #e2e5ed;
  }
  .text-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    color: ${colors.main2};
    padding-right: 31px;
    font-family: Spoqa Han Sans Neo;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: -0.4px;
  }
  .color-box {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }
  .color-text {
    font-family: 'Spoqa Han Sans Neo';
    position: relative;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: -0.28px;
    margin-right: 4px;
    color: ${colors.main};
  }
  .arrow-img {
    position: relative;
    width: 16px;
    height: 16px;
  }
  @media (max-width: 899.25pt) {
    width: 100%;
    margin-bottom: 0;
    border-radius: 0;

    height: auto;
    gap: 7.5pt;
    border-bottom: 0.75pt solid ${colors.lightGray};
    box-shadow: none;
    padding: 13.5pt 0 12pt;
    .text-box {
      font-size: 12pt;
      gap: 3pt;
    }
    .badge-img {
      width: 44px;
      height: 44px;
      margin-left: 15pt;
    }
    .color-text {
      top: 0.7pt; //  가운데 정렬 디테일 수정
      font-size: 9pt;
    }
    .arrow-img {
      width: 16px;
      height: 16px;
    }
  }
`;

const ProfileImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 32.5pt;
  & > div {
    /* width: 75pt;
    height: 75pt; */
    border: 1px solid #e2e5ed;
    border-radius: 50%;
    margin-right: 15pt;
  }
  @media (max-width: 899.25pt) {
    padding-top: 13.5pt;
    padding-bottom: 13.5pt;
    padding-right: 12pt;
    padding-left: 6pt;
    & > div {
      width: 33pt;
      height: 33pt;
      margin-right: 0;
    }
  }
`;

const NewIcon = styled.div`
  position: absolute;
`;

const ImgDiv = styled.img`
  width: 75pt;
  height: 75pt;
  border: 1px solid #e2e5ed;
  border-radius: 50%;
  margin-right: 15pt;
  object-fit: cover;
  @media (max-width: 899.25pt) {
    width: 50pt;
    height: 50pt;
  }
`;

/*
 */
