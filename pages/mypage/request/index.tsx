import styled from '@emotion/styled';
import EstimateContainer from 'components/mypage/request/estimateContainer';
import MypageHeader from 'components/mypage/request/header';
import SubscriptionProduct from 'components/mypage/request/subscriptionProduct';
import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import colors from 'styles/colors';
import CommunicationBox from 'components/CommunicationBox';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import RequestMain from 'components/mypage/request/requestMain';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { isTokenGetApi, isTokenPatchApi } from 'api';
import { FinalQuotations } from './detail';
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
import OtherPartnerModal from 'components/Modal/OtherPartnerModal';
import UserRightMenu from 'components/UserRightMenu';
import CancelButton from 'components/mypage/request/CancelButton';
import { useDispatch } from 'react-redux';
import { redirectAction } from 'store/redirectUrlSlice';
import CommunicationIcon from 'public/images/communication-icon.svg';
import RightArrow from 'public/images/black-right-arrow.svg';
import { ChattingListResponse } from 'components/Chatting/ChattingLists';
import {
  preQuotationResPonse,
  PreQuotationsV1,
  QuotationDataV1Response,
  QuotationRequestV1,
} from 'types/quotation';
import ConfirmModal from 'components/Modal/ConfirmModal';

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
export interface Member {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  memberIdx: number;
  memberType: string;
  name: string;
  phone: string;
  id: string;
  isAdminJoinApproved: true;
  profileImageUrl: string;
  companyMemberAdditionalInfo: CompanyMemberAdditionalInfo;
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
  finalQuotation: FinalQuotations;
  member: Member;
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

const Mypage1_3 = ({}: any) => {
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);
  const router = useRouter();
  const routerId = router?.query?.quotationRequestIdx;
  const userID = JSON.parse(sessionStorage.getItem('USER_ID')!);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [partnerModal, setPartnerModal] = useState(false);
  const [modalNumber, setModalNumber] = useState(-1);
  const [modalMessage, setModalMessage] = useState('');
  const [isFinalItemIndex, setIsFinalItemIndex] = useState<number>(-1);

  // ==================== 간편 견적 조회 (V1) ====================
  const {
    data: quotationDataV1,
    isError: quotationErrorV1,
    isLoading: quotationLoadingV1,
    refetch: quotationRefresh,
  } = useQuery<QuotationDataV1Response, AxiosError, QuotationRequestV1>(
    'v1/quotation-requests',
    () =>
      isTokenGetApi(
        `/v1/quotation-requests/${router?.query?.quotationRequestIdx}`,
      ),
    {
      enabled:
        router.isReady && router?.query?.quotationRequestIdx !== undefined
          ? true
          : false,
      select(data) {
        return data.quotationRequest;
      },
      onSuccess(data) {},
      onError(err) {
        console.log('v1/quotation-requests 에러 발생');
        console.log('🔥 err : ', err);
      },
    },
  );

  // ---------  가견적 상세조회 API (V1) -----------
  const {
    data: preQuotationsData,
    isLoading: preQuotationsLoading,
    isError: preQuotationsError,
    refetch: preQuotationsRefetch,
  } = useQuery<preQuotationResPonse, AxiosError, PreQuotationsV1>(
    'v1/pre-quotations',
    () =>
      isTokenGetApi(
        `/v1/pre-quotations/${quotationDataV1?.currentInProgressPreQuotationIdx}`,
      ),
    {
      select(data) {
        return data.preQuotation;
      },
      retry: 0,
      enabled:
        quotationDataV1 &&
        typeof quotationDataV1.currentInProgressPreQuotationIdx === 'number'
          ? true
          : false,

      onSuccess(data) {
        console.log('🔥 data : ', data);
        console.log('data 실행');
      },
      onError(err) {
        console.log('v1/pre-quotations 에러 발생');
        console.log('🔥 err : ', err);
      },
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
        `/quotations/pre/${quotationDataV1?.currentInProgressPreQuotationIdx}/spot-inspection`,
      ),
    {
      enabled:
        router.isReady &&
        quotationDataV1?.hasCurrentInProgressPreQuotationIdx === true
          ? true
          : false,
    },
  );

  // 제휴문의 채팅방 보내기

  const { data: chattingData } = useQuery<ChattingListResponse>(
    'chatting-list',
    () => isTokenGetApi(`/chatting?searchKeyword&filter=all`),
    {
      enabled: userID !== null ? true : false,
    },
  );

  // 견적취소 버튼 체크
  const cencleBtnCheck =
    quotationDataV1?.badge === '견적취소' ||
    quotationDataV1?.badge === '낙찰성공'
      ? false
      : true;

  // ----------- 다른 파트너 선정 patch api -----------
  const { mutate: otherPatchMutate, isLoading: otherPatchLoading } =
    useMutation(isTokenPatchApi, {
      onSuccess: () => {
        setPartnerModal(false);
        // refetch();
        setIsFinalItemIndex(-1);
      },
      onError: (error: any) => {
        console.log(error);
      },
    });
  // ----------- 견적취소 하기 -----------
  const {
    mutate: patchMutate,
    isLoading: patchLoading,
    isError: patchError,
  } = useMutation(isTokenPatchApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('user-mypage');
    },
    onError: () => {
      // alert('삭제 실패');
    },
    onSettled: () => {},
  });

  const modalLeftBtnControll = () => {
    router.push('/mypage');
    if (routerId) {
      patchMutate({
        url: `/quotations/request/${routerId}`,
      });
    }
  };

  // ----------- 최종견적 낙찰 확정 patch api -----------
  const { mutate: confirmPatchMutate, isLoading: confirmPatchLoading } =
    useMutation(isTokenPatchApi, {
      onSuccess: () => {
        setPartnerModal(false);
        router.replace('/mypage/request/complete');
      },
      onError: (error: any) => {
        // console.log('다른 파트너 선정 patch error');
        console.log(error);
      },
    });

  // 모달 on / off
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOnClick = () => setModalOpen(!modalOpen);
  const handleBackOnClick = () => router.push('/mypage');
  const onClickConfirm = (num: number, contents: string) => {
    setModalNumber(num);
    setPartnerModal(true);
    setModalMessage(contents);
  };
  /**
   * 다른 파트너 선정 api 호출 함수
   */
  const onClickOtherPartnerModal = () => {
    const { currentInProgressPreQuotationIdx } = quotationDataV1!;

    if (currentInProgressPreQuotationIdx) {
      otherPatchMutate({
        url: `/quotations/pre/${currentInProgressPreQuotationIdx}`,
      });
    } else {
      setIsFinalItemIndex(-1);
      setPartnerModal(false);
    }
  };
  /**
   * 최종견적 낙찰 확정 api 호출 함수
   */
  const finalItme = quotationDataV1?.quotationStatusHistories?.filter(
    (e) => e.quotationRequestIdx === Number(routerId),
  )[isFinalItemIndex];
  const finalIndex =
    finalItme?.preQuotation?.finalQuotation?.finalQuotationIdx!;

  const onClickConfirmModal = async () => {
    confirmPatchMutate({
      url: `/quotations/final/${finalIndex}`,
    });
  };

  const onClickEntizenChatting = () => {
    const chattingRoomIdx =
      chattingData?.data?.chattingRooms?.entizenChattingRoom?.chattingRoomIdx;
    userID
      ? router.push({
          pathname: `/chatting/chattingRoom`,
          query: {
            chattingRoomIdx: chattingRoomIdx,
            entizen: true,
          },
        })
      : router.push('/signin');
  };

  const spotInspection = spotData?.data?.spotInspection!;
  const hasReceivedSpotInspectionDates =
    spotData?.data?.hasReceivedSpotInspectionDates!;
  // 데이터 갱신
  useEffect(() => {
    if (routerId && router.isReady) {
      quotationRefresh();
    }
  }, [router]);
  // 최종 견적 변경
  useLayoutEffect(() => {
    // 현재 진행중 index 업데이트
    const currentInProgressPreQuotationIdx =
      quotationDataV1?.currentInProgressPreQuotationIdx;
    // 진행 중인지 여부 확인 true / false
    const hasCurrentInProgressPreQuotationIdx =
      quotationDataV1?.hasCurrentInProgressPreQuotationIdx!;
    // 진행중이라면 전체 견적서에서 진행중인 idx값 추출
    if (hasCurrentInProgressPreQuotationIdx) {
      let isFinal = false;
      quotationDataV1?.quotationStatusHistories?.forEach((data, index) => {
        const preQuotationIdx =
          data?.preQuotation?.finalQuotation?.preQuotationIdx!;

        if (preQuotationIdx === currentInProgressPreQuotationIdx!) {
          isFinal = true;
          setIsFinalItemIndex(index);
        }
      });

      if (isFinal === false) {
        setIsFinalItemIndex(-1);
      }
    } else {
      setIsFinalItemIndex(-1);
    }
  }, [quotationDataV1, preQuotationsData]);

  const target = quotationDataV1?.quotationStatusHistories.filter(
    (item) =>
      item.preQuotationIdx === quotationDataV1.currentInProgressPreQuotationIdx,
  )[0];

  if (!accessToken && memberType !== 'USER') {
    dispatch(redirectAction.addUrl(router.asPath));
    router.push('/signin');
  } else {
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
            leftBtnControl={modalLeftBtnControll}
            rightBtnControl={handleOnClick}
          />
        )}
        {/* 확정하기 모달 */}
        {modalNumber === 1 && partnerModal && (
          <ConfirmModal
            onClose={() => setPartnerModal(false)}
            onClick={onClickConfirmModal}
            leftText="확인"
            rightText="취소"
            contents={`${preQuotationsData?.member?.companyMemberAdditionalInfo?.companyName}로\n 확정하시겠습니까?`}
          />
        )}

        {/* 다른파트너 모달 */}
        {modalNumber === 0 && partnerModal && (
          <OtherPartnerModal
            modalNumber={modalNumber}
            quotationDataV1={quotationDataV1!}
            backgroundOnClick={() => setPartnerModal(false)}
            contents={modalMessage}
            rightText={'확인'}
            rightControl={onClickOtherPartnerModal}
            leftText={'취소'}
            leftControl={() => setPartnerModal(false)}
          />
        )}

        <Body>
          <WebHeader num={0} now={'mypage'} sub={'mypage'} />
          <UserRightMenu />
          <Inner>
            <FlexBox>
              {/* ================ 웹 왼쪽 리스트 박스 ======================= */}
              <Wrap1>
                <RequestMain page={0} />
              </Wrap1>
              <Wrap2>
                <MypageHeader
                  title="내 견적서"
                  cancel={cencleBtnCheck ? '견적 취소' : undefined}
                  back={true}
                  handle={true}
                  handleOnClick={cencleBtnCheck ? handleOnClick : undefined}
                  handleBackClick={handleBackOnClick}
                />
                {/*================================== 상단 박스 ==================================*/}
                <EstimateContainer data={quotationDataV1!} />
                {cencleBtnCheck && (
                  <CancelButton handleOnClick={handleOnClick} />
                )}
                <DownArrowBox>
                  <Image src={DoubleArrow} alt="double-arrow" />
                </DownArrowBox>

                {/* 현장실사 해당 기업 상세 페이지 */}
                {!quotationDataV1?.hasCurrentInProgressPreQuotationIdx &&
                isFinalItemIndex === -1 ? (
                  // ================================== 구독 상품 리스트 (가견적 작성 회사) ==================================
                  <React.Fragment>
                    {/* 구독 상품 리스트 */}
                    <SubscriptionProduct
                      data={quotationDataV1!}
                      setIsFinalItmeIndex={setIsFinalItemIndex}
                    />
                    {/* 엔티즌 소통하기 */}
                    <AdminBtnWrap>
                      <p>선택하기 어려우신가요?</p>
                      <button onClick={onClickEntizenChatting}>
                        <Image src={CommunicationIcon} alt="right-arrow" />
                        엔티즌과 소통하기
                        <Image src={RightArrow} alt="right-arrow" />
                      </button>
                    </AdminBtnWrap>
                  </React.Fragment>
                ) : (
                  <>
                    {/* ============================= 상태에 따라 안내문 변경 ============================ */}
                    {/* 최종견적이 없고 */}

                    {target?.preQuotation?.finalQuotation === null &&
                    quotationDataV1?.badge !== '최종견적 대기 중' ? (
                      // 변경 데이터가 있고, 확정이 아니라면
                      spotInspection !== null && spotInspection?.isConfirmed ? (
                        <ScheduleConfirm
                          date={spotInspection?.spotInspectionDate[0]}
                          spotId={
                            quotationDataV1?.currentInProgressPreQuotationIdx!
                          }
                          routerId={routerId}
                        />
                      ) : hasReceivedSpotInspectionDates === true &&
                        // 일정 변경 데이터
                        spotInspection?.isNewPropose ? (
                        <ScheduleChange
                          spotId={
                            quotationDataV1?.currentInProgressPreQuotationIdx!
                          }
                          routerId={routerId}
                        />
                      ) : (
                        // 현장 실사 확인 중
                        spotData?.data?.spotInspection
                          ?.spotInspectionDate[0]! && (
                          <Checking
                            date={
                              spotData?.data?.spotInspection
                                ?.spotInspectionDate[0]!
                            }
                          />
                        )
                      )
                    ) : null}

                    {/* 최종견적 가견적 구별 조견문 */}
                    {isFinalItemIndex !== -1 ? (
                      <>
                        {/* --------------------최종견적 상세 내용--------------------------*/}
                        <FinalQuotation
                          data={
                            quotationDataV1?.quotationStatusHistories[
                              isFinalItemIndex
                            ]!
                          }
                          isFinalItmeIndex={isFinalItemIndex}
                          isSpot={spotData?.data?.spotInspection ? true : false}
                        />
                        <TextBox>
                          <CommunicationBox
                            text="파트너와 소통하기"
                            id={
                              target?.preQuotation?.member
                                ?.companyMemberAdditionalInfo?.memberIdx
                            }
                          />
                        </TextBox>
                        {router.isReady &&
                        router.query.history === undefined ? (
                          <ButtonBox>
                            <Button
                              isWhite={true}
                              onClick={() =>
                                onClickConfirm(
                                  0,
                                  '다른 파트너에게\n 재견적을 받아보시겠습니까?',
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
                                  `${finalItme?.preQuotation?.member
                                    ?.companyMemberAdditionalInfo
                                    ?.companyName!}로\n확정하시겠습니까?`,
                                )
                              }
                            >
                              확정하기
                            </Button>
                          </ButtonBox>
                        ) : (
                          ''
                        )}
                      </>
                    ) : (
                      <>
                        {/* ----------------------가견적------------------------- */}
                        <SendTextTitle>보낸 가견적서</SendTextTitle>
                        <BiddingQuote
                          data={preQuotationsData!}
                          isSpot={spotData?.data?.spotInspection ? true : false}
                        />
                        <TextBox>
                          <CommunicationBox
                            text="파트너와 소통하기"
                            id={
                              target?.preQuotation?.member
                                ?.companyMemberAdditionalInfo?.memberIdx
                            }
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
  }
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
  padding-top: 36.75pt;
  padding-bottom: 30pt;
  text-align: center;
  @media (max-width: 900pt) {
    padding-top: 25.5pt;
    padding-bottom: 34.5pt;
  }
`;

const ImgTag = styled.img`
  width: 48px;
  height: 48px;
`;
const Inner = styled.div`
  display: block;
  position: relative;
  width: 900pt;
  margin: 60pt auto;

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
  border-radius: 12pt;
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

  @media (min-width: 900pt) {
    width: 580.5pt;
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
    padding-top: 25pt;
  }
  @media (min-width: 900pt) {
    margin-top: 57pt;
  }
`;

const SendTextTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18pt;
  font-weight: 700;
  line-height: 18.75pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #5221cb;
  padding-top: 60pt;
  padding-bottom: 21pt;
  margin: 0 auto;
`;

const ButtonBox = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  gap: 11.25pt;
  width: 100%;
  /* padding: 63pt 15pt 107.25pt 15pt; */
  padding: 50pt 15pt 50pt 15pt;
`;
const Button = styled.button<{ isWhite: boolean }>`
  font-family: 'Spoqa Han Sans Neo';
  /* padding: 15pt 18.5pt; */
  padding: 15pt 0;
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
const AdminBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15pt;
  margin-top: 45pt;
  p {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 12pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10.5pt 12pt;
    border-radius: 21.75pt;
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    background: #f3f4f7;
    color: ${colors.main2};
    width: 146.25pt;
    margin: 0 auto;
    cursor: pointer;
  }

  @media (min-width: 899.25pt) {
    display: none;
  }
`;
