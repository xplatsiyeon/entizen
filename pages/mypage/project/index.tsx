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
import { useDispatch } from 'react-redux';
import { redirectAction } from 'store/redirectUrlSlice';

const ProjectInfo = () => {
  const router = useRouter();
  const routerId = router?.query?.projectIdx;
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);

  // -----진행중인 프로젝트 상세 리스트 api-----
  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
    refetch: projectRefetch,
  } = useQuery<InProgressProjectsDetailResponse>(GET_InProgressProjectsDetail, {
    variables: {
      projectIdx: routerId!,
    },
    skip: !accessToken ? true : false,
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  // 완료된 프로젝트일 경우 프로젝트 -> 내 충전소로 이동
  useEffect(() => {
    if (projectData?.project?.isApprovedByAdmin === true) {
      router.replace(`/mypage/place?id=${projectData?.project?.projectIdx}`);
    }
  }, [projectData]);

  if (projectLoading) {
    return <Loader />;
  }
  if (projectError) {
    // console.log('프로젝트 에러 발생');
    // console.log(projectError);
  }

  if (!accessToken && memberType !== 'USER') {
    dispatch(redirectAction.addUrl(router.asPath));
    router.push('/signin');
  } else {
    return (
      <>
        <Body>
          <WebHeader num={1} now={'mypage'} sub={'mypage'} />
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
                    {/* 프로젝트 상단 상세 내용 */}
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
  }
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
  margin: 60pt auto;

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
  border-radius: 12pt;
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
    padding-bottom: 100pt;
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
