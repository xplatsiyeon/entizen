import styled from '@emotion/styled';
import colors from 'styles/colors';
import { useEffect, useState } from 'react';
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

interface Components {
  [key: number]: JSX.Element;
}

const Guide1_4 = () => {
  const router = useRouter();
  const [tabNumber, setTabNumber] = useState(0);
  const TabType: string[] = ['구독상품', '수익지분', '계약'];
  const dispatch = useDispatch();

  const components: Components = {
    0: <SubcribeGraph />,
    1: <Share />,
    2: <Contract />,
  };

  const handleTab = (index: number) => setTabNumber(index);

  const handleRouterBack = () => {
    console.log(router.query.id);
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

  return (
    <Body>
      <WebHeader num={1} now={'guide'} sub={'guide'}/>
      <UserRightMenu />
      <Inner>
        <Wrapper>
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
                index={index.toString()}
                onClick={() => handleTab(index)}
              >
                {tab}
                <Line
                  tab={tabNumber.toString()}
                  index={index.toString()}
                ></Line>
              </TabItem>
            ))}
          </TabContainer>
          {/* 메인 */}
          <Main>{components[tabNumber]}</Main>
        </Wrapper>
      </Inner>
      <WebFooter />
    </Body>
  );
};

export default Guide1_4;

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
  height: 100%; //
  margin: 100pt auto; //

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0;
    margin: 0;
  }
`;

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
  cursor: pointer;
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
