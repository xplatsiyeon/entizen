import styled from '@emotion/styled';
import ProjectInProgress from 'componentsCompany/Mypage/ProjectInProgress';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FinishedProjects from 'componentsCompany/Mypage/FinishedProjects';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import LeftProjectBox from 'componentsCompany/Mypage/LeftProjectBox';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';

type Props = { num?: number; now?: string };
interface Components {
  [key: number]: JSX.Element;
}

const Mypage = ({ num, now }: Props) => {
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);

  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);

  // 내 프로젝트에서 진행 프로젝트랑 완료 프로젝트 뭐 눌렀는지 받아오는 state
  const [componentId, setComponentId] = useState<number | undefined>();

  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  const router = useRouter();

  // url에서 id 가져와서 tabNumber에 업데이트 해서 컴포넌트 바꿔줌
  useEffect(() => {
    if (router.query.id) {
      const num = Number(router.query.id);
      setTabNumber(num);
    } else if (router.pathname === `/company/mypage`) {
      setTabNumber(0);
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  const components: Components = {
    0: (
      <ProjectInProgress
        tabNumber={tabNumber}
        setComponentId={setComponentId}
        componentId={componentId}
      />
    ),
    1: (
      <FinishedProjects
        tabNumber={tabNumber}
        setComponentId={setComponentId}
        componentId={componentId}
      />
    ),
  };

  return (
    <>
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
            <LeftProjectBox
              setTabNumber={setTabNumber}
              tabNumber={tabNumber}
              componentId={componentId}
              setComponentId={setComponentId}
            />
            <div className="flexBox">{components[tabNumber]}</div>
          </WebRapper>
        </Container>
        <WebFooter />
      </WebBody>
    </>
  );
};

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
    margin-top: 54pt;
    padding-top: 0;
  }
`;

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    width: 900pt;
    display: flex;
    justify-content: space-between;
    gap: 60pt;
    .flexBox {
      flex: auto;
    }
  }
`;

export default Mypage;
