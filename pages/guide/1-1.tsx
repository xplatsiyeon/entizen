import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import Platform from 'public/guide/platform_guide.png';
import { useState } from 'react';
import Infom from 'components/guide/infomation';
import Compare from 'components/guide/compare';
import Monitoring from 'components/guide/monitoring';
import ManageMent from 'components/guide/management';
import GuideHeader from 'components/guide/header';

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
      <GuideHeader title={'알림함'} />
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
