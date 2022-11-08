import styled from '@emotion/styled';
import { isTokenGetApi } from 'api';
import BottomNavigation from 'components/BottomNavigation';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';
import History from 'componentsCompany/CompanyQuotation/History';
import RecieveRequest from 'componentsCompany/CompanyQuotation/RecieveRequest';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Header from '../../../componentsCompany/CompanyQuotation/Header';
import SentRequest from '../../../componentsCompany/CompanyQuotation/SentRequest';
import Tab from '../../../componentsCompany/CompanyQuotation/Tab';

type Props = {};
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
const CompanyQuotations = (props: Props) => {
  const router = useRouter();
  const [tabNumber, setTabNumber] = useState(0);
  const [searchWord, setSearchWord] = useState<string>('');
  const [checkedFilterIndex, setcheckedFilterIndex] = useState<number>(0);
  const [checkedFilter, setCheckedFilter] =
    useState<filterType>('마감일순 보기');
  const keyword = useDebounce(searchWord, 3000);

  // api 호출
  const { data, isLoading, isError, error, refetch } =
    useQuery<ReceivedRequest>(
      'received-Request',
      () =>
        isTokenGetApi(
          `/quotations/received-request?keyword=${keyword}&sort=${filterTypeEn[checkedFilterIndex]}`,
        ),
      {
        enabled: false,
      },
    );

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

  useEffect(() => {
    refetch();
    return () => {
      setcheckedFilterIndex(0);
      setSearchWord('');
    };
  }, [checkedFilterIndex, keyword]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Container>
        <Header />
        {/* 탭  */}
        <Tab tabNumber={tabNumber} setTabNumber={setTabNumber} />
        {/* 받은 요청 */}
        {tabNumber === 0 && (
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
        )}
        {/* 보낸 견적 */}
        {tabNumber === 1 && <SentRequest />}
        {/* 히스토리 */}
        {tabNumber === 2 && <History />}
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
