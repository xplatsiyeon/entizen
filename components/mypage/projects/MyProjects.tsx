import styled from '@emotion/styled';
import CommonBtn from '../../../components/mypage/as/CommonBtn';
import NoHistory from '../request/noHistory';
import { handleColor } from 'utils/changeValue';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import {
  myprojectList,
  MyprojectListResponse,
} from 'QueryComponents/UserQuery';
import Loader from 'components/Loader';
import PaginationCompo from 'components/PaginationCompo';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useMutation } from 'react-query';
import { isTokenPatchApi } from 'api';

type Props = {
  listUp?: boolean;
};
const MyProjects = ({ listUp }: Props) => {
  const router = useRouter();
  // 페이지 네이션
  const desktop = useMediaQuery({
    query: '(min-width:900pt)',
  });
  const limit = desktop ? 20 : 100000000;
  const [projectPage, setProjectPage] = useState(1);

  // -----진행중인 프로젝트 목록 리스트 api-----
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const {
    data: projectListData,
    loading: projectListLoading,
    error: projectListError,
    refetch: projectListRefetch,
  } = useQuery<MyprojectListResponse>(myprojectList, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
    variables: {
      page: projectPage,
      limit: 20,
    },
  });

  const handleRoute = (projectIdx: string, idx: number) => {
    //mob일 때 router.push();
    // console.log(projectListData?.uncompletedProjects[idx]);

    if (
      !projectListData?.uncompletedProjects.projects[idx]?.isApprovedByAdmin &&
      projectListData?.uncompletedProjects.projects[idx]
        .projectCompletionAgreementDate
    ) {
      router.push({
        pathname: '/mypage/project/finish',
        query: {
          projectIdx: projectIdx,
        },
      });
    } else {
      router.push({
        pathname: '/mypage/project',
        query: {
          projectIdx: projectIdx,
        },
      });
    }
  };

  // 진행 중인 프로젝트 리스트 조회
  useEffect(() => {
    projectListRefetch();
  }, [projectPage]);

  // 내 프로젝트 읽음 처리
  const { mutate: updateAlertMutate } = useMutation(isTokenPatchApi, {
    onSuccess: () => {},
    onError: () => {},
  });
  useEffect(() => {
    updateAlertMutate({
      url: '/v1/alerts/unread-points',
      data: {
        wasReadUserProject: true,
      },
    });
  }, []);

  if (projectListLoading) {
    return <Loader />;
  }

  // 아무런 데이터가 없을 때
  if (projectListData?.uncompletedProjects.projects.length === 0) {
    return <NoHistory type="project" />;
  }

  // console.log('🔥 ~프로젝트 리스트 데이터 확인 ~라인 51 ->  ' + TAG);
  // console.log(projectListData);

  console.log('🔥 projectListData : ', projectListData);

  return (
    <Wrap>
      <List listUp={Boolean(listUp)}>
        {projectListData?.uncompletedProjects.projects?.map((item, idx) => {
          return (
            <ProjectBox
              key={item?.projectIdx}
              onClick={() => handleRoute(item.projectIdx, idx)}
            >
              <CommonBtn
                text={item?.badge}
                backgroundColor={handleColor(item?.badge)}
                bottom={'12pt'}
                top={'15pt'}
                left={'12pt'}
              />
              <P>{item?.projectName}</P>
              <P2>
                {item?.companyMember?.companyMemberAdditionalInfo?.companyName}
              </P2>
            </ProjectBox>
          );
        })}
      </List>
      {desktop && (
        <PaginationCompo
          setPage={setProjectPage}
          page={projectPage}
          list={projectListData?.uncompletedProjects.projects!}
          limit={limit}
          total={projectListData?.uncompletedProjects.totalCount!}
        />
      )}
    </Wrap>
  );
};

export default MyProjects;

const Wrap = styled.div`
  width: 580.5pt;
  @media (max-width: 899.25pt) {
    width: 100%;
  }
`;

const List = styled.ul<{ listUp: boolean }>`
  display: flex;
  flex-direction: ${({ listUp }) => (listUp ? 'column' : 'unset')};
  flex-wrap: wrap;
  margin: 30pt 0;
  padding: 15pt;
  gap: 11pt;
  @media (min-width: 900pt) {
    width: 580.5pt;
    margin: 0;
    padding: 0 0 60pt 0;
    gap: 22.5pt;
  }
`;

const ProjectBox = styled.li`
  width: 120pt;
  height: 135pt;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  position: relative;
  cursor: pointer;
  @media (min-width: 900pt) {
    border-radius: 12pt;
    width: 178.5pt;
    /* height: 99pt; */
    height: 114pt;
    padding-top: 3.75pt;
  }
`;

const P = styled.p`
  width: 91.5pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  top: 39pt;
  left: 12pt;
  position: absolute;
  padding-right: 12.75pt;
  color: #222222;
  text-overflow: ellipsis;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
  padding-top: 10pt;
  @media (min-width: 900pt) {
    /* width: 150pt; */
    width: 160pt;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 13.5pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #222222;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1; // 원하는 라인수
    -webkit-box-orient: vertical;
    padding-top: 12pt;
  }
`;

const P2 = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -0.02em;
  left: 13pt;
  bottom: 12pt;
  position: absolute;
  color: #caccd1;
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: right;
    right: 18pt;
    bottom: 12pt;
  }
`;
