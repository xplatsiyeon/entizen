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
  getComponentId?: number;
  setGetComponentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  successComponentId?: number;
  setSuccessComponentId?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
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
  setGetComponentId,
  getComponentId,
  setSuccessComponentId,
  successComponentId,
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

  // api 호출
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
    if (
      route.asPath ===
      `/company/recievedRequest?quotationRequestIdx=${router.query.quotationRequestIdx}`
    ) {
      setTab('받은 요청');
      setUnderNum(0);
    } else if (
      route.asPath ===
      `/company/sentProvisionalQuotation?preQuotationIdx=${router.query.preQuotationIdx}`
    ) {
      setTab('보낸 견적');
      setUnderNum(1);
    } else if (route.asPath === '/company/quotation/lastQuotation') {
      setTab('보낸 견적');
      setUnderNum(1);
    } else if (
      route.asPath ===
        `/company/recievedRequest?preQuotationIdx=${router.query.preQuotationIdx}` &&
      data === undefined
    ) {
      setTab('받은 요청');
      setUnderNum(2);
    } else if (
      route.pathname === '/company/quotation/lastQuotation' &&
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
        getComponentId={getComponentId}
        setGetComponentId={setGetComponentId}
      />
    ),
    1: (
      <SendRequestUnder
        successComponentId={successComponentId}
        setSuccessComponentId={setSuccessComponentId}
        send={send}
      />
    ),
    2: (
      <LastQuotation
        successComponentId={successComponentId}
        setSuccessComponentId={setSuccessComponentId}
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
        <div> {webComponents[underNum!]}</div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  @media (min-width: 899pt) {
    width: 255pt;
    height: 424.5pt;
    border: 0.75pt solid #e2e5ed;
    border-radius: 12pt;
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

const Body = styled.div`
  padding-top: 15pt;
  .profile-icon {
    margin-left: 15pt;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main};
    border: 0.75pt solid ${colors.main};
    border-radius: 12pt;
    padding: 6pt 9pt;
  }
`;
const Line = styled.div`
  margin-top: 21pt;
  width: 100%;
  border-bottom: 3pt solid ${colors.gray3};
`;

const MobileTabContainer = styled.div`
  display: flex;
  gap: 15pt;
  padding-left: 15pt;
  @media (min-width: 899pt) {
    display: none;
  }
`;
const WebTabContainer = styled.div`
  display: flex;
  gap: 15pt;
  padding-left: 15pt;
  justify-content: center;
  flex-direction: column;
  padding-left: 27pt;
  gap: 1pt;
  @media (max-width: 899pt) {
    display: none;
  }
`;
const TabItem = styled.span<{ tab: string; index: string }>`
  padding-top: 21pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${({ tab, index }) =>
    tab === index ? colors.main : colors.lightGray};
  @media (min-width: 899pt) {
    display: flex;
    align-items: center;
    padding-top: 23pt;
  }
`;

const Item = styled.span<{ tab: string; index: string }>`
  padding-top: 21pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${({ tab, index }) =>
    tab === index ? colors.main : colors.lightGray};
  @media (min-width: 899pt) {
    display: flex;
    align-items: center;
    padding-top: 23pt;
  }
`;
const Dot = styled.div<{ tab: string; index: string }>`
  width: 3pt;
  height: 3pt;
  border-radius: 50%;
  margin: 6pt auto 0 auto;
  background-color: ${({ tab, index }) => tab === index && `${colors.main}`};
  @media (min-width: 899pt) {
    margin: 0 auto;
    margin-left: 20pt;
  }
`;

const UnderContents = styled.div`
  width: 255pt;
  @media (max-width: 899pt) {
    display: none;
  }
`;

const RightProgress = styled.div`
  @media (min-width: 899pt) {
    display: flex;
    flex-direction: column;
  }
`;

export default LeftProjectQuotationBox;
