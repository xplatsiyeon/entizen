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
  const [userName, setUserName] = useState<string>('윤세아');
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);

  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);

  // 내 프로젝트 진행 프로젝트랑 완료 프로젝트 뭐 눌렀는지 받아오는 state
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

  if (tempProceeding.length === 0) {
    return <NoProject />;
  }

  return (
    <>
      <WebBuyerHeader
        setTabNumber={setTabNumber}
        tabNumber={tabNumber}
        componentId={componentId}
        num={num}
        now={now}
        openSubLink={openSubLink}
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

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  @media (min-width: 899pt) {
    width: 255pt;
    height: 424.5pt;
    border: 0.75pt solid #e2e5ed;
    border-radius: 12pt;
  }
`;

const WebRapper = styled.div`
  @media (min-width: 899pt) {
    margin: 0 auto;
    padding: 60pt 0;
    width: 900pt;
    display: flex;
    justify-content: space-between;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 21pt 15pt 0 15pt;
  & h1 {
    font-weight: 700;
    font-size: 21pt;
    line-height: 27pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  & h2 {
    font-weight: 500;
    font-size: 21pt;
    line-height: 27pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .img {
    /* 이미지 주변 클릭 범위 5px정도 늘려줌 */
    width: 22.5pt;
    height: 22.5pt;
    text-align: end;
  }
`;

const Body = styled.div`
  padding-top: 15pt;
  .profile-icon {
    margin-left: 15pt;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main};
    border: 0.75pt solid ${colors.main};
    border-radius: 12pt;
    padding: 6pt 9pt;
  }
`;
const Line = styled.div`
  margin-top: 21pt;
  width: 100%;
  border-bottom: 3pt solid ${colors.gray3};
`;

const MobileTabContainer = styled.div`
  display: flex;
  gap: 15pt;
  padding-left: 15pt;
  @media (min-width: 899pt) {
    display: none;
  }
`;
const WebTabContainer = styled.div`
  display: flex;
  gap: 15pt;
  padding-left: 15pt;
  justify-content: center;
  flex-direction: column;
  padding-left: 27pt;
  gap: 1pt;
  @media (max-width: 899pt) {
    display: none;
  }
`;
const TabItem = styled.span<{ tab: string; index: string }>`
  padding-top: 21pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${({ tab, index }) =>
    tab === index ? colors.main : colors.lightGray};
  @media (min-width: 899pt) {
    display: flex;
    align-items: center;
    padding-top: 23pt;
  }
`;

const Item = styled.span<{ tab: string; index: string }>`
  padding-top: 21pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${({ tab, index }) =>
    tab === index ? colors.main : colors.lightGray};
  @media (min-width: 899pt) {
    display: flex;
    align-items: center;
    padding-top: 23pt;
  }
`;
const Dot = styled.div<{ tab: string; index: string }>`
  width: 3pt;
  height: 3pt;
  border-radius: 50%;
  margin: 6pt auto 0 auto;
  background-color: ${({ tab, index }) => tab === index && `${colors.main}`};
  @media (min-width: 899pt) {
    margin: 0 auto;
    margin-left: 20pt;
  }
`;

const UnderContents = styled.div`
  width: 255pt;
  @media (max-width: 899pt) {
    display: none;
  }
`;

const RightProgress = styled.div`
  @media (min-width: 899pt) {
    display: flex;
    flex-direction: column;
  }
`;

export default Mypage;
