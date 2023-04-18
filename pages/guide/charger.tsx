import styled from '@emotion/styled';
import colors from 'styles/colors';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import GuideHeader from 'components/guide/header';
import MediumSpeedGraph from 'components/guide/mediumSpeedGraph';
import ExpressSpeedGraph from 'components/guide/expressSpeedGraph';
import Common from 'components/guide/common';
import { useRouter } from 'next/router';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import UserRightMenu from 'components/UserRightMenu';
import { useDispatch } from 'react-redux';
import { quotationAction } from 'store/quotationSlice';
import { GuideList } from './platform';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import { GuideData } from 'components/guide/infomation';

interface Components {
  [key: number]: JSX.Element;
}

const TabType: string[] = ['완속/중속', '급속/초급속', '공통사항'];
const ChargerGuide = () => {
  // 플랫폼 가이드 리스트 조회
  const {
    data: guideList,
    isLoading: guideIsLoading,
    isError: guideIsError,
    refetch: guideRefetch,
  } = useQuery<GuideList>('guide-list', () =>
    isTokenGetApi(`/guide?guideKind=CHARGER`),
  );

  const router = useRouter();
  const dispatch = useDispatch();
  const [tabNum, setTabNum] = useState(0);

  const [device, setDevice] = useState<'pc' | 'tablet' | 'mobile'>();

  const pc = useMediaQuery({
    query: '(min-width:768pt)',
  });
  const tablet = useMediaQuery({
    query: '(min-width:576pt)',
  });
  const mobile = useMediaQuery({
    query: '(min-width:270pt)',
  });

  // 이미지 값 찾기
  const getImg = (
    data: GuideData,
    setImgUrl: Dispatch<SetStateAction<string>>,
  ) => {
    if (data && data.guideImages) {
      const pcImg = data.guideImages.find((e) => e.imageSizeType === 'PC');
      const tabletImg = data.guideImages.find(
        (e) => e.imageSizeType === 'TABLET',
      );
      const mobileImg = data.guideImages.find(
        (e) => e.imageSizeType === 'MOBILE',
      );
      if (device === 'pc') {
        if (pcImg) {
          setImgUrl(pcImg?.url);
        }
      } else if (device === 'tablet') {
        if (tabletImg) {
          setImgUrl(tabletImg?.url);
        }
      } else if (device === 'mobile') {
        if (mobileImg) {
          setImgUrl(mobileImg?.url);
        }
      }
    }
  };

  const components: Components = {
    0: (
      <MediumSpeedGraph
        data={
          guideList?.data?.guides?.filter(
            (item) => item?.title === '완속/중속',
          )![0]!
        }
        getImg={getImg}
        device={device!}
      />
    ),
    1: (
      <ExpressSpeedGraph
        data={
          guideList?.data?.guides?.filter(
            (item) => item?.title === '급속/초급속',
          )![0]!
        }
        getImg={getImg}
        device={device!}
      />
    ),
    2: (
      <Common
        data={
          guideList?.data?.guides?.filter(
            (item) => item?.title === '공통사항',
          )![0]!
        }
        getImg={getImg}
        device={device!}
      />
    ),
  };
  const handleTab = (index: number) => setTabNum(index);

  const handleRouterBack = () => {
    if (router.query.id) {
      dispatch(quotationAction.setTabNumber(Number(router.query.id)));
    }
    router.back();
  };

  useEffect(() => {
    if (pc) {
      setDevice('pc');
    } else if (tablet) {
      setDevice('tablet');
    } else if (mobile) {
      setDevice('mobile');
    }
  }, [pc, tablet, mobile]);

  return (
    <Body>
      <WebHeader num={2} now={'guide'} sub={'guide'} />
      <UserRightMenu />
      <Inner>
        <GuideHeader
          title="충전기 가이드"
          leftOnClick={handleRouterBack}
          rightOnClick={() => router.push('/')}
        />
        <TabContainer>
          {TabType.map((tab, index) => (
            <TabItem
              key={index}
              tab={tabNum.toString()}
              index={index.toString()}
              onClick={() => handleTab(index)}
            >
              {tab}
              <Line tab={tabNum.toString()} index={index.toString()}></Line>
            </TabItem>
          ))}
        </TabContainer>
        {/* 메인 */}
        <Main>{components[tabNum]}</Main>
      </Inner>
      <WebFooter />
    </Body>
  );
};

export default ChargerGuide;

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
  height: 100%;
  margin: 100pt auto;

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
  padding: 0 15pt;
`;
