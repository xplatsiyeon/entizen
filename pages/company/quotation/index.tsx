import styled from '@emotion/styled';
import { isTokenApi } from 'api/index';
import BottomNavigation from 'components/BottomNavigation';
import History from 'componentsCompany/CompanyQuotation/History';
import useDebounce from 'hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import { myEstimateAction } from 'storeCompany/myQuotation';
import Header from '../../../componentsCompany/CompanyQuotation/Header';
import RecieveRequest from '../../../componentsCompany/CompanyQuotation/RecieveRequest';
import SentRequest from '../../../componentsCompany/CompanyQuotation/SentRequest';
import Tab from '../../../componentsCompany/CompanyQuotation/Tab';

type Props = {};

interface receivedQuotationRequests {
  quotationRequestIdx: number;
  badge: string;
  installationAddress: string;
}
interface ReceivedRequest {
  isSuccess: boolean;
  receivedQuotationRequests: receivedQuotationRequests[];
}

interface Test extends ReceivedRequest {
  data: ReceivedRequest;
  [key: string]: any;
}

export type filterType = '마감일순 보기' | '상태순 보기' | '날짜순 보기';

// deadline: 마감일 | status: 상태순 | date: 날짜순
const filterTypeEn = ['deadline', 'status', 'date'];

const TAP = 'company/quotation/index.tsx';
const CompanyQuotations = (props: Props) => {
  const dispatch = useDispatch();
  // 필터 sort
  const { checkedFilterIndex } = useSelector(
    (state: RootState) => state.companyRequestFilterNumberData,
  );
  // 상단 탭
  const [tabNumber, setTabNumber] = useState(-1);
  const [searchWord, setSearchWord] = useState<string>('');
  const [checkedFilter, setCheckedFilter] =
    useState<filterType>('마감일순 보기');

  const keyword = useDebounce(searchWord, 3000);

  // api 호출
  const { data, isLoading, refetch } = useQuery(
    'receivedRequest',
    () =>
      isTokenApi({
        endpoint: `/quotations/received-request?keyword=${keyword}&sort=${filterTypeEn[checkedFilterIndex]}`,
        method: 'GET',
      }),
    {
      enabled: false,
      onSuccess: () => {},
      onError: (error) => {
        console.log(error);
      },
    },
  );
  useEffect(() => {
    dispatch(myEstimateAction.reset());
  }, []);
  // 필터링 기능
  useEffect(() => {
    refetch();
  }, [keyword]);

  return (
    <>
      <Container>
        <Header />
        {/* 탭 / 필터링 / 검색창 */}
        <Tab
          tabNumber={tabNumber}
          setTabNumber={setTabNumber}
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          checkedFilter={checkedFilter}
          setCheckedFilter={setCheckedFilter}
          checkedFilterIndex={checkedFilterIndex}
        />
        {/* 받은 요청 */}
        {tabNumber === 0 && (
          <RecieveRequest queryData={data?.data.receivedQuotationRequests} />
        )}
        {/* 보낸 견적 */}
        {tabNumber === 1 && (
          <SentRequest checkedFilterIndex={checkedFilterIndex} />
        )}
        {/* 히스토리 */}
        {tabNumber === 2 && <History checkedFilterIndex={checkedFilterIndex} />}
      </Container>
      <BottomNavigation />
    </>
  );
};
const Container = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
`;
export default CompanyQuotations;
