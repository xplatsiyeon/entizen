import styled from '@emotion/styled';
import colors from 'styles/colors';
import { useState } from 'react';
import RateInfoTab1 from 'components/guide/RateInfoTab-1';
import RateInfoTab2 from 'components/guide/RateInfoTab-2';
import GuideHeader from 'components/guide/Header';
interface Components {
  [key: number]: JSX.Element;
}
const Guide1_3 = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const TabType: string[] = ['충전전력요금', '일반사향'];
  const components: Components = {
    0: <RateInfoTab1 />,
    1: <RateInfoTab2 />,
  };
  const handleTab = (index: number) => setTabNumber(index);

  return (
    <>
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
    </>
  );
};

export default Guide1_3;

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
  padding: 27pt 8.25pt 0 8.25pt;
`;
