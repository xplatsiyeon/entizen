import MypageHeader from 'components/mypage/request/header';
import LastWrite from 'componentsCompany/CompanyQuotation/LastQuotation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type Props = {
  setComponentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  componentId?: number;
  send?: SentrequestResponse;
};
export interface QuotationRequest {
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
  quotationStatus: string;
  subscribePeriod: number;
  subscribeProduct: string;
}
export interface PreQuotation {
  changedDate: string;
  constructionPeriod: number;
  createdAt: string;
  memberIdx: number;
  preQuotationIdx: number;
  preQuotationStatus: string;
  quotationRequestIdx: number;
  subscribePricePerMonth: number;
  subscribeProductFeature: string;
}
export interface SendQuotationRequests {
  badge: string;
  preQuotation: PreQuotation;
  quotationRequest: QuotationRequest;
}
export interface SentrequestResponse {
  isSuccess: boolean;
  sendQuotationRequests: SendQuotationRequests[];
}

const LastQuotation = ({ setComponentId, componentId, send }: Props) => {
  const router = useRouter();
  const routerId = router.query.preQuotation;

  return (
    <>
      <MypageHeader
        exitBtn={true}
        title={'최종 견적 작성'}
        handleOnClick={() => router.push('/company/sentProvisionalQuotation')}
      />
      <LastWrite />
    </>
  );
};

export default LastQuotation;
