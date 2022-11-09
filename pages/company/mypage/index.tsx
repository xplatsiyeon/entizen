import styled from '@emotion/styled';
import ProjectInProgress from 'componentsCompany/Mypage/ProjectInProgress';
import Image from 'next/image';
import React, { useState } from 'react';
import Nut from 'public/images/Nut.svg';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import BottomNavigation from 'components/BottomNavigation';
import FinishedProjects from 'componentsCompany/Mypage/FinishedProjects';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';

type Props = {};
interface Components {
  [key: number]: JSX.Element;
}

const Mypage = (props: Props) => {
  const route = useRouter();
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [userName, setUserName] = useState<string>('윤세아');
  const TabType: string[] = ['진행 프로젝트', '완료 프로젝트'];

  const components: Components = {
    0: <ProjectInProgress tabNumber={tabNumber} />,
    1: <FinishedProjects tabNumber={tabNumber} />,
  };

  return (
    <>
      <WebBuyerHeader setTabNumber={setTabNumber} tabNumber={tabNumber} />
      <WebRapper>
        <Wrapper>
          <Header>
            <span>
              <h1>{`${userName}님,`}</h1>
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
                  tab={tabNumber.toString()}
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
                  tab={tabNumber.toString()}
                  index={index.toString()}
                >
                  {tab}
                  <Dot tab={tabNumber.toString()} index={index.toString()} />
                </TabItem>
              ))}
            </WebTabContainer>
          </Body>
          <BottomNavigation />
        </Wrapper>
        {/* 탭 */}
        {components[tabNumber]}
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
// const TabContainer = styled.div`
//   display: flex;
//   gap: 15pt;
//   padding-left: 15pt;
//   @media (min-width: 899pt) {
//     // 899이하면 하단 모바일
//     justify-content: center;
//     flex-direction: column;
//     padding-left: 27pt;
//     gap: 1pt;
//   }
// `;
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

export default Mypage;
