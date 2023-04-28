import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import AsCompTop from 'componentsCompany/AS/component/AsCompTop';
import LeftASBox from 'componentsCompany/AS/LeftASBox';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import AsCompText from 'componentsCompany/AS/component/AsCompText';
import { useQuery, useQueryClient } from 'react-query';
import { AsDetailReseponse } from 'pages/mypage/as';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';

type Props = {};
export interface Data {
  id: number;
  state: number;
  badge: string;
  storeName: string;
  date: string;
  contract: boolean;
  planed: string[]; // 인덱스[0]: 준비 목표일, [1]: 설치 목표일, [2]: 검수 목표일, [3]: 완료 목표일
  address: string;
}

const ReceivedAS = (props: Props) => {
  const router = useRouter();
  const routerId = router?.query?.afterSalesServiceIdx;

  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [componentId, setComponentId] = useState<number>();
  const [headerTab, setHeaderTab] = useState<number>(3);
  // 접수내용, 접수확인, A/S 결과 열고 닫는거
  const [request, setRequeste] = useState<boolean>(true);
  const [requestConfirm, setRequestConfirm] = useState<boolean>(false);
  const [confirmWait, setConfirmWait] = useState<boolean>(false);
  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);
  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };
  const { data, isLoading, isError, error, refetch, remove } =
    useQuery<AsDetailReseponse>(
      'as-detail',
      () => isTokenGetApi(`/after-sales-services/${routerId}`),
      {
        enabled: router.isReady,
      },
    );
  useEffect(() => {
    if (request === true) {
      setRequestConfirm(false);
      setConfirmWait(false);
    } else if (requestConfirm === true) {
      setRequeste(false);
      setConfirmWait(false);
    } else if (confirmWait === true) {
      setRequeste(false);
      setRequestConfirm(false);
    }
  }, [request, requestConfirm, confirmWait]);

  useEffect(() => {
    if (router.query.afterSalesServiceIdx) {
      const num = Number(router.query.afterSalesServiceIdx);
      setComponentId(num);
      setHeaderTab(2);
    }
    if (router.query.afterSalesServiceIdx) {
      setOpenSubLink(false);
    }
  }, [router]);

  useEffect(() => {
    // console.log(routerId);
    remove();
  }, [routerId]);

  const resizeing = useCallback(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  useEffect(() => {
    resizeing();
  }, [nowWidth]);

  // if (isLoading) {
  //   return <Loader />;
  // }
  if (isError) {
    // console.log(error);
  }

  // console.log('🔥 as 상세페이지 데이터 확인 ~line 104 ' + TAG);
  // console.log(data);
  return (
    <>
      <WebBody>
        <WebBuyerHeader
          setTabNumber={setTabNumber}
          tabNumber={tabNumber}
          componentId={componentId}
          openSubLink={openSubLink}
          setOpenSubLink={setOpenSubLink}
        />
        <Container>
          <CompanyRightMenu />
          {/* 웹 */}
          <WebRapper>
            {nowWidth >= 1200 && (
              <LeftASBox
                setTabNumber={setTabNumber}
                tabNumber={tabNumber}
                componentId={componentId}
                setComponentId={setComponentId}
              />
            )}
            <MypageHeader back={true} title={'신규 A/S'} />
            <WebBox className="content">
              {/* 상단 상세 내용 */}
              <AsCompTop data={data!} />
              {/* 내부 컨텐츠 */}
              {isLoading ? (
                <Loader />
              ) : (
                <Inner>
                  <AsCompText data={data!} />
                </Inner>
              )}
            </WebBox>
          </WebRapper>
        </Container>
        <WebFooter />
      </WebBody>
    </>
  );
};

export default ReceivedAS;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  @media (max-height: 500pt) {
    height: 100%;
    display: block;
  }
`;

const Container = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  background: white;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
  @media (max-height: 400pt) {
    height: 100%;
    background: white;
  }
  @media (min-width: 900pt) {
    margin: 0 auto;
    padding-top: 54pt;
  }
`;

const WebRapper = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 30pt;

  display: flex;
  flex-direction: column;

  @media (min-width: 900pt) {
    margin: 0 auto;
    width: 900pt;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 60pt;
  }

  @media (max-height: 400pt) {
    height: 100vh;
    background: white;
  }
`;

const WebBox = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;

  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
    width: 580.5pt;
  }
`;

const Inner = styled.div`
  margin: 0 15pt;
  @media (min-width: 900pt) {
    height: auto;
  }
`;
