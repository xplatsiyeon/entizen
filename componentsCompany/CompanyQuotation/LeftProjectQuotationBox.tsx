import styled from '@emotion/styled';
import Image from 'next/image';
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
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import SendRequestUnder from './SendRequestUnder';
import LastQuotation from 'pages/company/quotation/lastQuotation';
import { SentrequestResponse } from './SentRequest';

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
// 데이터 없을 때 나오는 페이지
// const tempProceeding: [] = [];
const tempProceeding: Data[] = [];

const LeftProjectQuotationBox = ({
  searchWord,
  setSearchWord,
  checkedFilterIndex,
  setcheckedFilterIndex,
  checkedFilter,
  setCheckedFilter,
  keyword,
  underNum,
  setUnderNum,
  setComponentId,
  componentId,
}: Props) => {
  const route = useRouter();
  const [userName, setUserName] = useState<string>('윤세아');
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const { profile, isLoading, invalidate } = useProfile(accessToken);
  const [tab, setTab] = useState<string>('');

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

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === `/company/recievedRequest`) {
      setTab('받은 요청');
      setUnderNum(0);
    } else if (router.pathname === `/company/sentProvisionalQuotation`) {
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
      setUnderNum(2);
    } else if (
      router.pathname === '/company/quotation/lastQuotation' &&
      data === undefined
    ) {
      setTab('보낸 견적');
      setUnderNum(2);
    }
  }, [route]);

  useEffect(() => {
    sendRefetch();
  }, [router?.query?.preQuotationIdx]);

  const webComponents: Components = {
    0: (
      <RecieveRequestUnder
        data={data}
        componentId={componentId}
        setComponentId={setComponentId}
      />
    ),
    1: (
      <SendRequestUnder
        componentId={componentId}
        setComponentId={setComponentId}
        send={send}
      />
    ),
    2: <NoProject />,
  };

  return (
    <>
      <Wrapper>
        <Header>
          <span>
            <h1>{tab}</h1>
          </span>
        </Header>
        <div> {webComponents[underNum!]}</div>
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
  margin: 27pt auto;
  & h1 {
    font-weight: 700;
    font-size: 15pt;
    line-height: 27pt;
    letter-spacing: -0.02em;
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
