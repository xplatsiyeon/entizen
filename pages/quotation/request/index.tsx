import styled from '@emotion/styled';
import Header from 'components/mypage/request/header';
import FirstStep from 'components/quotation/request/FirstStep';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';

import Image from 'next/image';
import { useRouter } from 'next/router';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import SecondStep from 'components/quotation/request/SecondStep';
import Third from 'components/quotation/request/Third';
import { width } from '@mui/system';

interface Components {
  [key: number]: JSX.Element;
}
const components: Components = {
  0: <FirstStep />,
  1: <SecondStep />,
  2: <Third />,
  3: <div>3</div>,
  4: <div>4</div>,
  5: <div>5</div>,
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
          leftBtnControll={() => route.push('/')}
          rightBtnControll={HandleModal}
        />
      )}
      <Header title="간편견적" exitBtn={true} handleOnClick={HandleModal} />
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
    </>
  );
};

export default Quotation1_1;

const Body = styled.div`
  padding: 12pt 15pt 0 15pt;
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
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;
const Btn = styled.div<{ buttonActivate: boolean; tabNumber?: number }>`
  color: ${colors.lightWhite};
  width: ${({ tabNumber }) => (tabNumber === 0 ? '100%' : '64%')};
  padding: 15pt 0 39pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.blue3};
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
