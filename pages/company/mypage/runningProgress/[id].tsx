import styled from '@emotion/styled';
import { CountertopsOutlined } from '@mui/icons-material';
import MypageHeader from 'components/mypage/request/header';
import LeftProjectBox from 'componentsCompany/Mypage/LeftProjectBox';
import ProjectInProgress from 'componentsCompany/Mypage/ProjectInProgress';
import TopBox from 'componentsCompany/Mypage/TopBox';
import UnderBox from 'componentsCompany/Mypage/UnderBox';
import WriteContract from 'componentsCompany/Mypage/WriteContract';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Progress from '../projectProgress';

type Props = {
  setOpenSubLink: React.Dispatch<React.SetStateAction<string>>;
  openSubLink: string;
};

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

const tempProceeding: Data[] = [
  {
    id: 0,
    state: 3,
    badge: '검수 중',
    storeName: 'LS카페 신림점',
    date: '2021.01.01',
    contract: true,
    planed: ['2022.04.25', '2022.06.11'],
    address: '서울시 관악구 난곡로40길 30',
  },
  {
    id: 1,
    state: 1,
    badge: '준비 중',
    storeName: '스타벅스 마곡점',
    date: '2021.05.10',
    contract: true,
    planed: [],
    address: '서울시 관악구 난곡로40길 30',
  },
  {
    id: 2,
    state: 0,
    badge: '계약대기',
    storeName: 'LS카페 신림점',
    date: '2021.03.10',
    contract: false,
    planed: ['2022.04.25', '2022.07.25'],
    address: '서울시 관악구 난곡로40길 30',
  },
  {
    id: 3,
    badge: '설치 중',
    state: 2,
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
    contract: true,
    planed: ['2022.04.25'],
    address: '서울시 관악구 난곡로40길 30',
  },
  {
    id: 4,
    state: 4,
    badge: '완료 중',
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
    contract: true,
    planed: ['2022.04.26', '2022.05.6', '2022.05.11'],
    address: '서울시 관악구 난곡로40길 30',
  },
  {
    id: 5,
    state: 5,
    badge: '완료대기',
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
    contract: true,
    planed: ['2022.04.26', '2022.05.6', '2022.05.11', '2022.05.14'],
    address: '서울시 관악구 난곡로40길 30',
  },
  {
    id: 6,
    state: 6,
    badge: '프로젝트 취소',
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
    contract: false,
    planed: [],
    address: '서울시 관악구 난곡로40길 30',
  },
];

const RunningProgress = ({ setOpenSubLink, openSubLink }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [, setOpenContract] = useState<boolean>(false);
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
  console.log({ data });

  const router = useRouter();

  useEffect(() => {
    console.log('index', router.query.id);
    console.log('123', openSubLink);
    if (router.query.id) {
      const num = Number(router.query.id);
      setComponentId(num);
      setData(tempProceeding[num]);
      setOpenSubLink('close');
      console.log('456', openSubLink);
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
        openSubLink={openSubLink}
        setOpenSubLink={setOpenSubLink}
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
        {data.id !== -1 ? (
          <WebBox>
            <TopBox
              open={open}
              setOpen={setOpen}
              handleClick={handleClick}
              info={data}
            />
            {data.contract ? (
              <Progress info={data} setData={setData} />
            ) : (
              <UnderBox setOpenContract={setOpenContract} />
            )}
          </WebBox>
        ) : null}
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
