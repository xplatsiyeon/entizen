import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AsHistory from 'componentsCompany/AS/asHistory';
import NewAs from 'componentsCompany/AS/newAs';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import LeftASBox from 'componentsCompany/AS/LeftASBox';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';

type Props = { num?: number; now?: string };
interface Components {
  [key: number]: JSX.Element;
}

const ComAsIndex = ({ num, now }: Props) => {
  // forK테스트 주석
  const router = useRouter();
  const [tabNumber, setTabNumber] = useState<number>(0);
  // 내 프로젝트에서 진행 프로젝트랑 완료 프로젝트 뭐 눌렀는지 받아오는 state
  const [componentId, setComponentId] = useState<number | undefined>();
  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);

  useEffect(() => {
    if (router.query.id !== undefined) {
      setTabNumber(Number(router.query.id));
    }
  }, [router.query.id]);

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
        <CompanyRightMenu />
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
  @media (max-width: 899.25pt) {
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

  @media (min-width: 900pt) {
    padding: 0;
    margin-top: 54pt;
  }
`;

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    width: 900pt;
    display: flex;
    justify-content: space-between;
  }
`;
