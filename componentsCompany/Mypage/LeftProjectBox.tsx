import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Nut from 'public/images/Nut.svg';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import BottomNavigation from 'components/BottomNavigation';
import NoProject from 'componentsCompany/Mypage/NoProject';
import WebProjectInProgressUnder from 'componentsCompany/Mypage/WebProjectInProgressUnder';
import WebFinishedProjectsUnder from './WebFinishedProjectsUnder';
import useProfile from 'hooks/useProfile';
import { useQuery } from '@apollo/client';
import {
  GET_historyProjectsDetail,
  ResponseHistoryProjectsDetail,
} from 'QueryComponents/CompanyQuery';
import { GET_InProgressProjects, Response } from 'QueryComponents/CompanyQuery';
import { useMediaQuery } from 'react-responsive';

type Props = {
  num?: number;
  now?: string;
  setComponentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  componentId?: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  tabNumber: number;
};
interface Components {
  [key: number]: JSX.Element;
}
const LeftProjectBox = ({
  componentId,
  setComponentId,
  tabNumber,
  setTabNumber,
}: Props) => {
  const router = useRouter();
  const nowRouter = router.pathname;
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  const TabType: string[] = ['진행 프로젝트', '완료 프로젝트'];
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const { profile, isLoading, invalidate } = useProfile(accessToken);

  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  // 진행중인 프로젝트
  const { loading, error, data } = useQuery<Response>(GET_InProgressProjects, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });
  // 완료 프로젝트
  const {
    loading: historyLoading,
    error: historyError,
    data: historyData,
  } = useQuery<ResponseHistoryProjectsDetail>(GET_historyProjectsDetail, {
    variables: {
      searchKeyword: '',
      sort: 'SUBSCRIBE_START',
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  // 왼쪽 열리고 닫히고
  const [progress, setProgress] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (
      router.asPath === '/company/mypage?id=0' ||
      router.asPath === '/company/mypage'
    ) {
      setProgress(true);
      setSuccess(false);
    } else if (router.asPath === '/company/mypage?id=1') {
      setProgress(false);
      setSuccess(true);
    } else if (router.pathname === '/company/mypage/successedProject') {
      setProgress(false);
      setSuccess(true);
    }
  }, [router]);

  return (
    <>
      <Wrapper>
        <Header>
          <span>
            <h1>{`${profile?.name}님,`}</h1>
            <h2>안녕하세요!</h2>
          </span>
          <div className="img" onClick={() => router.push('/setting')}>
            <Image src={Nut} alt="nut-icon" />
          </div>
        </Header>
        <Body>
          <span
            className="profile-icon"
            onClick={() => router.push('/company/profile')}
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
          {/* <WebTabContainer>
            {TabType.map((tab, index) => (
              <TabItem
                key={index}
                tab={tabNumber?.toString()!}
                index={index.toString()}
                onClick={() => {
                  if (nowWidth < 1200) {
                    setTabNumber(index);
                  }
                }}
              >
                {tab}
                <Dot tab={tabNumber.toString()} index={index.toString()} />
              </TabItem>
            ))}
          </WebTabContainer> */}
          <WebTabContainer>
            <WebTabItem
              progress={progress}
              nowRouter={nowRouter}
              onClick={() => {
                if (router.pathname !== `/company/mypage`) {
                  setProgress(true);
                  setSuccess(false);
                } else if (router.pathname === `/company/mypage`) {
                  router.push('/company/mypage?id=0');
                }
              }}
            >
              진행 프로젝트
              <WebDot progress={progress} />
            </WebTabItem>
            {router.pathname !== `/company/mypage` && progress === true && (
              <div>
                <WebProjectInProgressUnder
                  tabNumber={tabNumber}
                  setComponentId={setComponentId}
                  componentId={componentId}
                  data={data!}
                />
              </div>
            )}
            <WebTabItemSuccess
              success={success}
              nowRouter={nowRouter}
              // onClick={() => {
              //   if (router.pathname !== `/compan/mypage`) {
              //     setProgress(!progress);
              //   }
              // }}
              onClick={() => {
                if (router.asPath !== `/company/mypage?id=1`)
                  router.push(`/company/mypage?id=1`);
                setProgress(false);
                setSuccess(true);
              }}
            >
              완료 프로젝트
              <WebDotSuccess success={success} />
            </WebTabItemSuccess>
            {/* {router.pathname !== `/company/mypage` && success === true && (
              <div>
                <WebFinishedProjectsUnder
                  tabNumber={tabNumber}
                  setComponentId={setComponentId}
                  componentId={componentId}
                  historyData={historyData!}
                />
              </div>
            )} */}
          </WebTabContainer>
        </Body>
        {mobile && <BottomNavigation />}
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
    overflow-y: scroll;
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

  @media (min-width: 900pt) {
    padding: 42pt 28.5pt 0pt;
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
    @media (min-width: 900pt) {
      margin-left: 28.5pt;
    }
  }

  @media (min-width: 900pt) {
    padding-top: 21pt;
  }
`;
const Line = styled.div`
  margin-top: 21pt;
  width: 100%;
  border-bottom: 3pt solid ${colors.gray3};

  @media (min-width: 900pt) {
    margin-top: 30pt;
  }
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
  justify-content: center;
  flex-direction: column;
  padding-left: 27pt;
  padding-bottom: 23pt;
  gap: 1pt;
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
    tab === index ? colors.main : colors.lightGray3};
  @media (min-width: 900pt) {
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

const UnderContents = styled.div`
  width: 255pt;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const RightProgress = styled.div`
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
  }
`;

const WebTabItem = styled.span<{ progress: boolean; nowRouter: string }>`
  padding-top: 21pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${({ progress }) =>
    progress === true ? colors.main : colors.lightGray};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  /* pointer-events: ${({ nowRouter }) =>
    nowRouter === '/company/mypage' && 'none'}; */
  @media (min-width: 900pt) {
    display: flex;
    align-items: center;
    padding-top: 23pt;
  }
`;

const WebDot = styled.div<{ progress: boolean }>`
  width: 3pt;
  height: 3pt;
  border-radius: 50%;
  margin: 6pt auto 0 auto;
  transition: all 0.3s ease-in-out;
  background-color: ${({ progress }) => (progress === true ? '#5221CB' : '')};
  @media (min-width: 900pt) {
    margin: 0 auto;
    margin-left: 10pt;
  }
`;

const WebTabItemSuccess = styled.span<{ success: boolean; nowRouter: string }>`
  padding-top: 21pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  transition: all 0.3s ease-in-out;
  color: ${({ success }) =>
    success === true ? colors.main : colors.lightGray};
  cursor: pointer;
  @media (min-width: 900pt) {
    display: flex;
    align-items: center;
    padding-top: 23pt;
  }
  /* pointer-events: ${({ nowRouter }) =>
    nowRouter === '/company/mypage' && 'none'}; */
`;

const WebDotSuccess = styled.div<{ success: boolean }>`
  width: 3pt;
  height: 3pt;
  border-radius: 50%;
  margin: 6pt auto 0 auto;
  transition: all 0.3s ease-in-out;
  background-color: ${({ success }) => (success === true ? '#5221CB' : '')};
  @media (min-width: 900pt) {
    margin: 0 auto;
    margin-left: 10pt;
  }
`;

export default LeftProjectBox;
