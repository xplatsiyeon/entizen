import styled from '@emotion/styled';
import BottomNavigation from 'components/BottomNavigation';
import History from 'componentsCompany/CompanyQuotation/History';
import React, { useState } from 'react';
import Header from '../../../componentsCompany/CompanyQuotation/Header';
import RecieveRequest from '../../../componentsCompany/CompanyQuotation/RecieveRequest';
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
  const [tabNumber, setTabNumber] = useState(0);

  return (
    <>
      <Container>
        <Header />
        {/* 탭  */}
        <Tab tabNumber={tabNumber} setTabNumber={setTabNumber} />
        {/* 받은 요청 */}
        {tabNumber === 0 && <RecieveRequest />}
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
