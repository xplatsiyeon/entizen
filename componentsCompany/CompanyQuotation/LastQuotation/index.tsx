import styled from '@emotion/styled';
import { SelectedOption } from 'components/quotation/request/FirstStep';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Option } from 'store/quotationSlice';
import { chargers } from 'storeCompany/finalQuotation';
import { chargerData } from 'storeCompany/myQuotation';
import colors from 'styles/colors';

import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
interface Components {
  [key: number]: JSX.Element;
}

// interface SelectedOptions extends SelectedOption {
//   chargePriceType: '';
//   chargePrice: 24;
//   installationLocation: '';
//   modelName: '';
//   manufacturer: '';
//   productFeature: '';
//   chargerImageFiles: [];
//   catalogFiles: [];
// }
type Props = {};
// const target = 1;

const LastWrite = (props: Props) => {
  // step 숫자
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [canNext, SetCanNext] = useState<boolean>(false);
  // step 1
  // 구독상품
  const [subscribeProduct, setSubscribeProduct] = useState<chargerData>('');
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
      />
    ),
  };
  return (
    <>
      {tabNumber >= 0 && (
        <>
          <TabBox>
            {Object.keys(components).map((tab, index) => (
              <React.Fragment key={index}>
                {index <= selectedOption.length && (
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
