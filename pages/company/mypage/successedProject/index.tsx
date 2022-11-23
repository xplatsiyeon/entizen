import MypageHeader from 'components/mypage/request/header';
import FinishedBottomBox from 'componentsCompany/Mypage/FinishedBottomBox';
import FinishedTopBox from 'componentsCompany/Mypage/FinishedTopBox';
import React, { useEffect, useState } from 'react';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import LeftProjectBox from 'componentsCompany/Mypage/LeftProjectBox';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import WebFooter from 'componentsWeb/WebFooter';
import Image from 'next/image';
import ChatsIcon from 'public/mypage/myProjectChats.png';
import arrowRGr from 'public/mypage/ChatsArrow.png';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';

type Props = {};

const successedProject = (props: Props) => {
  const [tabNumber, setTabNumber] = useState<number>(1);
  const [componentId, setComponentId] = useState<number>();
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);

  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);

  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  const router = useRouter();

  useEffect(() => {
    if (router.query.projectIdx) {
      const num = Number(router.query.projectIdx);
      setComponentId(num);
    }
  }, [router.query.projectIdx]);

  return (
    <WebBody>
      <WebBuyerHeader
        setOpenSubLink={setOpenSubLink}
        setTabNumber={setTabNumber}
        tabNumber={tabNumber}
        componentId={componentId}
        openSubLink={openSubLink}
      />
      <CompanyRightMenu />
      <WebRapper>
        {nowWidth > 1198.7 && (
          <LeftProjectBox
            setTabNumber={setTabNumber}
            tabNumber={tabNumber}
            componentId={componentId}
            setComponentId={setComponentId}
          />
        )}
        <WebContainer>
          <WebBox>
            <MypageHeader back={true} title={'완료 프로젝트'} />
            <FinishedTopBox />
            <FinishedBottomBox />
          </WebBox>
          <CommunityBtnBox>
            <WebImageBox width={15} height={15}>
              <Image src={ChatsIcon} alt="doubleArrow" layout="fill" />
            </WebImageBox>
            <WebTitle>고객과 소통하기</WebTitle>
            <WebImageBox width={3.75} height={7.5}>
              <Image src={arrowRGr} alt="doubleArrow" layout="fill" />
            </WebImageBox>
          </CommunityBtnBox>
        </WebContainer>
      </WebRapper>
      <WebFooter />
    </WebBody>
  );
};

export default successedProject;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  @media (max-height: 500pt) {
    height: 100%;
    display: block;
  }
`;

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    margin: 0 auto;
    padding: 54pt 0;
    width: 900pt;
    display: flex;
    justify-content: space-between;
  }
`;

const WebBox = styled.div`
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
    width: 580.5pt;
  }
`;

const CommunityBtnBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 135.75pt;
  //height: 33pt;
  margin-bottom: 30pt;
  padding: 10.5pt 12pt;
  background-color: #f3f4f7;
  border-radius: 21.75pt;
  @media (min-width: 900pt) {
    margin-bottom: 0;
  }
`;

const WebTitle = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 500;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

const WebImageBox = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}pt;
  height: ${(props) => props.height}pt;
  position: relative;
  margin: 0 auto;
`;

const WebContainer = styled.div`
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
  }
`;
