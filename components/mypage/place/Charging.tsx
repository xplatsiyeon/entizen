import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import Loader from 'components/Loader';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  chargingStations,
  ChargingStationsResponse,
} from 'QueryComponents/UserQuery';
import { handleColor, handleColor2 } from 'utils/changeValue';
import CommonBtn from '../as/CommonBtn';
import noAs from 'public/images/noAs.png';

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

const tempProceeding: testArr[] = [];

const TAG = 'components/mypage/place/Charging.tsx';

type Props = {
  listUp?: boolean;
};

const Charging = ({ listUp }: Props) => {
  const router = useRouter();
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
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
      <List listUp={Boolean(listUp)}>
        {chargingData?.chargingStations?.length! > 0 ? (
          chargingData?.chargingStations?.map((el, idx) => {
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
          })
        ) : (
          <NoCharging>
            <p>충전소가 없습니다.</p>
          </NoCharging>
        )}
      </List>
    </>
  );
};

export default Charging;

const List = styled.ul<{ listUp: boolean }>`
  display: flex;
  flex-direction: ${({ listUp }) => (listUp ? 'column' : 'unset')};
  flex-wrap: wrap;
  margin: 30pt 0;
  padding: 15pt;
  gap: 11pt;
  /* border: 1px solid blue; */
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
    cursor: pointer;
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

const NoCharging = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 12pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: #a6a9b0;
  flex-direction: column;
`;
