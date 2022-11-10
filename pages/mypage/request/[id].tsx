import styled from '@emotion/styled';
import EstimateContainer from 'components/mypage/request/estimateContainer';
import MypageHeader from 'components/mypage/request/header';
import SubscriptionProduct from 'components/mypage/request/subscriptionProduct';
import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from 'styles/colors';
import CommunicationBox from 'components/CommunicationBox';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import RequestMain from 'components/mypage/request/requestMain';
import { useMutation, useQuery } from 'react-query';
import { isTokenGetApi, isTokenPatchApi } from 'api';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';
import { PreQuotationResponse } from './detail/[id]';
import BiddingQuote from 'components/mypage/request/BiddingQuote';
import { AxiosError } from 'axios';
import { SpotDataResponse } from 'componentsCompany/CompanyQuotation/SentQuotation/SentProvisionalQuoatation';
import ScheduleConfirm from 'components/mypage/request/ScheduleConfirm';
import ScheduleChange from 'components/mypage/request/ScheduleChange';
import Checking from 'components/mypage/request/Checking';
import FinalQuotation from 'components/mypage/request/FinalQuotation';
import Image from 'next/image';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import M17Modal from 'components/Modal/M17Modal';

export interface CompanyMemberAdditionalInfo {
  createdAt: string;
  companyMemberAdditionalInfoIdx: number;
  companyLogoImageUrl: string;
  companyName: string;
  companyAddress: string;
  companyDetailAddress: string;
  companyZipCode: string;
  managerEmail: string;
  memberIdx: number;
}

export interface PreQuotations {
  createdAt: string;
  preQuotationIdx: number;
  subscribePricePerMonth: number;
  constructionPeriod: number;
  subscribeProductFeature: string;
  preQuotationStatus: string;
  changedDate: string;
  quotationRequestIdx: number;
  memberIdx: number;
  companyMemberAdditionalInfo: CompanyMemberAdditionalInfo;
}

export interface QuotationRequestChargers {
  createdAt: string;
  quotationRequestChargerIdx: number;
  kind: string;
  standType: string;
  channel: string;
  count: number;
  quotationRequestIdx: number;
}
export interface QuotationRequests {
  createdAt: string;
  quotationRequestIdx: number;
  quotationStatus: string;
  changedDate: string;
  subscribeProduct: string;
  investRate: string;
  subscribePeriod: number;
  installationAddress: string;
  installationLocation: string;
  installationPurpose: string;
  expiredAt: string;
  etcRequest: string;
  memberIdx: number;
  quotationRequestChargers: QuotationRequestChargers[];
  hasCurrentInProgressPreQuotationIdx: boolean;
  currentInProgressPreQuotationIdx: number;
}
export interface QuotationRequestsResponse {
  isSuccess: boolean;
  quotationRequest: QuotationRequests;
  badge: string;
  preQuotations: PreQuotations[];
}

const TAG = '/page/mypage/request/[id].tsx';
const Mypage1_3 = ({}: any) => {
  const router = useRouter();
  const routerId = router?.query?.id!;
  const [otherPartnerModal, setOtherPartnerModal] = useState(false);

  //----------- 구매자 내견적 상세 조회 API ------------
  const { data, isError, isLoading, refetch } =
    useQuery<QuotationRequestsResponse>(
      'mypage/request/id',
      () => isTokenGetApi(`/quotations/request/${routerId}`),
      {
        enabled: router.isReady,
        // enabled: false,
      },
    );

  // ---------  가견적 상세조회 api -----------
  const {
    data: quotationData,
    isLoading: quotationLoading,
    isError: quotationError,
    error,
  } = useQuery<PreQuotationResponse, AxiosError>(
    'pre-quotation',
    () =>
      isTokenGetApi(
        `/quotations/pre/${data?.quotationRequest?.currentInProgressPreQuotationIdx}`,
      ),
    {
      enabled:
        data?.quotationRequest?.hasCurrentInProgressPreQuotationIdx === true,
      // enabled: false,
    },
  );

  // ---------- 현장 실사 날짜 api ------------
  const {
    data: spotData,
    isLoading: spotLoading,
    isError: spotIsError,
    refetch: spotRetch,
    error: spotError,
  } = useQuery<SpotDataResponse>(
    'spot-inspection',
    () =>
      isTokenGetApi(
        `/quotations/pre/${data?.quotationRequest?.currentInProgressPreQuotationIdx}/spot-inspection`,
      ),
    {
      enabled:
        data?.quotationRequest?.hasCurrentInProgressPreQuotationIdx === true,
      // enabled: false,
    },
  );
  // ----------- 다른 파트너 선정 patch api -----------
  const { mutate: otherPatchMutate, isLoading: otherPatchLoading } =
    useMutation(isTokenPatchApi, {
      onSuccess: () => {
        refetch();
      },
      onError: (error: any) => {
        console.log('다른 파트너 선정 patch error');
        console.log(error);
      },
    });
  // 모달 on / off
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // 모달 왼쪽, 오른쪽 버튼 핸들러
  const backPage = () => router.back();
  const handleOnClick = () => setModalOpen(!modalOpen);

  const onClickOtherPartner = () => {
    setOtherPartnerModal(true);
  };
  const onClickConfirm = () => {};

  const onClickOtherPartnerModal = () => {
    otherPatchMutate({
      url: `/quotations/pre/${quotationData?.preQuotation?.preQuotationIdx}`,
    });
  };

  if (isError || spotIsError) {
    return (
      <Modal
        text="다시 시도해주세요"
        click={() => {
          router.push('/');
        }}
      />
    );
  }
  if (isLoading || spotLoading) {
    return <Loader />;
  }
  console.log('⭐️ ~line 53 ~ 구매자 내견적 상세 조회');
  console.log(data);
  console.log(spotData);
  console.log(quotationData?.preQuotation?.finalQuotation);
  console.log(quotationData?.preQuotation?.finalQuotation === null);

  const spotInspection = spotData?.data?.spotInspection!;
  const hasReceivedSpotInspectionDates =
    spotData?.data?.hasReceivedSpotInspectionDates!;

  return (
    <>
      {/* 모달 */}
      {modalOpen && (
        <TwoBtnModal
          exit={handleOnClick}
          text="견적을 취소하시겠습니까?"
          leftBtnText="취소하기"
          leftBtnColor={colors.orange}
          rightBtnText="아니오"
          rightBtnColor={colors.main2}
          leftBtnControl={backPage}
          rightBtnControl={handleOnClick}
        />
      )}
      {/* 다른 파트너 모달 */}
      {otherPartnerModal && (
        <M17Modal
          backgroundOnClick={() => setOtherPartnerModal(false)}
          contents={'다른 파트너에게\n재견적을 받아보시겠습니까?'}
          leftText={'취소'}
          leftControl={() => setOtherPartnerModal(false)}
          rightText={'확인'}
          rightControl={onClickOtherPartnerModal}
        />
      )}

      <Body>
        <WebHeader num={0} now={'mypage'} />
        <Inner>
          <FlexBox>
            <Wrap1>
              <RequestMain page={0} />
            </Wrap1>
            <Wrap2>
              <MypageHeader
                title="내 견적서"
                cancel="견적 취소"
                back={true}
                handleOnClick={handleOnClick}
              />
              {/* 견적 상세 내용*/}
              <EstimateContainer data={data!} />
              <DownArrowBox>
                <Image src={DoubleArrow} alt="double-arrow" />
              </DownArrowBox>
              {/* 현장실사 해당 기업 상세 페이지 */}
              {!data?.quotationRequest?.hasCurrentInProgressPreQuotationIdx ? (
                // 구독 상품 리스트 (가견적 작성 회사)
                <>
                  <SubscriptionProduct data={data?.preQuotations!} />
                  <TextBox>
                    <div>선택하기 어려우신가요?</div>
                    <CommunicationBox
                      text="엔티즌과 소통하기"
                      clickHandler={() => router.push('/chatting/1')}
                    />
                  </TextBox>
                </>
              ) : (
                <>
                  {/* 상태에 따라 안내문 변경 */}
                  {quotationData?.preQuotation?.finalQuotation === null ? (
                    spotInspection !== null && spotInspection?.isConfirmed ? (
                      <ScheduleConfirm
                        date={spotInspection?.spotInspectionDate[0]}
                        spotId={
                          data?.quotationRequest
                            ?.currentInProgressPreQuotationIdx!
                        }
                      />
                    ) : hasReceivedSpotInspectionDates === true &&
                      spotInspection?.isNewPropose ? (
                      <ScheduleChange
                        spotId={
                          data?.quotationRequest
                            ?.currentInProgressPreQuotationIdx!
                        }
                      />
                    ) : (
                      <Checking
                        date={
                          spotData?.data?.spotInspection?.spotInspectionDate[0]!
                        }
                      />
                    )
                  ) : null}

                  {/* 최종견적 가견적 구별 조견문 */}

                  {quotationData?.preQuotation?.finalQuotation !== null ? (
                    <FinalQuotation
                      data={quotationData!}
                      isSpot={spotData?.data?.spotInspection ? true : false}
                    />
                  ) : (
                    <BiddingQuote
                      data={quotationData!}
                      isSpot={spotData?.data?.spotInspection ? true : false}
                    />
                  )}
                  <TextBox>
                    <CommunicationBox
                      text="파트너와 소통하기"
                      clickHandler={() => alert('개발중입니다.')}
                    />
                  </TextBox>
                  <ButtonBox>
                    <Button isWhite={true} onClick={onClickOtherPartner}>
                      다른 파트너 선정
                    </Button>
                    <Button isWhite={false} onClick={onClickConfirm}>
                      확정하기
                    </Button>
                  </ButtonBox>
                </>
              )}
            </Wrap2>
          </FlexBox>
        </Inner>
        <WebFooter />
      </Body>
    </>
  );
};

export default Mypage1_3;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;
const DownArrowBox = styled.div`
  padding-top: 21pt;
  padding-bottom: 30pt;
  text-align: center;
`;
const Inner = styled.div`
  display: block;
  position: relative;
  width: 900pt;
  margin: 45.75pt auto;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
  }
`;
const FlexBox = styled.div`
  display: flex;
  position: relative;
`;
const Wrap1 = styled.div`
  //width: 255pt;
  border: 1px solid #e9eaee;
  border-radius: 6pt;
  height: 100%;

  @media (max-width: 899pt) {
    display: none;
  }
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 60pt;

  @media (max-width: 899pt) {
    padding-left: 0pt;
    padding-bottom: 50pt;
  }
`;
const TextBox = styled.div`
  width: 100%;
  margin-bottom: 9pt;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    font-weight: 500;
    font-size: 12pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
  @media (max-width: 899pt) {
    padding-top: 75pt;
  }
`;
const ButtonBox = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  gap: 11.25pt;
  width: 100%;
  padding: 63pt 15pt 107.25pt 15pt;
`;
const Button = styled.button<{ isWhite: boolean }>`
  padding: 15pt 19.5pt;
  width: 100%;
  border: 0.75pt solid ${colors.main1};
  border-radius: 6pt;
  background-color: ${({ isWhite }) =>
    isWhite ? colors.lightWhite : colors.main};
  color: ${({ isWhite }) => (isWhite ? colors.main : colors.lightWhite)};
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  cursor: pointer;
`;
