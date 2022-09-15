import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import BackImg from 'public/images/back-btn.svg';
import Home from 'public/images/home.svg';
import Platform from 'public/guide/platform_guide.png';
import { useState } from 'react';
import InfoImg from 'public/images/Information.png';
import Infom from 'components/guide/infomation';
import Compare from 'components/guide/compare';
import Monitoring from 'components/guide/monitoring';
import ManageMent from 'components/guide/management';

interface Components {
  [key: number]: JSX.Element;
}

const Guide1_1 = () => {
  const [tabNumber, setTabNumber] = useState<number>(0);
  const TabType = ['정보확인', '비교/선택', '설치 모니터링', '운영/관리'];
  const components: Components = {
    0: <Infom />,
    1: <Compare />,
    2: <Monitoring />,
    3: <ManageMent />,
  };

  const tabHandler = (index: number) => setTabNumber(index);

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
        <span className="text">알림함</span>
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
      <PlatformImgBox>
        <Image src={Platform} alt="platform" />
      </PlatformImgBox>
      <ModalBox>
        <TabBox>
          {TabType.map((tab, index) => (
            <Item
              idx={index.toString()}
              num={tabNumber.toString()}
              key={tab}
              onClick={() => tabHandler(index)}
            >
              {tab}
              <div className="line" />
            </Item>
          ))}
        </TabBox>
      </ModalBox>
      {components[tabNumber]}
    </Wrapper>
  );
};

export default Guide1_1;

const Wrapper = styled.div`
  padding-bottom: 20pt;
`;
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
const PlatformImgBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12pt 15pt 0 15pt;
  position: relative;
  padding-top: 15.75pt;
`;
const ModalBox = styled(Box)`
  padding-top: 60pt;

  overflow-x: scroll;
`;
const TabBox = styled.div`
  display: flex;
  width: 105%;
  padding-left: 15pt;
  padding-bottom: 12pt;
  border-bottom: 1px solid #f3f4f7;
`;

const Item = styled.div<{ idx: string; num: string }>`
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  text-align: center;
  letter-spacing: -0.02em;
  padding: 0 11.25pt;
  color: ${({ idx, num }) => (idx === num ? colors.main : '#caccd1')};
  position: relative;
  .line {
    position: absolute;
    left: 0;
    bottom: -12pt;
    width: 100%;
    border-bottom: ${({ idx, num }) =>
      idx === num && `  4px solid ${colors.main};`};
    border-radius: 10pt;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 27pt 15pt 0 15pt;
`;
const TextBox = styled(Box)`
  margin-top: 24pt;
  padding: 0 10px;
  .text-item {
    padding-bottom: 15pt;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 16.5pt;
    letter-spacing: -0.02em;
  }
  .accent {
    color: ${colors.main};
  }
`;
