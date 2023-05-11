import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { isTokenPatchApi } from 'api';
import Loader from 'components/Loader';
import PaginationCompo from 'components/PaginationCompo';
import { useRouter } from 'next/router';
import {
  chargingStations,
  ChargingStationsResponse,
} from 'QueryComponents/UserQuery';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import colors from 'styles/colors';
import { handleColor2 } from 'utils/changeValue';
import CommonBtn from '../as/CommonBtn';
import NoHistory from '../request/noHistory';

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

type Props = {
  listUp?: boolean;
};

const Charging = ({ listUp }: Props) => {
  const [myChargingPage, setMyChargingPage] = useState(1);

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
    variables: {
      page: myChargingPage,
      limit: 20,
    },
  });

  console.log('🔥 chargingData : ', chargingData);

  const handleRoute = (idx: string) => {
    //mob일 때 router.push();
    router.push({
      pathname: '/mypage/place',
      query: {
        id: idx,
      },
    });
  };
  useEffect(() => {}, [chargingData]);
  // 내 충전소 알림 읽음 처리
  const queryClient = useQueryClient();
  const { mutate: updateAlertMutate } = useMutation(isTokenPatchApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('v1/alerts');
    },
    onError: () => {},
  });
  useEffect(() => {
    updateAlertMutate({
      url: '/v1/alerts/unread-points',
      data: {
        wasReadUserChargingStation: true,
      },
    });
  }, []);

  if (chargingLoading) {
    return <Loader />;
  }

  return (
    <>
      {chargingData?.chargingStations?.projects?.length! > 0 ? (
        <div>
          {chargingData?.chargingStations?.projects?.map((el, idx) => (
            <List listUp={Boolean(listUp)}>
              <ProjectBox key={idx} onClick={() => handleRoute(el?.projectIdx)}>
                <CommonBtn
                  /* badge의 값이 4인 데이터만 '구독시작' 이다. 나머지는 '구독종료' */
                  text={el?.badge}
                  // 뱃지 관련 컬러는 나중에 수정
                  // backgroundColor={handleColor2(el?.badge)}
                  backgroundColor={handleColor2(
                    Number(el?.badge.split('D-')[1]),
                  )}
                  bottom={'12pt'}
                  top={'15pt'}
                  left={'12pt'}
                />
                <P>{el?.projectName}</P>
                <P2>
                  {el?.companyMember?.companyMemberAdditionalInfo?.companyName}
                </P2>
              </ProjectBox>
            </List>
          ))}
          <PaginationCompo
            setPage={setMyChargingPage}
            page={myChargingPage}
            list={chargingData?.chargingStations?.projects!}
            limit={20}
            total={chargingData?.chargingStations?.totalCount!}
          />
        </div>
      ) : (
        // 내 충전소가 1개도 없을 때
        <NoChargingSection>
          <NoHistory type="myCharging" />
        </NoChargingSection>
      )}
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
  color: ${colors.main2};
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

const NoChargingSection = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #a6a9b0;
`;
