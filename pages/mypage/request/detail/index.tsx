import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TwoButton from 'components/mypage/request/TwoButton';
import BiddingQuote from 'components/mypage/request/BiddingQuote';
import styled from '@emotion/styled';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import { AxiosError } from 'axios';
import {
  ChargerFiles,
  CompanyMemberAdditionalInfo,
  QuotationRequest,
  SpotDataResponse,
} from 'componentsCompany/CompanyQuotation/SentQuotation/SentProvisionalQuoatation';
import RequestDetailModal from 'components/Modal/RequestDetailModal';
import {
  preQuotationResPonse,
  PreQuotationsV1,
  QuotationDataV1Response,
  QuotationRequestV1,
} from 'types/quotation';
// export interface PreQuotationChargers {
//   createdAt: string;
//   preQuotationChargerIdx: number;
//   chargePriceType: string;
//   chargePrice: number;
//   modelName: string;
//   manufacturer: string;
//   productFeature: string;
//   preQuotationIdx: number;
//   preQuotationFiles: ChargerFiles[];
//   chargerImageFiles: ChargerFiles[];
//   catalogFiles: ChargerFiles[];
// }
// export interface Member {
//   memberIdx: number;
//   memberType: string;
//   name: string;
//   phone: string;
//   id: string;
// }

// export interface ChargerImageFiles {
//   createdAt: string;
//   finalQuotationChargerFileIdx: number;
//   productFileType: string;
//   originalName: string;
//   url: string;
//   size: number;
//   finalQuotationChargerIdx: number;
// }

// export interface FinalQuotationChargers {
//   createdAt: string;
//   finalQuotationChargerIdx: number;
//   kind: string;
//   standType: string;
//   channel: string;
//   count: number;
//   chargePriceType: string;
//   chargePrice: number;
//   installationLocation: string;
//   modelName: string;
//   manufacturer: string;
//   productFeature: string;
//   finalQuotationIdx: number;
//   chargerImageFiles: ChargerImageFiles[];
//   catalogFiles: ChargerImageFiles[];
// }
// export interface FinalQuotationDetailFiles {
//   createdAt: string;
//   finalQuotationDetailFileIdx: number;
//   finalQuotationIdx: number;
//   originalName: string;
//   size: number;
//   url: string;
// }
// export interface FinalQuotations {
//   createdAt: string;
//   finalQuotationIdx: number;
//   chargingStationInstallationPrice: number;
//   subscribeProduct: string;
//   subscribePeriod: number;
//   userInvestRate: string;
//   chargingPointRate: string;
//   subscribePricePerMonth: number;
//   constructionPeriod: number;
//   subscribeProductFeature: string;
//   spotInspectionResult: string;
//   quotationRequestIdx: number;
//   preQuotationIdx: number;
//   finalQuotationChargers: FinalQuotationChargers[];
//   finalQuotationDetailFiles: FinalQuotationDetailFiles[];
// }
// export interface PreQuotation {
//   createdAt: string;
//   preQuotationIdx: number;
//   chargingStationInstallationPrice: number;
//   subscribePricePerMonth: number;
//   constructionPeriod: number;
//   subscribeProductFeature: string;
//   preQuotationStatus: string;
//   changedDate: string;
//   quotationRequestIdx: number;
//   memberIdx: number;
//   preQuotationChargers: PreQuotationChargers[];
//   member: Member;
//   finalQuotation: FinalQuotations;
// }
// export interface PreQuotationResponse {
//   isSuccess: boolean;
//   companyMemberAdditionalInfo: CompanyMemberAdditionalInfo;
//   preQuotation: PreQuotation;
//   quotationRequest: QuotationRequest;
// }

const MypageDetail = () => {
  const [isModal, setModal] = useState(false);
  const router = useRouter();
  const routerId = router?.query?.preQuotationIdx;
  const handleOnClick = () => router.back();

  // ---------  가견적 상세조회 API (v1) -----------
  const {
    data: preQuotationsData,
    isLoading: preQuotationsLoading,
    isError: preQuotationsError,
    refetch: preQuotationsRefetch,
  } = useQuery<preQuotationResPonse, AxiosError, PreQuotationsV1>(
    'v1/pre-quotations',
    () => isTokenGetApi(`/v1/pre-quotations/${routerId}`),
    {
      select(data) {
        return data.preQuotation;
      },
      enabled: router.isReady,
      retry: 0,
    },
  );

  // ==================== 간편 견적 조회 V1 ====================
  const {
    data: quotationDataV1,
    isError: quotationErrorV1,
    isLoading: quotationLoadingV1,
    refetch: quotationRefetch,
  } = useQuery<QuotationDataV1Response, AxiosError, QuotationRequestV1>(
    'v1/quotation-requests',
    () =>
      isTokenGetApi(
        `/v1/quotation-requests/${preQuotationsData?.quotationRequest?.quotationRequestIdx}`,
      ),
    {
      enabled: router.isReady && preQuotationsData ? true : false,
      select(data) {
        return data.quotationRequest;
      },
    },
  );

  // 모달창에 넘겨 줄 기업이름
  const ModalCompany =
    preQuotationsData?.member?.companyMemberAdditionalInfo?.companyName;
  // ---------- 현장 실사 날짜 api ------------
  const {
    data: spotData,
    isLoading: spotLoading,
    isError: spotIsError,
    error: spotError,
  } = useQuery<SpotDataResponse>(
    'spot-inspection',
    () => isTokenGetApi(`/quotations/pre/${routerId}/spot-inspection`),
    {
      enabled: router.isReady,
    },
  );
  // 모달 컨트롤
  const onClcikModal = () => setModal((prev) => !prev);

  const rightControl = () =>
    router.push({
      pathname: `/mypage/request/detail/calendar`,
      query: {
        preQuotationIdx: routerId,
      },
    });

  useEffect(() => {
    if (router.isReady) {
      preQuotationsRefetch();
      quotationRefetch();
    }
  }, [routerId]);

  if (preQuotationsError && spotIsError) {
    // console.log(TAG + '🔥 ~line 35 ~ 에러코드 확인');
    // console.log(error);
  }
  if (preQuotationsLoading && spotLoading) {
    return <Loader />;
  }
  // console.log(TAG + '🔥 ~line 95 현장실사 데이터 api 로그');
  // console.log(spotData);

  return (
    <WebBody>
      <WebHeader />
      <Inner>
        <Wrapper>
          {isModal && (
            <RequestDetailModal
              exit={() => setModal((prev) => !prev)}
              title={`${ModalCompany}의 \n 구독상품으로 선택하시겠습니까?`}
              subtitle={
                '선택 후 정확한 견적을 위해 현장실사가 진행되며, \n고객님의 연락처가 전달됩니다.'
              }
              leftControl={onClcikModal}
              rightControl={rightControl}
            />
          )}
          {/* 헤더 */}
          <MypageHeader
            title="상세내용"
            exitBtn={true}
            handleOnClick={handleOnClick}
          />
          {/* 담당자 정보 */}
          <BiddingQuote
            quotationNewData={quotationDataV1!}
            pb={0}
            data={preQuotationsData!}
            onClcikModal={onClcikModal}
          />

          <WebHide>
            <TwoButton
              onClcikModal={onClcikModal}
              id={
                preQuotationsData?.member?.companyMemberAdditionalInfo
                  ?.memberIdx!
              }
            />
          </WebHide>
        </Wrapper>
      </Inner>
      <WebFooter />
    </WebBody>
  );
};

export default MypageDetail;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 54pt auto;
  width: 900pt;
  border-radius: 12pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  padding-bottom: 20pt;
`;

const WebHide = styled.div`
  @media (min-width: 900pt) {
    display: none;
  }
`;
