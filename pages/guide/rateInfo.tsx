import styled from '@emotion/styled';
import colors from 'styles/colors';
import { useState } from 'react';
import RateInfoTab1 from 'components/guide/RateInfoTab-1';
import RateInfoTab2 from 'components/guide/RateInfoTab-2';
import GuideHeader from 'components/guide/header';
import { useRouter } from 'next/router';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import UserRightMenu from 'components/UserRightMenu';
import { GuideList } from './platform';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';

interface Components {
  [key: number]: JSX.Element;
}
const RateInfoGuide = () => {
  // 플랫폼 가이드 리스트 조회
  const {
    data: guideList,
    isLoading: guideIsLoading,
    isError: guideIsError,
    refetch: guideRefetch,
  } = useQuery<GuideList>('guide-list', () =>
    isTokenGetApi(`/guide?guideKind=FEE`),
  );
  const router = useRouter();
  const [tabNumber, setTabNumber] = useState(0);
  const TabType: string[] = ['충전전력요금', '일반사항'];
  const components: Components = {
    0: (
      <RateInfoTab1
        data={
          guideList?.data?.guides?.filter(
            (item) => item?.title === '충전전력요금',
          )!
        }
      />
    ),
    1: (
      <RateInfoTab2
        data={
          guideList?.data?.guides?.filter((item) => item?.title === '일반사항')!
        }
      />
    ),
  };
  const handleTab = (index: number) => setTabNumber(index);

  return (
    <Body>
      <WebHeader num={4} now={'guide'} sub={'guide'} />
      <UserRightMenu />
      <Inner>
        <GuideHeader
          title={'요금정보'}
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

export default RateInfoGuide;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
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
  margin: 100pt auto; //

  @media (max-width: 899.25pt) {
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
  font-weight: ${({ tab, index }) => (tab === index ? '700' : '500')};
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  position: relative;
  cursor: pointer;
  color: ${({ tab, index }) => (tab === index ? colors.main : '#CACCD1')};
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
