import styled from '@emotion/styled';
import BottomNavigation from 'components/BottomNavigation';
import colors from 'styles/colors';
import Nut from 'public/images/Nut.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AsHistory from 'componentsCompany/AS/asHistory';
import NewAs from 'componentsCompany/AS/newAs';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import LeftASBox from 'componentsCompany/AS/LeftASBox';

type Props = { num?: number; now?: string };
interface Components {
  [key: number]: JSX.Element;
}

const ComAsIndex = ({ num, now }: Props) => {
  // forK테스트 주석
  const route = useRouter();
  const TabType: string[] = ['신규 A/S', '히스토리'];
  const [tabNumber, setTabNumber] = useState<number>(0);

  // 내 프로젝트에서 진행 프로젝트랑 완료 프로젝트 뭐 눌렀는지 받아오는 state
  const [componentId, setComponentId] = useState<number | undefined>();

  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);

  const router = useRouter();

  // url에서 id 가져와서 tabNumber에 업데이트 해서 컴포넌트 바꿔줌
  useEffect(() => {
    if (router.query.id) {
      const num = Number(router.query.id);
      setTabNumber(num);
    } else if (router.pathname === `/company/as`) {
      setTabNumber(0);
    }
  }, [router]);

  useEffect(() => {
    if (route.query.id !== undefined) {
      setTabNumber(Number(route.query.id));
    } /*else if( !(route.query.id) && (route.pathname === '/mypage')){ 
          setTabNumber(0)
        }*/
  }, [route.query.id]);

  // const components = [<NewAs />, <AsHistory />];

  const components: Components = {
    0: <NewAs />,
    1: <AsHistory />,
  };

  return (
    <WebBody>
      <WebBuyerHeader
        setTabNumber={setTabNumber}
        tabNumber={tabNumber}
        componentId={componentId}
        num={num}
        now={now}
        openSubLink={openSubLink}
        setOpenSubLink={setOpenSubLink}
      />
      <Container>
        <WebRapper>
          <LeftASBox
            setTabNumber={setTabNumber}
            tabNumber={tabNumber}
            componentId={componentId}
            setComponentId={setComponentId}
          />
          <div>{components[tabNumber]}</div>
        </WebRapper>
      </Container>
      <WebFooter />
    </WebBody>
  );
};

export default ComAsIndex;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  @media (max-height: 350pt) {
    height: 100%;
    display: block;
  }
`;

const Container = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    width: 900pt;
    display: flex;
    justify-content: space-between;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 900pt;
  margin: 60pt auto;
  display: flex;
  gap: 60pt;

  flex-direction: row;

  @media (max-width: 899pt) {
    padding-bottom: 66pt;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    gap: 0;
    margin: 0;
  }
`;

const FlexBox = styled.div`
  border: 1px solid #e2e5ed;
  border-radius: 12pt;
  max-height: 423pt;
  width: 216pt;
  padding: 42pt 28.5pt;

  @media (max-width: 899pt) {
    border: none;
    width: auto;
    padding: 0;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 21pt 15pt 0 15pt;
  & h1 {
    font-weight: 700;
    font-size: 21pt;
    line-height: 27pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  & h2 {
    font-weight: 500;
    font-size: 21pt;
    line-height: 27pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .img {
    /* 이미지 주변 클릭 범위 5px정도 늘려줌 */
    width: 22.5pt;
    height: 22.5pt;
    text-align: end;
    cursor: pointer;
  }
`;
const Body = styled.div`
  padding-top: 15pt;
  .profile-icon {
    margin-left: 15pt;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main};
    border: 0.75pt solid ${colors.main};
    border-radius: 12pt;
    padding: 6pt 9pt;
    cursor: pointer;
  }
`;
const Line = styled.div`
  margin-top: 30pt;
  width: 100%;
  border-bottom: 3pt solid ${colors.gray3};
`;

const TabContainer = styled.div`
  display: flex;
  gap: 15pt;
  padding-left: 15pt;
  margin-bottom: 21pt;
  flex-direction: column;
  @media (max-width: 899pt) {
    flex-direction: row;
  }
`;
const TabItem = styled.span<{ tab: string; index: string }>`
  padding-top: 21pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${({ tab, index }) =>
    tab === index ? colors.main : colors.lightGray};
  @media (min-width: 900pt) {
    display: flex;
    align-items: center;
    padding-top: 23pt;
  }
`;

const Dot = styled.div<{ tab: string; index: string }>`
  width: 3pt;
  height: 3pt;
  border-radius: 50%;
  margin: 6pt auto 0 auto;
  background-color: ${({ tab, index }) => tab === index && `${colors.main}`};
  @media (min-width: 900pt) {
    margin: 0 auto;
    margin-left: 20pt;
  }
`;

const ContentWrap = styled.div`
  flex: 1;
  display: flex;
`;
