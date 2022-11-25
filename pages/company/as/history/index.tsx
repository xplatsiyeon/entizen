import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import AsCompGetReview from 'componentsCompany/AS/component/AsCompGetReview';
import AsCompText from 'componentsCompany/AS/component/AsCompText';
import AsCompTop from 'componentsCompany/AS/component/AsCompTop';
import Image from 'next/image';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';

import RightArrow from 'public/images/black-right-arrow.svg';
import CommunicationIcon from 'public/images/communication-icon.svg';
import { useRouter } from 'next/router';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import { useEffect, useState } from 'react';
import LeftASBox from 'componentsCompany/AS/LeftASBox';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import { useQuery, useQueryClient } from 'react-query';
import { AsDetailReseponse } from 'pages/mypage/as';
import { isTokenGetApi } from 'api';

const AsHistory = () => {
  const router = useRouter();
  const routerId = router?.query?.afterSalesServiceIdx;
  const queryClient = useQueryClient();

  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  const [tabNumber, setTabNumber] = useState<number>(1);
  const [componentId, setComponentId] = useState<number>();
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
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  useEffect(() => {
    remove();
    refetch();
    // queryClient.invalidateQueries([\"as-detail\"]);
    // queryClient.invalidateQueries('as-detail');
  }, [router]);

  if (isError) {
    console.log(error);
  }

  return (
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
        <WebRapper>
          {nowWidth >= 1200 && (
            <LeftASBox
              setTabNumber={setTabNumber}
              tabNumber={tabNumber}
              componentId={componentId}
              setComponentId={setComponentId}
            />
          )}
          <Body>
            <MypageHeader title={'A/S 히스토리'} back={true} />
            {/* 상단 상세 페이지 */}
            <AsCompTop data={data!} />
            <Inner className="inner">
              {/* 하단 페이지 */}
              <AsCompText data={data!} />
              {/* 리뷰 */}
              <AsCompGetReview
                review={
                  data?.data?.afterSalesService?.afterSalesService
                    ?.afterSalesServiceReview!
                }
              />
            </Inner>
            <>
              <Button onClick={() => alert('소통하기로')}>
                <div>
                  <Image src={CommunicationIcon} alt="right-arrow" />
                </div>
                고객과 소통하기
                <div>
                  <Image src={RightArrow} alt="right-arrow" />
                </div>
              </Button>
            </>
          </Body>
        </WebRapper>
      </Container>
      <WebFooter />
    </WebBody>
  );
};

export default AsHistory;

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

const Body = styled.div`
  position: relative;

  @media (min-width: 900pt) {
    width: 580.5pt;
  }
`;

const Inner = styled.div`
  margin: 0 15pt;
  position: relative;
`;

const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 25.5pt auto 42pt;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60pt auto 42pt;
  padding: 10.5pt 12pt;
  border-radius: 21.75pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  background: #f3f4f7;
  color: #222222;
`;
