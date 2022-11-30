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
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import LeftProjectQuotationBox from '../LeftProjectQuotationBox';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';

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
  const routerId = router?.query?.preQuotation;

  // FirstStep 충전기 갯수
  const [chargeNum, setChargeNum] = useState<number>(0);

  console.log(`chargeNum index에서는?`, chargeNum);

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
      enabled: router?.isReady,
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
        setChargeNum={setChargeNum}
        chargeNum={chargeNum}
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

  const preQuotation = data?.sendQuotationRequest?.preQuotation!;
  const quotationRequest = data?.sendQuotationRequest?.quotationRequest!;
  const businessRegistrationFiles =
    data?.sendQuotationRequest?.companyMemberAdditionalInfo
      ?.businessRegistrationFiles!;
  const relocation = (
    data: BusinessRegistrationType[],
  ): BusinessRegistrationType[] => {
    const result = data.map((obj) => {
      return {
        originalName: obj.originalName,
        size: obj.size,
        url: obj.url,
      };
    });
    return result;
  };
  // 최종 견적 초기값 세팅
  useEffect(() => {
    console.log('🔥 ~line 258 보낸견적 상세 페이지 데이터');
    console.log(data);
    if (data) {
      setSubscribeProduct(
        convertKo(
          subscribeType,
          subscribeTypeEn,
          quotationRequest.subscribeProduct,
        ),
      );
      setSubscribePeriod(quotationRequest.subscribePeriod.toString());
      setProfitableInterestUser(
        Math.floor(Number(quotationRequest.investRate) * 100).toString(),
      );
      setChargePoint(''); // 넣을 값이 없음
      setSubscribePricePerMonth(preQuotation.subscribePricePerMonth.toString());
      setConstructionPeriod(preQuotation.constructionPeriod.toString());
      setDueDiligenceResult(''); // 백엔드 api 추가 요청 필요
      setSubscribeProductFeature(preQuotation.subscribeProductFeature);
      setBusinessRegistration(relocation(businessRegistrationFiles));
      let count = 0;
      const arr = [];
      const arrEn = [];
      while (count < quotationRequest.quotationRequestChargers.length) {
        const quotationCharger =
          quotationRequest.quotationRequestChargers[count];
        const preQutationCharger = preQuotation.preQuotationCharger[count];
        // 한국어값 담기
        const temp: chargers = {
          idx: M5_LIST_EN.indexOf(quotationCharger.kind),
          kind: convertKo(M5_LIST, M5_LIST_EN, quotationCharger.kind),
          standType:
            quotationCharger.standType === ''
              ? '-'
              : convertKo(M6_LIST, M6_LIST_EN, quotationCharger.standType),
          channel: convertKo(M7_LIST, M7_LIST_EN, quotationCharger.channel),
          count: convertKo(
            M8_LIST,
            M8_LIST_EN,
            quotationCharger.count.toString(),
          ),
          chargePriceType: preQutationCharger.chargePriceType,
          chargePrice: preQutationCharger.chargePrice.toString(),
          installationLocation: quotationRequest.installationLocation,
          modelName: preQutationCharger.modelName,
          manufacturer: preQutationCharger.manufacturer,
          productFeature: preQutationCharger.productFeature,
          chargerImageFiles: relocation(preQutationCharger.chargerImageFiles),
          catalogFiles: relocation(preQutationCharger.catalogFiles),
        };
        // 영어값 담기
        const tempEn: chargers = {
          idx: M5_LIST_EN.indexOf(quotationCharger.kind),
          kind: quotationCharger.kind,
          // standType:
          //   quotationCharger.standType === ''
          //     ? '-'
          //     : quotationCharger.standType,
          standType: quotationCharger.standType,
          channel: quotationCharger.channel,
          count: quotationCharger.count.toString(),
          chargePriceType: preQutationCharger.chargePriceType,
          chargePrice: preQutationCharger.chargePrice.toString(),
          installationLocation: quotationRequest.installationLocation,
          modelName: preQutationCharger.modelName,
          manufacturer: preQutationCharger.manufacturer,
          productFeature: preQutationCharger.productFeature,
          chargerImageFiles: relocation(preQutationCharger.chargerImageFiles),
          catalogFiles: relocation(preQutationCharger.catalogFiles),
        };
        arr.push(temp);
        arrEn.push(tempEn);
        count++;
      }
      setSelectedOption(arr);
      setSelectedOptionEn(arrEn);
    }
  }, [data]);

  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);

  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);

  // LeftBox component 바꿔주는거
  const [underNum, setUnderNum] = useState<number>();

  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  useEffect(() => {
    if (router.pathname === `/company/quotation/lastQuotation`) {
      setOpenSubLink(false);
    }
  }, []);

  return (
    <>
      <WebBody>
        <WebBuyerHeader
          setOpenSubLink={setOpenSubLink}
          setTabNumber={setTabNumber}
          tabNumber={1}
          openSubLink={openSubLink}
        />
        <Container>
          <CompanyRightMenu />
          <WebRapper>
            <LeftProjectQuotationBox
              underNum={underNum}
              setUnderNum={setUnderNum}
            />
            {tabNumber >= 0 && (
              <>
                <WebProgressbar>
                  <TabBox>
                    {Object.keys(components).map((tab, index) => (
                      <React.Fragment key={index}>
                        {index <= selectedOption.length + 1 && (
                          <TabLine
                            idx={index.toString()}
                            num={tabNumber.toString()}
                            key={tab}
                            chargeNum={chargeNum}
                            // 테스트용
                            // onClick={() => setTabNumber(index)}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </TabBox>
                  {components[tabNumber]}
                </WebProgressbar>
              </>
            )}
          </WebRapper>
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
  }
  @media (max-height: 500pt) {
    height: 100%;
  }

  @media (min-width: 900pt) {
    margin-top: 0;
    padding-top: 0;
  }
`;

const TabBox = styled.div`
  padding-left: 25pt;
  padding-right: 25pt;
  box-sizing: border-box;
  display: flex;
  position: relative;
  width: 100%;
  margin: 0 auto;
  z-index: 100;
  top: 40.5pt;
  gap: 2pt;
  @media (max-width: 899.25pt) {
    position: relative;
    padding-left: 15pt;
    padding-right: 15pt;
    width: 100%;
    top: 2%;
    gap: 0.2pt;
  }
`;
const TabLine = styled.div<{
  idx: string;
  num: string;
  chargeNum: number | undefined;
}>`
  border-style: solid;
  border-color: ${({ idx, num }) => (idx <= num ? colors.main : colors.gray4)};
  width: ${({ chargeNum }) => `calc(100% / ${chargeNum})`};
  display: inline-block;
  margin: 0 auto;
  border-bottom-width: 6pt;
  border-radius: ${({ idx, num }) => idx <= num && '3pt'};
  &:nth-child(1) {
    border-top-left-radius: 3pt;
    border-bottom-left-radius: 3pt;
  }
  &:nth-last-of-type(1) {
    margin-right: 0;
    border-top-right-radius: 3pt;
    border-bottom-right-radius: 3pt;
  }
  @media (max-width: 899.25pt) {
    display: block;
    width: 100%;
    gap: 3pt;
    border-bottom-width: 3pt;
    &:nth-child(1) {
      border-top-left-radius: 1.5pt;
      border-bottom-left-radius: 1.5pt;
    }
    &:nth-last-of-type(1) {
      margin-right: 0;
      border-top-right-radius: 1.5pt;
      border-bottom-right-radius: 1.5pt;
    }
  }
`;
const WebRapper = styled.div`
  @media (min-width: 900pt) {
    width: 900pt;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 54pt;
  }
`;

const WebProgressbar = styled.div`
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export default LastWrite;
