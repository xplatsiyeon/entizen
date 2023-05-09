import MypageHeader from 'components/mypage/request/header';
import FinishedBottomBox from 'componentsCompany/Mypage/FinishedBottomBox';
import FinishedTopBox from 'componentsCompany/Mypage/FinishedTopBox';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import LeftProjectBox from 'componentsCompany/Mypage/LeftProjectBox';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import WebFooter from 'componentsWeb/WebFooter';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import {
  GET_historyProjectsDetail,
  HistoryProjectsDetail,
  Projects,
  ResponseHistoryProjectsDetail,
} from 'QueryComponents/CompanyQuery';
import { useQuery } from '@apollo/client';
import CommunicationBox from 'components/CommunicationBox';
import { useDispatch } from 'react-redux';
import { redirectAction } from 'store/redirectUrlSlice';
import { headerAction } from 'storeCompany/headerSlice';

type Props = {};

const successedProject = (props: Props) => {
  const router = useRouter();
  const routerId = router?.query?.projectIdx;
  const dispatch = useDispatch();
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);
  const [tabNumber, setTabNumber] = useState<number>(1);
  const [componentId, setComponentId] = useState<number>();
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);
  const [historyDetailData, setHistoryDetailData] = useState<Projects>();

  // -----진행중인 프로젝트 상세 리스트 api-----
  const { loading, error, data } = useQuery<ResponseHistoryProjectsDetail>(
    GET_historyProjectsDetail,
    {
      skip: !accessToken,
      variables: {
        searchKeyword: '',
        sort: 'SUBSCRIBE_END',
      },
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json',
        },
      },
      onCompleted(data) {
        const historyDetatilData = data?.completedProjects?.projects?.filter(
          (e) => e.projectIdx === routerId,
        );
        setHistoryDetailData(historyDetatilData[0]!);
      },
    },
  );

  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  useEffect(() => {
    if (router.query.projectIdx) {
      const num = Number(router.query.projectIdx);
      setComponentId(num);
    }
  }, [router.query.projectIdx]);

  useEffect(() => {
    dispatch(headerAction.setTabIdx(1));
  }, []);

  // url정보기 기억하고 로그인 페이지로 리다이렉트
  if (!accessToken && memberType !== 'COMPANY') {
    dispatch(redirectAction.addUrl(router.asPath));
    router.push('/signin');
  } else {
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
          {nowWidth >= 1200 && (
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
              {/* 상단 세부 내용 */}
              <FinishedTopBox data={historyDetailData!} />
              {/* 하단 세부 내용 */}
              <FinishedBottomBox data={historyDetailData!} />
            </WebBox>
            <CommunicationWrapper>
              {accessToken && (
                <CommunicationBox
                  text={'고객과 소통하기'}
                  id={historyDetailData?.userMember?.memberIdx}
                />
              )}
            </CommunicationWrapper>
          </WebContainer>
        </WebRapper>
        <WebFooter />
      </WebBody>
    );
  }
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
    padding-top: 54pt;
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
  margin-bottom: 30pt;
  padding: 10.5pt 12pt;
  background-color: #f3f4f7;
  border-radius: 21.75pt;

  @media (min-width: 900pt) {
    margin-bottom: 0;
    cursor: pointer;
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
const CommunicationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-top: 75pt; */
  padding-bottom: 90pt;

  @media (max-width: 900pt) {
    padding-top: 3pt;
    padding-bottom: 113.25pt;
  }
`;
