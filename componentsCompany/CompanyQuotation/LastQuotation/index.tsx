import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { chargers } from 'storeCompany/finalQuotation';
import colors from 'styles/colors';
import { BusinessRegistrationType } from 'components/SignUp';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import { isTokenGetApi } from 'api';
import { SentRequestResponse } from '../SentQuotation/SentProvisionalQuoatation';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Loader from 'components/Loader';
import { convertKo } from 'utils/calculatePackage';
import {
  M5_LIST,
  M5_LIST_EN,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
  M8_LIST,
  M8_LIST_EN,
  subscribeType,
  subscribeTypeEn,
} from 'assets/selectList';

interface Components {
  [key: number]: JSX.Element;
}
export type SubscribeProduct = '' | '전체구독' | '부분구독';

export interface MutateData {
  quotationRequestIdx: number;
  preQuotationIdx: number;
  subscribeProduct: string; // 구독 상품
  subscribePeriod: string; // 구독 기간
  userInvestRate: string; // 사용자 수익 비율
  chargingPointRate: string; // chargingPoint - (1 - userInvestRate)
  subscribePricePerMonth: number; // 월 구독료
  chargers: chargers[]; // 충전기
  detailQuotationFiles: BusinessRegistrationType[]; // 상세 견적서 파일
  constructionPeriod: string;
  spotInspectionResult: string;
  subscribeProductFeature: string;
}

type Props = {};
const LastWrite = (props: Props) => {
  const router = useRouter();
  const routerId = router.query.preQuotation;
  // step 숫자
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [canNext, SetCanNext] = useState<boolean>(false);
  // step 1
  // 구독상품
  const [subscribeProduct, setSubscribeProduct] = useState<string>('');
  // 구독기간
  const [subscribePeriod, setSubscribePeriod] = useState('');
  // 고객 퍼센트
  const [profitableInterestUser, setProfitableInterestUser] = useState('');
  // ChargePoint
  const [chargePoint, setChargePoint] = useState('');
  // 월 구독료
  const [subscribePricePerMonth, setSubscribePricePerMonth] =
    useState<string>('');
  // 충전기 종류 및 수량 선택
  const [selectedOption, setSelectedOption] = useState<chargers[]>([
    {
      idx: 0,
      kind: '',
      standType: '',
      channel: '',
      count: '',
      chargePriceType: '',
      chargePrice: '',
      installationLocation: '',
      modelName: '',
      manufacturer: '',
      productFeature: '',
      chargerImageFiles: [],
      catalogFiles: [],
    },
  ]);
  // 영어 셀렉트 옵션
  const [selectedOptionEn, setSelectedOptionEn] = useState<chargers[]>([
    {
      kind: '',
      standType: '',
      channel: '',
      count: '',
      chargePriceType: '',
      chargePrice: '',
      installationLocation: '',
      modelName: '',
      manufacturer: '',
      productFeature: '',
      chargerImageFiles: [],
      catalogFiles: [],
    },
  ]);
  // 공사기간
  const [constructionPeriod, setConstructionPeriod] = useState<string>('');
  // 현장실사 결과
  const [dueDiligenceResult, setDueDiligenceResult] = useState<string>('');
  // 구독상품 특장점
  const [subscribeProductFeature, setSubscribeProductFeature] =
    useState<string>('');
  // STEP3 최종 견적 작성
  const [BusinessRegistration, setBusinessRegistration] = useState<
    BusinessRegistrationType[]
  >([]);

  // ----------- 보낸 견적 상세 페이지 api --------------
  const { data, isLoading, isError, error } = useQuery<SentRequestResponse>(
    'company/',
    () => isTokenGetApi(`/quotations/sent-request/${routerId}`),
    {
      enabled: router.isReady,
    },
  );

  const components: Components = {
    // 기본
    0: (
      <FirstStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        canNext={canNext}
        SetCanNext={SetCanNext}
        subscribeProduct={subscribeProduct}
        setSubscribeProduct={setSubscribeProduct}
        subscribePeriod={subscribePeriod}
        setSubscribePeriod={setSubscribePeriod}
        profitableInterestUser={profitableInterestUser}
        setProfitableInterestUser={setProfitableInterestUser}
        chargePoint={chargePoint}
        setChargePoint={setChargePoint}
        subscribePricePerMonth={subscribePricePerMonth}
        setSubscribePricePerMonth={setSubscribePricePerMonth}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedOptionEn={selectedOptionEn}
        setSelectedOptionEn={setSelectedOptionEn}
        constructionPeriod={constructionPeriod}
        setConstructionPeriod={setConstructionPeriod}
        dueDiligenceResult={dueDiligenceResult}
        setDueDiligenceResult={setDueDiligenceResult}
        subscribeProductFeature={subscribeProductFeature}
        setSubscribeProductFeature={setSubscribeProductFeature}
      />
    ),
    // 스텝 2
    1: (
      <SecondStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        canNext={canNext}
        SetCanNext={SetCanNext}
        maxIndex={selectedOption.length}
        routerId={'1'}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedOptionEn={selectedOptionEn}
        setSelectedOptionEn={setSelectedOptionEn}
      />
    ),
    // 스텝 3
    2: (
      <SecondStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        canNext={canNext}
        SetCanNext={SetCanNext}
        maxIndex={selectedOption.length}
        routerId={'1'}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedOptionEn={selectedOptionEn}
        setSelectedOptionEn={setSelectedOptionEn}
      />
    ),
    // 스텝 4
    3: (
      <SecondStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        canNext={canNext}
        SetCanNext={SetCanNext}
        maxIndex={selectedOption.length}
        routerId={'1'}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedOptionEn={selectedOptionEn}
        setSelectedOptionEn={setSelectedOptionEn}
      />
    ),
    // 스텝 5
    4: (
      <SecondStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        canNext={canNext}
        SetCanNext={SetCanNext}
        maxIndex={selectedOption.length}
        routerId={'1'}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedOptionEn={selectedOptionEn}
        setSelectedOptionEn={setSelectedOptionEn}
      />
    ),
    // 스텝 6
    5: (
      <SecondStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        canNext={canNext}
        SetCanNext={SetCanNext}
        maxIndex={selectedOption.length}
        routerId={'1'}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedOptionEn={selectedOptionEn}
        setSelectedOptionEn={setSelectedOptionEn}
      />
    ),
    // 마지막 스텝
    6: (
      <ThirdStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        canNext={canNext}
        SetCanNext={SetCanNext}
        maxIndex={selectedOption.length}
        selectedOptionEn={selectedOptionEn}
        setSelectedOptionEn={setSelectedOptionEn}
        BusinessRegistration={BusinessRegistration}
        setBusinessRegistration={setBusinessRegistration}
        // 최종견적 POST에 필요한 data
        quotationRequestIdx={
          data?.sendQuotationRequest?.preQuotation?.quotationRequestIdx!
        }
        preQuotationIdx={
          data?.sendQuotationRequest?.preQuotation?.preQuotationIdx!
        }
        subscribeProduct={subscribeProduct}
        subscribePeriod={subscribePeriod}
        userInvestRate={profitableInterestUser}
        chargingPointRate={chargePoint}
        subscribePricePerMonth={subscribePricePerMonth}
        chargers={selectedOptionEn}
        detailQuotationFiles={BusinessRegistration}
        constructionPeriod={constructionPeriod}
        spotInspectionResult={dueDiligenceResult}
        subscribeProductFeature={subscribeProductFeature}
      />
    ),
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.log('🔥 ~line 249 ~에러 발생');
    console.log(error);
  }
  const preQuotation = data?.sendQuotationRequest?.preQuotation!;
  const quotationRequest = data?.sendQuotationRequest?.quotationRequest!;
  // 최종 견적 초기값 세팅
  useEffect(() => {
    setSubscribeProduct(
      convertKo(
        subscribeType,
        subscribeTypeEn,
        quotationRequest.subscribeProduct,
      ),
    );
    setSubscribePeriod(quotationRequest.subscribePeriod.toString());
    setProfitableInterestUser(
      (Number(quotationRequest.investRate) * 100).toString(),
    );
    setChargePoint(''); // 넣을 값이 없음
    setSubscribePricePerMonth(preQuotation.subscribePricePerMonth.toString());
    setConstructionPeriod(preQuotation.constructionPeriod.toString());
    setDueDiligenceResult(''); // 백엔드 api 추가 요청 필요
    setSubscribeProductFeature(preQuotation.subscribeProductFeature);
    let count = 0;
    while (count < quotationRequest.quotationRequestChargers.length - 1) {
      console.log('몇번 돌까');
      const quotationCharger = quotationRequest.quotationRequestChargers[count];
      const preQutationCharger = preQuotation.preQuotationCharger[count];
      const temp = {
        // step - 1
        kind: convertKo(M5_LIST, M5_LIST_EN, quotationCharger.kind),
        standType: convertKo(M6_LIST, M6_LIST_EN, quotationCharger.standType),
        channel: convertKo(M7_LIST, M7_LIST_EN, quotationCharger.channel),
        count: convertKo(
          M8_LIST,
          M8_LIST_EN,
          quotationCharger.count.toString(),
        ),
        // step - 2
        chargePriceType: preQutationCharger.chargePriceType,
        chargePrice: preQutationCharger.chargePrice,
        installationLocation: '',
        modelName: preQutationCharger.modelName,
        manufacturer: preQutationCharger.manufacturer,
        productFeature: preQutationCharger.productFeature,
        chargerImageFiles: preQutationCharger.chargerImageFiles,
        catalogFiles: preQutationCharger.catalogFiles,
      };
      console.log(temp);
      // setSelectedOption(temp);
      // setSelectedOptionEn(temp);
      count++;
    }
  }, []);

  console.log('🔥 ~line 258 보낸견적 상세 페이지 데이터');
  console.log(data);
  return (
    <>
      {tabNumber >= 0 && (
        <>
          <TabBox>
            {Object.keys(components).map((tab, index) => (
              <React.Fragment key={index}>
                {index <= selectedOption.length + 1 && (
                  <TabLine
                    idx={index.toString()}
                    num={tabNumber.toString()}
                    key={tab}
                    // 테스트용
                    // onClick={() => setTabNumber(index)}
                  />
                )}
              </React.Fragment>
            ))}
          </TabBox>
          {components[tabNumber]}
        </>
      )}
    </>
  );
};

const TabBox = styled.div`
  z-index: 1;
  //display:flex;
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 12pt;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  top: 0;

  @media (max-width: 899pt) {
    display: flex;
    position: relative;
    gap: 0.2pt;
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

  @media (max-width: 899pt) {
    display: block;
    width: 100%;
  }
`;

export default LastWrite;
