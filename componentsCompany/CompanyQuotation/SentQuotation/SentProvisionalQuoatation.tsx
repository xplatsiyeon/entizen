import styled from '@emotion/styled';
import { ListItemButton, ListItemText } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import colors from 'styles/colors';
import CenterBox from './CenterBox';
import TopBox from './TopBox';
import BottomBox from './BottomBox';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { isTokenGetApi, isTokenPatchApi } from 'api';
import FinalBottomBox from './FinalBottomBox';
import Modal from 'components/Modal/Modal';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import SignUpHeader from 'components/SignUp/header';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import LeftProjectQuotationBox from '../LeftProjectQuotationBox';
import WebFooter from 'componentsWeb/WebFooter';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import CommunicationBox from 'components/CommunicationBox';
import Loader from 'components/Loader';
import { useDispatch } from 'react-redux';
import { redirectAction } from 'store/redirectUrlSlice';
import RequestHeader from '../RecievedQuotation/RequestHeader';
import { useMediaQuery } from 'react-responsive';
import ConfirmModal from 'components/Modal/ConfirmModal';

export interface ChargerFiles {
  createdAt: string;
  chargerProductFileIdx: number;
  productFileType: string;
  originalName: string;
  url: string;
  size: number;
  preQuotationChargerIdx: number;
}
export interface PreQuotationCharger {
  createdAt: string;
  preQuotationChargerIdx: number;
  chargePriceType:
    | ''
    | 'PURCHASER_AUTONOMY'
    | 'OPERATION_BUSINESS_CARRIER_INPUT';
  chargePrice: number;
  modelName: string;
  manufacturer: string;
  productFeature: string;
  preQuotationIdx: number;
  preQuotationFiles: ChargerFiles[];
  chargerImageFiles: ChargerFiles[];
  catalogFiles: ChargerFiles[];
}
export interface Member {
  memberIdx: number;
  memberType: string;
  name: string;
  phone: string;
  id: string;
}
export interface FinalQuotationDetailFiles {
  createdAt: string;
  finalQuotationDetailFileIdx: number;
  originalName: string;
  url: string;
  size: number;
  finalQuotationIdx: number;
}
export interface FinalQuotationChargerFiles {
  createdAt: string;
  finalQuotationChargerFileIdx: number;
  productFileType: string;
  originalName: string;
  url: string;
  size: number;
  finalQuotationChargerIdx: number;
}
export interface FinalQuotationChargers {
  createdAt: string;
  finalQuotationChargerIdx: number;
  kind: string;
  standType: string;
  channel: string;
  count: number;
  chargePriceType:
    | ''
    | 'PURCHASER_AUTONOMY'
    | 'OPERATION_BUSINESS_CARRIER_INPUT';
  chargePrice: number;
  installationLocation: '' | 'OUTSIDE' | 'INSIDE';
  modelName: string;
  manufacturer: string;
  productFeature: string;
  finalQuotationIdx: number;
  chargerImageFiles: FinalQuotationChargerFiles[];
  catalogFiles: FinalQuotationChargerFiles[];
}
export interface FinalQuotation {
  createdAt: string;
  finalQuotationIdx: number;
  chargingStationInstallationPrice: number;
  subscribeProduct: string;
  subscribePeriod: number;
  userInvestRate: string;
  chargingPointRate: string;
  subscribePricePerMonth: number;
  constructionPeriod: number;
  subscribeProductFeature: string;
  spotInspectionResult: string;
  quotationRequestIdx: number;
  preQuotationIdx: number;
  finalQuotationChargers: FinalQuotationChargers[];
  finalQuotationDetailFiles: FinalQuotationDetailFiles[];
}
export interface PreQuotation {
  createdAt: string;
  preQuotationIdx: number;
  subscribePricePerMonth: number;
  chargingStationInstallationPrice: number;
  constructionPeriod: number;
  subscribeProductFeature: string;
  preQuotationStatus: string;
  changedDate: string;
  quotationRequestIdx: number;
  memberIdx: number;
  preQuotationCharger: PreQuotationCharger[];

  finalQuotation: FinalQuotation;
}
export interface BusinessRegistrationFiles {
  createdAt: string;
  businessRegistrationFileIdx: number;
  originalName: string;
  url: string;
  size: number;
  memberIdx: number;
}
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
  businessRegistrationFiles: BusinessRegistrationFiles[];
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
export interface QuotationRequest {
  createdAt: string;
  quotationRequestIdx: number;
  quotationStatus: string;
  changedDate: string;
  subscribeProduct: string;
  investRate: string;
  subscribePeriod: number;
  installationAddress: string;
  installationLocation: '' | 'OUTSIDE' | 'INSIDE';
  installationPurpose: string;
  expiredAt: string;
  etcRequest: string;
  memberIdx: number;
  quotationRequestChargers: QuotationRequestChargers[];
  member: Member;
  installationAddress: string;
}
export interface SentRequestResponse {
  isSuccess: boolean;
  sendQuotationRequest: {
    preQuotation: PreQuotation;
    badge: string | undefined;
    quotationRequest: QuotationRequest;
    companyMemberAdditionalInfo: CompanyMemberAdditionalInfo;
  };
}

export interface SpotData {
  hasReceivedSpotInspectionDates: boolean;
  spotInspection: {
    createdAt: string;
    spotInspectionIdx: number;
    proposerType: string;
    spotInspectionDate: string[];
    isConfirmed: boolean;
    isReplacedPicture: boolean;
    isNewPropose: boolean;
    preQuotationIdx: number;
  };
}
export interface SpotDataResponse {
  isSuccess: boolean;
  data: SpotData;
}
const TAG =
  'components/Company/CompanyQuotation/SentQuotation/SentProvisionalQuoatation.tsx';
// 본체
const SentQuoatationFirst = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const routerId = router?.query?.preQuotationIdx!;
  const historyId = router?.query?.historyIdx!;
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);

  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);
  // 현장실사 완료 모달
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  // 에러 모달
  const [isModal, setIsModal] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // 상단 열고 닫기
  const [open, setOpen] = useState<boolean>(false);
  // step 숫자
  const [tabNumber, setTabNumber] = useState<number>(1);
  const [componentId, setComponentId] = useState<number>();
  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);
  // LeftBox component 바꿔주는거
  const [underNum, setUnderNum] = useState<number>();

  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  // ----------- 보낸 견적 상세 페이지 api --------------
  const { data, isLoading, isError, error, refetch, remove } =
    useQuery<SentRequestResponse>(
      'company',
      () => isTokenGetApi(`/quotations/sent-request/${routerId || historyId}`),
      {
        enabled: router.isReady && accessToken ? true : false,
        // suspense: true,
        // enabled: false,
      },
    );
  // ---------- 현장 실사 날짜 api ------------
  const {
    data: spotData,
    isLoading: spotLoading,
    isError: spotIsError,
    error: spotError,
    refetch: spotRefetch,
    remove: spotRemove,
  } = useQuery<SpotDataResponse>(
    'spot-inspection',
    () =>
      isTokenGetApi(`/quotations/pre/${routerId || historyId}/spot-inspection`),
    {
      enabled: router.isReady && accessToken ? true : false,
      // enabled: false,
    },
  );
  const { mutate: spotPatchMutate, isLoading: spotPatchLoading } = useMutation(
    isTokenPatchApi,
    {
      onSuccess: (data) => {
        // console.log('호출 성공');
        // console.log(data);
        setIsConfirmModal(false);
        refetch();
      },
      onError: (error: any) => {
        if (error.response.data) {
          setErrorMessage(error.response.data.message);
          setIsModal(true);
        } else {
          setErrorMessage('다시 시도해주세요');
          setIsModal(true);
          setNetworkError(true);
        }
      },
    },
  );

  // 모달 클릭
  const onClickModal = () => {
    if (networkError) {
      setIsModal(false);
      router.push('/');
    } else {
      setIsModal(false);
    }
  };
  // 상단 열리고 닫히고
  const handleClick = () => setOpen(!open);

  const onClickSpot = () => {
    spotPatchMutate({
      url: `/quotations/pre/${routerId}/spot-inspection`,
    });
    // console.log('현장실사 patch api 호출!!');
  };

  // 모바일 헤더 뒤로가기 버튼
  const onClickBackBtn = () => {
    router.push({
      pathname: '/company/quotation',
      query: {
        id: 1,
      },
    });
  };

  useEffect(() => {
    if (router.query.preQuotationIdx) {
      const num = Number(router.query.preQuotationIdx);
      setComponentId(num);
    }
  }, [router.query.preQuotationIdx]);

  useEffect(() => {
    if (router.query.preQuotationIdx) setOpenSubLink(false);
  }, [router]);

  // 히스토리 때문에 step 바꿔주는거
  useEffect(() => {
    if (
      router.pathname === `/company/sentProvisionalQuotation` &&
      router.query.historyIdx
    ) {
      setTabNumber(2);
    }
  }, [router]);

  useEffect(() => {
    if (router.isReady) {
      spotRefetch();
      refetch();
    }
  }, [routerId, historyId]);

  useEffect(() => {
    return () => {
      spotRemove();
      remove();
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || spotIsError) {
    // console.log(TAG + '🔥 ~line 42 에러 코드');
    // console.log(error);
    // console.log(spotError);
  }
  // console.log(TAG + '\n🔥 ~line 138 spotdata check');
  // console.log(spotData);
  // console.log(TAG + '\n🔥 ~line 138 보낸견적 상세페이지');
  // console.log(data);

  if (!accessToken && memberType !== 'COMPANY') {
    dispatch(redirectAction.addUrl(router.asPath));
    router.push('/signin');
    return <div></div>;
  } else {
    return (
      <>
        <WebBuyerHeader
          tabNumber={tabNumber}
          setTabNumber={setTabNumber}
          componentId={componentId}
          openSubLink={openSubLink}
          setOpenSubLink={setOpenSubLink}
        />
        <Wrapper>
          {mobile && (
            <RequestHeader
              back={true}
              title={'보낸 견적'}
              handleBackClick={onClickBackBtn}
            />
          )}
          {/* 현장실사 완료 모달 */}
          {isConfirmModal && (
            <TwoBtnModal
              exit={() => setIsConfirmModal(false)}
              leftBtnText={'취소'}
              leftBtnColor={colors.main2}
              leftBtnControl={() => setIsConfirmModal(false)}
              rightBtnText={'완료하기'}
              rightBtnColor={colors.main}
              rightBtnControl={onClickSpot}
              text={'현장실사를 완료하시겠습니까?'}
            />
          )}
          {/* 에러 모달 */}
          {isModal && <Modal click={onClickModal} text={errorMessage} />}
          <CompanyRightMenu />
          <WebRapper>
            {!mobile && (
              <LeftProjectQuotationBox
                underNum={underNum}
                setUnderNum={setUnderNum}
                componentId={componentId}
                setComponentId={setComponentId}
              />
            )}
            {/* 구매자 견적 정보 */}
            <WebColumnContainer>
              {!mobile && (
                <CustomerRequestContent>고객 요청 내용</CustomerRequestContent>
              )}
              {/* 상단 상세 정보 */}
              <TopBox
                handleClick={handleClick}
                open={open}
                setOpen={setOpen}
                data={data!}
                spotData={spotData!}
              />
              {/* 일정 변경 컴포넌트 */}
              <CenterBox data={data!} spotData={spotData!} />
              {/* 하단 내용 - 최종 견적 작성 후 생김*/}
              {data?.sendQuotationRequest?.preQuotation?.finalQuotation && (
                <>
                  <FinalBottomBox data={data!} />
                  {data?.sendQuotationRequest?.badge === '낙찰대기 중' && (
                    <BtnBox>
                      <EditBtn
                        onClick={() =>
                          router.push({
                            pathname: '/company/quotation/lastQuotation',
                            query: {
                              preQuotation: routerId,
                              finalQuotationIdx:
                                data?.sendQuotationRequest?.preQuotation
                                  ?.finalQuotation?.finalQuotationIdx,
                            },
                          })
                        }
                      >
                        수정하기
                      </EditBtn>
                    </BtnBox>
                  )}
                </>
              )}
              {/* 하단 내용 - 가견적 작성 후 생김 */}
              {!data?.sendQuotationRequest?.preQuotation?.finalQuotation && (
                <>
                  <BottomBox data={data!} />
                  {/* 가견적 수정하기 버튼 */}
                  {data?.sendQuotationRequest?.badge?.includes('견적마감') ||
                    (data?.sendQuotationRequest?.badge?.includes(
                      '선택대기',
                    ) && (
                      <BtnBox>
                        {/* 부분 구독 판별 */}
                        <EditBtn
                          onClick={() =>
                            router.push({
                              pathname: '/company/recievedRequest',
                              query: {
                                part:
                                  data?.sendQuotationRequest?.quotationRequest
                                    ?.subscribeProduct === 'PART'
                                    ? true
                                    : false,
                                edit: true,
                                quotationRequestIdx: routerId,
                              },
                            })
                          }
                        >
                          가견적 수정하기
                        </EditBtn>
                      </BtnBox>
                    ))}
                </>
              )}
              {/* 현장실사 예약 완료 -> 현장 실사 완료 버튼 생성*/}
              {data?.sendQuotationRequest?.badge === '현장실사 예약 완료' && (
                <LastQuotationBtnBox2>
                  <LastBtn onClick={() => setIsConfirmModal(true)}>
                    현장실사 완료
                  </LastBtn>
                </LastQuotationBtnBox2>
              )}
              {/* 최종견적 입력 중 -> 최종견적 작성 페이지로 이동 버튼 생성 */}
              {data?.sendQuotationRequest?.badge === '최종견적 입력 중' && (
                <LastQuotationBtnBox>
                  <Blur />
                  <BlurTwo />
                  <LastBtn
                    onClick={() =>
                      router.push({
                        pathname: '/company/quotation/lastQuotation',
                        query: {
                          preQuotation: routerId,
                        },
                      })
                    }
                  >
                    최종견적 작성
                  </LastBtn>
                </LastQuotationBtnBox>
              )}
              {/* // 고객과 소통하기 -> 현장실사 일정 나오면 생김 */}
              {spotData?.data?.spotInspection && (
                <CommunicationWrapper>
                  <CommunicationBox
                    text={'고객과 소통하기'}
                    id={data?.sendQuotationRequest?.quotationRequest?.memberIdx}
                  />
                </CommunicationWrapper>
              )}
            </WebColumnContainer>
          </WebRapper>
        </Wrapper>
        <WebFooter />
      </>
    );
  }
};

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  @media (max-height: 350pt) {
    height: 100%;
    display: block;
  }
`;

const Container = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
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

  @media (min-width: 900pt) {
    padding: 0 0 42pt;
  }
`;

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    display: flex;
    width: 900pt;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 54pt;
    margin-bottom: 54pt;
  }
`;

const WebColumnContainer = styled.div`
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
    width: 580.5pt;
  }
`;

const CustomerRequestContent = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 15pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: ${colors.main};
  margin-top: 21pt;

  @media (min-width: 900pt) {
    padding-top: 0;
    margin-top: 0;
    margin-bottom: 21pt;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 18pt;
    font-weight: 700;
    line-height: 18.75pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;

const Wrapper = styled.div`
  padding-bottom: 75pt;
  @media (min-width: 900pt) {
    padding-bottom: 0;
  }
`;
const ItemButton = styled(ListItemButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  & div {
    margin: 0;
  }
`;

const StoreName = styled(ListItemText)`
  padding-top: 16.5pt;
  padding-bottom: 16.5pt;
  margin-top: 4.5pt;
  & div {
    margin-top: 12pt;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
  }
  & div > h1 {
    font-weight: 700;
    font-size: 15pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  & div > img {
    display: flex;
    align-items: center;
  }
  & p {
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;

const ArrowImg = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 6.5pt;
  width: 18pt;
  height: 18pt;
`;

const Contents = styled.div`
  padding-top: 19.5pt;
  padding-bottom: 18pt;
  border-bottom: 0.75pt solid #e9eaee;
  .text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
    }

    .emailText {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }

  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .text {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .img-box {
    padding-top: 42pt;
    padding-bottom: 24pt;
    text-align: center;
  }
`;

const Partner = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
  padding-bottom: 24pt;
`;

const EditBtn = styled.div`
  margin-top: 27pt;
  padding-top: 15pt;
  text-align: center;
  padding-bottom: 15pt;
  border: 0.75pt solid ${colors.main};
  color: ${colors.main};
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  cursor: pointer;
  @media (min-width: 900pt) {
    width: 580.5pt;
  }
`;

const BtnBox = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  padding-bottom: 73.5pt;
  @media (min-width: 900pt) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 42pt; */
  margin: 42pt auto 0pt auto;
  padding: 10.5pt 12pt;
  border-radius: 21.75pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  background: #f3f4f7;
  color: ${colors.main2};
  cursor: pointer;
`;

const LastQuotationBtnBox = styled.div`
  position: fixed;
  bottom: 30pt;
  width: 100%;
  box-sizing: border-box;
  padding-left: 15pt;
  padding-right: 15pt;
  z-index: 999;
  @media (min-width: 900pt) {
    position: relative;
    padding-left: 0;
    padding-right: 0;
    padding-top: 45pt;
  }
`;

const LastQuotationBtnBox2 = styled.div`
  position: fixed;
  bottom: 30pt;
  width: 100%;
  box-sizing: border-box;
  padding-left: 15pt;
  padding-right: 15pt;
  z-index: 999;
  @media (min-width: 900pt) {
    position: relative;
    padding-left: 0;
    padding-right: 0;
    padding-top: 45pt;
  }
`;

const LastBtn = styled.div`
  padding-top: 15pt;
  z-index: 1000000;
  display: flex;
  justify-content: center;
  padding-bottom: 15pt;
  width: 100%;
  border-radius: 6pt;
  background-color: ${colors.main};
  color: #eeeeee;
  cursor: pointer;
  @media (min-width: 900pt) {
    width: 580.5pt;
    z-index: 0;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: white;
  }
`;

const Blur = styled.div`
  position: absolute;
  width: 100%;
  bottom: -33pt;
  left: 0;
  z-index: -1;
  background: #ffffff;
  filter: blur(7.5pt);
  height: 67.5pt;
`;
const BlurTwo = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: #ffffff;
  filter: blur(7.5pt);
  height: 67.5pt;
`;
const CommunicationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 75pt;

  @media (max-width: 900pt) {
    padding-top: 0;
    padding-bottom: 183.75pt;
  }
`;
export default SentQuoatationFirst;
