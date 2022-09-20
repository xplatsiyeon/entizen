import styled from '@emotion/styled';
import colors from 'styles/colors';
import { useState } from 'react';
import GuideHeader from 'components/guide/header';
import SubcribeGraph from 'components/guide/subcribeGraph';
import Share from 'components/guide/share';
import Contract from 'components/guide/contract';

interface Components {
  [key: number]: JSX.Element;
}

const Guide1_4 = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const TabType: string[] = ['구독상품', '수익지분', '계약'];
  const components: Components = {
    0: <SubcribeGraph />,
    1: <Share />,
    2: <Contract />,
  };

  const handleTab = (index: number) => setTabNumber(index);

  return (
    <Wrapper>
      <GuideHeader title={'요금정보'} />
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
    </Wrapper>
  );
};

export default Guide1_4;

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
  padding-top: 27pt;
  padding: 27pt 15pt 0 15pt;
`;
