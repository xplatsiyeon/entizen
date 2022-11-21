import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Nut from 'public/images/Nut.svg';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import BottomNavigation from 'components/BottomNavigation';
import useProfile from 'hooks/useProfile';
import { useQuery } from '@apollo/client';
import { GET_InProgressProjects, Response } from 'QueryComponents/CompanyQuery';

type Props = {
  num?: number;
  now?: string;
  setComponentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  componentId?: number;
  setSuccessComponentId?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  successComponentId?: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  tabNumber: number;
};
interface Components {
  [key: number]: JSX.Element;
}
const LeftASBox = ({
  componentId,
  setComponentId,
  tabNumber,
  setTabNumber,
  setSuccessComponentId,
  successComponentId,
}: Props) => {
  const route = useRouter();
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  const TabType: string[] = ['신규 A/S', '히스토리'];
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const { profile, isLoading, invalidate } = useProfile(accessToken);
  const { loading, error, data } = useQuery<Response>(GET_InProgressProjects, {
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

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  // 나중에 AS 밑에 오는 부분
  // const webComponents: Components = {
  //   0: (
  //     <WebProjectInProgressUnder
  //       tabNumber={tabNumber}
  //       setComponentId={setComponentId}
  //       componentId={componentId}
  //       data={data!}
  //     />
  //   ),
  //   1: (
  //     <WebFinishedProjectsUnder
  //       tabNumber={tabNumber}
  //       setSuccessComponentId={setSuccessComponentId}
  //       successComponentId={successComponentId}
  //     />
  //   ),
  // };

  // if (tempProceeding.length === 0) {
  //   return <NoProject />;
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
            onClick={() => route.push('profile/editing')}
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
            {TabType.map((tab, index) => (
              <TabItem
                key={index}
                tab={tabNumber?.toString()!}
                index={index.toString()}
                onClick={() => {
                  if (nowWidth < 1198.7) {
                    setTabNumber(index);
                  }
                }}
              >
                {tab}
                <Dot tab={tabNumber.toString()} index={index.toString()} />
              </TabItem>
            ))}
          </WebTabContainer>
        </Body>
        <BottomNavigation />
        {/* <div> {webComponents[tabNumber]}</div> */}
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
  @media (min-width: 900pt) {
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
  @media (max-width: 899pt) {
    display: none;
  }
`;

const RightProgress = styled.div`
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
  }
`;

export default LeftASBox;
