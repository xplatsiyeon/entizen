import styled from '@emotion/styled';
import EstimateContainer from 'components/mypage/request/estimateContainer';
import MypageHeader from 'components/mypage/request/header';
import SubscriptionProduct from 'components/mypage/request/subscriptionProduct';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import colors from 'styles/colors';
import CommunicationBox from 'components/CommunicationBox';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import RequestMain from 'components/mypage/request/requestMain';
import { useMutation, useQuery } from 'react-query';
import { isTokenGetApi, isTokenPatchApi } from 'api';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';
import { FinalQuotations, PreQuotationResponse } from './detail';
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
import UserRightMenu from 'components/UserRightMenu';

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
  finalQuotation: FinalQuotations;
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
  // const routerId = router?.query?.id!;
  const routerId = router?.query?.quotationRequestIdx!;
  const [partnerModal, setPartnerModal] = useState(false);
  const [modalNumber, setModalNumber] = useState(-1);
  const [modalMessage, setModalMessage] = useState('');

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
        setPartnerModal(false);
      },
      onError: (error: any) => {
        console.log('다른 파트너 선정 patch error');
        console.log(error);
      },
    });
  // ----------- 최종견적 낙찰 확정 patch api -----------
  const { mutate: confirmPatchMutate, isLoading: confirmPatchLoading } =
    useMutation(isTokenPatchApi, {
      onSuccess: () => {
        setPartnerModal(false);
        router.replace('/mypage/request/complete');
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

  const onClickConfirm = (num: number, contents: string) => {
    setModalNumber(num);
    setPartnerModal(true);
    setModalMessage(contents);
  };
  /**
   * 다른 파트너 선정 api 호출 함수
   */
  const onClickOtherPartnerModal = () => {
    console.log('다른 파트너 확정 버튼');
    otherPatchMutate({
      url: `/quotations/pre/${data?.quotationRequest?.currentInProgressPreQuotationIdx}`,
    });
  };
  /**
   * 최종견적 낙찰 확정 api 호출 함수
   */
  const onClickConfirmModal = () => {
    console.log('최종견적 확정 버튼');
    const ConfirmId = data?.preQuotations?.filter(
      (e) =>
        e?.preQuotationIdx ===
        data?.quotationRequest?.currentInProgressPreQuotationIdx,
    );
    if (ConfirmId) {
      const finalQuotationIdx = ConfirmId[0].finalQuotation.finalQuotationIdx;
      confirmPatchMutate({
        url: `/quotations/final/${finalQuotationIdx}`,
      });
    }
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
  if (isLoading || spotLoading || otherPatchLoading || confirmPatchLoading) {
    return <Loader />;
  }

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
      {/* 확정하기 모달 */}
      {partnerModal && (
        <M17Modal
          backgroundOnClick={() => setPartnerModal(false)}
          contents={modalMessage}
          leftText={'취소'}
          leftControl={() => setPartnerModal(false)}
          rightText={'확인'}
          rightControl={
            modalNumber === 0 ? onClickOtherPartnerModal : onClickConfirmModal
          }
        />
      )}

      <Body>
        <WebHeader num={0} now={'mypage'} />
        <UserRightMenu />
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
              {/*--------------------- 상단 박스 ---------------------------------*/}
              <EstimateContainer data={data!} />
              <DownArrowBox>
                <Image src={DoubleArrow} alt="double-arrow" />
              </DownArrowBox>
              {/* 현장실사 해당 기업 상세 페이지 */}
              {!data?.quotationRequest?.hasCurrentInProgressPreQuotationIdx ? (
                // 구독 상품 리스트 (가견적 작성 회사)
                <React.Fragment>
                  <SubscriptionProduct data={data?.preQuotations!} />
                  <TextBox>
                    <div>선택하기 어려우신가요?</div>
                    <CommunicationBox text="엔티즌과 소통하기" />
                  </TextBox>
                </React.Fragment>
              ) : (
                <>
                  {/* 상태에 따라 안내문 변경 */}
                  {/* 최종견적이 없고 */}
                  {quotationData?.preQuotation?.finalQuotation === null &&
                  data.badge !== '최종견적 대기 중' ? (
                    // 변경 데이터가 있고, 확정이 아니라면
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
                  {data?.badge !== '낙찰성공' &&
                  // 백엔드와 소통 후 변경
                  // data?.quotationRequest?.hasCurrentInProgressPreQuotationIdx === true &&
                  quotationData?.preQuotation?.finalQuotation !== null ? (
                    <>
                      {/* 최종견적 상세 내용*/}
                      <FinalQuotation
                        data={quotationData!}
                        isSpot={spotData?.data?.spotInspection ? true : false}
                      />
                      <TextBox>
                        <CommunicationBox
                          text="파트너와 소통하기"
                          // clickHandler={() => alert('개발중입니다.')}
                        />
                      </TextBox>
                      <ButtonBox>
                        <Button
                          isWhite={true}
                          onClick={() =>
                            onClickConfirm(
                              0,
                              '다른 파트너에게\n재견적을 받아보시겠습니까?',
                            )
                          }
                        >
                          다른 파트너 선정
                        </Button>
                        <Button
                          isWhite={false}
                          onClick={() =>
                            onClickConfirm(
                              1,
                              'Charge Point로\n확정하시겠습니까?',
                            )
                          }
                        >
                          확정하기
                        </Button>
                      </ButtonBox>
                    </>
                  ) : (
                    <>
                      {/* 가견적  */}
                      <BiddingQuote
                        data={quotationData!}
                        isSpot={spotData?.data?.spotInspection ? true : false}
                      />
                      <TextBox>
                        <CommunicationBox
                          text="파트너와 소통하기"
                          // id={data?.}
                          // clickHandler={() => alert('개발중입니다.')}
                        />
                      </TextBox>
                    </>
                  )}
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
  background: #ffffff;

  @media (max-height: 809pt) {
    display: block;
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

  @media (max-width: 899.25pt) {
    width: 100%;
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

  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 60pt;

  @media (max-width: 899.25pt) {
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
  @media (max-width: 899.25pt) {
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
