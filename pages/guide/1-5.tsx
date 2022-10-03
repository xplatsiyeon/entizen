import styled from '@emotion/styled';
import colors from 'styles/colors';
import { useState } from 'react';
import GuideHeader from 'components/guide/header';
import MediumSpeedGraph from 'components/guide/mediumSpeedGraph';
import ExpressSpeedGraph from 'components/guide/expressSpeedGraph';
import Common from 'components/guide/common';
import { useRouter } from 'next/router';
import WebFooter from 'web-components/WebFooter';
import WebHeader from 'web-components/WebHeader';

interface Components {
  [key: number]: JSX.Element;
}

const Guide1_5 = () => {
  const router = useRouter();
  const [tabNumber, setTabNumber] = useState(0);
  const TabType: string[] = ['완속/중속', '급속/초급속', '공통사항'];
  const components: Components = {
    0: <MediumSpeedGraph />,
    1: <ExpressSpeedGraph />,
    2: <Common />,
  };
  const handleTab = (index: number) => setTabNumber(index);

  return (
    <Body>
      <WebHeader num={2} now={'guide'} />
      <Inner>
        <GuideHeader
          title="요금정보"
          leftOnClick={() => router.back()}
          rightOnClick={() => router.push('/')}
        />
        <TabContainer>
          {TabType.map((tab, index) => (
            <TabItem
              key={index}
              tab={tabNumber.toString()}
              index={index.toString()}
              onClick={() => handleTab(index)}
            >
              {tab}
              <Line tab={tabNumber.toString()} index={index.toString()}></Line>
            </TabItem>
          ))}
        </TabContainer>
        {/* 메인 */}
        <Main>{components[tabNumber]}</Main>
      </Inner>
      <WebFooter />
    </Body>
  );
};

export default Guide1_5;

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
  width: 645pt;
  margin: 45.75pt auto 0;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0;
    margin: 0;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-left: 15pt;
  padding-right: 15pt;
  border-bottom: 0.75pt solid #f3f4f7;
`;
const TabItem = styled.div<{ tab: string; index: string }>`
  text-align: center;
  width: 100%;
  padding: 12pt 0;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  position: relative;
  color: ${({ tab, index }) =>
    tab === index ? colors.main : colors.lightGray};
`;
const Line = styled.div<{ tab: string; index: string }>`
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  border-radius: 3pt;
  border-bottom: ${({ tab, index }) =>
    tab === index && `3pt solid ${colors.main}`};
`;
const Main = styled.div`
  padding: 0 15pt;
`;
