import { testArr } from 'components/mypage/place/Charging';
import PlaceTopBox from 'components/mypage/place/PlaceTopBox';
import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PlaceInfo from 'components/mypage/place/PlaceInfo';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import { useQuery } from '@apollo/client';
import {
  chargingStations,
  ChargingStationsResponse,
} from 'QueryComponents/UserQuery';
import Loader from 'components/Loader';
import PlaceNoReview from 'components/mypage/place/PlaceNoReview';
import PlaceGetReview from 'components/mypage/place/PlaceGetReview';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import RequestMain from 'components/mypage/request/requestMain';

export interface testArr2 extends testArr {
  address: string;
  review: boolean;
  score: number[];
}

const tempProceeding: testArr2[] = [
  {
    id: 0,
    badge: 1,
    storeName: 'LS 카페 신림점',
    date: 'D-67',
    address: '',
    review: true,
    score: [2, 4, 5, 3],
  },
  {
    id: 1,
    badge: 0,
    storeName: 'LS 용산 주유소',
    date: 'D-177',
    address: '',
    review: false,
    score: [],
  },
  {
    id: 2,
    badge: 2,
    storeName: 'LS 25시 난곡점',
    date: 'D-5',
    address: '',
    review: true,
    score: [4, 4, 5, 4],
  },
  {
    id: 3,
    badge: 3,
    storeName: 'LS 05시 곡점',
    date: '',
    address: '',
    review: false,
    score: [],
  },
  {
    id: 4,
    badge: 4,
    storeName: 'LS 2시 난점',
    date: 'D-100',
    address: '',
    review: true,
    score: [5, 4, 5, 5],
  },
];
const TAG = 'pages/mypage/place/index.tsx';
const ChargingPlace = () => {
  const router = useRouter();
  const routerId = router?.query?.id;

  const [open, setOpen] = useState<boolean>(true); //리뷰 쓰기/보기 버튼 클릭 시.


  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const {
    data: chargingData,
    loading: chargingLoading,
    error: chargingError,
    refetch: chargingRefetch,
  } = useQuery<ChargingStationsResponse>(chargingStations, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  const handleRoute = (idx: string) => {
    //mob일 때 router.push();
    router.push({
      pathname: '/mypage/place',
      query: {
        id: idx,
      },
    });
  };

  if (chargingLoading) {
    return <Loader />;
  }
  if (chargingError) {
    console.log('🔥 ~line 106 ~내 충전소 상세페이지 에러 발생 ' + TAG);
    console.log(chargingError);
  }

  console.log('🔥 ~line 110 ~내 충전소 상세페이지 데이터 확인 ' + TAG);
  console.log(chargingData);
  // console.log(chargingData?.chargingStations[index]);

  // const index =  Number(routerId);
  const target = chargingData?.chargingStations.filter(
    (e) => e.projectIdx === routerId,
  );

  return (
    <>
      <Body>
        <WebHeader />
        <Inner>
          <FlexBox>
            <Wrap1>
              <RequestMain page={2} />
            </Wrap1>
            {typeof routerId !== 'undefined' ? (
              <Wrap>
                <HeaderWrap>
                  <MypageHeader
                    back={true}
                    title={!open ? '내 충전소' : '내 충전소 리뷰보기'}
                  />
                </HeaderWrap>
                <PlaceTopBox data={target![0]} />
                {open ? (
                  <>
                    {/* 계약 관련 정보가 적힌 컴포넌트 */}
                    <PlaceInfo data={target![0]} />
                    <Btn onClick={() => setOpen(!open)}>
                      <span>
                        {/* 작성된 리뷰 여부 */}
                        {target![0].projectReview ? '리뷰보기' : '리뷰쓰기'}
                      </span>
                    </Btn>
                  </>
                ) : (
                  <>
                    {/* 리뷰 여부와 리뷰 점수 전달. */}
                    {target![0].projectReview ? (
                      <PlaceGetReview review={true} data={target![0].projectReview} />
                    ) : (
                      <PlaceNoReview chargingRefetch={chargingRefetch} close={setOpen}/>
                    )}
                  </>
                )}
              </Wrap>
            ) : null}
          </FlexBox>
        </Inner>
        <WebFooter />
      </Body>
    </>
  );
};

export default ChargingPlace;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  width: 900pt;
  margin: 45.75pt auto;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
  }
`;
const FlexBox = styled.div`
  display: flex;
  position: relative;
`;

const Wrap = styled.div`
  margin: 0 15pt;
  position: relative;
  @media (min-width: 900pt) {
    width: 580.5pt;
    border: 1px solid red;
    margin: 0;
  }
`;

const Wrap1 = styled.div`
  //width: 255pt;
  border: 1px solid #e9eaee;
  border-radius: 6pt;
  height: 100%;

  @media (max-width: 899pt) {
    display: none;
  }
`;

const HeaderWrap = styled.div`
  margin-left: -15pt;
`;

const Btn = styled.button`
  width: 100%;
  background-color: ${colors.main};
  padding: 15pt 0;
  border-radius: 6pt;
  position: absolute;
  bottom: 30pt;
  span {
    color: white;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
  }
`;
