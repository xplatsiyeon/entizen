import { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import MainPage from 'components/Main';
import Main from '../components/Main/mainWeb';
import CompanyMainPage from 'components/Main/companyMain';
import Landing from './landing';
import { useDispatch } from 'react-redux';
import { quotationAction } from 'store/quotationSlice';
import { subsidyGuideAction } from 'store/subsidyGuideSlice';
import { locationAction } from 'store/locationSlice';
import { addressSliceAction } from 'store/addressSlice';

interface Props {
  userAgent: string;
}
const Home: NextPage<Props> = ({}: Props) => {
  const dispatch = useDispatch();
  const landingPage = window.location.href === 'https://entizen.kr/';
  const memberType = JSON.parse(sessionStorage?.getItem('MEMBER_TYPE')!);

  // 초기화
  useEffect(() => {
    sessionStorage.removeItem('key');
    dispatch(quotationAction.init()); // 간편견적 초기화
    dispatch(subsidyGuideAction.reset()); // 보조금 가이드 초기화
    dispatch(locationAction.reset()); // 주소 초기화
    dispatch(addressSliceAction.reset()); // 주소 검색 초기화
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {landingPage ? (
        <Landing />
      ) : (
        <>
          {memberType === 'COMPANY' ? (
            // 기업
            <CompanyMainPage />
          ) : (
            // 일반 유저
            <>
              {/* 데스크탑 */}
              <WebWrap>
                <Main />
              </WebWrap>
              {/* 모바일 */}
              <MobWrap>
                <MainPage />
              </MobWrap>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;

const WebWrap = styled.div`
  display: block;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const MobWrap = styled.div`
  display: none;
  @media (max-width: 899.25pt) {
    display: block;
  }
`;
