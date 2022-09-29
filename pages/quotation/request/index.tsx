
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
const components: Components = {
  0: <FirstStep />,
  1: <SecondStep />,
  2: <ThirdStep />,
  3: <FourthStep />,
  4: <FifthStep />,
  5: <SixthStep />,
};
const Quotation1_1 = () => {
  const route = useRouter();
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  const [isModal, setIsModal] = useState(false);

  const HandleModal = () => setIsModal((prev) => !prev);

  const tabHandler = (index: number) => setTabNumber(index);
  const HandleBtn = () => {
    if (tabNumber !== 5) setTabNumber(tabNumber + 1);
    else route.push('/');
  };
  const HandlePrevBtn = () => {
    if (tabNumber > 0) setTabNumber(tabNumber - 1);
  };

  return (
    <>
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
      <WebBody>
        <WebHeader />
          <Inner>
            <Wrapper>
              <Header title="간편견적" exitBtn={true} handleOnClick={HandleModal} />
              {/* 메인 */}
              <Body>
              <TabBox>
                {Object.keys(components).map((tab, index) => (
                  <TabLine
                  idx={index.toString()}
                  num={tabNumber.toString()}
                  key={tab}
                  onClick={() => tabHandler(index)}
                  />
                ))}
              </TabBox>
              {components[tabNumber]}
              </Body>
              {/* 버튼 */}
              <Footer>
              {tabNumber === 0 ? (
          <Btn
            buttonActivate={buttonActivate}
            onClick={HandleBtn}
            tabNumber={0}
          >
            다음
          </Btn>
              ) : (
              <TwoBtn>
                <PrevBtn buttonActivate={buttonActivate} onClick={HandlePrevBtn}>
                  이전
                </PrevBtn>
                <Btn buttonActivate={buttonActivate} onClick={HandleBtn}>
                  다음
                </Btn>
              </TwoBtn>
              )}
              </Footer>
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
background:#fcfcfc;

@media (max-height: 809pt) {
  display: block;
  height: 100%;
}
`;

const Inner = styled.div`
display: block;
position: relative;
margin: 0 auto;
width: 345pt;
//width: 281.25pt;  
background:#ffff;
box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
border-radius: 12pt;

@media (max-width: 899pt) {
  width: 100%;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0%;
  transform: none;
}
`;

const Wrapper = styled.div`
  position:relative;  
  margin: 0 31.875pt;
  height: 580.5pt;

  @media (max-width: 899pt) {
    height: 100%;
  }
`;

const Body = styled.div`
  padding-top: 12pt;
`;

const TabBox = styled.div`
  display: flex;
  gap: 3pt;
`;
const TabLine = styled.div<{ idx: string; num: string }>`
  border-style: solid;
  border-bottom-width: 3pt;
  border-color: ${({ idx, num }) => (idx <= num ? colors.main : colors.gray4)};
  border-radius: 2px;
  width: 100%;
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
