import styled from '@emotion/styled';
import { isTokenGetApi } from 'api';
import BottomNavigation from 'components/BottomNavigation';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';
import History from 'componentsCompany/CompanyQuotation/History';
import LeftProjectQuotationBox from 'componentsCompany/CompanyQuotation/LeftProjectQuotationBox';
import RecieveRequest from 'componentsCompany/CompanyQuotation/RecieveRequest';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Header from '../../../componentsCompany/CompanyQuotation/Header';
import SentRequest from '../../../componentsCompany/CompanyQuotation/SentRequest';
import Tab from '../../../componentsCompany/CompanyQuotation/Tab';

type Props = { num?: number; now?: string };
interface QuotationRequest {
  changedDate: string;
  createdAt: string;
  etcRequest: string;
  expiredAt: string;
  installationAddress: string;
  installationLocation: string;
  installationPurpose: string;
  investRate: string;
  memberIdx: number;
  quotationRequestIdx: number;
}

interface Components {
  [key: number]: JSX.Element;
}
export interface ReceivedQuotationRequests {
  badge: string;
  quotationRequest: QuotationRequest;
  companyMemberAdditionalInfo: [];
}
export interface ReceivedRequest {
  isSuccess: boolean;
  receivedQuotationRequests: ReceivedQuotationRequests[];
}

export type filterType = '마감일순 보기' | '상태순 보기' | '날짜순 보기';
// deadline: 마감일 | status: 상태순 | date: 날짜순
export const filterTypeEn = ['deadline', 'status', 'date'];

const TAG = 'company/quotation/index.tsx';
const CompanyQuotations = ({ num, now }: Props) => {
  const router = useRouter();
  const [tabNumber, setTabNumber] = useState(0);
  const [searchWord, setSearchWord] = useState<string>('');

  // 현재 페이지 url이 /quotation boolean 판단
  const [nowUrl, setNowUrl] = useState<boolean>(false);

  // 받은 요청, 보낸 견적, 히스토리 구분하는 state
  const [getComponentId, setGetComponentId] = useState<number | undefined>();
  const [sendComponentId, setSendComponentId] = useState<number | undefined>();
  const [historyComponentId, setHistoryComponentId] = useState<
    number | undefined
  >();
  const [checkedFilterIndex, setcheckedFilterIndex] = useState<number>(0);
  const [checkedFilter, setCheckedFilter] =
    useState<filterType>('마감일순 보기');
  const keyword = useDebounce(searchWord, 3000);
  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);

  // 실시간 width 저장하는 state
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);

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
  const { data, isLoading, isError, error, refetch } =
    useQuery<ReceivedRequest>(
      'received-request',
      () =>
        isTokenGetApi(
          `/quotations/received-request?keyword=${keyword}&sort=${filterTypeEn[checkedFilterIndex]}`,
        ),
      {
        enabled: false,
      },
    );

  // 현재 페이지
  useEffect(() => {
    const now = router.route;
    if (now === `/company/quotation`) {
      setNowUrl(!nowUrl);
    }
  }, []);

  if (isError) {
    console.log(TAG + '🔥 ~line  68 ~ error 콘솔');
    console.log(error);
    return (
      <Modal
        text="다시 시도해주세요"
        click={() => {
          router.push('/');
        }}
      />
    );
  }

  const components: Components = {
    0: (
      <RecieveRequest
        data={data!}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        checkedFilterIndex={checkedFilterIndex}
        setcheckedFilterIndex={setcheckedFilterIndex}
        checkedFilter={checkedFilter}
        setCheckedFilter={setCheckedFilter}
        keyword={keyword}
      />
    ),
    1: <SentRequest />,
    2: <History />,
  };

  useEffect(() => {
    refetch();
    return () => {
      setSearchWord('');
      setcheckedFilterIndex(0);
    };
  }, [checkedFilterIndex, keyword]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <WebBody>
      <Container>
        {/* 모바일탭  */}
        {nowWidth < 1198.7 && (
          <>
            <Header />
            <Tab tabNumber={tabNumber} setTabNumber={setTabNumber} />
          </>
        )}
        {/* 웹일때 보이는 헤더 */}
        <WebBuyerHeader
          setTabNumber={setTabNumber}
          tabNumber={tabNumber}
          num={num}
          now={now}
          openSubLink={openSubLink}
          setOpenSubLink={setOpenSubLink}
        />
        <div>{components[tabNumber]}</div>
      </Container>
      <BottomNavigation />
      <WebFooter />
    </WebBody>
  );
};

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  height: 100vh;
  @media (max-width: 899pt) {
    display: block;
  }
  @media (min-width: 899pt) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const WebRapper = styled.div`
  @media (min-width: 899pt) {
    margin: 0 auto;
    padding: 60pt 0;
    width: 900pt;
    display: flex;
    justify-content: space-between;
  }
`;

export default CompanyQuotations;
