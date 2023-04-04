import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import NoProject from 'componentsCompany/Mypage/NoProject';
import useProfile from 'hooks/useProfile';
import RecieveRequestUnder from './RecieveRequestUnder';
import {
  filterType,
  filterTypeEn,
  ReceivedRequest,
} from 'pages/company/quotation';
import { useQuery, useQueryClient } from 'react-query';
import { isTokenGetApi } from 'api';
import SendRequestUnder from './SendRequestUnder';
import { SentrequestResponse } from './SentRequest';
import HistoryUnder, { HistoryResponse } from './HistoryUnder';

type Props = {
  searchWord?: string;
  setSearchWord?: Dispatch<SetStateAction<string>>;
  checkedFilterIndex?: number;
  setcheckedFilterIndex?: Dispatch<SetStateAction<number>>;
  checkedFilter?: filterType;
  setCheckedFilter?: Dispatch<SetStateAction<filterType>>;
  keyword?: string;
  underNum?: number;
  setUnderNum: React.Dispatch<React.SetStateAction<number | undefined>>;
  componentId?: number;
  setComponentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setTabNumber?: Dispatch<SetStateAction<number>>;
};

interface Components {
  [key: number]: JSX.Element;
}

interface Data {
  id: number;
  badge: string;
  storeName: string;
  date: string;
}

const LeftProjectQuotationBox = ({
  checkedFilterIndex,
  keyword,
  underNum,
  setUnderNum,
  setComponentId,
  setTabNumber,
  componentId,
}: Props) => {
  // const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const { profile, isLoading, invalidate } = useProfile(accessToken);
  const [tab, setTab] = useState<string>('');

  const clinetQuery = useQueryClient();
  // 실시간으로 width 받아오는 함수
  // const handleResize = () => {
  //   setNowWidth(window.innerWidth);
  // };

  // useEffect(() => {
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [nowWidth]);

  // 받은 요청 리스트 api 호출
  const { data, isError, error, refetch } = useQuery<ReceivedRequest>(
    'received-request',
    () =>
      isTokenGetApi(
        `/quotations/received-request?keyword=${keyword}&sort=${
          filterTypeEn[checkedFilterIndex!]
        }`,
      ),
    {
      enabled: false,
    },
  );

  // send data api
  const {
    data: send,
    isError: sendError,
    isLoading: sendLoading,
    error: sendE,
    refetch: sendRefetch,
  } = useQuery<SentrequestResponse>('sent-request', () =>
    isTokenGetApi('/quotations/sent-request'),
  );

  // history data api

  const {
    data: historyData,
    isLoading: historyLoading,
    isError: historyIsError,
    error: historyError,
    refetch: historyRefetch,
  } = useQuery<HistoryResponse>(
    'history',
    () =>
      isTokenGetApi(
        `/quotations/histories?keyword=${keyword}&sort=${
          filterTypeEn[checkedFilterIndex!]
        }`,
      ),
    {
      enabled: false,
    },
  );

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === `/company/recievedRequest`) {
      setTab('받은 요청');
      setUnderNum(0);
    } else if (
      router.pathname === `/company/sentProvisionalQuotation` &&
      !router.query.historyIdx
    ) {
      setTab('보낸 견적');
      setUnderNum(1);
    } else if (router.pathname === '/company/quotation/lastQuotation') {
      setTab('보낸 견적');
      setUnderNum(1);
    } else if (
      router.pathname === `/company/recievedRequest` &&
      data === undefined
    ) {
      setTab('받은 요청');
      setUnderNum(3);
    } else if (
      router.pathname === '/company/quotation/lastQuotation' &&
      data === undefined
    ) {
      setTab('보낸 견적');
      setUnderNum(3);
    } else if (
      router.pathname === `/company/sentProvisionalQuotation` &&
      router.query.historyIdx
    ) {
      setTab('히스토리');
      setUnderNum(2);
    } else if (
      router.pathname === `/company/sentProvisionalQuotation` &&
      router.query.historyIdx &&
      data === undefined
    ) {
      setTab('히스토리');
      setUnderNum(3);
    }
  }, [router.pathname]);

  useEffect(() => {
    sendRefetch();
  }, [router?.query?.preQuotationIdx]);

  const webComponents: Components = {
    0: (
      <RecieveRequestUnder
        data={data}
        componentId={componentId}
        setComponentId={setComponentId}
        setTabNumber={setTabNumber}
      />
    ),
    1: (
      <SendRequestUnder
        componentId={componentId}
        setComponentId={setComponentId}
        send={send}
        // setTabNumber={setTabNumber}
      />
    ),
    2: (
      <HistoryUnder
        componentId={componentId}
        setComponentId={setComponentId}
        historyData={historyData}
        // setTabNumber={setTabNumber}
      />
    ),
    3: <NoProject />,
  };

  return (
    <>
      <Wrapper>
        <Header>
          <span>
            <h1>{tab}</h1>
          </span>
        </Header>
        <div className="box"> {webComponents[underNum!]}</div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  @media (min-width: 900pt) {
    width: 255pt;
    height: 424.5pt;
    border: 0.75pt solid #e2e5ed;
    border-radius: 12pt;
    .box {
      /* padding: 0 18.5pt; */
      /* padding: 0 28.5pt; */
      /* display: flex;
      justify-content: center; */
    }
  }
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const Header = styled.header`
  display: flex;
  width: 198pt;
  padding: 27pt 0 13pt 28.5pt;
  & h1 {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;

    color: ${colors.main2};
  }
  & h2 {
    font-weight: 500;
    font-size: 21pt;
    line-height: 27pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .img {
    /* 이미지 주변 클릭 범위 5px정도 늘려줌 */
    width: 22.5pt;
    height: 22.5pt;
    text-align: end;
  }
`;

export default LeftProjectQuotationBox;
