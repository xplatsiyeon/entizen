import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import LeftProjectBox from 'componentsCompany/Mypage/LeftProjectBox';
import TopBox from 'componentsCompany/Mypage/TopBox';
import UnderBox from 'componentsCompany/Mypage/UnderBox';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import { useRouter } from 'next/router';
import {
  GET_InProgressProjectsDetail,
  InProgressProjectsDetailResponse,
} from 'QueryComponents/CompanyQuery';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { redirectAction } from 'store/redirectUrlSlice';
import Progress from '../projectProgress';
import { contractAction } from 'storeCompany/contract';
import { useQueryClient } from 'react-query';

type Props = {};
export interface Data {
  id: number;
  state: number;
  badge: string;
  storeName: string;
  date: string;
  contract: boolean;
  planed: string[]; // 인덱스[0]: 준비 목표일, [1]: 설치 목표일, [2]: 검수 목표일, [3]: 완료 목표일
  address: string;
}

const RunningProgress = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);
  const [open, setOpen] = useState<boolean>(false);
  // 계약서 유무
  // const [openContract, setOpenContract] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [componentId, setComponentId] = useState<number>();
  const [headerTab, setHeaderTab] = useState<number>(3);

  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);

  const [data, setData] = useState<Data>({
    id: -1,
    state: -1,
    badge: '',
    storeName: '',
    date: '',
    contract: false,
    planed: [],
    address: '',
  });
  // -----진행중인 프로젝트 상세 리스트 api-----
  const {
    loading: inProgressLoading,
    error,
    data: inProgressData,
    refetch: inProgressRefetch,
  } = useQuery<InProgressProjectsDetailResponse>(GET_InProgressProjectsDetail, {
    skip: !accessToken ? true : false,
    variables: {
      projectIdx: router?.query?.projectIdx!,
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  useEffect(() => {
    if (router.query.projectIdx) {
      const num = Number(router?.query?.projectIdx);
      setComponentId(num);
      // setData(tempProceeding[num]);
      setHeaderTab(3);
    }
  }, [router.query.projectIdx]);

  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  // console.log('🔥 진행중인 데이터 확인 -82' + TAG);
  // console.log(inProgressData);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  // 계약서 추가 내용 리셋 시키기
  useEffect(() => {
    dispatch(contractAction.reset());
    queryClient.removeQueries('addContracts');
  }, []);

  useEffect(() => {
    if (inProgressData?.project.isApprovedByAdmin === true) {
      router.replace(
        `/company/mypage/successedProject?projectIdx=${inProgressData?.project.projectIdx}`,
      );
    }
  }, [inProgressData]);

  if (!accessToken && memberType !== 'COMPANY') {
    dispatch(redirectAction.addUrl(router.asPath));
    router.push('/signin');
  } else {
    return (
      <>
        <WebBody>
          <WebBuyerHeader
            setTabNumber={setTabNumber}
            tabNumber={tabNumber}
            componentId={componentId}
            openSubLink={openSubLink}
            setOpenSubLink={setOpenSubLink}
          />
          <Container>
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
              <MypageHeader back={true} title={'진행 프로젝트'} />
              <WebBox className="content">
                <TopBox
                  open={open}
                  setOpen={setOpen}
                  handleClick={handleClick}
                  data={inProgressData!}
                  type={'COMPANY'}
                />
                {/* 계약서 발송 버튼 클릭 시 프로그레스 컴포넌트로 변경 */}
                {/* 프로젝트 진행 */}
                {inProgressData &&
                inProgressData?.project?.contract?.documentId?.length! > 0 ? (
                  <Progress
                    data={inProgressData!}
                    inProgressRefetch={inProgressRefetch}
                    info={data}
                    setData={setData}
                  />
                ) : (
                  //  프로젝트 진행없을 때
                  <UnderBox
                    id={inProgressData?.project?.userMember?.memberIdx!}
                  />
                )}
              </WebBox>
            </WebRapper>
          </Container>
          <WebFooter />
        </WebBody>
      </>
    );
  }
};

export default RunningProgress;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  @media (max-height: 500pt) {
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
  background: white;

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
  @media (max-height: 400pt) {
    height: 100%;
    background: white;
  }
  @media (min-width: 900pt) {
    margin: 0 auto;
    padding-top: 54pt;
  }
`;

const WebRapper = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 30pt;
  display: flex;
  flex-direction: column;

  @media (min-width: 900pt) {
    margin: 0 auto;
    width: 900pt;
    padding-bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 60pt;
  }

  @media (max-height: 400pt) {
    height: 100vh;
    background: white;
  }
`;

const WebBox = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;

  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
    width: 580.5pt;
  }
`;
