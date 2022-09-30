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

interface Components {
  [key: number]: JSX.Element;
}

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
    </>
  );
};

export default Quotation1_1;

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
