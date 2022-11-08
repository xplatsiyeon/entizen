import styled from '@emotion/styled';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import colors from 'styles/colors';
import CenterBox from './CenterBox';
import RightArrow from 'public/images/black-right-arrow.svg';
import CommunicationIcon from 'public/images/communication-icon.svg';
import TopBox from './TopBox';
import BottomBox from './BottomBox';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';

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
  chargePriceType: string;
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
export interface PreQuotation {
  createdAt: string;
  preQuotationIdx: number;
  subscribePricePerMonth: number;
  constructionPeriod: number;
  subscribeProductFeature: string;
  preQuotationStatus: string;
  changedDate: string;
  quotationRequestIdx: number;
  memberIdx: number;
  preQuotationCharger: PreQuotationCharger[];
  member: Member;
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
  installationLocation: string;
  installationPurpose: string;
  expiredAt: string;
  etcRequest: string;
  memberIdx: number;
  quotationRequestChargers: QuotationRequestChargers[];
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
  const routerId = router?.query?.id;
  // 상단 열고 닫기
  const [open, setOpen] = useState<boolean>(false);
  // ----------- 보낸 견적 상세 페이지 api --------------
  const { data, isLoading, isError, error } = useQuery<SentRequestResponse>(
    'company/',
    () => isTokenGetApi(`/quotations/sent-request/${routerId}`),
    {
      enabled: router.isReady,
      // enabled: false,
    },
  );
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
      // enabled: false,
    },
  );
  // 상단 열리고 닫히고
  const handleClick = () => setOpen(!open);

  if (isLoading && spotLoading) {
    return <Loader />;
  }
  if (isError && spotIsError) {
    console.log(TAG + '🔥 ~line 42 에러 코드');
    console.log(error);
    console.log(spotError);
  }
  console.log(TAG + '\n🔥 ~line 138 spotdata check');
  console.log(spotData);
  console.log(TAG + '\n🔥 ~line 138 보낸견적 상세페이지');
  console.log(data);

  return (
    <Wrapper>
      <CustomerRequestContent>고객 요청 내용</CustomerRequestContent>
      {/* 견적 정보 */}
      <TopBox
        handleClick={handleClick}
        open={open}
        setOpen={setOpen}
        data={data!}
      />
      {/* 일정 변경 컴포넌트 */}
      <CenterBox data={data!} spotData={spotData!} />
      {/* 하단 내용 */}
      <BottomBox data={data!} />

      <BtnBox>
        {/*가견적 수정하기*/}
        <EditBtn onClick={() => router.push('/')}>가견적 수정하기</EditBtn>
      </BtnBox>
      {/* 현장실사 예약 완료 */}
      {data?.sendQuotationRequest?.badge === '현장실사 예약 완료' && (
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
      {/* 최종견적 */}
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
    </Wrapper>
    //  고객과 소통하기
    //    <Button
    //    onClick={() =>
    //      /*route.push('/chatting/1')*/ alert('2차 작업 범위입니다')
    //    }
    //  >
    //    <div>
    //      <Image src={CommunicationIcon} alt="right-arrow" />
    //    </div>
    //    고객과 소통하기
    //    <div>
    //      <Image src={RightArrow} alt="right-arrow" />
    //    </div>
    //  </Button>
  );
};

const CustomerRequestContent = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.02em;
  text-align: center;
  color: ${colors.main};
  margin-top: 21pt;
`;

const Wrapper = styled.div`
  padding-bottom: 75pt;
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
  border-bottom: 1px solid #e9eaee;
  .text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
    }

    .emailText {
      font-family: Spoqa Han Sans Neo;
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
  font-family: Spoqa Han Sans Neo;
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
  border: 1px solid ${colors.main};
  color: ${colors.main};
  border-radius: 6pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

const BtnBox = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  padding-bottom: 73.5pt;
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
`;

const LastQuotationBtnBox = styled.div`
  position: fixed;
  bottom: 30pt;
  width: 100%;
  box-sizing: border-box;
  padding-left: 15pt;
  padding-right: 15pt;
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
export default SentQuoatationFirst;
