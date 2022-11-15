import styled from '@emotion/styled';
import ProjectInProgress from 'componentsCompany/Mypage/ProjectInProgress';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import FinishedProjects from 'componentsCompany/Mypage/FinishedProjects';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import NoProject from 'componentsCompany/Mypage/NoProject';
import LeftProjectBox from 'componentsCompany/Mypage/LeftProjectBox';
import { useQuery } from 'react-query';
import useProfile from 'hooks/useProfile';
import RightNoProject from 'componentsCompany/Mypage/RightNoProject';

type Props = { num?: number; now?: string };
interface Components {
  [key: number]: JSX.Element;
}

interface Data {
  id: number;
  badge: string;
  storeName: string;
  date: string;
}
// 데이터 없을 때 나오는 페이지
// const tempProceeding: [] = [];
const tempProceeding: Data[] = [
  {
    id: 0,
    badge: '검수 중',
    storeName: 'S-OIL 대치 주유소',
    date: '2021.01.01',
  },
  {
    id: 1,
    badge: '준비 중',
    storeName: '맥도날드 대이동점',
    date: '2021.05.10',
  },
  {
    id: 2,
    badge: '계약대기',
    storeName: 'LS카페 신림점',
    date: '2021.03.10',
  },
  {
    id: 3,
    badge: '설치 중',
    storeName: 'LS카페 마곡점',
    date: '2021.07.23',
  },
  {
    id: 4,
    badge: '완료 중',
    storeName: '스타벅스 마곡점',
    date: '2021.07.23',
  },
  {
    id: 5,
    badge: '완료대기',
    storeName: 'LS카페 계양점',
    date: '2021.07.23',
  },
  {
    id: 6,
    badge: '프로젝트 취소',
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
  },
];

const Mypage = ({ num, now }: Props) => {
  const route = useRouter();
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);

  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);

  // 내 프로젝트에서 진행 프로젝트랑 완료 프로젝트 뭐 눌렀는지 받아오는 state
  const [componentId, setComponentId] = useState<number | undefined>();
  const [successComponentId, setSuccessComponentId] = useState<
    number | undefined
  >();

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
  const TabType: string[] = ['진행 프로젝트', '완료 프로젝트'];

  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const { profile, isLoading, invalidate } = useProfile(accessToken);

  const components: Components = {
    0: (
      <ProjectInProgress
        tabNumber={tabNumber}
        setComponentId={setComponentId}
        componentId={componentId}
      />
    ),
    1: (
      <FinishedProjects
        tabNumber={tabNumber}
        setSuccessComponentId={setSuccessComponentId}
        successComponentId={successComponentId}
      />
    ),
  };

  return (
    <>
      <WebBuyerHeader
        setTabNumber={setTabNumber}
        tabNumber={tabNumber}
        componentId={componentId}
        num={num}
        now={now}
        openSubLink={openSubLink}
        setOpenSubLink={setOpenSubLink}
      />
      <WebRapper>
        <LeftProjectBox
          setTabNumber={setTabNumber}
          tabNumber={tabNumber}
          componentId={componentId}
          setComponentId={setComponentId}
          successComponentId={successComponentId}
          setSuccessComponentId={setSuccessComponentId}
        />
        <div>{components[tabNumber]}</div>
      </WebRapper>
      <WebFooter />
    </>
  );
};

const WebRapper = styled.div`
  @media (min-width: 899pt) {
    margin: 0 auto;
    padding: 60pt 0;
    width: 900pt;
    display: flex;
    justify-content: space-between;
  }
`;

export default Mypage;
