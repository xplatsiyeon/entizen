import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { CountertopsOutlined } from '@mui/icons-material';
import MypageHeader from 'components/mypage/request/header';
import AsCompTop from 'componentsCompany/AS/component/AsCompTop';
import LeftASBox from 'componentsCompany/AS/LeftASBox';
import { handleColorAS } from 'utils/changeValue';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import { useRouter } from 'next/router';
import {
  GET_InProgressProjectsDetail,
  InProgressProjectsDetailResponse,
} from 'QueryComponents/CompanyQuery';
import React, { useEffect, useState } from 'react';
import AsCompText from 'componentsCompany/AS/component/AsCompText';

// type Props = {
//   setOpenSubLink: React.Dispatch<React.SetStateAction<boolean>>;
//   openSubLink: boolean;
// };
type Props = {};
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

const TAG = 'pages/compnay/as/receivedAS.tsx';
const ReceivedAS = (props: Props) => {
  const router = useRouter();

  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [componentId, setComponentId] = useState<number>();
  const [headerTab, setHeaderTab] = useState<number>(3);

  // 접수내용, 접수확인, A/S 결과 열고 닫는거
  const [request, setRequeste] = useState<boolean>(false);
  const [requestConfirm, setRequestConfirm] = useState<boolean>(true);
  const [confirmWait, setConfirmWait] = useState<boolean>(false);

  useEffect(() => {
    if (request === true) {
      setRequestConfirm(false);
      setConfirmWait(false);
    } else if (requestConfirm === true) {
      setRequeste(false);
      setConfirmWait(false);
    } else if (confirmWait === true) {
      setRequeste(false);
      setRequestConfirm(false);
    }
  }, [request, requestConfirm, confirmWait]);

  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);

  const [data, setData] = useState<Data>({
    id: -1,
    state: -1,
    badge: '',
    storeName: '',
    date: '',
    contract: false,
    planed: [],
    address: '',
  });
  // -----진행중인 프로젝트 상세 리스트 api-----
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const {
    loading,
    error,
    data: inProgressData,
    refetch: inProgressRefetch,
  } = useQuery<InProgressProjectsDetailResponse>(GET_InProgressProjectsDetail, {
    variables: {
      projectIdx: router?.query?.projectIdx!,
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  console.log(TAG + '🔥 ~line 68 ~내프로젝트 진행중인 프로젝트 리스트');
  console.log(inProgressData);

  useEffect(() => {
    if (router.query.asIdx) {
      const num = Number(router.query.asIdx);
      setComponentId(num);
      setHeaderTab(2);
    }
  }, [router.query.asIdx]);

  useEffect(() => {
    if (router.query.asIdx) {
      // setData(tempProceeding[num]);
      setOpenSubLink(false);
    }
  }, [router]);

  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  return (
    <>
      <WebBody>
        <WebBuyerHeader
          setTabNumber={setTabNumber}
          tabNumber={tabNumber}
          componentId={componentId}
          openSubLink={openSubLink}
          setOpenSubLink={setOpenSubLink}
        />
        <Container>
          <WebRapper>
            {nowWidth > 1198.7 && (
              <LeftASBox
                setTabNumber={setTabNumber}
                tabNumber={tabNumber}
                componentId={componentId}
                setComponentId={setComponentId}
              />
            )}
            <MypageHeader back={true} title={'신규 A/S'} />
            <WebBox className="content">
              <AsCompTop />
              <Inner>
                <AsCompText
                  request={request}
                  requestConfirm={requestConfirm}
                  confirmWait={confirmWait}
                />
              </Inner>
            </WebBox>
          </WebRapper>
        </Container>
        <WebFooter />
      </WebBody>
    </>
  );
};

export default ReceivedAS;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  @media (max-height: 500pt) {
    height: 100%;
    display: block;
  }
`;

const Container = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  background: white;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
  @media (max-height: 400pt) {
    height: 100%;
    background: white;
  }
  @media (min-width: 900pt) {
    margin: 0 auto;
    padding-top: 54pt;
  }
`;

const WebRapper = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 30pt;

  display: flex;
  flex-direction: column;

  @media (min-width: 900pt) {
    margin: 0 auto;

    width: 900pt;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 60pt;
  }

  @media (max-height: 400pt) {
    height: 100vh;
    background: white;
  }
`;

const WebBox = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;

  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
    width: 580.5pt;
  }
`;

const Inner = styled.div`
  margin: 0 15pt;
  @media (min-width: 900pt) {
    height: auto;
  }
`;
