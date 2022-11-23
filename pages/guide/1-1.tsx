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
import { useRouter } from 'next/router';
import Guide from 'public/guide/guide1.png';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';

interface Components {
  [key: number]: JSX.Element;
}

const Guide1_1 = () => {
  const router = useRouter();
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
    <>
      <WebHeader num={0} now={'guide'} />
      <Wrapper>
        {/* 링크 리스트 */}
        <GuideHeader
          title={'플랫폼 가이드'}
          leftOnClick={() => router.back()}
          rightOnClick={() => router.push('/')}
        />
        <PlatformImgBox>
          <Image src={Platform} alt="platform" />
        </PlatformImgBox>
        <GuideImgBox>
          <Image src={Guide} alt="guide" />
        </GuideImgBox>
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
      <WebFooter />
    </>
  );
};

export default Guide1_1;

const Wrapper = styled.div`
  padding-bottom: 48pt;

  @media (max-width: 899.25pt) {
    padding-bottom: 20pt;
  }
`;
const PlatformImgBox = styled(Box)`
  display: none;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 899.25pt) {
    margin: 12pt 15pt 0 15pt;
    display: flex;
  }
`;
const GuideImgBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 899.25pt) {
    margin: 12pt 15pt 0 15pt;
    display: none;
  }
`;
const ModalBox = styled(Box)`
  padding-top: 60pt;
  overflow-x: scroll;
`;
const TabBox = styled.div`
  display: flex;
  justify-content: center;
  width: 105%;
  padding-bottom: 12pt;
  border-bottom: 1px solid #f3f4f7;

  @media (max-width: 899.25pt) {
    padding-left: 15pt;
    justify-content: start;
  }
`;
const Item = styled.div<{ idx: string; num: string }>`
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  text-align: center;
  letter-spacing: -0.02em;
  padding: 0 30pt;
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

  @media (max-width: 899.25pt) {
    padding: 0 11.25pt;
  }
`;
