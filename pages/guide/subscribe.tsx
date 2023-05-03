import styled from '@emotion/styled';
import colors from 'styles/colors';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import GuideHeader from 'components/guide/header';
import SubcribeGraph from 'components/guide/subcribeGraph';
import Share from 'components/guide/share';
import Contract from 'components/guide/contract';
import { useRouter } from 'next/router';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import UserRightMenu from 'components/UserRightMenu';
import { useDispatch } from 'react-redux';
import { quotationAction } from 'store/quotationSlice';
import Loader from 'components/Loader';
import { GuideList } from './platform';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import { GuideData } from 'components/guide/infomation';

interface Components {
  [key: number]: JSX.Element;
}

const SubscribeGuide = () => {
  const router = useRouter();
  const [tabNumber, setTabNumber] = useState(0);
  const TabType: string[] = ['구독상품', '수익지분', '계약'];
  const dispatch = useDispatch();

  // 플랫폼 가이드 리스트 조회
  const {
    data: guideList,
    isLoading: guideIsLoading,
    isError: guideIsError,
    refetch: guideRefetch,
  } = useQuery<GuideList>('guide-list', () =>
    isTokenGetApi(`/guide?guideKind=SUBSCRIPTION`),
  );

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
      <SubcribeGraph
        data={
          guideList?.data?.guides?.filter(
            (item) => item?.title === '구독상품',
          )![0]!
        }
        getImg={getImg}
        device={device!}
      />
    ),
    1: (
      <Share
        data={
          guideList?.data?.guides?.filter(
            (item) => item?.title === '수익지분',
          )![0]!
        }
        getImg={getImg}
        device={device!}
      />
    ),
    2: <Contract />,
  };

  const handleTab = (index: number) => setTabNumber(index);

  const handleRouterBack = () => {
    // console.log(router.query.id);
    if (router.query.id) {
      dispatch(quotationAction.setTabNumber(Number(router.query.id)));
    }
    router.back();
  };

  useEffect(() => {
    if (router.query.tab) {
      setTabNumber(Number(router.query.tab));
    }
  }, [router.isReady]);

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
      <WebHeader num={1} now={'guide'} sub={'guide'} />
      <UserRightMenu />
      <Inner>
        <GuideHeader
          title={'구독 가이드'}
          leftOnClick={handleRouterBack}
          rightOnClick={() => router.push('/')}
        />
        <TabContainer>
          {TabType.map((tab, index) => (
            <TabItem
              key={index}
              tab={tabNumber.toString()}
              idx={index.toString()}
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

export default SubscribeGuide;

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
  margin: 24pt auto;
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
  justify-content: flex-start;
  align-items: center;
  position: relative;
  padding-left: 15pt;
  padding-right: 15pt;

  @media (max-width: 899.25pt) {
    border-bottom: 0.75pt solid #e2e5ed;
  }
`;
const TabItem = styled.div<{ tab: string; idx: string }>`
  position: relative;
  cursor: pointer;
  text-align: center;
  padding: 9pt 15pt;
  margin-right: 12pt;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  border-radius: 21.75pt;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: ${({ idx, tab }) => (idx === tab ? '700' : '500')};
  color: ${({ idx, tab }) => (idx === tab ? colors.white : colors.gray6)};
  background: ${({ idx, tab }) => (idx === tab ? colors.main1 : colors.gray3)};
  @media (max-width: 899.25pt) {
    width: 100%;
    padding: 12pt 0;
    color: ${({ tab, idx }) => (tab === idx ? colors.main : '#CACCD1')};
    background: none;
    border-radius: 0;
    margin-right: 0;
  }
`;
const Line = styled.div<{ tab: string; index: string }>`
  @media (max-width: 899.25pt) {
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    border-radius: 3pt;
    border-bottom: ${({ tab, index }) =>
      tab === index && `3pt solid ${colors.main}`};
  }
`;
const Main = styled.div`
  padding-top: 27pt;
  padding: 27pt 15pt 0 15pt;
`;
