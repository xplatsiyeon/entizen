import styled from '@emotion/styled';
import CommonBtn from '../../../components/mypage/as/CommonBtn';
import NoHistory from '../request/noHistory';
import { handleColor } from 'utils/changeValue';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { MyprojectList, myprojectList } from 'QueryComponents/UserQuery';

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

const MyProjects = () => {
  const router = useRouter();
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const {
    data: projectListData,
    loading: projectListLoading,
    error: projectListError,
  } = useQuery<MyprojectList>(myprojectList, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });
  const handleRoute = (idx: number) => {
    //mob일 때 router.push();
    router.push(`/mypage/project/${idx}`);
  };

  if (tempProceeding.length === 0) {
    return <NoHistory type="project" />;
  }

  console.log(projectListData);

  return (
    <>
      <List>
        {tempProceeding.map((t, idx) => {
          return (
            <ProjectBox key={idx} onClick={() => handleRoute(idx)}>
              <CommonBtn
                text={t.badge}
                backgroundColor={handleColor(t.badge)}
                bottom={'12pt'}
                top={'12pt'}
                left={'12pt'}
              />
              <P>{t.storeName}</P>
              <P2>Charge Point</P2>
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
`;

const ProjectBox = styled.li`
  width: 120pt;
  height: 135pt;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  position: relative;
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
