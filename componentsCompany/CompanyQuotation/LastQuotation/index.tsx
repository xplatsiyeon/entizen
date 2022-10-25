import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useState } from 'react';
import colors from 'styles/colors';

import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
interface Components {
  [key: number]: JSX.Element;
}

type Props = {};
const target = 3;

const LastWrite = (props: Props) => {
  // step 숫자
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [canNext, SetCanNext] = useState<boolean>(false);
  // 첫스탭 상태값
  const [monthlySubscribePrice, setMonthleSubscribePrice] =
    useState<string>('');
  const [constructionPeriod, setConstructionPeriod] = useState<string>('');
  const [firstPageTextArea, setFirstPageTextArea] = useState<string>('');
  const components: Components = {
    // 기본
    0: (
      <FirstStep
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
      />
    ),
    // 스텝 2
    1: (
      <SecondStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        canNext={canNext}
        SetCanNext={SetCanNext}
        StepIndex={0}
        maxIndex={target}
        routerId={'1'}
      />
    ),
    // 스텝 3
    2: (
      <ThirdStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        canNext={canNext}
        SetCanNext={SetCanNext}
        StepIndex={1}
        maxIndex={target}
      />
    ),
    // 스텝 4
  };
  return (
    <>
      {tabNumber >= 0 && (
        <>
          <TabBox>
            {Object.keys(components).map((tab, index) => (
              <React.Fragment key={index}>
                {index <= target && (
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
