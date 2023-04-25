import TwoBtnModal from 'components/Modal/TwoBtnModal';
import MypageHeader from 'components/mypage/request/header';
import LastWrite from 'componentsCompany/CompanyQuotation/LastQuotation';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

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
  maskingInstallationAddress: string;
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <MypageHeader
        exitBtn={true}
        title={'최종 견적 작성'}
        handleOnClick={() => setModalOpen(true)}
      />
      {modalOpen && (
        <TwoBtnModal
          text={
            '지금 나가시면\n작성하신 내용이 삭제됩니다.\n그래도 괜찮으시겠습니까?'
          }
          leftBtnText={'그만하기'}
          rightBtnText={'계속 작성하기'}
          leftBtnColor={'#A6A9B0'}
          rightBtnColor={'#5221CB'}
          leftBtnControl={() =>
            router.push({
              pathname: '/company/sentProvisionalQuotation',
              query: {
                preQuotationIdx: routerId,
              },
            })
          }
          rightBtnControl={() => setModalOpen(false)}
          exit={() => setModalOpen(false)}
        />
      )}

      {/* 최종 견적 작성란 */}
      <LastWrite />
    </>
  );
};

export default LastQuotation;
