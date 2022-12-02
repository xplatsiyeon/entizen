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

const TAG = 'components/mpage/projects/MyProjects.tsx';

type Props ={
  listUp? : boolean;
}
const MyProjects = ({listUp}:Props) => {
  const router = useRouter();
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const {
    data: projectListData,
    loading: projectListLoading,
    error: projectListError,
  } = useQuery<MyprojectListResponse>(myprojectList, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });
  const handleRoute = (projectIdx: string) => {
    //mob일 때 router.push();
    router.push({
      pathname: '/mypage/project',
      query: {
        projectIdx: projectIdx,
      },
    });
  };

  if (projectListLoading) {
    return <Loader />;
  }
  if (projectListError) {
    console.log('🔥 ~line 98 ~프로젝트 에러 발생 ' + TAG);
    console.log(projectListError);
  }
  // 아무런 데이터가 없을 때
  if (projectListData?.uncompletedProjects?.length === 0) {
    return <NoHistory type="project" />;
  }

  console.log('🔥 ~프로젝트 리스트 데이터 확인 ~라인 51 ->  ' + TAG);
  console.log(projectListData);

  return (
    <>
      <List listUp={Boolean(listUp)} >
        {projectListData?.uncompletedProjects?.map((item, idx) => {
          return (
            <ProjectBox
              key={item?.projectIdx}
              onClick={() => handleRoute(item.projectIdx)}
            >
              <CommonBtn
                text={item?.badge}
                backgroundColor={handleColor(item?.badge)}
                bottom={'12pt'}
                top={'12pt'}
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
    </>
  );
};

export default MyProjects;

const List = styled.ul<{listUp:boolean }>`
  display: flex;
  flex-direction: ${({listUp})=> (listUp?'column':'unset')};
  flex-wrap: wrap;
  margin: 30pt 0;
  padding: 15pt;
  gap: 11pt;
  @media (min-width: 900pt) {
    width: 580.5pt;
    margin: 0;
    padding: 0 0 15pt 0;
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
  @media (min-width: 900pt) {
    width: 178.5pt;
    height: 99pt;
  }
`;

const P = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  top: 39pt;
  left: 12pt;
  position: absolute;
  padding-right: 12.75pt;
`;

const P2 = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -0.02em;
  left: 12pt;
  bottom: 12pt;
  position: absolute;
  color: #caccd1;
`;
