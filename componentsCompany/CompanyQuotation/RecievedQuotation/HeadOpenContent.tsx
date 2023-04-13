import React, { useEffect } from 'react';
import { Collapse, List, ListItemText } from '@mui/material';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import Image from 'next/image';
import { useState } from 'react';
import colors from 'styles/colors';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import CommonBtns from 'components/mypage/as/CommonBtns';
import Btn from 'components/SignUp/button';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import { HandleColor } from 'utils/changeValue';

import {
  InstallationPurposeType,
  InstallationPurposeTypeEn,
  location,
  locationEn,
  M5_LIST,
  M5_LIST_EN,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
  subscribeType,
  subscribeTypeEn,
} from 'assets/selectList';
import { AxiosError } from 'axios';
import Loader from 'components/Loader';
import { convertKo } from 'utils/calculatePackage';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import LeftProjectQuotationBox from '../LeftProjectQuotationBox';
import WebFooter from 'componentsWeb/WebFooter';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import { SentRequestResponse } from '../SentQuotation/SentProvisionalQuoatation';
import RequestHeader from './RequestHeader';

interface Components {
  [key: number]: JSX.Element;
}
export interface reviewType {
  productImg: any;
  createDt: number;
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
export interface QuotationsDetailResponse {
  isSuccess: boolean;
  receivedQuotationRequest: {
    badge: string;
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
    maskingInstallationAddress: string;
  };
}
type ChargeType = '' | '구매자 자율' | '운영사업자 입력';
type ManufacturingCompany =
  | ''
  | 'LECS-007ADE'
  | 'LECS-006ADE'
  | 'LECS-005ADE'
  | 'LECS-004ADE';
export interface Chargers {
  chargeType: ChargeType;
  fee: number;
  manufacturingCompany: ManufacturingCompany;
  chargeFeatures: string;
  chargeImage: [
    {
      url: string;
      size: number;
      originalName: string;
    },
  ];
  chargeFile: [
    {
      url: string;
      size: number;
      originalName: string;
    },
  ];
}

const TAG =
  'componentsCompany/CompanyQuotation/RecivedQuotation/HeadOpenContent';
const HeadOpenContent = () => {
  const router = useRouter();
  const routerId = router?.query?.id!;
  const routerEdit = router?.query?.edit!;
  const [open, setOpen] = useState<boolean>(false);
  // step 숫자
  const [tabNumber, setTabNumber] = useState<number>(-1);
  // button on off
  const [canNext, SetCanNext] = useState<boolean>(false);
  // 첫스탭 상태값
  const [monthlySubscribePrice, setMonthleSubscribePrice] =
    useState<string>('');
  const [constructionPeriod, setConstructionPeriod] = useState<string>('');
  const [firstPageTextArea, setFirstPageTextArea] = useState<string>('');
  const [
    chargingStationInstallationPrice,
    setChargingStationInstallationPrice,
  ] = useState<string>('');
  // 모달
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [componentId, setComponentId] = useState<number>();
  // 실시간으로 width 받아옴
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  const [nowHeight, setNowHeight] = useState<number>(window.innerHeight);
  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);
  // LeftBox component 바꿔주는거
  const [underNum, setUnderNum] = useState<number>();
  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
    setNowHeight(window.innerHeight);
  };

  //  받은 요청 상세페이지 api 요청
  const { data, isError, isLoading, refetch, remove } = useQuery<
    QuotationsDetailResponse,
    AxiosError
  >(
    'receivedRequest/id',
    () =>
      isTokenGetApi(
        `/quotations/received-request/${router.query.quotationRequestIdx}`,
      ),
    {
      enabled: router?.isReady && !routerEdit ? true : false,
    },
  );
  //  보낸 요청 상세페이지 api 요청 (수정에 필요한 데이터)
  const {
    data: editData,
    isError: editError,
    isLoading: editLoading,
    remove: editRemove,
    refetch: editRefetch,
  } = useQuery<SentRequestResponse, AxiosError>(
    'sent-request-detail',
    () =>
      isTokenGetApi(
        `/quotations/sent-request/${router.query.quotationRequestIdx}`,
      ),
    {
      enabled: router?.isReady && routerEdit ? true : false,
    },
  );

  const handleClick = () => {
    if (tabNumber !== -1) {
      setOpen(!open);
    }
  };
  const handleBackClick = () => router.back();
  const changeRequest = () => setTabNumber(tabNumber + 1);
  const handleModalOpen = () => setModalOpen(true);
  const handleExitClick = () => setModalOpen(true);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth, nowHeight]);

  // LeftBox border 값
  useEffect(() => {
    if (router.query.quotationRequestIdx) {
      const num = Number(router.query.quotationRequestIdx);
      setComponentId(num);
      setUnderNum(0);
    }
  }, [router.query.quotationRequestIdx]);

  useEffect(() => {
    if (router.query.quotationRequestIdx) setOpenSubLink(false);
    if (!router?.query?.edit && router?.isReady) {
      editRemove();
      refetch();
      setTabNumber(-1);
    }
  }, [router, editData]);

  useEffect(() => {
    if (routerEdit) {
      setTabNumber(0);
    }
  }, [routerEdit]);

  // 열렸다 닫혔다
  useEffect(() => {
    if (tabNumber === -1) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [tabNumber]);

  // 1번째 탭 초기화
  useEffect(() => {
    if (tabNumber === -1) {
      setMonthleSubscribePrice('');
      setConstructionPeriod('');
      setFirstPageTextArea('');
    }
  }, [tabNumber]);
  // 리셋
  useEffect(() => {
    return () => {
      remove();
      editRemove();
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  // 부분 구독인지 아닌지
  const partSubscribe = data?.receivedQuotationRequest?.subscribeProduct;

  const badge =
    data?.receivedQuotationRequest.badge! ||
    editData?.sendQuotationRequest?.badge!;
  const installationAddress =
    data?.receivedQuotationRequest.installationAddress! ||
    editData?.sendQuotationRequest?.quotationRequest?.installationAddress;
  const subscribeProduct =
    data?.receivedQuotationRequest.subscribeProduct! ||
    editData?.sendQuotationRequest?.quotationRequest?.subscribeProduct;
  const subscribePeriod =
    data?.receivedQuotationRequest.subscribePeriod! ||
    editData?.sendQuotationRequest?.quotationRequest?.subscribePeriod;
  const investRate =
    data?.receivedQuotationRequest.investRate! ||
    editData?.sendQuotationRequest?.quotationRequest?.investRate!;
  const installationLocation =
    data?.receivedQuotationRequest.installationLocation! ||
    editData?.sendQuotationRequest?.quotationRequest?.installationLocation!;
  const installationPurpose =
    data?.receivedQuotationRequest.installationPurpose! ||
    editData?.sendQuotationRequest?.quotationRequest?.installationPurpose!;
  const etcRequest =
    data?.receivedQuotationRequest?.etcRequest! ||
    editData?.sendQuotationRequest?.quotationRequest?.etcRequest!;
  const quotationRequestChargers =
    data?.receivedQuotationRequest?.quotationRequestChargers! ||
    editData?.sendQuotationRequest?.quotationRequest?.quotationRequestChargers!;
  const maskingInstallationAddress =
    data?.receivedQuotationRequest.maskingInstallationAddress! ||
    editData?.sendQuotationRequest?.quotationRequest
      ?.maskingInstallationAddress!;
  const homeSelect =
    data?.receivedQuotationRequest.quotationRequestChargers.filter(
      (el) => el.kind === '7-HOME',
    );

  // step별 컴포넌트
  const components: Components = {
    // 기본
    0: (
      <WebContainer>
        <FirstStep
          partSubscribe={partSubscribe}
          editData={editData!}
          tabNumber={tabNumber}
          setTabNumber={setTabNumber}
          monthlySubscribePrice={monthlySubscribePrice}
          setMonthleSubscribePrice={setMonthleSubscribePrice}
          constructionPeriod={constructionPeriod}
          setConstructionPeriod={setConstructionPeriod}
          firstPageTextArea={firstPageTextArea}
          setFirstPageTextArea={setFirstPageTextArea}
          canNext={canNext}
          SetCanNext={SetCanNext}
          chargingStationInstallationPrice={chargingStationInstallationPrice}
          setChargingStationInstallationPrice={
            setChargingStationInstallationPrice
          }
        />
      </WebContainer>
    ),
    // 스텝 2
    1: (
      <WebContainer>
        <SecondStep
          tabNumber={tabNumber}
          setTabNumber={setTabNumber}
          canNext={canNext}
          SetCanNext={SetCanNext}
          StepIndex={0}
          data={data!}
          editData={editData!}
          maxIndex={quotationRequestChargers?.length}
          routerId={routerId}
        />
      </WebContainer>
    ),
    // 스텝 3
    2: (
      <WebContainer>
        <SecondStep
          tabNumber={tabNumber}
          setTabNumber={setTabNumber}
          canNext={canNext}
          SetCanNext={SetCanNext}
          StepIndex={1}
          data={data!}
          editData={editData!}
          maxIndex={quotationRequestChargers?.length}
          routerId={routerId}
        />
      </WebContainer>
    ),
    // 스텝 4
    3: (
      <WebContainer>
        <SecondStep
          tabNumber={tabNumber}
          setTabNumber={setTabNumber}
          canNext={canNext}
          SetCanNext={SetCanNext}
          StepIndex={2}
          data={data!}
          editData={editData!}
          maxIndex={quotationRequestChargers?.length}
          routerId={routerId}
        />
      </WebContainer>
    ),
    // 스텝 5
    4: (
      <WebContainer>
        <SecondStep
          tabNumber={tabNumber}
          setTabNumber={setTabNumber}
          canNext={canNext}
          SetCanNext={SetCanNext}
          StepIndex={3}
          data={data!}
          editData={editData!}
          maxIndex={quotationRequestChargers?.length}
          routerId={routerId}
        />
      </WebContainer>
    ),
    // 스텝 6
    5: (
      <WebContainer>
        <SecondStep
          tabNumber={tabNumber}
          setTabNumber={setTabNumber}
          canNext={canNext}
          SetCanNext={SetCanNext}
          StepIndex={4}
          data={data!}
          editData={editData!}
          maxIndex={quotationRequestChargers?.length}
          routerId={routerId}
        />
      </WebContainer>
    ),
  };

  return (
    <>
      <WebBody>
        <WebBuyerHeader
          setTabNumber={setTabNumber}
          tabNumber={0}
          componentId={componentId}
          openSubLink={openSubLink}
          setOpenSubLink={setOpenSubLink}
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
            leftBtnControl={() => {
              setTabNumber(-1);
              setModalOpen(false);
            }}
            rightBtnControl={() => setModalOpen(false)}
            exit={() => setModalOpen(false)}
          />
        )}
        <Container>
          {tabNumber === -1 && nowWidth < 1200 && (
            <RequestHeader
              back={true}
              title={'받은 요청'}
              handleBackClick={handleBackClick}
            />
          )}
          {tabNumber >= 0 && nowWidth < 1200 && (
            <RequestHeader
              // back={true}
              title={'가견적 작성'}
              handleExitClick={handleExitClick}
              exitBtn={true}
            />
          )}
          <CompanyRightMenu />
          <WebRapper>
            {nowWidth >= 1200 && (
              <LeftProjectQuotationBox
                underNum={underNum}
                setUnderNum={setUnderNum}
                componentId={componentId}
                setComponentId={setComponentId}
                setTabNumber={setTabNumber}
              />
            )}
            <BtnWrapper>
              <Wrapper>
                <ItemButton onClick={handleClick} tabNumber={tabNumber}>
                  <StoreName>
                    <CommonBtns
                      text={badge}
                      backgroundColor={HandleColor(badge)}
                    />
                    <div>
                      <StoreNameText tabNumber={tabNumber}>
                        {maskingInstallationAddress}
                      </StoreNameText>
                      {tabNumber !== -1 && (
                        <>
                          {open ? (
                            <ArrowImg>
                              <Image
                                src={DownArrow}
                                alt="down_arrow"
                                layout="fill"
                              />
                            </ArrowImg>
                          ) : (
                            <ArrowImg>
                              <Image
                                src={UpArrow}
                                alt="up_arrow"
                                layout="fill"
                              />
                            </ArrowImg>
                          )}
                        </>
                      )}
                    </div>
                  </StoreName>
                </ItemButton>
                {/* Open */}
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Contents>
                      <div className="text-box">
                        <span className="name">구독상품</span>
                        <span className="text">
                          {data &&
                            convertKo(
                              subscribeType,
                              subscribeTypeEn,
                              subscribeProduct,
                            )}
                          {/* 수정에 필요한 데이터 */}
                          {editData &&
                            convertKo(
                              subscribeType,
                              subscribeTypeEn,
                              subscribeProduct,
                            )}
                        </span>
                      </div>
                      <div className="text-box">
                        <span className="name">구독기간</span>
                        <span className="text">
                          {`${subscribePeriod} 개월`}
                        </span>
                      </div>
                      <div className="text-box">
                        <span className="name">수익지분</span>

                        {data?.receivedQuotationRequest
                          ?.quotationRequestChargers?.length! ===
                        homeSelect?.length! ? (
                          <span className="text">-</span>
                        ) : (
                          <span className="text">{`${Math.floor(
                            Number(investRate!) * 100,
                          )} %`}</span>
                        )}
                      </div>
                      {quotationRequestChargers?.map((item, index) => (
                        <div className="text-box" key={index}>
                          {index === 0 ? (
                            <span className="name">충전기 종류 및 수량</span>
                          ) : (
                            <span className="name" />
                          )}
                          <span className="text">
                            {convertKo(M5_LIST, M5_LIST_EN, item.kind)}
                            <br />
                            {item.standType
                              ? `: ${convertKo(
                                  M6_LIST,
                                  M6_LIST_EN,
                                  item.standType,
                                )}, ${convertKo(
                                  M7_LIST,
                                  M7_LIST_EN,
                                  item.channel,
                                )}, ${item.count} 대`
                              : `: ${convertKo(
                                  M7_LIST,
                                  M7_LIST_EN,
                                  item.channel,
                                )}, ${item.count} 대`}
                          </span>
                        </div>
                      ))}
                      <div className="text-box">
                        <span className="name">충전기 설치 위치</span>
                        <span className="text">
                          {data &&
                            convertKo(
                              location,
                              locationEn,
                              installationLocation,
                            )}
                        </span>
                      </div>
                      <div className="text-box">
                        <span className="name">충전기 설치 목적</span>
                        <span className="text">
                          {data &&
                            convertKo(
                              InstallationPurposeType,
                              InstallationPurposeTypeEn,
                              installationPurpose,
                            )}
                        </span>
                      </div>
                      {etcRequest?.length > 0 ? (
                        <ElseTextBox>
                          <span className="name">기타 요청사항</span>
                          <ElseText>{etcRequest}</ElseText>
                        </ElseTextBox>
                      ) : (
                        <div className="text-box">
                          <span className="name">기타 요청사항</span>
                          <span className="text">없음 </span>
                        </div>
                      )}
                    </Contents>
                  </List>
                </Collapse>
              </Wrapper>
              {tabNumber === -1 && nowWidth >= 1200 && (
                <Btn
                  isClick={true}
                  handleClick={changeRequest}
                  text={'가견적 작성하기'}
                  paddingOn={true}
                />
              )}
              {/* ------------내부 컴포넌트--------- */}
              {
                <TapWrapper tabNumber={tabNumber} className="tabnumber">
                  <TabBox open={open} className="target-list">
                    {Object.keys(components).map((tab, index) => (
                      <React.Fragment key={index}>
                        {index <=
                          data?.receivedQuotationRequest
                            ?.quotationRequestChargers?.length! && (
                          <TabLine
                            className="target"
                            idx={index.toString()}
                            num={tabNumber.toString()}
                            key={tab}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </TabBox>
                  {components[tabNumber]}
                </TapWrapper>
              }
            </BtnWrapper>
          </WebRapper>
          {/* 가견적 작성하기 부분 */}
          {tabNumber === -1 && nowWidth < 1200 && (
            <Btn
              isClick={true}
              handleClick={changeRequest}
              text={'가견적 작성하기'}
              paddingOn={true}
            />
          )}
        </Container>
        <WebFooter />
      </WebBody>
    </>
  );
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
    margin-bottom: 70pt;
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
    margin-bottom: 54pt;
  }
`;

const BtnWrapper = styled.div`
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Wrapper = styled.div`
  display: block;
  box-shadow: 0px 3pt 7.5pt rgba(137, 163, 201, 0.4);
  padding-left: 15pt;
  padding-right: 15pt;

  @media (max-width: 899.25pt) {
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 900pt) {
    display: block;
    width: 580.5pt;
    box-shadow: 0px 3pt 7.5pt rgba(137, 163, 201, 0.4);
    padding-left: 26.25pt;
    padding-right: 26.25pt;
    margin-bottom: 30pt;
    border-radius: 12pt;
  }
`;

const ItemButton = styled.div<{ tabNumber: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  cursor: ${({ tabNumber }) => (tabNumber === -1 ? '' : 'pointer')};
  & div {
    margin-top: ${({ tabNumber }) => (tabNumber === -1 ? '' : '12pt')};
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

const StoreNameText = styled.div<{ tabNumber: number }>`
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
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
  padding-bottom: 21pt;

  .text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
      @media (min-width: 900pt) {
        padding-top: 15pt;
      }
    }
  }
  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .text {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 18pt;
      letter-spacing: -0.02em;
    }
  }
  .img-box {
    padding-top: 42pt;
    padding-bottom: 24pt;
    text-align: center;
  }
`;

const WebProgressbar = styled.div<{ tabNumber: number }>`
  @media (min-width: 900pt) {
    position: relative;
    margin: 0 auto;
    width: 534pt;
    top: ${({ tabNumber }) => (tabNumber === 0 ? '4%;' : '2.5%')};
  }
`;

const TabBox = styled.div<{ open: boolean }>`
  z-index: 1;
  //display:flex;
  /* padding-left: 15pt;
  padding-right: 15pt; */
  margin-top: 30pt;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  top: 0;

  @media (max-width: 899.25pt) {
    display: flex;
    position: absolute;
    gap: 0.2pt;
  }

  @media (min-width: 900pt) {
    display: flex;
    flex-direction: row;
    margin-top: 53pt;

    /* padding-left: 25pt; */
    /* padding-right: 25pt; */
    padding: 0 22.5pt 0 22.5pt;
  }
`;
const TabLine = styled.div<{ idx: string; num: string }>`
  border-style: solid;
  border-bottom-width: 3pt;
  border-color: ${({ idx, num }) => (idx <= num ? colors.main : colors.gray4)};
  border-radius: 2px;
  width: calc((100% - 15pt) / 6);
  display: inline-block;
  margin-right: 3pt;
  &:nth-last-of-type(1) {
    margin-right: 0;
  }
  @media (max-width: 899.25pt) {
    display: block;
    width: 100%;
  }
  @media (min-width: 900pt) {
    width: 50%;
    border-bottom-width: 6pt;
    border-radius: 3pt;
  }
`;

const WebContainer = styled.div`
  @media (min-width: 900pt) {
    width: 580.5pt;
    margin-top: 30pt;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    border-radius: 16pt;
  }
`;

const ElseTextBox = styled.div`
  padding-top: 12pt;
  display: flex;
  flex-direction: column;
  @media (min-width: 900pt) {
    padding-top: 15pt;
  }
`;

const ElseText = styled.div`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  text-align: left;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  margin-top: 10pt;
  border: 0.75pt solid #e2e5ed;
  padding: 8pt;
  border-radius: 6pt;
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 400;
    line-height: 16pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const MobileHide = styled.div`
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
export default HeadOpenContent;

const TapWrapper = styled.div<{ tabNumber: number }>`
  position: relative;
  display: ${({ tabNumber }) => (tabNumber === -1 ? 'none' : 'block')};
`;
