import styled from '@emotion/styled';
import Header from 'components/mypage/request/header';
import FirstStep from 'components/quotation/request/FirstStep';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import SecondStep from 'components/quotation/request/SecondStep';
import ThirdStep from 'components/quotation/request/ThirdStep';
import FourthStep from 'components/quotation/request/FourthStep';
import FifthStep from 'components/quotation/request/FifthStep';
import SixthStep from 'components/quotation/request/SixthStep';

import Request1_7 from './confirm';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';

import rootReducer, { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

interface Components {
  [key: number]: JSX.Element;
}

const Quotation1_1 = () => {
  const route = useRouter();
  const [isModal, setIsModal] = useState(false);
  const [hiddenTag, setHiddenTag] = useState(false);
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  const { tabNumber } = useSelector((state: RootState) => state.quotationData);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  const HandleModal = () => setIsModal((prev) => !prev);

  // 앱 -> 웹
  useLayoutEffect(() => {
    // 안드로이드 호출
    if (userAgent === 'Android_App') {
      window.onClickBackButton = () => HandleModal();
    }
  }, []);

  const components: Components = {
    0: <FirstStep tabNumber={tabNumber} />,
    1: <SecondStep tabNumber={tabNumber} />,
    2: <ThirdStep tabNumber={tabNumber} />,
    3: (
      <FourthStep
        tabNumber={tabNumber}
        setHiddenTag={setHiddenTag}
        setIsSearch={setIsSearch}
        isSearch={isSearch}
      />
    ),
    4: <FifthStep tabNumber={tabNumber} />,
    5: <SixthStep tabNumber={tabNumber} />,
  };

  // useEffect(() => {
  //   console.log('isSearch 🍎', isSearch);
  // }, [isSearch]);

  return (
    <>
      <WebBody>
        <WebHeader />
        <Inner>
          <Wrapper>
            {isModal && (
              <TwoBtnModal
                exit={HandleModal}
                text={
                  '지금 나가시면 \n 작성하신 내용이 삭제됩니다. \n 그래도 괜찮으시겠습니까?'
                }
                leftBtnColor={colors.lightGray2}
                leftBtnText={'그만하기'}
                rightBtnColor={colors.main}
                rightBtnText={'계속 작성하기'}
                leftBtnControl={() => route.replace('/')}
                rightBtnControl={HandleModal}
              />
            )}
            {!hiddenTag && (
              <Header
                title="간편견적"
                exitBtn={true}
                handleOnClick={HandleModal}
              />
            )}
            {/* 메인 */}
            <Body>
              {!hiddenTag ? (
                <TabBox>
                  {Object.keys(components).map((tab, index) => (
                    <React.Fragment key={index}>
                      <TabLine
                        idx={index.toString()}
                        num={tabNumber.toString()}
                        key={tab}
                      />
                    </React.Fragment>
                  ))}
                </TabBox>
              ) : (
                ''
              )}
              {/* {components[tabNumber]} */}
              {components[3]}
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
  min-height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
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
  @media (max-width: 899.25pt) {
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
  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0;
  }
`;

const Body = styled.div<{ hiddenTag?: boolean }>`
  position: relative;
  width: 100%;

  @media (max-width: 899.25pt) {
    padding-top: ${({ hiddenTag }) => !hiddenTag && '12pt'};
  }
`;

const TabBox = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;

  @media (max-width: 899.25pt) {
    display: flex;
    position: relative;
    /* gap: 3pt; */
    gap: 0.75pt;
    padding-left: 15pt;
    padding-right: 15pt;
  }
`;
const TabLine = styled.div<{ idx: string; num: string }>`
  border-style: solid;
  border-bottom-width: 3pt;
  border-color: ${({ idx, num }) => (idx <= num ? colors.main : colors.gray4)};
  border-radius: 2px;

  width: calc((100% - 15pt) / 6);
  display: inline-block;
  margin-right: 1.5pt;
  /* margin-right: 3pt; */
  &:nth-last-of-type(1) {
    margin-right: 0;
  }

  @media (max-width: 899.25pt) {
    display: block;
    width: 100%;
  }
`;
const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: 42pt;

  @media (max-width: 899.25pt) {
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

  @media (max-width: 899.25pt) {
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
