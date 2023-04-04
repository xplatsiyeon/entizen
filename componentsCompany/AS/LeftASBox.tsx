import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Nut from 'public/images/Nut.svg';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import BottomNavigation from 'components/BottomNavigation';
import useProfile from 'hooks/useProfile';
import NewASUnder from './NewASUnder';
import { useQueryClient } from 'react-query';

type Props = {
  num?: number;
  now?: string;
  setComponentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  componentId?: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  tabNumber: number;
};
const LeftASBox = ({
  tabNumber,
  setTabNumber,
  componentId,
  setComponentId,
}: Props) => {
  const route = useRouter();
  const queryclient = useQueryClient();
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  const TabType: string[] = ['신규 A/S', '히스토리'];
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const { profile, isLoading, invalidate } = useProfile(accessToken);

  // 왼쪽 열리고 닫히고
  const [newAS, setNewAS] = useState<boolean>(true);
  const [historyUnder, setHistoryUnder] = useState<boolean>(false);

  const router = useRouter();

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

  useEffect(() => {
    if (
      router.asPath === '/company/as?id=0' ||
      router.asPath === '/company/as'
    ) {
      setNewAS(true);
      setHistoryUnder(false);
    } else if (router.asPath === '/company/as?id=1') {
      setNewAS(false);
      setHistoryUnder(true);
    } else if (router.pathname === '/company/as/history') {
      setNewAS(false);
      setHistoryUnder(true);
    }
  }, [router]);

  // console.log('adas', router.pathname);
  const nowRouter = router.pathname;

  // 나중에 AS 밑에 오는 부분
  // const webComponents: Components = {
  //   0: <NewASUnder />,
  //   1: <AsHistoryUnder />,
  // };
  // 나중에 데이터 연결되서 데이터 없으면 보여질 컴포넌트
  // if (tempProceeding.length === 0) {
  //   return <NoAsHistyory />;
  // }

  return (
    <>
      <Wrapper>
        <Header>
          <span>
            <h1>{`${profile?.name}님,`}</h1>
            <h2>안녕하세요!</h2>
          </span>
          <div className="img" onClick={() => route.push('/setting')}>
            <Image src={Nut} alt="nut-icon" />
          </div>
        </Header>
        <Body>
          <span
            className="profile-icon"
            onClick={() => route.push('/company/profile')}
          >
            프로필 변경
          </span>
          <Line />
          <MobileTabContainer>
            {TabType.map((tab, index) => (
              <TabItem
                key={index}
                tab={tabNumber?.toString()!}
                index={index.toString()}
                onClick={() => setTabNumber(index)}
              >
                {tab}
                <Dot tab={tabNumber.toString()} index={index.toString()} />
              </TabItem>
            ))}
          </MobileTabContainer>
          <WebTabContainer>
            <WebTabItem
              newAS={newAS}
              nowRouter={nowRouter}
              onClick={() => {
                if (router.pathname !== `/company/as`) {
                  setNewAS(!newAS);
                  setHistoryUnder(!historyUnder);
                } else if (router.pathname === `/company/as`) {
                  router.push('/company/as?id=0');
                }
              }}
            >
              신규 A/S
              <WebDot newAS={newAS} />
            </WebTabItem>
            {router.pathname !== `/company/as` && newAS === true && (
              <div>
                <NewASUnder
                  tabNumber={tabNumber}
                  componentId={componentId}
                  setComponentId={setComponentId}
                />
              </div>
            )}
            <WebTabItemHistory
              historyUnder={historyUnder}
              nowRouter={nowRouter}
              onClick={() => {
                // if (router.pathname !== `/company/as?id=1`) {
                router.push(`/company/as?id=1`);
                setNewAS(!newAS);
                setHistoryUnder(!historyUnder);
                // queryclient.invalidateQueries('company-asList');
                // }
              }}
            >
              히스토리
              <WebDotHistory historyUnder={historyUnder} />
            </WebTabItemHistory>
            {/* {router.pathname !== `/company/as` && historyUnder === true && (
              <div>
                <AsHistoryUnder />
              </div>
            )} */}
          </WebTabContainer>
        </Body>
        <BottomNavigation />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  @media (min-width: 900pt) {
    width: 255pt;
    height: 424.5pt;
    border: 0.75pt solid #e2e5ed;
    border-radius: 12pt;
    background-color: #ffffff;
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
    cursor: pointer;
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
    cursor: pointer;
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
  @media (min-width: 900pt) {
    display: none;
  }
`;
const WebTabContainer = styled.div`
  display: flex;
  gap: 15pt;
  padding-left: 15pt;
  flex-direction: column;
  padding-left: 27pt;
  gap: 1pt;
  transition: all 0.3s ease-in-out;
  @media (max-width: 899.25pt) {
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
  @media (min-width: 900pt) {
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
  @media (min-width: 900pt) {
    margin: 0 auto;
    margin-left: 20pt;
  }
`;

const WebTabItem = styled.span<{ newAS: boolean; nowRouter: string }>`
  padding-top: 21pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${({ newAS }) => (newAS === true ? colors.main : colors.lightGray)};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  /* pointer-events: ${({ nowRouter }) =>
    nowRouter === '/company/as' && 'none'}; */
  @media (min-width: 900pt) {
    display: flex;
    align-items: center;
    padding-top: 23pt;
  }
`;

const WebDot = styled.div<{ newAS: boolean }>`
  width: 3pt;
  height: 3pt;
  border-radius: 50%;
  margin: 6pt auto 0 auto;
  transition: all 0.3s ease-in-out;
  background-color: ${({ newAS }) => (newAS === true ? '#5221CB' : '')};
  @media (min-width: 900pt) {
    margin: 0 auto;
    margin-left: 10pt;
  }
`;

const WebTabItemHistory = styled.span<{
  historyUnder: boolean;
  nowRouter: string;
}>`
  padding-top: 21pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  transition: all 0.3s ease-in-out;
  /* pointer-events: ${({ nowRouter }) =>
    nowRouter === '/company/as' && 'none'}; */
  color: ${({ historyUnder }) =>
    historyUnder === true ? colors.main : colors.lightGray};
  cursor: pointer;
  @media (min-width: 900pt) {
    display: flex;
    align-items: center;
    padding-top: 23pt;
  }
`;

const WebDotHistory = styled.div<{ historyUnder: boolean }>`
  width: 3pt;
  height: 3pt;
  border-radius: 50%;
  margin: 6pt auto 0 auto;
  transition: all 0.3s ease-in-out;
  background-color: ${({ historyUnder }) =>
    historyUnder === true ? '#5221CB' : ''};
  @media (min-width: 900pt) {
    margin: 0 auto;
    margin-left: 10pt;
  }
`;

export default LeftASBox;
