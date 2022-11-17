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

type Props = {
  tabNumber: number;
};

interface Data {
  id: number;
  badge: string;
  storeName: string;
  date: string;
}

const tempProceeding: Data[] = [
  {
    id: 0,
    badge: '검수 중',
    storeName: 'S-OIL 대치 주유소',
    date: '2021.01.01',
  },
  {
    id: 1,
    badge: '준비 중',
    storeName: '맥도날드 대이동점',
    date: '2021.05.10',
  },
  {
    id: 2,
    badge: '계약대기',
    storeName: 'LS카페 신림점',
    date: '2021.03.10',
  },
  {
    id: 3,
    badge: '설치 중',
    storeName: 'LS카페 마곡점',
    date: '2021.07.23',
  },
  {
    id: 4,
    badge: '완료 중',
    storeName: '스타벅스 마곡점',
    date: '2021.07.23',
  },
  {
    id: 5,
    badge: '완료대기',
    storeName: 'LS카페 계양점',
    date: '2021.07.23',
  },
  {
    id: 6,
    badge: '프로젝트 취소',
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
  },
];
const TAG = 'components/mpage/projects/MyProjects.tsx';
const MyProjects = () => {
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

  return (
    <>
      <List>
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

const List = styled.ul`
  display: flex;
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
    height: 114pt;
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
