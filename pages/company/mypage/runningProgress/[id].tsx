import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import LeftProjectBox from 'componentsCompany/Mypage/LeftProjectBox';
import ProjectInProgress from 'componentsCompany/Mypage/ProjectInProgress';
import TopBox from 'componentsCompany/Mypage/TopBox';
import UnderBox from 'componentsCompany/Mypage/UnderBox';
import WriteContract from 'componentsCompany/Mypage/WriteContract';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import { useRouter } from 'next/router';
import {
  GET_InProgressProjectsDetail,
  InProgressProjectsDetailResponse,
} from 'QueryComponents/CompanyQuery';
import React, { useEffect, useState } from 'react';
import Progress from '../projectProgress';

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

const TAG = 'pages/compnay/mypage/runningProgress.tsx';
const RunningProgress = (props: Props) => {
  const router = useRouter();
  const routerId = router?.query?.id!;
  const [open, setOpen] = useState<boolean>(false);
  const [openContract, setOpenContract] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [componentId, setComponentId] = useState<number>();
  const [data, setData] = useState<Data>({
    id: -1,
    state: -1,
    badge: '',
    storeName: '',
    date: '',
    contract: false,
    planed: [],
    address: '',
  });
  // -----진행중인 프로젝트 상세 리스트 api-----
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const {
    loading,
    error,
    data: inProgressData,
  } = useQuery<InProgressProjectsDetailResponse>(GET_InProgressProjectsDetail, {
    variables: {
      projectIdx: routerId,
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  console.log(TAG + '🔥 ~line 68 ~내프로젝트 진행중인 프로젝트 리스트');
  console.log(inProgressData);

  useEffect(() => {
    console.log('index', router.query.id);
    if (router.query.id) {
      const num = Number(router.query.id);
      setComponentId(num);
      // setData(tempProceeding[num]);
    }
  }, [router.query.id]);

  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  return (
    <>
      <WebBuyerHeader
        setTabNumber={setTabNumber}
        tabNumber={tabNumber}
        componentId={componentId}
      />
      <WebRapper>
        {nowWidth > 1198.7 && (
          <LeftProjectBox
            setTabNumber={setTabNumber}
            tabNumber={tabNumber}
            componentId={componentId}
            setComponentId={setComponentId}
          />
        )}
        <MypageHeader back={true} title={'진행 프로젝트'} />
        <WebBox>
          <TopBox
            open={open}
            setOpen={setOpen}
            handleClick={handleClick}
            data={inProgressData!}
          />
          {/* 계약서 작성 시 Progress 나와야 됨 */}
          {openContract ? (
            <Progress data={inProgressData!} info={data} setData={setData} />
          ) : (
            <UnderBox setOpenContract={setOpenContract} />
          )}
        </WebBox>
      </WebRapper>
    </>
  );
};

export default RunningProgress;

const WebRapper = styled.div`
  @media (min-width: 899pt) {
    margin: 0 auto;
    padding: 60pt 0;
    width: 900pt;
    display: flex;
    justify-content: space-between;
  }
`;

const WebBox = styled.div`
  @media (min-width: 899pt) {
    display: flex;
    flex-direction: column;
    width: 580.5pt;
  }
`;
