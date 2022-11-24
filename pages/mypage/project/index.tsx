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
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import RequestMain from 'components/mypage/request/requestMain';
import UserRightMenu from 'components/UserRightMenu';
const TAG = 'pages/mypage/project/index.tsx';
const ProjectInfo = () => {
  const router = useRouter();
  const routerId = router?.query?.projectIdx;
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);

  // useEffect(() => {
  //   console.log('index', router.query.id);
  //   if (router.query.id) {
  //     const num = Number(router.query.id);
  //   }
  // }, [router.query.id]);

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
  console.log('🔥 ~line 49 프로젝트 상세 api 데이터 ' + TAG);
  console.log(routerId);

  console.log(projectData);

  return (
    <>
      <Body>
        <WebHeader />
        <UserRightMenu />
        <Inner>
          <FlexBox>
            <Wrap1>
              <RequestMain page={1} />
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
                  {/* 프로젝트 진행 컴포넌트 */}
                  <ClientProgress
                    badge={projectData?.project?.badge!}
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
  margin: 0 auto;
  background: #fcfcfc;

  @media (max-width: 899.25pt) {
    background: #ffffff;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  width: 900pt;
  margin: 45.75pt auto;

  @media (max-width: 899.25pt) {
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

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 60pt;

  @media (max-width: 899.25pt) {
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
