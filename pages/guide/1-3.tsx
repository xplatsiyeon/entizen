import BackImg from 'public/images/back-btn.svg';
import Home from 'public/images/home.svg';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import colors from 'styles/colors';
import { useState } from 'react';
import RateInfoTab1 from 'components/guide/RateInfoTab-1';
import RateInfoTab2 from 'components/guide/RateInfoTab-2';

const Guide1_3 = () => {
  const [Tab, setTab] = useState(0);
  const TabType: string[] = ['충전전력요금', '일반사향'];
  const handleTab = (index: number) => setTab(index);

  return (
    <Wrapper>
      <Header>
        <div className="back-img">
          <Image
            style={{
              cursor: 'pointer',
              width: '18pt',
              height: '18pt',
            }}
            src={BackImg}
            alt="btn"
          />
        </div>
        <span className="text">요금정보</span>
        <div className="setting-img">
          <Image
            style={{
              cursor: 'pointer',
              width: '18pt',
              height: '18pt',
            }}
            src={Home}
            alt="home"
          />
        </div>
      </Header>
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
        {Tab === 0 && <RateInfoTab1 />}
        {Tab === 1 && <RateInfoTab2 />}
      </Main>
    </Wrapper>
  );
};

export default Guide1_3;

const Wrapper = styled.div``;
const Header = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36pt;
  padding: 9pt 0;
  padding: 0 15pt;
  .back-img {
    position: absolute;
    left: 7pt;
    padding: 5px;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .setting-img {
    position: absolute;
    right: 7pt;
    padding: 5px;
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
  padding: 27pt 8.25pt 0 8.25pt;
`;
