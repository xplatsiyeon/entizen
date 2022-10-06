
import styled from '@emotion/styled';
import Header from 'components/mypage/request/header';
import FirstStep from 'components/quotation/request/FirstStep';
import React, { useState } from 'react';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import SecondStep from 'components/quotation/request/SecondStep';
import ThirdStep from 'components/quotation/request/ThirdStep';
import FourthStep from 'components/quotation/request/FourthStep';
import FifthStep from 'components/quotation/request/FifthStep';
import SixthStep from 'components/quotation/request/SixthStep';

import Request1_7 from './1-7';
import WebFooter from 'web-components/WebFooter';
import WebHeader from 'web-components/WebHeader';

interface Components {
  [key: number]: JSX.Element;
}

const Quotation1_1 = () => {
  const route = useRouter();
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [isModal, setIsModal] = useState(false);

  const HandleModal = () => setIsModal((prev) => !prev);

  const components: Components = {
    0: <FirstStep tabNumber={tabNumber} setTabNumber={setTabNumber} />,
    1: <SecondStep tabNumber={tabNumber} setTabNumber={setTabNumber} />,
    2: <ThirdStep tabNumber={tabNumber} setTabNumber={setTabNumber} />,
    3: <FourthStep tabNumber={tabNumber} setTabNumber={setTabNumber} />,
    4: <FifthStep tabNumber={tabNumber} setTabNumber={setTabNumber} />,
    5: <SixthStep tabNumber={tabNumber} setTabNumber={setTabNumber} />,
  };
  return (
    <>
      <WebBody>
        <WebHeader />
        <Inner>
          <Wrapper>
            {isModal && (
              <TwoBtnModal
                text={
                  '지금 나가시면 \n 작성하신 내용이 삭제됩니다. \n 그래도 괜찮으시겠습니까?'
                }
                leftBtnColor={colors.lightGray2}
                leftBtnText={'그만하기'}
                rightBtnColor={colors.main}
                rightBtnText={'계속 작성하기'}
                leftBtnControl={() => route.push('/')}
                rightBtnControl={HandleModal}
              />
            )}
            <Header
              title="간편견적"
              exitBtn={true}
              handleOnClick={HandleModal}
            />
            {/* 메인 */}
            <Body>
              <TabBox>
                {Object.keys(components).map((tab, index) => (
                  <TabLine
                    idx={index.toString()}
                    num={tabNumber.toString()}
                    key={tab}
                    // onClick={() => setTabNumber(index)}
                  />
                ))}
              </TabBox>
              {components[tabNumber]}
            </Body>
          </Wrapper>
        </Inner>
        <WebFooter />
      </WebBody>
    </>
  );
};

export default Quotation1_1; 

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 345pt;
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
    box-shadow: none;
    background: none;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 32.25pt 46.5pt 29.25pt;
  @media (max-width: 899pt) {
    height: 100%;
    margin: 0;
  }
`;

const Body = styled.div`
position: relative;
width: 100%;

@media (max-width: 899pt) {
  padding-top: 12pt;
}
`;

const TabBox = styled.div`
gap: 3pt;
z-index: 1;
//display:flex;

position: absolute;
width: 100%;
top: 0;

`;
const TabLine = styled.div<{ idx: string; num: string }>`
  border-style: solid;
  border-bottom-width: 3pt;
  border-color: ${({ idx, num }) => (idx <= num ? colors.main : colors.gray4)};
  border-radius: 2px;
  
  width: calc(100% / 6);
  display: inline-block;

`;
const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: 42pt;

  @media (max-width: 899pt) {
    position: fixed;
    margin-bottom: 0pt;
  }
`;
const Btn = styled.div<{ buttonActivate: boolean; tabNumber?: number }>`
  color: ${colors.lightWhite};
  width: ${({ tabNumber }) => (tabNumber === 0 ? '100%' : '64%')};
  padding: 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  border-radius: 8px;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.blue3};

  @media (max-width: 899pt) {
    padding: 15pt 0 39pt 0;
  }
`;

const PrevBtn = styled.div<{ buttonActivate: boolean }>`
  color: ${colors.lightWhite};
  width: 36%;
  padding: 15pt 0 39pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.gray};
`;
const TwoBtn = styled.div`
  display: flex;
`;



