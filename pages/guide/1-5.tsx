import styled from '@emotion/styled';
import colors from 'styles/colors';
import { useState } from 'react';
import GuideHeader from 'components/guide/header';
import MediumSpeedGraph from 'components/guide/mediumSpeedGraph';
import ExpressSpeedGraph from 'components/guide/expressSpeedGraph';
import Common from 'components/guide/common';

const Guide1_5 = () => {
  const [Tab, setTab] = useState(0);
  const TabType: string[] = ['완속/중속', '급속/초급속', '공통사항'];
  const handleTab = (index: number) => setTab(index);

  return (
    <Wrapper>
      <GuideHeader />
      <TabContainer>
        {TabType.map((tab, index) => (
          <TabItem
            key={index}
            tab={Tab.toString()}
            index={index.toString()}
            onClick={() => handleTab(index)}
          >
            {tab}
            <Line tab={Tab.toString()} index={index.toString()}></Line>
          </TabItem>
        ))}
      </TabContainer>
      <Main>
        {Tab === 0 && <MediumSpeedGraph />}
        {Tab === 1 && <ExpressSpeedGraph />}
        {Tab === 2 && <Common />}
      </Main>
    </Wrapper>
  );
};

export default Guide1_5;

const Wrapper = styled.div``;
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
