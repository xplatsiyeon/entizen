import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import NoProject from 'componentsCompany/Mypage/NoProject';
import RecieveRequestUnder from './RecieveRequestUnder';
import {
  filterType,
  filterTypeEn,
  ReceivedRequest,
} from 'pages/company/quotation';
import { useQuery } from 'react-query';
import SendRequestUnder from './SendRequestUnder';
import { SentrequestResponse } from './SentRequest';
import HistoryUnder from './HistoryUnder';
import { HistoryResponse } from './History';
import { isTokenGetApi } from 'api';

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

const LeftProjectQuotationBox = ({
  checkedFilterIndex,
  keyword,
  underNum,
  setUnderNum,
  setComponentId,
  setTabNumber,
  componentId,
}: Props) => {
  const router = useRouter();
  const [tab, setTab] = useState<string>('');

  // 받은 요청 리스트 API 호출
  const { data: receivedData } = useQuery<ReceivedRequest>(
    'received-request',
    () =>
      isTokenGetApi(
        `/quotations/received-request?keyword=${keyword}&sort=${
          filterTypeEn[checkedFilterIndex!]
        }&limit=${100000000}&page=${1}`,
      ),
    {
      enabled: false,
    },
  );
  // 보낸 견적 리스트 API 호출
  const { data: sendData } = useQuery<SentrequestResponse>(
    'sent-request',
    () =>
      isTokenGetApi(
        `/quotations/sent-request?keyword=${keyword}&sort=${
          filterTypeEn[checkedFilterIndex!]
        }&limit=${100000000}&page=${1}`,
      ),
    {
      enabled: false,
    },
  );

  // 히스토리 리스트 API 호출
  const { data: historyData } = useQuery<HistoryResponse>(
    'history-request',
    () =>
      isTokenGetApi(
        `/quotations/histories?keyword=${keyword}&sort=${
          filterTypeEn[checkedFilterIndex!]
        }&limit=${100000000}&page=${1}`,
      ),
    {
      enabled: false,
    },
  );

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
      receivedData === undefined
    ) {
      setTab('받은 요청');
      setUnderNum(3);
    } else if (
      router.pathname === '/company/quotation/lastQuotation' &&
      receivedData === undefined
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
      receivedData === undefined
    ) {
      setTab('히스토리');
      setUnderNum(3);
    }
  }, [router.pathname]);

  const webComponents: Components = {
    0: (
      <RecieveRequestUnder
        data={receivedData?.data.receivedQuotationRequests!}
        componentId={componentId}
        setComponentId={setComponentId}
        setTabNumber={setTabNumber}
      />
    ),
    1: (
      <SendRequestUnder
        componentId={componentId}
        setComponentId={setComponentId}
        send={sendData?.data.sendQuotationRequests!}
      />
    ),
    2: (
      <HistoryUnder
        componentId={componentId}
        setComponentId={setComponentId}
        historyData={historyData?.data.quotationHistories!}
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
