import { useQuery } from '@apollo/client';
import Loader from 'components/Loader';
import ClientProgress from 'components/mypage/projects/ClientProgress';
import MypageHeader from 'components/mypage/request/header';
import TopBox from 'componentsCompany/Mypage/TopBox';
import { useRouter } from 'next/router';
import {
  GET_InProgressProjectsDetail,
  InProgressProjectsDetailResponse,
} from 'QueryComponents/CompanyQuery';
import { useState } from 'react';
import styled from '@emotion/styled';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import RequestMain from 'components/mypage/request/requestMain';

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

const tempProceeding: Data[] = [
  {
    id: 0,
    state: 3,
    badge: '검수 중',
    storeName: 'LS카페 신림점',
    date: '2021.01.01',
    contract: true,
    planed: ['2022.04.25', '2022.06.11'],
    address: '서울시 관악구 난곡로40길 30',
  },
  {
    id: 1,
    state: 1,
    badge: '준비 중',
    storeName: 'LS카페 신림점',
    date: '2021.05.10',
    contract: true,
    planed: [],
    address: '서울시 관악구 난곡로40길 30',
  },
  {
    id: 2,
    state: 0,
    badge: '계약대기',
    storeName: 'LS카페 신림점',
    date: '2021.03.10',
    contract: true,
    planed: ['2022.04.25', '2022.07.25'],
    address: '서울시 관악구 난곡로40길 30',
  },
  {
    id: 3,
    badge: '설치 중',
    state: 2,
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
    contract: true,
    planed: ['2022.04.25'],
    address: '서울시 관악구 난곡로40길 30',
  },
  {
    id: 4,
    state: 4,
    badge: '완료 중',
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
    contract: true,
    planed: ['2022.04.26', '2022.05.6', '2022.05.11'],
    address: '서울시 관악구 난곡로40길 30',
  },
  {
    id: 5,
    state: 5,
    badge: '완료대기',
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
    contract: true,
    planed: ['2022.04.26', '2022.05.6', '2022.05.11', '2022.05.14'],
    address: '서울시 관악구 난곡로40길 30',
  },
  {
    id: 6,
    state: 6,
    badge: '프로젝트 취소',
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
    contract: false,
    planed: [],
    address: '서울시 관악구 난곡로40길 30',
  },
];

const ProjectInfo = () => {
  const router = useRouter();
  const routerId = router?.query?.projectIdx;
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);

  /* useEffect(()=>{
      console.log('index', router.query.id);
      if(router.query.id){
        const num = Number(router.query.id)
      }
    },[router.query.id])*/

  // -----진행중인 프로젝트 상세 리스트 api-----
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
    refetch: projectRefetch,
  } = useQuery<InProgressProjectsDetailResponse>(GET_InProgressProjectsDetail, {
    variables: {
      projectIdx: routerId!,
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  console.log(routerId);

  if (projectLoading) {
    return <Loader />;
  }
  if (projectError) {
    console.log('프로젝트 에러 발생');
    console.log(projectError);
  }

  console.log(projectData);

  return (
    <>
      <Body>
        <WebHeader />
        <Inner>
          <FlexBox>
            <Wrap1>
              <RequestMain page={2} />
            </Wrap1>

            <Wrap2>
              <MypageHeader back={true} title={'내 프로젝트'} />
              {typeof router?.query?.projectIdx === 'string' ? (
                <>
                  <TopBox
                    type="USER"
                    open={open}
                    setOpen={setOpen}
                    handleClick={handleClick}
                    data={projectData!}
                  />

                  <ClientProgress
                    info={tempProceeding[Number(0)]}
                    page={tempProceeding[Number(0)].contract ? 'client' : 'yet'}
                    badge={projectData?.project?.badge!}
                    // page={true}
                    data={projectData!}
                    projectRefetch={projectRefetch}
                  />
                </>
              ) : null}
            </Wrap2>
          </FlexBox>
        </Inner>
        <WebFooter />
      </Body>
    </>
  );
};

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
  width: 900pt;
  margin: 45.75pt auto;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
  }
`;

const FlexBox = styled.div`
  display: flex;
  position: relative;
`;

const Wrap1 = styled.div`
  //width: 255pt;
  border: 1px solid #e9eaee;
  border-radius: 6pt;
  height: 100%;

  @media (max-width: 899pt) {
    display: none;
  }
`;

const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 60pt;

  @media (max-width: 899pt) {
    padding-left: 0pt;
    padding-bottom: 50pt;
  }
`;

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    width: 900pt;
    display: flex;
    justify-content: space-between;
  }
`;

export default ProjectInfo;
