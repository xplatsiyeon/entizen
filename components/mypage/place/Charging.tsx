import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import Loader from 'components/Loader';
import { useRouter } from 'next/router';
import {
  chargingStations,
  ChargingStationsResponse,
} from 'QueryComponents/UserQuery';
import { handleColor, handleColor2 } from 'utils/changeValue';
import CommonBtn from '../as/CommonBtn';

export interface testArr {
  id: number;
  badge: number;
  storeName: string;
  date: string;
}

// 0: 구독종료 D-100일 이상 ,
// 1: 구독종료 D-99일 이하 31일 이상,
// 2: 구독종료 D-30일 이하,
// 3: 구독종료,
// 4: 구독시작 D-n

const tempProceeding: testArr[] = [
  {
    id: 0,
    badge: 1,
    storeName: 'LS 카페 신림점',
    date: 'D-67',
  },
  {
    id: 1,
    badge: 0,
    storeName: 'LS 용산 주유소',
    date: 'D-177',
  },
  {
    id: 2,
    badge: 2,
    storeName: 'LS 25시 난곡점',
    date: 'D-5',
  },
  {
    id: 3,
    badge: 3,
    storeName: 'LS 05시 곡점',
    date: '',
  },
  {
    id: 4,
    badge: 4,
    storeName: 'LS 2시 난점',
    date: 'D-100',
  },
];

const TAG = 'components/mypage/place/Charging.tsx';

const Charging = () => {
  const router = useRouter();
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const {
    data: chargingData,
    loading: chargingLoading,
    error: chargingError,
  } = useQuery<ChargingStationsResponse>(chargingStations, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  const handleRoute = (idx: string) => {
    //mob일 때 router.push();
    router.push({
      pathname: '/mypage/place',
      query: {
        id: idx,
      },
    });
  };

  if (chargingLoading) {
    return <Loader />;
  }
  if (chargingError) {
    console.log('🔥 ~line 85 ~내 충전소 에러 발생 ' + TAG);
    console.log(chargingError);
  }

  console.log('🔥 ~line 89 ~내 충전소 데이터 확인 ' + TAG);
  console.log(chargingData);

  return (
    <>
      <List>
        {chargingData?.chargingStations?.map((el, idx) => {
          return (
            <ProjectBox key={idx} onClick={() => handleRoute(el?.projectIdx)}>
              <CommonBtn
                /* badge의 값이 4인 데이터만 '구독시작' 이다. 나머지는 '구독종료' */
                text={el?.badge}
                // 뱃지 관련 컬러는 나중에 수정
                // backgroundColor={handleColor2(el?.badge)}
                backgroundColor={handleColor(el?.badge)}
                bottom={'12pt'}
                top={'4.5pt'}
                left={'0pt'}
              />
              <P>{el?.projectName}</P>
              <P2>
                {el?.companyMember?.companyMemberAdditionalInfo?.companyName}
              </P2>
            </ProjectBox>
          );
        })}
      </List>
    </>
  );
};

export default Charging;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 30pt 0;
  padding: 15pt;
  gap: 11pt;
  @media (min-width: 900pt) {
    width: 580.5pt;
    padding-top: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3, 178.5pt);
    gap: 22.5pt;
  }
`;

const ProjectBox = styled.li`
  width: 96pt;
  height: 111pt;
  padding: 12pt;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  position: relative;
  @media (min-width: 900pt) {
    width: 155pt;
    height: 91pt;
  }
`;
const P = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  top: 43.5pt;
  left: 12pt;
  max-width: 96pt;
  position: absolute;
  @media (min-width: 900pt) {
    font-size: 12pt;
    max-width: 150pt;
  }
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
